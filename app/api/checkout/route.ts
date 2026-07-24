import { NextRequest } from 'next/server';
import { getEnv, hasSecret, json, requireString } from '@/lib/backend';
import { verifySessionCookie, userIdFromSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

type Plan = { id: string; name: string; amountCents: number; credits: number; stripePriceEnv: string; creemProductEnv: string };

const plans: Record<string, Plan> = {
  starter: { id: 'starter', name: 'Starter', amountCents: 499, credits: 60, stripePriceEnv: 'STRIPE_PRICE_STARTER', creemProductEnv: 'CREEM_PRODUCT_STARTER' },
  pro: { id: 'pro', name: 'Pro', amountCents: 999, credits: 160, stripePriceEnv: 'STRIPE_PRICE_PRO', creemProductEnv: 'CREEM_PRODUCT_PRO' },
  creator: { id: 'creator', name: 'Creator', amountCents: 1999, credits: 420, stripePriceEnv: 'STRIPE_PRICE_CREATOR', creemProductEnv: 'CREEM_PRODUCT_CREATOR' },
};

function envString(value: unknown) {
  return typeof value === 'string' ? value : undefined;
}

function appOrigin(request: NextRequest) {
  const env = getEnv();
  const configured = env.APP_ORIGIN?.replace(/\/$/, '');
  return configured || new URL(request.url).origin;
}

async function createStripeCheckout(plan: Plan, session: Awaited<ReturnType<typeof verifySessionCookie>>, request: NextRequest) {
  const env = getEnv();
  const priceId = envString(env[plan.stripePriceEnv as keyof typeof env]);
  if (!hasSecret(env.STRIPE_SECRET_KEY) || !hasSecret(priceId)) {
    return json({ ok: false, error: 'STRIPE_NOT_CONFIGURED', missing: ['STRIPE_SECRET_KEY', plan.stripePriceEnv] }, { status: 503 });
  }

  const origin = appOrigin(request);
  const params = new URLSearchParams({
    mode: 'payment',
    success_url: `${origin}/account?checkout=success&provider=stripe&plan=${plan.id}`,
    cancel_url: `${origin}/pricing?checkout=cancelled&provider=stripe&plan=${plan.id}`,
    'line_items[0][price]': priceId!,
    'line_items[0][quantity]': '1',
    client_reference_id: userIdFromSession(session!),
    customer_email: session!.email || '',
    'metadata[user_id]': userIdFromSession(session!),
    'metadata[plan]': plan.id,
    'metadata[credits]': String(plan.credits),
  });

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  const data = await res.json() as { id?: string; url?: string; error?: { message?: string } };
  if (!res.ok || !data.url) return json({ ok: false, error: 'STRIPE_CHECKOUT_FAILED', message: data.error?.message || 'Stripe checkout failed' }, { status: 502 });
  return json({ ok: true, provider: 'stripe', checkoutUrl: data.url, checkoutId: data.id });
}

async function createCreemCheckout(plan: Plan, session: Awaited<ReturnType<typeof verifySessionCookie>>, request: NextRequest) {
  const env = getEnv();
  const productId = envString(env[plan.creemProductEnv as keyof typeof env]);
  const apiBase = env.CREEM_API_BASE_URL || 'https://api.creem.io';
  if (!hasSecret(env.CREEM_API_KEY) || !hasSecret(productId)) {
    return json({ ok: false, error: 'CREEM_NOT_CONFIGURED', missing: ['CREEM_API_KEY', plan.creemProductEnv] }, { status: 503 });
  }

  const origin = appOrigin(request);
  const payload = {
    product_id: productId,
    success_url: `${origin}/account?checkout=success&provider=creem&plan=${plan.id}`,
    customer: { email: session!.email },
    metadata: {
      user_id: userIdFromSession(session!),
      referenceId: userIdFromSession(session!),
      plan: plan.id,
      credits: String(plan.credits),
    },
  };

  const res = await fetch(`${apiBase.replace(/\/$/, '')}/v1/checkouts`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.CREEM_API_KEY}`,
      'content-type': 'application/json',
      accept: 'application/json',
      'user-agent': 'Mozilla/5.0 PromptSeenCheckout/1.0',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({})) as { checkout_url?: string; url?: string; id?: string; error?: string; message?: string };
  const checkoutUrl = data.checkout_url || data.url;
  if (!res.ok || !checkoutUrl) return json({ ok: false, error: 'CREEM_CHECKOUT_FAILED', message: data.message || data.error || 'Creem checkout failed' }, { status: 502 });
  return json({ ok: true, provider: 'creem', checkoutUrl, checkoutId: data.id });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }

  const planId = requireString(body, 'plan', 40) || requireString(body, 'planId', 40);
  if (!planId || !plans[planId]) return json({ ok: false, error: 'UNKNOWN_PLAN' }, { status: 400 });

  const session = await verifySessionCookie(request.cookies.get('promptseen_session')?.value);
  if (!session) {
    const next = `/api/checkout/start?plan=${encodeURIComponent(planId)}`;
    return json({ ok: false, error: 'AUTH_REQUIRED', signInUrl: `/app/sign-in?next=${encodeURIComponent(next)}&plan=${encodeURIComponent(planId)}` }, { status: 401 });
  }

  const env = getEnv();
  const provider = String(env.PAYMENT_PROVIDER || 'stripe').toLowerCase();
  if (provider === 'stripe') return createStripeCheckout(plans[planId], session, request);
  if (provider === 'creem') return createCreemCheckout(plans[planId], session, request);
  if (provider === 'paypal') return json({ ok: false, error: 'PAYPAL_LEGACY_ENDPOINT', message: 'Use /api/paypal/create-order or switch PAYMENT_PROVIDER to stripe/creem.' }, { status: 501 });
  return json({ ok: false, error: 'PAYMENT_PROVIDER_UNSUPPORTED', provider }, { status: 501 });
}
