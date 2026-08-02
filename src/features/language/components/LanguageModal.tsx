import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicIcon } from 'lucide-react/dynamic';
import Button from '@/components/ui/Button';
import { useLanguageStore } from '../store/useLanguageStore';

const LanguageModal = () => {
  const { i18n } = useTranslation('components');
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguageStore();

  useEffect(() => {
    if (language && i18n.resolvedLanguage !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    setIsOpen(false);
  };

  const languages = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' }
  ];

  const currentLanguageDisplay = (i18n.resolvedLanguage || language).toUpperCase();

  return (
    <div className="relative inline-block text-left">
      <Button
        size='sm'
        onClick={() => setIsOpen(!isOpen)}
        variant='none'
      >
        <DynamicIcon name='languages' size={22} />
        <span>{currentLanguageDisplay}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-background rounded-lg shadow-lg z-50 overflow-hidden">
          <ul className="flex flex-col">
            {languages.map((lang) => (
              <li key={lang.code}>
                <Button
                  variant='ghost'
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 hover:bg-primary-hover transition-colors ${
                    i18n.resolvedLanguage === lang.code
                      ? 'bg-primary-selected! rounded-none! text-primary-active font-bold'
                      : 'text-label'
                  }`}
                >
                  {lang.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageModal;
