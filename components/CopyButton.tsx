'use client';

import { useState } from 'react';

export function CopyButton({ text, label = 'Copy prompt' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className="btn btn-secondary"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.dispatchEvent(new CustomEvent('prompt_copy', { detail: { label } }));
        const maybeClarity = (window as unknown as { clarity?: (event: string, name: string) => void }).clarity;
        maybeClarity?.('event', 'prompt_copy');
        window.setTimeout(() => setCopied(false), 1600);
      }}
      type="button"
    >
      {copied ? 'Copied ✓' : label}
    </button>
  );
}
