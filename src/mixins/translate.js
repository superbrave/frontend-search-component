import translations from "./../translations/translations.json";

export default {
  methods: {
    translate(textString) {
      return (
        translations.translations?.[this.language]?.[textString] || textString
      );
    },
  },
};
