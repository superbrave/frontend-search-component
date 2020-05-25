import translations from "./../translations/translations.json";

export default {
  methods: {
    translate(textString) {
      //   const currentLanguage = document
      //     .querySelector("#app")
      //     .getAttribute("lang");
      const currentLanguage = "de";
      const translation =
        translations.translations[currentLanguage][textString];

      if (translation) {
        return translation;
      }
      return textString;
    },
  },
};
