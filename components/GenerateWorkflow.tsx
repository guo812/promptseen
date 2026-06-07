'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DEFAULT_PROMPT = 'Prompt Seen style AI photo editing prompt: create a cinematic creator portrait for Instagram, realistic face preservation, premium lighting, ready-to-post composition.';

function isSignedIn() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem('promptseen_signed_in') === 'yes';
}

function hasUsedFreeGeneration() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem('promptseen_free_generation_used') === 'yes';
}

export function GenerateWorkflow() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get('prompt') || DEFAULT_PROMPT;
  const title = searchParams.get('title') || 'Selected Prompt Seen AI photo prompt';
  const [signedIn, setSignedIn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState('');
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    if (!checked) {
      setSignedIn(isSignedIn());
      setShowPaywall(isSignedIn() && hasUsedFreeGeneration());
      setChecked(true);
    }
  }, [checked]);

  const onFile = (file?: File) => {
    if (!file) return;
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  const generate = async () => {
    if (!signedIn) {
      window.location.href = `/app/sign-in?next=${encodeURIComponent(window.location.pathname + window.location.search)}`;
      return;
    }
    if (hasUsedFreeGeneration()) {
      setShowPaywall(true);
      setStatus('Your free image generation has been used. Choose a credit pack to continue.');
      return;
    }
    if (!fileName) {
      setStatus('Upload a selfie or creator photo first.');
      return;
    }
    setStatus('Submitting your free generation job…');
    try {
      const res = await fetch('/api/generations', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt, style: title, userId: 'signed-in-free-user' }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'GENERATION_FAILED');
      window.localStorage.setItem('promptseen_free_generation_used', 'yes');
      setShowPaywall(true);
      setStatus(`Free generation submitted: ${data.id}. Your next generation requires credits.`);
    } catch (error) {
      setStatus(`Generation could not be submitted: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  };

  if (!checked) return null;

  if (!signedIn) {
    return (
      <div className="generate-shell card">
        <div className="upload-box"><span>Sign in required</span><p>Copy prompts for free without login. To generate a personalized image from your selfie, sign in first and claim one free generation.</p></div>
        <div className="state-list">
          <article><h3>Free copy</h3><p>All prompt text remains free to browse and copy.</p></article>
          <article><h3>Free generation</h3><p>New signed-in users get 1 free image generation.</p></article>
          <article><h3>Selfie upload</h3><p>Upload only a photo you have permission to process.</p></article>
        </div>
        <div className="hero-actions"><Link className="btn btn-primary" href={`/app/sign-in?next=${encodeURIComponent('/generate')}`}>Sign in to Generate</Link><Link className="btn btn-secondary" href="/pricing">View free plan</Link></div>
      </div>
    );
  }

  return (
    <div className="generate-shell card">
      <div className="upload-box">
        <span>{showPaywall ? 'Credits required' : 'Upload selfie'}</span>
        {preview ? <img src={preview} alt="Selected selfie preview" className="upload-preview" /> : <p>Upload a selfie or creator photo you have permission to process. Your first signed-in generation is free.</p>}
        <label className="btn btn-secondary upload-label">
          Choose photo
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => onFile(event.target.files?.[0])} />
        </label>
        {fileName ? <p className="notice">Selected: {fileName}</p> : null}
      </div>
      <div className="state-list">
        <article><h3>{title}</h3><textarea className="prompt-textarea" value={prompt} onChange={(event) => setPrompt(event.target.value)} aria-label="Prompt text" /></article>
        <article><h3>Free plan</h3><p>1 free generation after sign-in. After it is used, continue with paid credits.</p></article>
        {showPaywall ? <article><h3>Need more credits?</h3><p>Starter, Pro, and Creator plans unlock more generation credits.</p><Link className="btn btn-primary" href="/pricing">Buy credits</Link></article> : null}
      </div>
      <div className="hero-actions"><button className="btn btn-primary" type="button" onClick={generate}>{showPaywall ? 'Buy credits to continue' : 'Generate free image'}</button><Link className="btn btn-secondary" href="/prompts">Back to prompts</Link></div>
      {status ? <p className="notice">{status}</p> : null}
    </div>
  );
}
