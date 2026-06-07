import { CopyButton } from '@/components/CopyButton';
import { HeroTrendEnhancer } from '@/components/HeroTrendEnhancer';
import { prompts, type Prompt } from '@/lib/content';

const quickFilters = ['Prompt Seen', 'Gemini', 'Instagram', 'Dreamina', 'Bollywood', 'Eid'];

function promptHref(prompt: Prompt) {
  return `/generate?prompt=${encodeURIComponent(prompt.prompt)}&title=${encodeURIComponent(prompt.title)}`;
}

export function HeroTrendSearch() {
  const featured = prompts[0];
  const rows = prompts.slice(1, 7);

  return (
    <div className="trend-console" data-trend-console aria-label="Search trending Prompt Seen AI photo prompts">
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
          data-trend-search
          defaultValue="Prompt Seen"
          placeholder="Try Gemini, Bollywood, Eid, Dreamina…"
        />
      </label>

      <div className="quick-filters" aria-label="Popular prompt filters">
        {quickFilters.map((filter) => (
          <button key={filter} type="button" data-trend-filter={filter} className={filter === 'Prompt Seen' ? 'active' : undefined}>
            {filter}
          </button>
        ))}
      </div>

      <article
        className="featured-trend-card"
        data-trend-card
        data-trend-text={`${featured.title} ${featured.market} ${featured.tag} ${featured.tool} ${featured.useCase} ${featured.prompt}`.toLowerCase()}
      >
        <a className="trend-image-link" href={promptHref(featured)} aria-label={`Open ${featured.title}`}>
          <img src={featured.image} alt={featured.imageAlt} />
        </a>
        <div>
          <span>{featured.market} · {featured.tool}</span>
          <h2><a href={promptHref(featured)}>{featured.title}</a></h2>
          <p>{featured.prompt.slice(0, 138)}…</p>
          <div className="trend-actions">
            <CopyButton text={featured.prompt} label="Copy prompt" />
            <a className="btn btn-secondary" href={promptHref(featured)}>Open prompt</a>
          </div>
        </div>
      </article>

      <div className="trend-results" aria-live="polite">
        {rows.map((prompt) => (
          <article
            key={prompt.title}
            className="trend-row"
            data-trend-card
            data-trend-text={`${prompt.title} ${prompt.market} ${prompt.tag} ${prompt.tool} ${prompt.useCase} ${prompt.prompt}`.toLowerCase()}
          >
            <a className="trend-row-main" href={promptHref(prompt)} aria-label={`Open ${prompt.title}`}>
              <img src={prompt.image} alt={prompt.imageAlt} />
              <div>
                <span>{prompt.tag} · {prompt.market} · {prompt.tool}</span>
                <strong>{prompt.title}</strong>
              </div>
            </a>
            <CopyButton text={prompt.prompt} label="Copy" />
          </article>
        ))}
      </div>
      <p className="trend-no-results" data-trend-empty hidden>
        No exact match. Try Gemini, Eid, Bollywood, Dreamina, Instagram, or Prompt Seen.
      </p>
      <HeroTrendEnhancer />
    </div>
  );
}
