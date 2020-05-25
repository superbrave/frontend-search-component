<template>
  <div v-show="facet.data.length" class="search-facets">
    <h5 class="facets-title">
      {{ translate(facet.field) }}
    </h5>
    <div
      class="facet"
      v-for="facetItem in facet.data"
      :key="getValue(facetItem, facet.type)"
    >
      <input
        class="e-form__checkbox"
        type="checkbox"
        :id="getValue(facetItem, facet.type)"
        :value="getValue(facetItem, facet.type)"
        :checked="isChecked(getValue(facetItem, facet.type))"
        @change="$emit('change', $event)"
      />
      <label :for="getValue(facetItem, facet.type)" class="e-form__label">
        {{ translate(getValue(facetItem, facet.type)) }}
      </label>
      <span class="facet-count">
        {{ facetItem.count }}
      </span>
    </div>
  </div>
</template>

<script>
import getTranslations from "../mixins/translate";
export default {
  props: {
    facet: {
      type: Object,
      required: true
    },
    checked: {
      type: Array,
      required: true
    }
  },
  methods: {
    isChecked(value) {
      return this.checked && this.checked.includes(value);
    },
    getValue(facetItem, type) {
      return type === "range" ? facetItem.value.name : facetItem.value;
    }
  },
  mixins: [getTranslations]
};
</script>

<style lang="scss">
  .facets-title {
    @extend %margin-bottom-small;

    text-transform: uppercase;
    font-weight: normal;
    color: $color-font-base;
  }
  .search-facets .facet {
    @extend %flex;

    justify-content: space-between;
    align-items: center;
    width: 100%;

    label {
      flex-grow: 1;
      text-transform: capitalize;
    }
  }
</style>
