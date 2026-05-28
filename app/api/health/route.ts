import { getEnv, hasSecret, json, safePromptSeed } from '@/lib/backend';

export const dynamic = 'force-dynamic';

type DbHealth = {
  configured: boolean;
  ok: boolean;
  promptCount?: number;
  error?: string;
};

export async function GET() {
  const env = getEnv();
  const dbHealth: DbHealth = { configured: Boolean(env.DB), ok: false };

  if (env.DB) {
    try {
      const row = await env.DB.prepare('SELECT COUNT(*) AS count FROM prompts').first<{ count: number }>();
      dbHealth.ok = true;
      dbHealth.promptCount = Number(row?.count ?? 0);
    } catch (error) {
      dbHealth.error = error instanceof Error ? error.message : 'D1 health check failed';
    }
  }

  return json({
    ok: true,
    product: {
      name: env.SITE_NAME ?? 'promptseen',
      slug: env.SITE_SLUG ?? 'promptseen',
      domain: env.DOMAIN ?? 'promptseen.online',
      origin: env.APP_ORIGIN ?? 'https://www.promptseen.online/',
      type: env.PRODUCT_TYPE ?? 'AI-Image-Prompts',
    },
    providers: {
      ai: env.AI_PROVIDER ?? 'fal',
      payment: env.PAYMENT_PROVIDER ?? 'PayPal',
      auth: env.AUTH_PROVIDER ?? 'google',
      googleConfigured: hasSecret(env.GOOGLE_CLIENT_ID) && hasSecret(env.GOOGLE_CLIENT_SECRET),
      falConfigured: hasSecret(env.FAL_KEY),
      paypalConfigured: hasSecret(env.PAYPAL_CLIENT_ID) && hasSecret(env.PAYPAL_CLIENT_SECRET),
    },
    database: dbHealth,
    seedPromptCount: safePromptSeed().length,
    timestamp: new Date().toISOString(),
  });
}
