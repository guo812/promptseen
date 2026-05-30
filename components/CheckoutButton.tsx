'use client';

import { useState } from 'react';

export function CheckoutButton({ planId }: { planId: string }) {
  const [status, setStatus] = useState('Ready to create PayPal checkout.');
  const [busy, setBusy] = useState(false);
  async function checkout() {
    setBusy(true);
    setStatus('Creating PayPal order...');
    try {
      const res = await fetch('/api/paypal/create-order', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ planId }) });
      const data = await res.json() as { ok?: boolean; error?: string; approvalUrl?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP_${res.status}`);
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        setStatus('Order created but approval URL is missing. Check PayPal response.');
      }
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Checkout failed');
    } finally {
      setBusy(false);
    }
  }
  return <><button className="btn btn-primary" onClick={checkout} disabled={busy}>{busy ? 'Opening PayPal…' : 'Pay with PayPal'}</button><p className="notice">{status}</p></>;
}
