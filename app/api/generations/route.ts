import { getEnv, hasSecret, json, requireString } from '@/lib/backend';

export const dynamic = 'force-dynamic';

type GenerationBody = {
  prompt?: unknown;
  style?: unknown;
  provider?: unknown;
  userId?: unknown;
};

type ProviderId = 'jimeng' | 'gpt-image-2' | 'gemini';

const providerConfig: Record<ProviderId, { creditCost: number; envKey: keyof ReturnType<typeof getEnv> }> = {
  jimeng: { creditCost: 10, envKey: 'JIMENG_API_KEY' },
  'gpt-image-2': { creditCost: 40, envKey: 'OPENAI_API_KEY' },
  gemini: { creditCost: 30, envKey: 'GEMINI_API_KEY' },
};

function jobId() {
  return `gen_${Date.now().toString(36)}_${crypto.randomUUID().slice(0, 8)}`;
}

async function callOpenAI(prompt: string, apiKey: string) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model: 'gpt-image-2', prompt, size: '1024x1536', n: 1 }),
  });
  const data = await response.json() as { data?: Array<{ url?: string; b64_json?: string }>; error?: { message?: string } };
  if (!response.ok) throw new Error(data.error?.message || `OPENAI_${response.status}`);
  const first = data.data?.[0];
  return first?.url ?? (first?.b64_json ? `data:image/png;base64,${first.b64_json}` : '');
}

async function callGemini(prompt: string, apiKey: string) {
  const model = 'gemini-2.5-flash-image';
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + encodeURIComponent(apiKey);
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ['IMAGE', 'TEXT'] } }),
  });
  const data = await response.json() as any;
  if (!response.ok) throw new Error(data.error?.message || `GEMINI_${response.status}`);
  const part = data.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData?.data);
  return part ? `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}` : '';
}

function imageGenerationEndpoint(baseUrl: string) {
  const trimmed = baseUrl.replace(/\/$/, '');
  return trimmed.endsWith('/images/generations') ? trimmed : `${trimmed}/images/generations`;
}

async function callJimeng(prompt: string, env: ReturnType<typeof getEnv>) {
  const apiKey = env.ARK_API_KEY || env.JIMENG_API_KEY;
  const baseUrl = env.ARK_BASE_URL || env.JIMENG_ENDPOINT || 'https://ark.cn-beijing.volces.com/api/v3';
  const model = env.SEEDREAM_MODEL || 'doubao-seedream-4-5-251128';
  if (!hasSecret(apiKey)) throw new Error('ARK_API_KEY_NOT_CONFIGURED');
  const response = await fetch(imageGenerationEndpoint(baseUrl), {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model, prompt, size: '2048x2048', response_format: 'url', watermark: false }),
  });
  const data = await response.json() as any;
  if (!response.ok) throw new Error(data.error?.message || data.message || `SEEDREAM_${response.status}`);
  return data.url || data.image_url || data.data?.[0]?.url || data.data?.[0]?.b64_json ? (data.data?.[0]?.url || data.url || data.image_url || `data:image/png;base64,${data.data?.[0]?.b64_json}`) : '';
}

async function callProvider(provider: ProviderId, prompt: string, env: ReturnType<typeof getEnv>) {
  if (provider === 'gpt-image-2') {
    if (!hasSecret(env.OPENAI_API_KEY)) throw new Error('OPENAI_API_KEY_NOT_CONFIGURED');
    return callOpenAI(prompt, env.OPENAI_API_KEY!);
  }
  if (provider === 'gemini') {
    if (!hasSecret(env.GEMINI_API_KEY)) throw new Error('GEMINI_API_KEY_NOT_CONFIGURED');
    return callGemini(prompt, env.GEMINI_API_KEY!);
  }
  return callJimeng(prompt, env);
}

export async function POST(request: Request) {
  const env = getEnv();
  let body: GenerationBody;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }

  const prompt = requireString(body, 'prompt', 3000);
  if (!prompt) return json({ ok: false, error: 'PROMPT_REQUIRED' }, { status: 400 });

  const providerRaw = typeof body.provider === 'string' ? body.provider : typeof body.style === 'string' ? body.style : env.AI_PROVIDER;
  const provider: ProviderId = providerRaw === 'jimeng' || providerRaw === 'gemini' || providerRaw === 'gpt-image-2' ? providerRaw : 'gpt-image-2';
  const id = jobId();
  const style = typeof body.style === 'string' ? body.style.slice(0, 80) : provider;
  const userId = typeof body.userId === 'string' ? body.userId.slice(0, 120) : 'anonymous';
  const realAiEnabled = env.ENABLE_REAL_AI === 'true';
  let status = realAiEnabled ? 'queued' : 'draft';
  let resultUrl = '';
  let errorCode = '';

  if (realAiEnabled) {
    try {
      resultUrl = await callProvider(provider, prompt, env);
      status = resultUrl ? 'succeeded' : 'provider_empty';
    } catch (error) {
      status = 'failed';
      errorCode = error instanceof Error ? error.message.slice(0, 180) : 'PROVIDER_FAILED';
    }
  }

  if (env.DB) {
    await env.DB.prepare(
      `INSERT INTO generation_jobs (id, user_id, provider, prompt_text, style, status, result_url, error_code, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, datetime('now'), datetime('now'))`,
    ).bind(id, userId, provider, prompt, style, status, resultUrl || null, errorCode || null).run();
  }

  if (realAiEnabled && status === 'failed') return json({ ok: false, id, error: errorCode, provider }, { status: 502 });

  return json({
    ok: true,
    id,
    status,
    provider,
    creditCost: providerConfig[provider].creditCost,
    resultUrl,
    message: realAiEnabled
      ? 'Generation finished. Credit deduction should be enforced after login/session is enabled for public traffic.'
      : 'Generation backend is in safe draft mode. Set ENABLE_REAL_AI=true and configure provider keys to call the selected AI provider.',
  }, { status: 201 });
}

export async function GET(request: Request) {
  const env = getEnv();
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) return json({ ok: false, error: 'ID_REQUIRED' }, { status: 400 });

  if (!env.DB) return json({ ok: false, error: 'DB_NOT_CONFIGURED' }, { status: 503 });

  const job = await env.DB.prepare(
    `SELECT id, user_id, provider, style, status, result_url, error_code, created_at, updated_at
     FROM generation_jobs WHERE id = ?1`,
  ).bind(id).first();

  if (!job) return json({ ok: false, error: 'NOT_FOUND' }, { status: 404 });
  return json({ ok: true, job });
}
