import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../';
import { useLanguageStore } from '../../features/language/useLanguageStore';

const LanguageModal = () => {
  const { i18n } = useTranslation('components');
  const [isOpen, setIsOpen] = useState(false);

  const { language, setLanguage } = useLanguageStore();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    setIsOpen(false);
  };

  const languages = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' }
  ];

  return (
    <div className="relative inline-block text-left">
      <Button
        title={language.toUpperCase()}
        icon='globe'
        action={() => setIsOpen(!isOpen)}
        variant='none'
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <ul className="flex flex-col">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 hover:bg-deep-teal-100 transition-colors ${
                    language === lang.code
                      ? 'bg-deep-teal-300 text-deep-teal-700 font-bold' // Resalta el idioma activo
                      : 'text-gray-700'
                  }`}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageModal;
