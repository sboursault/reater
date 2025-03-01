'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
    if (theme == 'system') {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
      const preferedTheme = darkThemeMq.matches ? 'dark' : 'light';
      setTheme(preferedTheme);
    }
  }, [setTheme, theme]);

  if (!mounted) {
    return null;
  }

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
};

export default ThemeSwitch;
