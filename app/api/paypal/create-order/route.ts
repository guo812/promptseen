import { getEnv, hasSecret, json, requireString } from '@/lib/backend';

export const dynamic = 'force-dynamic';

const plans: Record<string, { name: string; priceUsd: number; credits: number }> = {
  starter: { name: 'Starter', priceUsd: 6, credits: 60 },
  pro: { name: 'Pro', priceUsd: 12, credits: 160 },
  creator: { name: 'Creator', priceUsd: 24, credits: 420 },
};

export async function POST(request: Request) {
  const env = getEnv();
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }

  const planId = requireString(body, 'planId', 40);
  if (!planId || !plans[planId]) return json({ ok: false, error: 'UNKNOWN_PLAN' }, { status: 400 });

  if (!hasSecret(env.PAYPAL_CLIENT_ID) || !hasSecret(env.PAYPAL_CLIENT_SECRET)) {
    return json({ ok: false, error: 'PAYPAL_NOT_CONFIGURED' }, { status: 503 });
  }

  return json({
    ok: true,
    mode: 'review-required',
    provider: 'PayPal',
    plan: plans[planId],
    message: 'PayPal credentials are configured. Live order creation is intentionally gated until pricing/refund policy owner review is complete.',
  });
}
