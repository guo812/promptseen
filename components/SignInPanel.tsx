'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function SignInPanel() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/generate';
  const plan = searchParams.get('plan') || 'free';
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const finish = (method: string) => {
    window.localStorage.setItem('promptseen_signed_in', 'yes');
    window.localStorage.setItem('promptseen_plan', plan);
    window.localStorage.setItem('promptseen_signin_method', method);
    if (email) window.localStorage.setItem('promptseen_email', email);
    setMessage('Signed in. Redirecting to your free generation flow…');
    window.setTimeout(() => { window.location.href = next; }, 450);
  };

  return (
    <div className="generate-shell card auth-panel">
      <div className="upload-box">
        <span>Free plan sign-in</span>
        <p>Sign in before generating. Copying prompts remains free without login. New signed-in users receive 1 free AI photo generation.</p>
        <button className="btn btn-primary" type="button" onClick={() => finish('google')}>Continue with Google</button>
      </div>
      <div className="state-list">
        <article>
          <h3>Create website account</h3>
          <p>Use email sign-in if you do not want to continue with Google.</p>
          <label className="trend-search auth-email"><span>Email</span><input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" type="email" /></label>
          <button className="btn btn-secondary" type="button" onClick={() => finish('email')} disabled={!email.includes('@')}>Register / sign in</button>
        </article>
        <article><h3>Free entitlement</h3><p>Plan: Free · 1 free generation after login · prompt copying stays free.</p></article>
        <article><h3>After the free generation</h3><p>The next Generate action opens pricing so the user can buy credits.</p><Link className="btn btn-secondary" href="/pricing">View plans</Link></article>
      </div>
      {message ? <p className="notice">{message}</p> : null}
    </div>
  );
}
