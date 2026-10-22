import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Tady importujeme naše slovníky
import csTranslations from './locales/cs.json';
import enTranslations from './locales/en.json';
import deTranslations from './locales/de.json';

// Každý jazyk má vlastní adresu (/, /en/, /de/), aby ho našli vyhledávače i AI
export const LANGS = ['cs', 'en', 'de'];
export const langPath = (lng) => (lng === 'cs' ? '/' : `/${lng}/`);
const langFromPath = (path) =>
  LANGS.find((lng) => lng !== 'cs' && path.startsWith(`/${lng}`)) || 'cs';

const resources = {
  cs: {
    translation: csTranslations
  },
  en: {
    translation: enTranslations
  },
  de: {
    translation: deTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: typeof window !== 'undefined' ? langFromPath(window.location.pathname) : 'cs',
    fallbackLng: 'en', // Jazyk, který se použije, pokud překlad chybí
    showSupportNotice: false,
    interpolation: {
      escapeValue: false // React už se stará o ochranu proti XSS
    }
  });

export default i18n;