import Link from 'next/link';
import { CopyButton } from '@/components/CopyButton';
import type { Prompt } from '@/lib/content';

export function PromptCard({ prompt, compact = false }: { prompt: Prompt; compact?: boolean }) {
  return (
    <article className="prompt-card card">
      <div className="prompt-art" aria-hidden="true">
        <span>{prompt.tag}</span>
      </div>
      <div className="prompt-meta">
        <span className="chip lime">{prompt.market}</span>
        <span className="chip blue">{prompt.tool}</span>
      </div>
      <h3>{prompt.title}</h3>
      <p>{prompt.useCase}</p>
      <pre className="snippet">{compact ? `${prompt.prompt.slice(0, 145)}…` : prompt.prompt}</pre>
      <div className="card-actions">
        <CopyButton text={prompt.prompt} label="Copy prompt" />
        <Link className="btn btn-lime" href="/generate">Generate</Link>
      </div>
    </article>
  );
}
