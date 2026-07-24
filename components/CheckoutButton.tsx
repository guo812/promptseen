'use client';

import { useState } from 'react';

export function CheckoutButton({ plan, children, className = 'btn btn-primary' }: { plan: string; children: React.ReactNode; className?: string }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const startCheckout = async () => {
    if (plan === 'free') {
      window.location.href = `/app/sign-in?plan=free&next=${encodeURIComponent('/generate')}`;
      return;
    }
    setLoading(true);
    setMessage('Opening secure checkout…');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (res.status === 401 && data.signInUrl) {
        window.location.href = data.signInUrl;
        return;
      }
      if (!res.ok || !data.ok || !data.checkoutUrl) throw new Error(data.error || 'CHECKOUT_SETUP_REQUIRED');
      window.location.href = data.checkoutUrl;
    } catch (error) {
      const code = error instanceof Error ? error.message : 'checkout_failed';
      setMessage(`Checkout is not ready yet: ${code}.`);
      setLoading(false);
    }
  };

  return (
    <div className="checkout-action">
      <button className={className} type="button" onClick={startCheckout} disabled={loading}>
        {loading ? 'Opening…' : children}
      </button>
      {message ? <p className="notice checkout-message">{message}</p> : null}
    </div>
  );
}
