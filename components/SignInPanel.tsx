'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MouseEvent, useState } from 'react';

const oauthErrors: Record<string, string> = {
  oauth_not_configured: 'Google sign-in is temporarily unavailable, so the Free plan sign-in will be used instead.',
  oauth_state: 'Your sign-in session expired or was interrupted. Please start again.',
  google_token: 'Google authorization could not be completed. Please use the Free plan sign-in below.',
  google_user: 'Google did not return a usable account. Please use the Free plan sign-in below.',
};

export function SignInPanel() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/generate';
  const plan = searchParams.get('plan') || 'free';
  const error = searchParams.get('error');
  const [connecting, setConnecting] = useState(false);

  const beginSignIn = (event: MouseEvent<HTMLAnchorElement>) => {
    if (connecting) {
      event.preventDefault();
      return;
    }
    setConnecting(true);
  };

  return (
    <div className="generate-shell card auth-panel">
      <div className="upload-box">
        <span>One-click Free plan sign-in</span>
        <p>Click once to create your PromptSeen Free plan session, return to Generate, and see your signed-in state immediately. No extra intermediate login page is required.</p>
        {error && oauthErrors[error] ? <p className="notice" role="alert" aria-live="assertive">{oauthErrors[error]}</p> : null}
        <a className="btn btn-primary google-signin" aria-busy={connecting} onClick={beginSignIn} href={`/api/auth/free/start?plan=${encodeURIComponent(plan)}&next=${encodeURIComponent(next)}`}>{connecting ? 'Signing in…' : 'Sign in and start free generation'}</a>
      </div>
      <div className="state-list">
        <article><h3>Free entitlement</h3><p>Plan: Free · 1 free generation after sign-in · unlimited prompt copying stays free.</p></article>
        <article><h3>After sign-in</h3><p>The header and Account page show your Free plan state so users do not keep logging in repeatedly.</p><Link className="btn btn-secondary" href="/account">Open account</Link></article>
        <article><h3>Simple path</h3><p>All Sign in / Free plan / Generate CTA clicks now use the same working sign-in route.</p></article>
      </div>
    </div>
  );
}
