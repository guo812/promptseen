-- PromptSeen backend v1: content, entitlements, generation jobs, payments, audit log.
CREATE TABLE IF NOT EXISTS prompts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  market TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT '',
  prompt_text TEXT NOT NULL,
  is_free INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_prompts_tag ON prompts(tag);
CREATE INDEX IF NOT EXISTS idx_prompts_free ON prompts(is_free);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  auth_provider TEXT NOT NULL DEFAULT 'google',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS entitlements (
  user_id TEXT PRIMARY KEY,
  plan TEXT NOT NULL DEFAULT 'free',
  credits_remaining INTEGER NOT NULL DEFAULT 3,
  valid_until TEXT,
  source TEXT NOT NULL DEFAULT 'system',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS generation_jobs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'anonymous',
  provider TEXT NOT NULL DEFAULT 'fal',
  prompt_text TEXT NOT NULL,
  style TEXT NOT NULL DEFAULT 'default',
  status TEXT NOT NULL DEFAULT 'draft',
  input_asset_key TEXT,
  result_url TEXT,
  error_code TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_generation_jobs_user ON generation_jobs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_generation_jobs_status ON generation_jobs(status);

CREATE TABLE IF NOT EXISTS payment_orders (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'PayPal',
  plan TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'created',
  provider_order_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_payment_orders_user ON payment_orders(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_orders_provider ON payment_orders(provider_order_id);

CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL DEFAULT 'system',
  action TEXT NOT NULL,
  subject_type TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO prompts (id, title, market, tag, prompt_text, is_free) VALUES
('seed-1','Cinematic Cricket Portrait','India / Pakistan','Sports','Create a cinematic AI portrait of me standing under stadium floodlights, wearing a stylish cricket jersey, dramatic rim light, shallow depth of field, rain particles, confident expression, ultra-realistic 4K social media edit.',1),
('seed-2','Eid Moonlight Couple Edit','Arabic / Bangladesh','Festival','Transform this couple photo into an elegant Eid moonlight portrait, warm lanterns, modest festive outfits, glowing crescent moon in background, cinematic bokeh, soft gold highlights, realistic skin texture.',1),
('seed-3','Bollywood Rain Poster','India / Nepal','Cinematic','Turn my photo into a Bollywood-style rainy movie poster, neon street reflections, expressive pose, dramatic teal and amber lighting, film grain, poster composition, high-fashion social media look.',1),
('seed-4','Ramadan Street Portrait','Arabic','Ramadan','Create a respectful Ramadan night street portrait with glowing market lights, elegant traditional styling, soft cinematic shadows, realistic face preservation, warm lantern background, premium Instagram profile photo.',0),
('seed-5','South Asian Graduation DP','India / Sri Lanka','Profile','Generate a clean premium graduation display picture from my photo, modern campus background, confident smile, soft daylight, professional cinematic color grade, crisp details, realistic identity preservation.',0),
('seed-6','Viral Attitude Boys Edit','South Asia','Boys','Make this photo a viral attitude boys edit: black streetwear, urban night backdrop, neon cyan edge lighting, cinematic smoke, sharp jawline emphasis, ultra-realistic 9:16 Reels-ready composition.',0);
