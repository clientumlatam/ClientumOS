export type WhatsAppConnectionStatus = 'CONNECTED' | 'DISCONNECTED' | 'PAIRING' | 'CONNECTING';

export interface WhatsAppAccount {
  id: string;
  phoneNumber: string;
  label: string;
  pushName: string;
  status: WhatsAppConnectionStatus;
  batteryLevel: number;
  charging: boolean;
  platform: string;
  latency: string;
  uptime: string;
  isDefault: boolean;
  qrData?: string;
  qrExpiry?: number;
  syncProgress?: number;
  lastConnectedAt?: string;
}

export interface WhatsAppAgent {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  email: string;
  phone: string;
  avatarInitials: string;
  isBot?: boolean;
  activeConversationsCount?: number;
  status: 'online' | 'busy' | 'offline';
}

export interface WaConversationExtended {
  id: number;
  phone: string;
  contact_name?: string;
  lead_id?: number;
  bot_active: boolean;
  last_message_at?: string;
  last_message?: string;
  unread?: number;
  assigned_agent_id?: string;
  assigned_agent_name?: string;
  account_id?: string;
  account_label?: string;
  transfer_note?: string;
  tags?: string[];
}

export interface WaMessageExtended {
  id: number;
  conversation_id: number;
  direction: 'inbound' | 'outbound';
  content: string;
  sent_by: 'bot' | 'human' | 'ai_suggestion' | 'system';
  created_at: string;
  sender_name?: string;
}

export type ConversationFilterScope = 'all' | 'my_team' | 'unassigned' | 'bot';
