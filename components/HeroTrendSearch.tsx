'use client';

import { useMemo, useState } from 'react';
import { CopyButton } from '@/components/CopyButton';
import { prompts } from '@/lib/content';

const quickFilters = ['Prompt Seen', 'Gemini', 'Instagram', 'Dreamina', 'Bollywood', 'Eid'];

export function HeroTrendSearch() {
  const [query, setQuery] = useState('Prompt Seen');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const ranked = prompts.map((prompt) => {
      const haystack = `${prompt.title} ${prompt.market} ${prompt.tag} ${prompt.tool} ${prompt.useCase} ${prompt.prompt}`.toLowerCase();
      let score = 0;
      if (!q) score += 1;
      if (haystack.includes(q)) score += 6;
      if (prompt.tool.toLowerCase().includes(q)) score += 3;
      if (prompt.title.toLowerCase().includes(q)) score += 5;
      if (['prompt seen', 'promptseen'].includes(q)) score += prompt.prompt.toLowerCase().includes('prompt seen') ? 5 : 2;
      if (q === 'instagram') score += prompt.prompt.toLowerCase().includes('instagram') || prompt.useCase.toLowerCase().includes('reels') ? 4 : 0;
      return { prompt, score };
    });
    return ranked
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ prompt }) => prompt)
      .slice(0, 4);
  }, [query]);

  const featured = results[0] ?? prompts[0];

  return (
    <div className="trend-console" aria-label="Search trending Prompt Seen AI photo prompts">
      <div className="trend-console-top">
        <div>
          <span className="console-kicker">Live prompt search</span>
          <strong>PromptSeen trends</strong>
        </div>
        <span className="console-pill">SSR + copy-ready</span>
      </div>

      <label className="trend-search" htmlFor="hero-prompt-search">
        <span>Search</span>
        <input
          id="hero-prompt-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Gemini, Bollywood, Eid, Dreamina…"
        />
      </label>

      <div className="quick-filters" aria-label="Popular prompt filters">
        {quickFilters.map((filter) => (
          <button key={filter} type="button" onClick={() => setQuery(filter)} className={query === filter ? 'active' : ''}>
            {filter}
          </button>
        ))}
      </div>

      <article className="featured-trend-card">
        <img src={featured.image} alt={featured.imageAlt} />
        <div>
          <span>{featured.market} · {featured.tool}</span>
          <h2>{featured.title}</h2>
          <p>{featured.prompt.slice(0, 138)}…</p>
          <CopyButton text={featured.prompt} label="Copy prompt" />
        </div>
      </article>

      <div className="trend-results" aria-live="polite">
        {results.map((prompt) => (
          <article key={prompt.title} className="trend-row">
            <img src={prompt.image} alt="" aria-hidden="true" />
            <div>
              <span>{prompt.tag} · {prompt.market}</span>
              <strong>{prompt.title}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
