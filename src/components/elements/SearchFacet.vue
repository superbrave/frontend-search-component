<template>
  <div v-show="facet.data.length" class="search-facets">
    <h5 class="facets-title">
      {{ translate(facet.field) }}
    </h5>
    <div
      class="facet"
      v-for="facetItem in facet.data"
      v-show="!facetItem.hidden"
      :key="getValue(facetItem, facet.type)"
    >
      <input
        class="search-facets-checkbox"
        type="checkbox"
        :id="getValue(facetItem, facet.type)"
        :value="getValue(facetItem, facet.type)"
        :checked="isChecked(getValue(facetItem, facet.type))"
        @change="$emit('change', $event)"
      />
      <label :for="getValue(facetItem, facet.type)" class="search-facets-label">
        {{ translate(getValue(facetItem, facet.type)) }}
      </label>
      <span class="facet-count">
        {{ facetItem.count }}
      </span>
    </div>
  </div>
</template>

<script>
import getTranslations from "./../../mixins/translate";
export default {
  props: {
    facet: {
      type: Object,
      required: true,
    },
    checked: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isChecked(value) {
      return this.checked && this.checked.includes(value);
    },
    getValue(facetItem, type) {
      return type === "range" ? facetItem.value.name : facetItem.value;
    },
  },
  mixins: [getTranslations],
  inject: ["language"],
};
</script>

<style lang="scss">
@import "./../../scss/style.scss";

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
  line-height: 1.8;

  label {
    flex-grow: 1;
    text-transform: capitalize;
  }

  &:hover {
    cursor: pointer;
  }
}

.search-facets-checkbox {
  display: none;
  appearance: none;

  & + .search-facets-label {
    position: relative;
    display: inline-block;
    padding-left: 48px;

    &:before {
      position: absolute;
      padding: 1px;
      content: "";
      left: 0;
      top: 4px;
      width: 20px;
      height: 20px;
      border: 1px solid grey;
      border-radius: rem(4px);
    }

    &:after {
      position: absolute;
      content: "";
      display: none;
      top: 7px;
      left: 3px;
      font-family: "";
      width: 18px;
      height: 18px;
      background-color: $color-secondary;
      mask: url("../../svg/checkmark.svg") no-repeat 0 0;
      mask-size: 18px;
    }
  }

  &:checked + .search-facets-label:before {
    border-color: $color-secondary;
  }

  &:checked + .search-facets-label:after {
    display: block;
  }
}
</style>
