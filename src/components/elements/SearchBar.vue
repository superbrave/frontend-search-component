<template>
  <div class="search-header">
    <form @submit.prevent="submitEvent($event)" @keyup="handleKeyUp($event)">
      <div class="search-box">
        <div class="form-input">
          <input
            type="text"
            :placeholder="translate('searchPlaceholder')"
            :aria-label="translate('searchButton')"
            class="search-box text-input"
            :class="{ 'search-box-warning': warningClass }"
            :value="value"
            @focus="$emit('show', $event.target.value)"
            @input="$emit('input', $event.target.value)"
          />
        </div>
        <button class="search-button search">
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" xml:space="preserve"><path d="M109.4 103.8 76.7 71c11.6-14.8 9.1-36.2-5.7-47.8s-36.2-9.1-47.8 5.7-9.1 36.1 5.7 47.8c12.4 9.7 29.8 9.7 42.2 0l32.7 32.7c.8.8 2 .8 2.8 0l2.8-2.8c.8-.8.8-2.1 0-2.8zM50 76c-14.4 0-26-11.6-26-26s11.6-26 26-26 26 11.6 26 26-11.6 26-26 26z" /></svg>
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
        [8, 189, 229].includes(keyCode)
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
