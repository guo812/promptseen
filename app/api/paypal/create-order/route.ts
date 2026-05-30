import { getEnv, hasSecret, json, requireString } from '@/lib/backend';

export const dynamic = 'force-dynamic';

const plans: Record<string, { name: string; priceUsd: number; credits: number; type: 'subscription' | 'credits' }> = {
  starter: { name: 'Starter', priceUsd: 4.99, credits: 300, type: 'subscription' },
  pro: { name: 'Pro', priceUsd: 9.99, credits: 1000, type: 'subscription' },
  creator: { name: 'Creator', priceUsd: 19.99, credits: 2500, type: 'subscription' },
  credits_small: { name: 'Small Credits Pack', priceUsd: 4.99, credits: 300, type: 'credits' },
  credits_medium: { name: 'Medium Credits Pack', priceUsd: 9.99, credits: 800, type: 'credits' },
  credits_large: { name: 'Large Credits Pack', priceUsd: 19.99, credits: 2000, type: 'credits' },
};

function paypalBase() {
  return process.env.PAYPAL_ENV === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
}

async function paypalAccessToken(clientId: string, secret: string) {
  const response = await fetch(`${paypalBase()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      authorization: `Basic ${btoa(`${clientId}:${secret}`)}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json() as { access_token?: string; error_description?: string };
  if (!response.ok || !data.access_token) throw new Error(data.error_description || `PAYPAL_AUTH_${response.status}`);
  return data.access_token;
}

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

  const plan = plans[planId];
  const origin = env.APP_ORIGIN?.replace(/\/$/, '') || 'https://promptseen.online';
  try {
    const accessToken = await paypalAccessToken(env.PAYPAL_CLIENT_ID!, env.PAYPAL_CLIENT_SECRET!);
    const response = await fetch(`${paypalBase()}/v2/checkout/orders`, {
      method: 'POST',
      headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: planId,
          description: `${plan.name} - ${plan.credits} PromptSeen credits`,
          amount: { currency_code: 'USD', value: plan.priceUsd.toFixed(2) },
        }],
        application_context: {
          brand_name: 'PromptSeen Online',
          user_action: 'PAY_NOW',
          return_url: `${origin}/app/billing/success?plan=${encodeURIComponent(planId)}`,
          cancel_url: `${origin}/app/billing/cancel?plan=${encodeURIComponent(planId)}`,
        },
      }),
    });
    const data = await response.json() as any;
    if (!response.ok) throw new Error(data.message || `PAYPAL_ORDER_${response.status}`);
    if (env.DB) {
      await env.DB.prepare(`INSERT INTO payment_orders (id, user_id, provider, plan, amount_cents, currency, status, provider_order_id, created_at, updated_at) VALUES (?1, ?2, 'PayPal', ?3, ?4, 'USD', 'created', ?5, datetime('now'), datetime('now'))`)
        .bind(`pay_${Date.now().toString(36)}_${crypto.randomUUID().slice(0, 8)}`, 'anonymous', planId, Math.round(plan.priceUsd * 100), data.id).run();
    }
    return json({ ok: true, provider: 'PayPal', plan, orderId: data.id, approvalUrl: data.links?.find((l: any) => l.rel === 'approve')?.href || null });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : 'PAYPAL_CREATE_ORDER_FAILED' }, { status: 502 });
  }
}
