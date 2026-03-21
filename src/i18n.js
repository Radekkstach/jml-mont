import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Tady importujeme naše slovníky
import csTranslations from './locales/cs.json';
import enTranslations from './locales/en.json';
import deTranslations from './locales/de.json';

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
    lng: 'cs', // Výchozí jazyk
    fallbackLng: 'en', // Jazyk, který se použije, pokud překlad chybí
    interpolation: {
      escapeValue: false // React už se stará o ochranu proti XSS
    }
  });

export default i18n;