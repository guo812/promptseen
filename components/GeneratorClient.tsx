'use client';

import { useMemo, useState } from 'react';
import type { PromptItem } from '@/lib/content';

const providers = [
  { id: 'jimeng', label: '即梦 AI Image', cost: '10 credits', hint: 'Lower-cost standard generation when JIMENG keys are configured.' },
  { id: 'gpt-image-2', label: 'GPT Image 2', cost: '40 credits', hint: 'Premium realistic image generation through OPENAI_API_KEY.' },
  { id: 'gemini', label: 'Gemini Image', cost: '30 credits', hint: 'Fast social image edits through GEMINI_API_KEY.' },
] as const;

type Props = { prompts: PromptItem[]; initialSlug?: string };

export function GeneratorClient({ prompts, initialSlug }: Props) {
  const initial = useMemo(() => prompts.find((p) => p.slug === initialSlug) ?? prompts[0], [prompts, initialSlug]);
  const [prompt, setPrompt] = useState(initial?.prompt ?? '');
  const [provider, setProvider] = useState<(typeof providers)[number]['id']>('gpt-image-2');
  const [status, setStatus] = useState<string>('Ready. Upload is optional in this v1 UI; prompt generation can be tested after keys are configured.');
  const [resultUrl, setResultUrl] = useState<string>('');
  const [busy, setBusy] = useState(false);

  async function generate(selectedProvider = provider) {
    setBusy(true);
    setResultUrl('');
    setStatus(`Submitting ${selectedProvider} generation...`);
    try {
      const res = await fetch('/api/generations', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt, provider: selectedProvider, style: selectedProvider, userId: 'anonymous' }),
      });
      const data = await res.json() as { ok?: boolean; error?: string; message?: string; status?: string; resultUrl?: string; id?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP_${res.status}`);
      setStatus(`${data.message || data.status || 'Generation accepted'} Job: ${data.id || 'n/a'}`);
      if (data.resultUrl) setResultUrl(data.resultUrl);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="generator-shell">
      <div className="card panel generator-panel">
        <label className="field-label" htmlFor="photo-upload">Upload reference photo</label>
        <input id="photo-upload" className="upload-input" type="file" accept="image/*" disabled />
        <p className="prompt-text">Photo upload storage is intentionally disabled until R2/storage policy is confirmed. Prompt-only provider calls can still be wired and tested.</p>
        <label className="field-label" htmlFor="prompt-text">Prompt</label>
        <textarea id="prompt-text" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={10} />
        <div className="provider-grid">
          {providers.map((p) => (
            <button key={p.id} type="button" className={`provider-card ${provider === p.id ? 'active' : ''}`} onClick={() => { setProvider(p.id); void generate(p.id); }} disabled={busy}>
              <strong>{p.label}</strong>
              <span>{p.cost}</span>
              <small>{p.hint}</small>
            </button>
          ))}
        </div>
        <button className="btn btn-primary" type="button" disabled={busy || !prompt.trim()} onClick={() => generate()}>{busy ? 'Generating…' : 'Generate AI Photo'}</button>
        <p className="notice">{status}</p>
        {resultUrl ? <img className="result-image" src={resultUrl} alt="Generated AI result" /> : null}
      </div>
      <div className="card panel">
        <h2>Choose a prompt</h2>
        <div className="mini-list">
          {prompts.slice(0, 7).map((p) => <button key={p.slug} type="button" onClick={() => setPrompt(p.prompt)}><span>{p.title}</span><small>{p.gender} · {p.country}</small></button>)}
        </div>
      </div>
    </div>
  );
}
