import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importaciones de archivos en Inglés (EN)
import enAuth from '../locales/en/auth.json';
import enComponents from '../locales/en/components.json';
import enHeader from '../locales/en/header.json';
import enPost from '../locales/en/post.json';
import enToast from '../locales/en/toast.json';

// Importaciones de archivos en Español (ES)
import esAuth from '../locales/es/auth.json';
import esComponents from '../locales/es/components.json';
import esHeader from '../locales/es/header.json';
import esPost from '../locales/es/post.json';
import esToast from '../locales/es/toast.json';

const resources = {
  en: {
    auth: enAuth,
    components: enComponents,
    header: enHeader,
    post: enPost,
    toast: enToast
  },
  es: {
    auth: esAuth,
    components: esComponents,
    header: esHeader,
    post: esPost,
    toast: esToast
  },
}

let initialLng = 'en'; // Fallback por si es la primera vez que el usuario entra

try {
  const storedData = localStorage.getItem('language-storage');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    // Zustand guarda el estado dentro de la propiedad 'state'
    if (parsedData?.state?.language) {
      initialLng = parsedData.state.language;
    }
  }
} catch (error) {
  console.error("Error leyendo el idioma de localStorage", error);
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLng,
    fallbackLng: 'en',
    ns: ['auth', 'components', 'header', 'post'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
