import { getEnv, json, requireString } from '@/lib/backend';

export const dynamic = 'force-dynamic';

type GenerationBody = {
  prompt?: unknown;
  style?: unknown;
  userId?: unknown;
};

function jobId() {
  return `gen_${Date.now().toString(36)}_${crypto.randomUUID().slice(0, 8)}`;
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

  const id = jobId();
  const style = typeof body.style === 'string' ? body.style.slice(0, 80) : 'default';
  const userId = typeof body.userId === 'string' ? body.userId.slice(0, 120) : 'anonymous';
  const realAiEnabled = env.ENABLE_REAL_AI === 'true';
  const status = realAiEnabled ? 'queued' : 'draft';

  if (env.DB) {
    await env.DB.prepare(
      `INSERT INTO generation_jobs (id, user_id, provider, prompt_text, style, status, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, datetime('now'), datetime('now'))`,
    ).bind(id, userId, env.AI_PROVIDER ?? 'fal', prompt, style, status).run();
  }

  return json({
    ok: true,
    id,
    status,
    provider: env.AI_PROVIDER ?? 'fal',
    message: realAiEnabled
      ? 'Generation job accepted. Provider execution is gated behind production policy review.'
      : 'Generation backend is deployed in safe draft mode. Set ENABLE_REAL_AI=true after owner review to call the AI provider.',
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
