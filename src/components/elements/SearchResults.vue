<template>
  <ul class="search-results-wrapper">
    <li
      v-for="result in results"
      :key="result.id.raw"
      class="search-section__search-result"
    >
      <SearchResult :result="result" :driver="driver" />
    </li>
  </ul>
</template>

<script>
import SearchResult from "./SearchResult";

export default {
  components: {
    SearchResult,
  },
  props: {
    results: {
      type: Array,
      required: true,
    },
    driver: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "./../../scss/style.scss";

.search-results-wrapper {
  @extend %block;
  @extend %padding-none;
  @extend %margin-none;

  border-top: 1px solid $color-border-default;

  li {
    list-style: none;
  }
}
</style>
