import { useState, useEffect } from 'react';

export function usePreferredTheme() {
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light';

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const [preferredTheme, setPreferredTheme] = useState<'light' | 'dark'>(
    getInitialTheme
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (evt: MediaQueryListEvent) =>
      setPreferredTheme(evt.matches ? 'dark' : 'light');

    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, []);

  return preferredTheme;
}
