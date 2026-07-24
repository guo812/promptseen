'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MouseEvent, useState } from 'react';

const oauthErrors: Record<string, string> = {
  oauth_not_configured: 'Google sign-in is not available yet. Please try again later.',
  oauth_state: 'Your Google sign-in session expired or was interrupted. Please start again.',
  google_token: 'Google authorization could not be completed. Please try again.',
  google_user: 'Google did not return a usable account. Please choose a different account or try again.',
};

export function SignInPanel() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/generate';
  const plan = searchParams.get('plan') || 'free';
  const error = searchParams.get('error');
  const [connecting, setConnecting] = useState(false);

  const beginGoogleSignIn = (event: MouseEvent<HTMLAnchorElement>) => {
    if (connecting) {
      event.preventDefault();
      return;
    }
    setConnecting(true);
  };

  return (
    <div className="generate-shell card auth-panel">
      <div className="upload-box">
        <span>Google or email account sign-in</span>
        <p>Sign in with Google to create your secure PromptSeen account. Copying prompts stays free without login; signed-in users receive 1 free AI photo generation.</p>
        {error && oauthErrors[error] ? <p className="notice" role="alert" aria-live="assertive">{oauthErrors[error]}</p> : null}
        <a className="btn btn-primary google-signin" aria-busy={connecting} onClick={beginGoogleSignIn} href={`/api/auth/google/start?plan=${encodeURIComponent(plan)}&next=${encodeURIComponent(next)}`}>{connecting ? 'Connecting to Google…' : 'Continue with Google'}</a>
      </div>
      <div className="state-list">
        <article><h3>Free entitlement</h3><p>Plan: Free · 1 free generation after Google sign-in · unlimited prompt copying stays free.</p></article>
        <article><h3>After the free generation</h3><p>The next Generate action opens pricing so the user can buy credits.</p><Link className="btn btn-secondary" href="/pricing">View plans</Link></article>
        <article><h3>Google sign-in</h3><p>Google OAuth is the production login path. If authorization cannot finish, you will see a clear retry message without exposing account details or secrets.</p></article>
      </div>
    </div>
  );
}
