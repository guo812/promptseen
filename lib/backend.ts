import { getCloudflareContext } from '@opennextjs/cloudflare';
import { prompts } from '@/lib/content';

export type PromptSeenEnv = {
  DB?: D1Database;
  ASSETS_BUCKET?: R2Bucket;
  SITE_NAME?: string;
  SITE_SLUG?: string;
  DOMAIN?: string;
  APP_ORIGIN?: string;
  PRODUCT_TYPE?: string;
  AI_PROVIDER?: string;
  PAYMENT_PROVIDER?: string;
  AUTH_PROVIDER?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GOOGLE_REDIRECT_URI?: string;
  FAL_KEY?: string;
  OPENAI_API_KEY?: string;
  GEMINI_API_KEY?: string;
  JIMENG_API_KEY?: string;
  JIMENG_ENDPOINT?: string;
  ARK_API_KEY?: string;
  ARK_BASE_URL?: string;
  SEEDREAM_MODEL?: string;
  REPLICATE_API_TOKEN?: string;
  PAYPAL_CLIENT_ID?: string;
  PAYPAL_CLIENT_SECRET?: string;
  SESSION_SECRET?: string;
  ENABLE_REAL_AI?: string;
};

type JsonBody = Record<string, unknown>;

export function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  headers.set('cache-control', 'no-store');
  return Response.json(data, { ...init, headers });
}

export function getEnv(): PromptSeenEnv {
  try {
    return getCloudflareContext().env as PromptSeenEnv;
  } catch {
    return process.env as PromptSeenEnv;
  }
}

export function requireString(body: JsonBody, key: string, max = 4000): string | null {
  const value = body[key];
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export function safePromptSeed() {
  return prompts.map((prompt, index) => ({
    id: `seed-${index + 1}`,
    title: prompt.title,
    market: prompt.market,
    tag: prompt.tag,
    prompt: prompt.prompt,
    isFree: index < 3,
  }));
}

export function hasSecret(value?: string) {
  return Boolean(value && value.trim() && value !== '[REDACTED]');
}
