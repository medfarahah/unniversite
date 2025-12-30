import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import { ar, en, fr } from './translations';

const resources = {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: Localization.getLocales()[0].languageCode ?? 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

// Handle RTL
export const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const isRTL = lng === 'ar';
    if (I18nManager.isRTL !== isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
        // Note: In a real app, you might need to restart the app for RTL to take full effect
        // but for demo purposes, we'll suggest a reload or handle layout carefully.
    }
};

export default i18n;
