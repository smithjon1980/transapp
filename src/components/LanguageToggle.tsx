import React from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { cn } from '../utils/cn';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className={cn(
        "px-3 py-1 rounded-lg transition-colors duration-200",
        "bg-tan-100 hover:bg-tan-200 dark:bg-navy-800 dark:hover:bg-navy-700",
        "text-navy-600 dark:text-tan-100 font-medium text-sm"
      )}
      aria-label="Toggle language"
    >
      {language === 'en' ? 'ES' : 'EN'}
    </button>
  );
}