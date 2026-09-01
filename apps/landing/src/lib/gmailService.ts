import { getAccessToken } from './googleAuth';

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  isUnread: boolean;
  isStarred: boolean;
  labelIds: string[];
}

export interface GmailMessageDetail extends GmailMessageSummary {
  bodyText: string;
  bodyHtml?: string;
  attachments?: { filename: string; mimeType: string; size: number; attachmentId: string }[];
}

export interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

// Decode base64url safely
function decodeBase64Url(base64Url: string): string {
  try {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    return decodeURIComponent(
      Array.prototype.map
        .call(decoded, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    try {
      return atob(base64Url.replace(/-/g, '+').replace(/_/g, '/'));
    } catch {
      return '';
    }
  }
}

// Encode base64url safely for sending
function encodeBase64Url(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function fetchGmailProfile(): Promise<GmailProfile | null> {
  const token = await getAccessToken();
  if (!token) return null;

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error('UNAUTHORIZED');
    throw new Error(`Failed to fetch profile: ${res.statusText}`);
  }

  return await res.json();
}

export async function fetchGmailMessages(params: {
  q?: string;
  maxResults?: number;
  labelIds?: string[];
  pageToken?: string;
} = {}): Promise<{ messages: GmailMessageSummary[]; nextPageToken?: string; totalEstimated?: number }> {
  const token = await getAccessToken();
  if (!token) throw new Error('NO_TOKEN');

  const queryParams = new URLSearchParams();
  if (params.q) queryParams.set('q', params.q);
  queryParams.set('maxResults', String(params.maxResults || 20));
  if (params.labelIds && params.labelIds.length > 0) {
    params.labelIds.forEach(lbl => queryParams.append('labelIds', lbl));
  }
  if (params.pageToken) queryParams.set('pageToken', params.pageToken);

  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?${queryParams.toString()}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error('UNAUTHORIZED');
    throw new Error(`Failed to list messages: ${res.statusText}`);
  }

  const listData = await res.json();
  const messageItems = listData.messages || [];

  // Fetch summaries in parallel batches
  const detailedList = await Promise.all(
    messageItems.map(async (m: { id: string; threadId: string }) => {
      try {
        const msgRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!msgRes.ok) return null;
        const msgData = await msgRes.json();

        const headers = msgData.payload?.headers || [];
        const subject = headers.find((h: any) => h.name.toLowerCase() === 'subject')?.value || '(No Subject)';
        const from = headers.find((h: any) => h.name.toLowerCase() === 'from')?.value || 'Unknown Sender';
        const to = headers.find((h: any) => h.name.toLowerCase() === 'to')?.value || '';
        const date = headers.find((h: any) => h.name.toLowerCase() === 'date')?.value || '';
        const labelIds = msgData.labelIds || [];

        return {
          id: msgData.id,
          threadId: msgData.threadId,
          snippet: msgData.snippet || '',
          subject,
          from,
          to,
          date,
          isUnread: labelIds.includes('UNREAD'),
          isStarred: labelIds.includes('STARRED'),
          labelIds
        } as GmailMessageSummary;
      } catch {
        return null;
      }
    })
  );

  return {
    messages: detailedList.filter((m): m is GmailMessageSummary => m !== null),
    nextPageToken: listData.nextPageToken,
    totalEstimated: listData.resultSizeEstimate
  };
}

export async function fetchMessageDetail(id: string): Promise<GmailMessageDetail> {
  const token = await getAccessToken();
  if (!token) throw new Error('NO_TOKEN');

  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error('UNAUTHORIZED');
    throw new Error(`Failed to load message: ${res.statusText}`);
  }

  const data = await res.json();
  const headers = data.payload?.headers || [];
  const subject = headers.find((h: any) => h.name.toLowerCase() === 'subject')?.value || '(No Subject)';
  const from = headers.find((h: any) => h.name.toLowerCase() === 'from')?.value || 'Unknown Sender';
  const to = headers.find((h: any) => h.name.toLowerCase() === 'to')?.value || '';
  const date = headers.find((h: any) => h.name.toLowerCase() === 'date')?.value || '';
  const labelIds = data.labelIds || [];

  let bodyText = '';
  let bodyHtml = '';

  const extractBody = (part: any) => {
    if (!part) return;
    if (part.mimeType === 'text/plain' && part.body?.data) {
      bodyText += decodeBase64Url(part.body.data);
    } else if (part.mimeType === 'text/html' && part.body?.data) {
      bodyHtml += decodeBase64Url(part.body.data);
    }
    if (part.parts && Array.isArray(part.parts)) {
      part.parts.forEach(extractBody);
    }
  };

  if (data.payload?.body?.data) {
    if (data.payload.mimeType === 'text/html') {
      bodyHtml = decodeBase64Url(data.payload.body.data);
    } else {
      bodyText = decodeBase64Url(data.payload.body.data);
    }
  } else if (data.payload?.parts) {
    data.payload.parts.forEach(extractBody);
  }

  return {
    id: data.id,
    threadId: data.threadId,
    snippet: data.snippet || '',
    subject,
    from,
    to,
    date,
    isUnread: labelIds.includes('UNREAD'),
    isStarred: labelIds.includes('STARRED'),
    labelIds,
    bodyText: bodyText || data.snippet || '',
    bodyHtml: bodyHtml || undefined
  };
}

export async function sendGmailEmail(options: {
  to: string;
  subject: string;
  body: string;
  cc?: string;
  bcc?: string;
  replyToMessageId?: string;
  threadId?: string;
}): Promise<any> {
  const token = await getAccessToken();
  if (!token) throw new Error('NO_TOKEN');

  const headers: string[] = [
    `To: ${options.to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(options.subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64'
  ];

  if (options.cc) headers.push(`Cc: ${options.cc}`);
  if (options.bcc) headers.push(`Bcc: ${options.bcc}`);
  if (options.replyToMessageId) {
    headers.push(`In-Reply-To: ${options.replyToMessageId}`);
    headers.push(`References: ${options.replyToMessageId}`);
  }

  const formattedHtml = options.body.replace(/\n/g, '<br/>');
  const rawEmail = `${headers.join('\r\n')}\r\n\r\n${formattedHtml}`;
  const encodedRaw = encodeBase64Url(rawEmail);

  const payload: any = { raw: encodedRaw };
  if (options.threadId) payload.threadId = options.threadId;

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Failed to send email (${res.status})`);
  }

  return await res.json();
}

export async function markGmailMessageRead(id: string, read: boolean = true): Promise<void> {
  const token = await getAccessToken();
  if (!token) return;

  await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/modify`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      removeLabelIds: read ? ['UNREAD'] : [],
      addLabelIds: !read ? ['UNREAD'] : []
    })
  });
}

export async function toggleGmailMessageStarred(id: string, currentlyStarred: boolean): Promise<void> {
  const token = await getAccessToken();
  if (!token) return;

  await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/modify`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      removeLabelIds: currentlyStarred ? ['STARRED'] : [],
      addLabelIds: !currentlyStarred ? ['STARRED'] : []
    })
  });
}

export async function trashGmailMessage(id: string): Promise<void> {
  const token = await getAccessToken();
  if (!token) throw new Error('NO_TOKEN');

  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/trash`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    throw new Error('Failed to trash message');
  }
}
