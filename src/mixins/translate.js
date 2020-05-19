import translations from '../translations/translations.json';

export default {
    methods: {
        translate(textString) {
            const currentLanguage = document.querySelector("html").getAttribute('lang');
            const translation = translations.translations[currentLanguage][textString];

            if (translation) {
                return translation;
            }
            return textString;
        }
    }
}
