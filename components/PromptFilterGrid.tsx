'use client';

import { useMemo, useState } from 'react';
import { PromptCard } from '@/components/PromptCard';
import type { Prompt } from '@/lib/content';

export function PromptFilterGrid({ prompts, filters }: { prompts: Prompt[]; filters: string[] }) {
  const [active, setActive] = useState('All');
  const visible = useMemo(() => {
    const query = active.toLowerCase();
    if (query === 'all') return prompts;
    return prompts.filter((prompt) => `${prompt.title} ${prompt.market} ${prompt.tag} ${prompt.tool} ${prompt.useCase} ${prompt.prompt}`.toLowerCase().includes(query));
  }, [active, prompts]);

  return (
    <>
      <div className="filter-row" aria-label="Prompt filters">
        {filters.map((filter) => (
          <button className={`chip ${active === filter ? 'lime' : ''}`} key={filter} type="button" onClick={() => setActive(filter)} aria-pressed={active === filter}>
            {filter}
          </button>
        ))}
      </div>
      <p className="notice">Showing {visible.length} prompt{visible.length === 1 ? '' : 's'} for {active}. Copy prompts for free, or sign in before generating a personalized image.</p>
      <div className="prompts-grid page-grid">
        {visible.map((prompt) => <PromptCard key={prompt.title} prompt={prompt} />)}
      </div>
      {visible.length === 0 ? <p className="notice">No prompt matched this filter. Try All, Gemini, Festival, or Arabic.</p> : null}
    </>
  );
}
