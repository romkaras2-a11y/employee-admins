import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// JSON-Dateien direkt importieren
import translationDE from './locales/de.json';
import translationEN from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: translationDE },
      en: { translation: translationEN }
    },
    fallbackLng: "de",
    interpolation: {
      escapeValue: false // React schützt bereits nativ vor XSS
    }
  });

export default i18n;
