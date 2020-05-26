<template>
  <div class="search-header">
    <form @submit.prevent="submitEvent($event)" @keyup="handleKeyUp($event)">
      <div class="search-box">
        <div class="form-input">
          <input
            type="text"
            :placeholder="translate('searchPlaceholder')"
            class="search-box text-input"
            :class="{ 'search-box-warning': warningClass }"
            :value="value"
            @blur="$emit('clear')"
            @focus="$emit('show', $event.target.value)"
            @input="$emit('input', $event.target.value)"
          />
        </div>
        <button class="search-button search">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <defs><path id="a" d="M0 0h64v64H0z" /></defs>
            <path
              class=".search-path-0"
              d="M63.22 59.45L47.83 44.07a26.907 26.907 0 006.11-17.1C53.94 12.08 41.86 0 26.97 0 12.07 0 0 12.08 0 26.97s12.07 26.97 26.97 26.97c6.49 0 12.43-2.29 17.08-6.1l15.39 15.37a2.65 2.65 0 003.77 0 2.647 2.647 0 00.01-3.76zM26.97 48.57c-11.92 0-21.62-9.69-21.62-21.6s9.7-21.61 21.62-21.61c11.91 0 21.62 9.7 21.62 21.62s-9.71 21.59-21.62 21.59zm0 0"
            />
          </svg>
          <span>{{ translate("searchButton") }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import getTranslations from "./../../mixins/translate";

export default {
  data() {
    return {
      callbackTimer: null,
      searchState: null,
      warningClass: false,
    };
  },
  props: {
    value: {
      required: true,
      type: String,
    },
  },
  methods: {
    submitEvent(event) {
      clearTimeout(this.callbackTimer);
      this.$emit("submit", event.target.value);
    },

    handleKeyUp(event) {
      if (!this.checkAllowedKeyUpValues(event.keyCode)) {
        return false;
      }

      if (this.callbackTimer !== null) {
        clearTimeout(this.callbackTimer);
      }

      this.callbackTimer = setTimeout(() => {
        this.warningClass = false;
        if (event.target.value.length < 3) {
          this.$emit("clear");

          if (event.target.value.length > 0) {
            this.warningClass = true;
          }
          return false;
        }

        this.$emit("keyUpEvent", event.target.value);
      }, 500);
    },

    checkAllowedKeyUpValues(keyCode) {
      if (
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 65 && keyCode <= 91) ||
        [8, 189].includes(keyCode)
      ) {
        return true;
      }
      return false;
    },
  },
  inject: ["language"],
  mixins: [getTranslations],
};
</script>

<style lang="scss">
@import "./../../scss/style.scss";

.search-header {
  @extend %padding-horizontal-base;
  @extend %padding-horizontal-none\|tablet-landscape;

  &.flyout {
    .form-input input {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      outline: none;
    }
  }

  .search-box {
    @extend %flex;
  }

  .search-button {
    border: 1px solid $color-border-default;
    border-radius: rem(4px);
    height: 38px;
  }

  .form-input {
    @extend %margin-right-tiny;

    flex-grow: 1;

    input {
      @extend %padding-horizontal-tiny;
      @extend %padding-vertical-tiny;
      @extend %font-size-base;

      width: 100%;
      border: 1px solid $color-border-default;
      border-radius: rem(4px);
      line-height: 20px;
      outline: none;

      &.search-box-warning {
        color: $color-error;
      }
    }
  }
}
</style>
