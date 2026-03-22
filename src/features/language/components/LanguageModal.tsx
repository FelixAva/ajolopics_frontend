import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components';
import { useLanguageStore } from '../store/useLanguageStore';

const LanguageModal = () => {
  const { i18n } = useTranslation('components');
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguageStore();

  // 1. Sincronizamos i18next con Zustand cuando el componente se monta
  // Esto arregla el problema si localStorage cargó "es" pero i18n cargó "en" por SSR o por un fallo de lectura.
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

  // 2. Usamos el idioma real de i18next para el botón, no el de Zustand.
  // Así garantizamos que lo que dice el botón ES LO MISMO que el idioma del texto.
  const currentLanguageDisplay = (i18n.resolvedLanguage || language).toUpperCase();

  return (
    <div className="relative inline-block text-left">
      <Button
        title={currentLanguageDisplay} // <-- Actualizado aquí
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
                    i18n.resolvedLanguage === lang.code // <-- Comparamos contra i18n, no contra Zustand
                      ? 'bg-deep-teal-300 text-deep-teal-700 font-bold'
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
