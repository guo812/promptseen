'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function SignInPanel() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/generate';
  const plan = searchParams.get('plan') || 'free';
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const valid = isValidEmail(email);

  const finishEmailSignIn = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!valid) {
      setMessage('Enter a valid email address to continue.');
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    window.localStorage.setItem('promptseen_signed_in', 'yes');
    window.localStorage.setItem('promptseen_plan', plan);
    window.localStorage.setItem('promptseen_signin_method', 'email');
    window.localStorage.setItem('promptseen_email', normalizedEmail);
    document.cookie = 'promptseen_signed_in=yes; path=/; max-age=2592000; SameSite=Lax; Secure';
    document.cookie = `promptseen_plan=${encodeURIComponent(plan)}; path=/; max-age=2592000; SameSite=Lax; Secure`;
    setMessage('Email account created. Redirecting to your free generation flow…');
    window.setTimeout(() => { window.location.href = next; }, 450);
  };

  return (
    <div className="generate-shell card auth-panel">
      <div className="upload-box">
        <span>Google or email account sign-in</span>
        <p>Sign in with Google to create a secure PromptSeen account. Email fallback remains available for local review. Copying prompts stays free without login; signed-in users receive 1 free AI photo generation.</p>
        <a className="btn btn-primary google-signin" href={`/api/auth/google/start?plan=${encodeURIComponent(plan)}&next=${encodeURIComponent(next)}`}>Continue with Google</a>
        <form className="auth-form" onSubmit={finishEmailSignIn}>
          <label className="trend-search auth-email">
            <span>Email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" type="email" autoComplete="email" required />
          </label>
          <button className="btn btn-primary" type="submit" disabled={!valid}>Create account / sign in</button>
        </form>
      </div>
      <div className="state-list">
        <article><h3>Free entitlement</h3><p>Plan: Free · 1 free generation after email sign-in · unlimited prompt copying stays free.</p></article>
        <article><h3>After the free generation</h3><p>The next Generate action opens pricing so the user can buy credits.</p><Link className="btn btn-secondary" href="/pricing">View plans</Link></article>
        <article><h3>Google sign-in</h3><p>Google OAuth is the primary production login path. If OAuth secrets are missing, the Google button shows a safe setup-required error instead of exposing secrets.</p></article>
      </div>
      {message ? <p className="notice">{message}</p> : null}
    </div>
  );
}
