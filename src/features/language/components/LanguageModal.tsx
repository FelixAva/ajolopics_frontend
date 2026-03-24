import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
        title={currentLanguageDisplay}
        icon='globe'
        onClick={() => setIsOpen(!isOpen)}
        variant='none'
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <ul className="flex flex-col">
            {languages.map((lang) => (
              <li key={lang.code}>
                <Button
                  onClick={() => handleLanguageChange(lang.code)}
                  title={lang.label}
                  className={`w-full text-left px-4 py-2 hover:bg-deep-teal-100 transition-colors ${
                    i18n.resolvedLanguage === lang.code
                      ? 'bg-deep-teal-300 text-deep-teal-700 font-bold'
                      : 'text-gray-700'
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageModal;
