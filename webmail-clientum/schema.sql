-- ========================================================================
-- CLIENTUM WEBMAIL D1 DATABASE SCHEMA
-- ========================================================================

-- Inbound emails table
CREATE TABLE IF NOT EXISTS emails (
  id TEXT PRIMARY KEY,
  message_id TEXT,
  from_addr TEXT NOT NULL,
  from_name TEXT,
  to_addr TEXT NOT NULL,
  subject TEXT,
  body_text TEXT,
  body_html TEXT,
  raw_size INTEGER DEFAULT 0,
  is_read INTEGER DEFAULT 0,
  is_starred INTEGER DEFAULT 0,
  is_archived INTEGER DEFAULT 0,
  attachments_json TEXT DEFAULT '[]',
  created_at INTEGER NOT NULL
);

-- Outbound / Sent emails table
CREATE TABLE IF NOT EXISTS sent_emails (
  id TEXT PRIMARY KEY,
  to_addr TEXT NOT NULL,
  from_addr TEXT NOT NULL,
  subject TEXT,
  body_text TEXT,
  body_html TEXT,
  status TEXT DEFAULT 'sent',
  error_message TEXT,
  sent_at INTEGER NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_emails_created_at ON emails(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_emails_to_addr ON emails(to_addr);
CREATE INDEX IF NOT EXISTS idx_emails_from_addr ON emails(from_addr);
CREATE INDEX IF NOT EXISTS idx_emails_is_read ON emails(is_read);
CREATE INDEX IF NOT EXISTS idx_emails_is_starred ON emails(is_starred);
CREATE INDEX IF NOT EXISTS idx_sent_emails_sent_at ON sent_emails(sent_at DESC);
