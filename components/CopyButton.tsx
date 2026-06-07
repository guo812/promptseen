'use client';

import { useState } from 'react';

async function copyText(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the textarea fallback for browsers/extensions that block Clipboard API.
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);
  return ok;
}

export function CopyButton({ text, label = 'Copy prompt' }: { text: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  return (
    <button
      className="btn btn-secondary"
      onClick={async () => {
        const ok = await copyText(text);
        setState(ok ? 'copied' : 'failed');
        window.dispatchEvent(new CustomEvent('prompt_copy', { detail: { label, ok } }));
        const maybeClarity = (window as unknown as { clarity?: (event: string, name: string) => void }).clarity;
        maybeClarity?.('event', ok ? 'prompt_copy' : 'prompt_copy_failed');
        window.setTimeout(() => setState('idle'), 1600);
      }}
      type="button"
    >
      {state === 'copied' ? 'Copied ✓' : state === 'failed' ? 'Copy failed' : label}
    </button>
  );
}
