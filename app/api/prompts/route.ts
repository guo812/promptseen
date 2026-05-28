import { getEnv, json, safePromptSeed } from '@/lib/backend';

export const dynamic = 'force-dynamic';

type PromptRow = {
  id: string;
  title: string;
  market: string;
  tag: string;
  prompt_text: string;
  is_free: number;
};

export async function GET(request: Request) {
  const env = getEnv();
  const url = new URL(request.url);
  const tag = url.searchParams.get('tag')?.trim();
  const q = url.searchParams.get('q')?.trim().toLowerCase();

  if (env.DB) {
    try {
      const rows = await env.DB.prepare(
        `SELECT id, title, market, tag, prompt_text, is_free
         FROM prompts
         WHERE (?1 IS NULL OR lower(tag) = lower(?1))
           AND (?2 IS NULL OR lower(title || ' ' || market || ' ' || tag || ' ' || prompt_text) LIKE '%' || lower(?2) || '%')
         ORDER BY created_at DESC, title ASC
         LIMIT 100`,
      ).bind(tag || null, q || null).all<PromptRow>();

      return json({
        source: 'd1',
        prompts: (rows.results ?? []).map((row) => ({
          id: row.id,
          title: row.title,
          market: row.market,
          tag: row.tag,
          prompt: row.prompt_text,
          isFree: Boolean(row.is_free),
        })),
      });
    } catch {
      // Fall through to static seed if the database has not been migrated yet.
    }
  }

  let prompts = safePromptSeed();
  if (tag) prompts = prompts.filter((prompt) => prompt.tag.toLowerCase() === tag.toLowerCase());
  if (q) {
    prompts = prompts.filter((prompt) =>
      `${prompt.title} ${prompt.market} ${prompt.tag} ${prompt.prompt}`.toLowerCase().includes(q),
    );
  }

  return json({ source: 'static-seed', prompts });
}
