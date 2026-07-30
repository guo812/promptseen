'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/content';

type ConsentState = 'accepted' | 'rejected' | null;

const STORAGE_KEY = 'promptseen_cookie_consent';
const GA_SCRIPT_ID = 'promptseen-ga4-loader';
const GA_INIT_ID = 'promptseen-ga4-init';
const CLARITY_SCRIPT_ID = 'promptseen-clarity-loader';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function removeAnalytics() {
  if (typeof window === 'undefined') return;
  document.getElementById(GA_SCRIPT_ID)?.remove();
  document.getElementById(GA_INIT_ID)?.remove();
  document.getElementById(CLARITY_SCRIPT_ID)?.remove();
  window.dataLayer = undefined;
  window.gtag = undefined;
  window.clarity = undefined;
}

function injectAnalytics() {
  if (typeof window === 'undefined') return;

  if (site.gaId && !document.getElementById(GA_SCRIPT_ID)) {
    const gaScript = document.createElement('script');
    gaScript.id = GA_SCRIPT_ID;
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${site.gaId}`;
    document.head.appendChild(gaScript);
  }

  if (site.gaId && !document.getElementById(GA_INIT_ID)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', site.gaId, { anonymize_ip: true });

    const initMarker = document.createElement('script');
    initMarker.id = GA_INIT_ID;
    initMarker.type = 'application/json';
    initMarker.textContent = JSON.stringify({ loaded: true, provider: 'ga4', id: site.gaId });
    document.head.appendChild(initMarker);
  }

  if (site.clarityId && !document.getElementById(CLARITY_SCRIPT_ID)) {
    const clarityScript = document.createElement('script');
    clarityScript.id = CLARITY_SCRIPT_ID;
    clarityScript.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','${site.clarityId}');`;
    document.head.appendChild(clarityScript);
  }
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as ConsentState;
    setConsent(saved === 'accepted' || saved === 'rejected' ? saved : null);
    setOpen(saved !== 'accepted' && saved !== 'rejected');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (consent === 'accepted') injectAnalytics();
    if (consent === 'rejected') removeAnalytics();
  }, [consent]);

  const saveConsent = (value: Exclude<ConsentState, null>) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      {open ? (
        <section className="cookie-banner" aria-label="Cookie consent" role="dialog" aria-live="polite">
          <div>
            <strong>Cookie preferences</strong>
            <p>
              PromptSeen uses essential cookies for sign-in and product features. Analytics cookies from Google Analytics and Microsoft Clarity are optional and load only after you accept analytics.
            </p>
          </div>
          <div className="cookie-actions">
            <button className="btn btn-secondary" type="button" onClick={() => saveConsent('rejected')}>Reject analytics</button>
            <button className="btn btn-primary" type="button" onClick={() => saveConsent('accepted')}>Accept analytics</button>
          </div>
        </section>
      ) : (
        <button className="cookie-settings" type="button" onClick={() => setOpen(true)}>
          Cookie settings
        </button>
      )}
      {consent ? <span className="sr-only" data-cookie-consent={consent}>Cookie consent: {consent}</span> : null}
    </>
  );
}
