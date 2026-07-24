import { NextRequest } from 'next/server';
import { getEnv, hasSecret, json } from '@/lib/backend';

export const dynamic = 'force-dynamic';

type CreemPayload = {
  id?: string;
  eventType?: string;
  event_type?: string;
  type?: string;
  object?: {
    id?: string;
    status?: string;
    customer?: { email?: string };
    metadata?: { user_id?: string; referenceId?: string; plan?: string; credits?: string };
  };
  metadata?: { user_id?: string; referenceId?: string; plan?: string; credits?: string };
};

async function hmacHex(payload: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(value: string) {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function headerSignature(request: NextRequest) {
  return request.headers.get('creem-signature') || request.headers.get('x-creem-signature') || request.headers.get('webhook-signature');
}

async function verifySignature(rawBody: string, request: NextRequest, secret: string) {
  const signature = headerSignature(request);
  if (!signature) return false;
  const expected = await hmacHex(rawBody, secret);
  return signature === expected || signature.endsWith(`=${expected}`);
}

export async function POST(request: NextRequest) {
  const env = getEnv();
  if (!hasSecret(env.CREEM_WEBHOOK_SECRET)) return json({ ok: false, error: 'CREEM_WEBHOOK_NOT_CONFIGURED' }, { status: 503 });

  const rawBody = await request.text();
  const valid = await verifySignature(rawBody, request, env.CREEM_WEBHOOK_SECRET!);
  if (!valid) return json({ ok: false, error: 'INVALID_CREEM_SIGNATURE' }, { status: 400 });

  let event: CreemPayload;
  try {
    event = JSON.parse(rawBody) as CreemPayload;
  } catch {
    return json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }

  const eventType = event.eventType || event.event_type || event.type || 'unknown';
  const metadata = event.object?.metadata || event.metadata || {};
  const userId = metadata.user_id || metadata.referenceId;
  const plan = metadata.plan || 'starter';
  const credits = Number(metadata.credits || '0') || 0;
  const checkoutId = event.object?.id || event.id || crypto.randomUUID();

  if (env.DB) {
    await env.DB.prepare(`
      INSERT OR IGNORE INTO payment_webhook_events (id, provider, event_type, payload_hash, result)
      VALUES (?, 'creem', ?, ?, ?)
    `).bind(String(event.id || checkoutId), eventType, await sha256Hex(rawBody), userId && credits > 0 ? 'processed' : 'received').run();

    if (userId && credits > 0 && /checkout|payment|subscription/i.test(eventType)) {
      await env.DB.prepare(`
        INSERT INTO payment_orders (id, user_id, provider, plan, amount_cents, currency, status, provider_order_id, created_at, updated_at)
        VALUES (?, ?, 'creem', ?, 0, 'USD', ?, ?, datetime('now'), datetime('now'))
        ON CONFLICT(id) DO UPDATE SET status = excluded.status, updated_at = datetime('now')
      `).bind(`creem_${checkoutId}`, userId, plan, event.object?.status || 'paid', checkoutId).run();
      await env.DB.prepare(`
        INSERT INTO entitlements (user_id, plan, credits_remaining, source, created_at, updated_at)
        VALUES (?, ?, ?, 'creem_checkout', datetime('now'), datetime('now'))
        ON CONFLICT(user_id) DO UPDATE SET plan = excluded.plan, credits_remaining = entitlements.credits_remaining + excluded.credits_remaining, source = 'creem_checkout', updated_at = datetime('now')
      `).bind(userId, plan, credits).run();
    }
  }

  return json({ ok: true, received: eventType });
}
