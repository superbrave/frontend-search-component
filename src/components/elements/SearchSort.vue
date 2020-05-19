<template>
  <div class="search-sort-by">
    <div class="sort-label">{{ translate('sortBy') }}</div>
    <div class="sort-select">
      <select
        name="sortBy"
        :value="value"
        @input="$emit('input', $event.target.value)"
      >
        <option value="">{{ translate('sortByRelevance') }}</option>
        <option value="title">{{ translate('sortByTitle') }}</option>
      </select>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 64 64" xml:space="preserve"><path d="M62.98 21.3c.66-.66 1.02-1.54 1.02-2.48s-.36-1.82-1.02-2.48l-2.1-2.1a3.513 3.513 0 00-4.95 0L32.01 38.17 8.07 14.22A3.472 3.472 0 005.6 13.2c-.94 0-1.82.36-2.48 1.02l-2.1 2.1C.36 16.98 0 17.86 0 18.8s.36 1.82 1.02 2.48l28.51 28.51c.66.66 1.54 1.02 2.48 1.02s1.82-.36 2.49-1.02L62.98 21.3z"/></svg>
    </div>
  </div>
</template>

<script>
import getTranslations from "../mixins/translate";
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  mixins: [getTranslations]
};
</script>

<style lang="scss">
.search-sort-by {
  @extend %flex;

  align-items: center;

  .sort-label {
    @extend %margin-right-tiny;

  }
  .sort-select {
    position: relative;

    & select {
      @extend %padding-vertical-tiny;
      @extend %padding-left-small;
      @extend %padding-right-large;

      appearance: none;
      border: 1px solid $color-border-default;
      border-radius: rem(4px);
    }

    & svg {
      position: absolute;
      right: 10px;
      top: 50%;
      display: block;
      width: 15px;
      transform: translateY(-50%);
      fill: $color-font-base;
    }
  }
}

</style>
