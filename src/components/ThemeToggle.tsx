import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 p-3.5 rounded-full bg-surface-50 border border-surface-200 text-surface-600 hover:text-primary-500 hover:border-primary-200 shadow-xl shadow-black/5 dark:shadow-black/40 transition-all duration-300 z-50 group hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
      ) : (
        <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-500" />
      )}
    </button>
  );
}
