<template>
  <paginate
    v-model="page"
    :page-count="totalPages"
    :click-handler="clickHandler"
    :container-class="'search-pagination-paginate'"
  ></paginate>
</template>

<script>
import Paginate from "vuejs-paginate";

export default {
  components: {
    Paginate
  },
  props: {
    clickHandler: {
      type: Function,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    page() {
      return this.currentPage
    }
  }
};
</script>

<style lang="scss">
.search-pagination-paginate {
  @extend %flex;

  justify-content: center;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;

  li {
    @extend %inline-block;

    line-height: 28px;
    width: 28px;
    font-size: 16px;

    a {
      @extend %block;
      width: 100%;
      height: 100%;
      text-decoration: none;
    }

    &:hover,
    &.active {
      background-color: $color-secondary;
      border-radius: 8px;
      font-size: 18px;
      outline: none;

      a,
      span {
        color: $color-global-light;
      }
    }

    &:hover {
      background-color: $color-primary;
    }

    &:first-child,
    &:last-child {
      border: 1px solid $color-border-default;
      border-radius: 8px;
      font: 0/0 arial;
      height: 28px;
      color: $color-primary;

      &:hover {
        font: 0/0 arial;
      }
    }

    &:first-child {
      @extend %margin-right-tiny;

      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M44 63c.7.7 1.5 1 2.5 1 .9 0 1.8-.4 2.5-1l2.1-2.1c1.4-1.4 1.4-3.6 0-5L27.1 32l24-23.9c.7-.7 1-1.5 1-2.5s-.4-1.8-1-2.5L49 1c-.7-.7-1.5-1-2.5-1-.9 0-1.8.4-2.5 1L15.5 29.5c-.7.7-1 1.5-1 2.5s.4 1.8 1 2.5L44 63z" fill="%2312608c"/></svg>') center no-repeat;
      background-size: 14px 25px;

      &:hover {
        background-color: $color-primary;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M44 63c.7.7 1.5 1 2.5 1 .9 0 1.8-.4 2.5-1l2.1-2.1c1.4-1.4 1.4-3.6 0-5L27.1 32l24-23.9c.7-.7 1-1.5 1-2.5s-.4-1.8-1-2.5L49 1c-.7-.7-1.5-1-2.5-1-.9 0-1.8.4-2.5 1L15.5 29.5c-.7.7-1 1.5-1 2.5s.4 1.8 1 2.5L44 63z" fill="%23ffffff"/></svg>');
      }
    }

    &:last-child {
      @extend %margin-left-tiny;

      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M22.6 1c-.6-.7-1.5-1-2.5-1s-1.8.4-2.5 1l-2.1 2.1c-1.4 1.4-1.4 3.6 0 4.9l23.9 24-23.9 23.9c-.7.7-1 1.5-1 2.5s.4 1.8 1 2.5l2.1 2.1c.7.7 1.5 1 2.5 1s1.8-.4 2.5-1l28.5-28.5c.7-.7 1-1.5 1-2.5 0-.9-.4-1.8-1-2.5L22.6 1z" fill="%2312608c"/></svg>') center no-repeat;
      background-size: 14px 25px;

      &:hover {
        background-color: $color-primary;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M22.6 1c-.6-.7-1.5-1-2.5-1s-1.8.4-2.5 1l-2.1 2.1c-1.4 1.4-1.4 3.6 0 4.9l23.9 24-23.9 23.9c-.7.7-1 1.5-1 2.5s.4 1.8 1 2.5l2.1 2.1c.7.7 1.5 1 2.5 1s1.8-.4 2.5-1l28.5-28.5c.7-.7 1-1.5 1-2.5 0-.9-.4-1.8-1-2.5L22.6 1z" fill="%23ffffff"/></svg>');
      }
    }

    &.disabled {
      cursor: not-allowed;

      a,
      span {
        cursor: not-allowed;
      }
    }
  }
}

</style>
