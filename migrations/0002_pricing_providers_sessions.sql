-- PromptSeen backend v2: credit-safe pricing and multi-provider generation metadata.
ALTER TABLE entitlements ADD COLUMN credits_monthly INTEGER NOT NULL DEFAULT 0;
ALTER TABLE entitlements ADD COLUMN bonus_credits_remaining INTEGER NOT NULL DEFAULT 0;
ALTER TABLE entitlements ADD COLUMN billing_cycle TEXT NOT NULL DEFAULT 'free';
ALTER TABLE entitlements ADD COLUMN model_tier TEXT NOT NULL DEFAULT 'standard';
ALTER TABLE entitlements ADD COLUMN watermark_removed INTEGER NOT NULL DEFAULT 0;
ALTER TABLE entitlements ADD COLUMN hd_download INTEGER NOT NULL DEFAULT 0;
ALTER TABLE entitlements ADD COLUMN priority_queue INTEGER NOT NULL DEFAULT 0;
ALTER TABLE entitlements ADD COLUMN subscription_status TEXT NOT NULL DEFAULT 'active';
ALTER TABLE entitlements ADD COLUMN provider_customer_id TEXT;
ALTER TABLE entitlements ADD COLUMN provider_subscription_id TEXT;

ALTER TABLE prompts ADD COLUMN slug TEXT;
ALTER TABLE prompts ADD COLUMN audience TEXT NOT NULL DEFAULT '';
ALTER TABLE prompts ADD COLUMN gender TEXT NOT NULL DEFAULT 'Unisex';
ALTER TABLE prompts ADD COLUMN country TEXT NOT NULL DEFAULT '';
ALTER TABLE prompts ADD COLUMN platform TEXT NOT NULL DEFAULT '';
ALTER TABLE prompts ADD COLUMN image_url TEXT NOT NULL DEFAULT '';
ALTER TABLE prompts ADD COLUMN image_alt TEXT NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS credit_ledger (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  job_id TEXT,
  action TEXT NOT NULL,
  credits_delta INTEGER NOT NULL,
  balance_after INTEGER,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_credit_ledger_user ON credit_ledger(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id, expires_at);
