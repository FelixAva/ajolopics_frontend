import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importaciones de archivos en Inglés (EN)
import enAuth from '../public/locales/en/auth.json';
import enComponents from '../public/locales/en/components.json';
import enHeader from '../public/locales/en/header.json';
import enPost from '../public/locales/en/post.json';

// Importaciones de archivos en Español (ES)
import esAuth from '../public/locales/es/auth.json';
import esComponents from '../public/locales/es/components.json';
import esHeader from '../public/locales/es/header.json';
import esPost from '../public/locales/es/post.json';

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
    lng: 'en',
    fallbackLng: 'en',
    ns: ['auth', 'components', 'header', 'post'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
