'use client';

import { useEffect } from 'react';

export function HeroTrendEnhancer() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-trend-console]');
    if (!root) return;

    const input = root.querySelector<HTMLInputElement>('[data-trend-search]');
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-trend-card]'));
    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-trend-filter]'));
    const empty = root.querySelector<HTMLElement>('[data-trend-empty]');

    const setActiveButton = (query: string) => {
      buttons.forEach((button) => button.classList.toggle('active', button.dataset.trendFilter?.toLowerCase() === query));
    };

    const applyFilter = (raw: string) => {
      const query = raw.trim().toLowerCase();
      let visible = 0;

      cards.forEach((card) => {
        const text = card.dataset.trendText ?? '';
        const isMatch = !query || text.includes(query) || (query === 'promptseen' && text.includes('prompt seen'));
        card.hidden = !isMatch;
        if (isMatch) visible += 1;
      });

      if (empty) empty.hidden = visible !== 0;
      setActiveButton(query);
    };

    const submitSearch = () => {
      const query = input?.value.trim();
      if (!query) return;
      window.location.href = `/prompts?q=${encodeURIComponent(query)}`;
    };

    const onInput = () => applyFilter(input?.value ?? '');
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitSearch();
      }
    };

    const buttonHandlers = buttons.map((button) => {
      const handler = () => {
        const value = button.dataset.trendFilter ?? '';
        if (input) input.value = value;
        applyFilter(value);
      };
      button.addEventListener('click', handler);
      return [button, handler] as const;
    });

    input?.addEventListener('input', onInput);
    input?.addEventListener('keydown', onKeyDown);
    applyFilter(input?.value ?? '');

    return () => {
      input?.removeEventListener('input', onInput);
      input?.removeEventListener('keydown', onKeyDown);
      buttonHandlers.forEach(([button, handler]) => button.removeEventListener('click', handler));
    };
  }, []);

  return null;
}
