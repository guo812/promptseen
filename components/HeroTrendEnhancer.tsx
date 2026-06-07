'use client';

import { useEffect } from 'react';

export function HeroTrendEnhancer() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-trend-console]');
    if (!root) return;
    const input = root.querySelector<HTMLInputElement>('[data-trend-search]');
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-trend-card]'));
    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-trend-filter]'));

    const applyFilter = (raw: string) => {
      const query = raw.trim().toLowerCase();
      let visible = 0;
      cards.forEach((card) => {
        const text = card.dataset.trendText ?? '';
        const isMatch = !query || text.includes(query) || (query === 'prompt seen' && text.includes('prompt seen'));
        card.hidden = !isMatch;
        if (isMatch) visible += 1;
      });
      if (visible === 0) {
        cards.forEach((card) => {
          card.hidden = false;
        });
      }
      buttons.forEach((button) => button.classList.toggle('active', button.dataset.trendFilter?.toLowerCase() === query));
    };

    const onInput = () => applyFilter(input?.value ?? '');
    input?.addEventListener('input', onInput);
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.dataset.trendFilter ?? '';
        if (input) input.value = value;
        applyFilter(value);
      });
    });

    applyFilter(input?.value ?? '');
    return () => input?.removeEventListener('input', onInput);
  }, []);

  return null;
}
