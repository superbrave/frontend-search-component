<template>
  <div class="search-results-number">
    <strong>{{ searchState.totalResults }}</strong>
    {{ translate("resultsCounter") }}
    <em>"{{ searchState.searchTerm }}"</em>
  </div>
</template>

<script>
import getTranslations from "../../mixins/translate";
export default {
  props: {
    searchState: {
      required: true,
      type: Object,
    },
  },
  computed: {
    start() {
      return this.searchState.totalResults === 0
        ? 0
        : (this.searchState.current - 1) * this.searchState.resultsPerPage + 1;
    },
    end() {
      return this.searchState.totalResults <= this.searchState.resultsPerPage
        ? this.searchState.totalResults
        : this.start + this.searchState.resultsPerPage - 1;
    },
  },
  mixins: [getTranslations],
  inject: ["language"],
};
</script>
