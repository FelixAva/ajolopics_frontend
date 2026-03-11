import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importaciones de archivos en Inglés (EN)
import enAuth from './locales/en/auth.json';
import enComponents from './locales/en/components.json';
import enHeader from './locales/en/header.json';
import enPost from './locales/en/post.json';

// Importaciones de archivos en Español (ES)
import esAuth from './locales/es/auth.json';
import esComponents from './locales/es/components.json';
import esHeader from './locales/es/header.json';
import esPost from './locales/es/post.json';

const resources = {
  en: {
    auth: enAuth,
    components: enComponents,
    header: enHeader,
    post: enPost
  },
  es: {
    auth: esAuth,
    components: esComponents,
    header: esHeader,
    post: esPost
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'en',
    ns: ['auth', 'components', 'header', 'post'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
