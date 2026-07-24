import { NextRequest } from 'next/server';
import { getEnv, hasSecret, json } from '@/lib/backend';

export const dynamic = 'force-dynamic';

type StripeCheckoutSession = {
  id: string;
  object: 'checkout.session';
  payment_status?: string;
  customer?: string;
  customer_email?: string;
  client_reference_id?: string;
  metadata?: { user_id?: string; plan?: string; credits?: string };
};

type StripeEvent = {
  id: string;
  type: string;
  data?: { object?: StripeCheckoutSession };
};

async function hmacHex(payload: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function parseStripeSignature(header: string | null) {
  if (!header) return null;
  const parts = Object.fromEntries(header.split(',').map((part) => {
    const [key, value] = part.split('=');
    return [key, value];
  }));
  return parts.t && parts.v1 ? { timestamp: parts.t, signature: parts.v1 } : null;
}

async function verifyStripeSignature(rawBody: string, signatureHeader: string | null, secret: string) {
  const parsed = parseStripeSignature(signatureHeader);
  if (!parsed) return false;
  const expected = await hmacHex(`${parsed.timestamp}.${rawBody}`, secret);
  return expected === parsed.signature;
}

async function sha256Hex(value: string) {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function applyCheckoutCompleted(event: StripeEvent, session: StripeCheckoutSession) {
  const env = getEnv();
  const db = env.DB;
  if (!db) return { stored: false, reason: 'DB_NOT_CONFIGURED' };

  const userId = session.metadata?.user_id || session.client_reference_id;
  const plan = session.metadata?.plan || 'starter';
  const credits = Number(session.metadata?.credits || '0') || 0;
  if (!userId || credits <= 0) return { stored: false, reason: 'MISSING_METADATA' };

  await db.prepare(`
    INSERT INTO payment_orders (id, user_id, provider, plan, amount_cents, currency, status, provider_order_id, created_at, updated_at)
    VALUES (?, ?, 'stripe', ?, 0, 'USD', ?, ?, datetime('now'), datetime('now'))
    ON CONFLICT(id) DO UPDATE SET status = excluded.status, updated_at = datetime('now')
  `).bind(`stripe_${session.id}`, userId, plan, session.payment_status || 'paid', session.id).run();

  await db.prepare(`
    INSERT INTO entitlements (user_id, plan, credits_remaining, source, created_at, updated_at)
    VALUES (?, ?, ?, 'stripe_checkout', datetime('now'), datetime('now'))
    ON CONFLICT(user_id) DO UPDATE SET plan = excluded.plan, credits_remaining = entitlements.credits_remaining + excluded.credits_remaining, source = 'stripe_checkout', updated_at = datetime('now')
  `).bind(userId, plan, credits).run();

  await db.prepare(`
    INSERT OR IGNORE INTO payment_webhook_events (id, provider, event_type, payload_hash, result)
    VALUES (?, 'stripe', ?, ?, 'processed')
  `).bind(event.id, event.type, await sha256Hex(JSON.stringify(event))).run();

  return { stored: true, userId, plan, credits };
}

export async function POST(request: NextRequest) {
  const env = getEnv();
  if (!hasSecret(env.STRIPE_WEBHOOK_SECRET)) return json({ ok: false, error: 'STRIPE_WEBHOOK_NOT_CONFIGURED' }, { status: 503 });

  const rawBody = await request.text();
  const valid = await verifyStripeSignature(rawBody, request.headers.get('stripe-signature'), env.STRIPE_WEBHOOK_SECRET!);
  if (!valid) return json({ ok: false, error: 'INVALID_STRIPE_SIGNATURE' }, { status: 400 });

  let event: StripeEvent;
  try {
    event = JSON.parse(rawBody) as StripeEvent;
  } catch {
    return json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed' && event.data?.object?.object === 'checkout.session') {
    const result = await applyCheckoutCompleted(event, event.data.object);
    return json({ ok: true, received: event.type, result });
  }

  return json({ ok: true, received: event.type, ignored: true });
}
