<template>
  <article class="search-result" :class="{'out-of-stock': outOfStock}" @click="followLink">
    <div v-if="result.image_url" class="image">
      <img :src="result.image_url.raw" alt="" />
    </div>
    <div v-else-if="result.type.raw === 'leaflet'" class="image">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><path d="M0 0h64v64H0z" fill="transparent"/><path d="M53.84 41.47l-6.2 15.83h-35.4l6.2-15.83h35.4zm0 0" fill="#eff7ff"/><path d="M51.18 41.47l-6.2 15.83h2.66l6.2-15.83h-2.66zm0 0" fill="#3fa9f6"/><path d="M53.84 41.47H18.42L11.34 24.8h35.42l7.08 16.67zm0 0" fill="#e7eced"/><path d="M46.76 24.8H44.1l7.08 16.67h2.66L46.76 24.8zm0 0" fill="#3fa9f6"/><path d="M53.84 8.97L46.76 24.8H11.34l7.08-15.83h35.42zm0 0" fill="#eff7ff"/><path d="M51.18 8.97L44.1 24.8h2.66l7.08-15.83h-2.66zm-5.12 3.33h-8.94c-.46 0-.56.13-.84.84l-3.63 7.5c-.23.53-.15.84.84.84h8.94c.46 0 .6-.25.84-.84l3.63-7.5c.23-.62-.1-.84-.84-.84z" fill="#3fa9f6"/><g fill="#fff"><path d="M14 24.8l7.08-15.83h-2.66L11.34 24.8l7.08 16.67-6.2 15.83h2.66l6.2-15.83L14 24.8zm0 0"/><path d="M11.38 57.03l2.45-6.25 1.66.58-2.45 6.25-1.66-.58zm0 0"/></g><defs><path id="A" d="M10.46 8.13h44.86v50H10.46z"/></defs><clipPath id="B"><use xlink:href="#A"/></clipPath><g fill="#12608c"><path d="M13.47 55a.94.94 0 0 1-.77-.4c-.16-.26-.16-.57 0-.83s.45-.42.76-.42h.01c.5 0 .9.37.9.83-.01.46-.4.83-.9.83h0zm41.2-13.84L47.72 24.8l6.94-15.5c.12-.26.1-.55-.08-.78s-.44-.37-.74-.37H18.42a.89.89 0 0 0-.82.51L10.52 24.5a.91.91 0 0 0 0 .63l6.95 16.37-3.63 9.27c-.17.43.07.9.53 1.07s.97-.06 1.14-.5l3.53-9.03h33.53l-5.55 14.17h-34.8c-.5 0-.9.37-.9.83s.4.83.9.83h35.42c.37 0 .7-.22.83-.55l6.2-15.83c.06-.2.06-.4-.01-.6h0zm-2.13-.53h-33.5l-6.37-15h33.5l6.37 15zM19 9.8h33.5l-6.34 14.17h-33.5L19 9.8zm0 0" clip-path="url(#B)"/><path d="M43.2 28.97c0-.46-.4-.83-.9-.83h-23c-.5 0-.9.37-.9.83s.4.83.9.83h23.02c.5 0 .88-.37.88-.83h0zm-15.92 4.16c0-.46-.4-.83-.9-.83h-5.3c-.5 0-.9.37-.9.83s.4.83.9.83h5.3c.5.01.9-.37.9-.83h0zm0 0"/><path d="M29.05 33.13c0 .46.4.83.9.83H44.1c.5 0 .9-.37.9-.83s-.4-.83-.9-.83H29.93c-.48 0-.88.37-.88.83h0zm16.82 3.34H23.74c-.5 0-.9.37-.9.83s.4.83.9.83h22.13c.5 0 .9-.37.9-.83s-.4-.83-.9-.83h0zm2.66 10c0-.46-.4-.83-.9-.83h-11.5c-.5 0-.9.37-.9.83s.4.83.9.83h11.5c.5 0 .9-.37.9-.83h0zm-6.2 2.5c-.5 0-.9.37-.9.83s.4.83.9.83h3.54c.5 0 .9-.37.9-.83s-.4-.83-.9-.83h-3.54zm0 0"/><path d="M33.48 49.8c0 .46.4.83.9.83h4.43c.5 0 .9-.37.9-.83s-.4-.83-.9-.83h-4.43c-.5 0-.9.37-.9.83h0zm-1.78 3.33c0 .46.4.83.9.83h11.5c.5 0 .9-.37.9-.83s-.4-.83-.9-.83H32.6c-.5 0-.9.37-.9.83h0zm-14.16-32.5h11.5c.5 0 .9-.37.9-.83s-.4-.83-.9-.83h-11.5c-.5 0-.9.37-.9.83s.4.83.9.83h0zm1.76-3.33h3.54c.5 0 .9-.37.9-.83s-.4-.83-.9-.83H19.3c-.5 0-.9.37-.9.83s.4.83.9.83h0zm0 0"/><path d="M30.82 15.63H26.4c-.5 0-.9.37-.9.83s.4.83.9.83h4.43c.5 0 .9-.37.9-.83-.01-.45-.4-.83-.9-.83h0zm-9.74-1.66h11.5c.5 0 .9-.37.9-.83s-.4-.83-.9-.83h-11.5c-.5 0-.9.37-.9.83 0 .45.4.83.9.83h0zm0 0"/></g><path d="M29.86 44.8H23c-.35 0-.43.07-.57.6l-2.86 7.73c-.17.53-.12.84.64.84h6.86c.35 0 .46-.25.64-.84l2.8-7.5c.17-.62-.07-.84-.64-.84z" fill="#3fa9f6"/></svg>    </div>
    <div v-else-if="result.type.raw === 'product'" class="image">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M0 0h64v64H0z" fill="transparent"/><ellipse cx="40.22" cy="39.16" rx="16.78" ry="16.55" fill="#12608c"/><path d="M44.3 52.72c7.2-2.04 11.52-9.2 10.07-16.33l-27.4 7.76c2.6 6.8 10.1 10.62 17.32 8.57zM36.4 25.6c-7.2 2.04-11.52 9.2-10.07 16.33l27.4-7.76c-2.6-6.8-10.1-10.62-17.32-8.57z" fill="#c0e0fc"/><g fill="#eff7ff"><path d="M53.72 34.16l-27.4 7.76.27 1.14c.1.38.24.74.38 1.1l27.4-7.76-.27-1.13-.38-1.1z"/><path d="M33.17 15.5c2.92 1.3 4.73 3.85 4.9 6.64.01 1.58-.5 2.9-1.3 4.23L30.3 37.4c-5.02-4.94-11.4-7.08-16.24-8.02l5.8-11.42c2.45-4.03 8.9-4.6 13.33-2.45h0z" fill-rule="evenodd"/></g><path d="M24.12 48.5l6.33-11.4-.1-.2-2.17-3.22L27 32.5c-4.05-3.7-9.3-4.58-11.86-4.78h-.3L8.1 39.8c-.8 1.37-1.2 3.02-1.1 4.68.1 3.12 1.88 5.95 4.74 7.5 4.36 2.34 9.9.8 12.37-3.5h0z" fill-rule="evenodd" fill="#12608c"/><path d="M16.13 25.25l1.67.3c4.05.58 9.5 2.34 12.95 7.4l1.1 1.82 7.32-12.55c.9-1.56 1.3-3.22 1.2-4.97-.1-3.32-1.98-6.24-4.95-7.8-4.55-2.54-10.38-.88-12.85 3.7l-6.42 12.07z" fill-rule="evenodd" fill="#3fa9f6"/><path d="M34.33 11.7c2.24 1.15 3.62 3.36 3.73 5.77 0 1.36-.2 2.63-.85 3.78L32 30.58c-3.83-4.3-8.73-6.2-12.45-7.03l5.1-9.14c1.9-3.46 6.28-4.6 9.68-2.72h0z" fill-rule="evenodd" fill="#eff7ff"/></svg>
    </div>
    <div v-else-if="result.type.raw === 'category'" class="image">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M0 0h64v64H0z" fill="transparent"/><path d="M27.4 29.6H9.25C8 29.6 7 28.6 7 27.35V9.25C7 8 8 7 9.25 7H27.4c1.24 0 2.25 1 2.25 2.25v18.1a2.26 2.26 0 0 1-2.25 2.24z" fill="#12608c"/><path d="M54.75 29.6H36.6c-1.24 0-2.25-1-2.25-2.25V9.25C34.34 8 35.35 7 36.6 7h18.16C56 7 57 8 57 9.25v18.1c0 1.23-1 2.24-2.25 2.24z" fill="#3fa9f6"/><path d="M27.4 57H9.25C8 57 7 56 7 54.75v-18.1c0-1.24 1-2.25 2.25-2.25H27.4c1.24 0 2.25 1 2.25 2.25v18.1A2.26 2.26 0 0 1 27.41 57z" fill="#c0e0fc"/><path d="M54.75 57H36.6c-1.24 0-2.25-1-2.25-2.25v-18.1c0-1.24 1-2.25 2.25-2.25h18.16c1.24 0 2.25 1 2.25 2.25v18.1C57 56 56 57 54.75 57z" fill="#eff7ff" stroke="#12608c" stroke-width="2" stroke-miterlimit="10"/></svg>
    </div>
    <div v-else-if="result.type.raw === 'faq'" class="image">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M0 0h64v64H0z" fill="transparent"/><path d="M52.78 29.48c0 11.3-9.24 20.54-20.54 20.54-1.6 0-3.08-.15-4.55-.6l-9.54 6.46 1.47-10.12c-4.84-3.8-7.92-9.68-7.92-16.28 0-11.3 9.24-20.54 20.54-20.54s20.54 9.23 20.54 20.53z" fill="#eff7ff"/><path d="M52.34 25.37c-3.67-3.23-8.36-5.13-13.64-5.13-11.3 0-20.54 9.24-20.54 20.54 0 1.47.15 2.8.44 4.1-4.25-3.8-6.9-9.24-6.9-15.26 0-11.3 9.24-20.54 20.54-20.54 9.97-.15 18.2 6.9 20.1 16.28z" fill="#c0e0fc"/><path d="M19.62 45.77l-.3 1.9c-.3-.88-.6-1.9-.73-2.8.43.3.73.58 1.02.88z" fill="#77c587"/><path d="M17.42 57.06c-.44-.3-.73-.88-.73-1.47l1.47-9.4c-5-4.25-7.92-10.27-7.92-16.87A21.98 21.98 0 0 1 32.25 7.32a21.98 21.98 0 0 1 22.01 22.01 21.98 21.98 0 0 1-22.01 22.01c-1.47 0-2.93-.15-4.25-.44l-8.95 6.02c-.6.44-1.2.58-1.63.14zM32.24 10.4c-10.56 0-19.07 8.5-19.07 19.07 0 5.87 2.64 11.44 7.34 15.1.44.3.6.88.6 1.32l-1.03 6.9 6.75-4.55c.3-.3.73-.3 1.17-.15 1.47.3 2.8.44 4.25.44 10.56 0 19.07-8.5 19.07-19.07S42.8 10.4 32.24 10.4z" fill="#12608c"/><path d="M32.24 37.4c-.88 0-1.47-.6-1.47-1.47V31.1c0-.88.6-1.47 1.47-1.47 2.05 0 3.67-1.6 3.67-3.67s-1.6-3.67-3.67-3.67-3.67 1.6-3.67 3.67c0 .88-.6 1.47-1.47 1.47s-1.47-.6-1.47-1.47c0-3.67 2.93-6.6 6.6-6.6s6.6 2.93 6.6 6.6c0 3.08-2.2 5.72-5.13 6.46v3.52c0 .74-.58 1.47-1.46 1.47zm-1.04 3.82c-.6-.6-.6-1.6 0-2.05.6-.6 1.47-.6 2.05 0s.6 1.47 0 2.05c-.58.73-1.46.58-2.05 0z" fill="#3fa9f6"/></svg>
    </div>
    <div v-else class="image-placeholder">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 80 80"><path fill="#eff7ff" d="M1.49 2.24h77.22v74.49H1.49z"/><defs><path id="a" d="M0 0h80v80H0z"/></defs><path fill="none" stroke="#ced4da" stroke-width="3.127" stroke-miterlimit="10" d="M1.61 2h77.1v76.11H1.61z"/><path d="M26.17 20.96c0 3.76-3.05 6.81-6.81 6.81-3.75 0-6.8-3.05-6.8-6.81s3.05-6.81 6.8-6.81c3.76 0 6.81 3.05 6.81 6.81zm0 0" fill="#3fa9f6"/><path fill="#ced4da" d="M1.49 61.83h75.87v14.9H1.49z"/><path d="M77.36 48.58l-1.61-1.65-19.41-16.39-16.97 17.13 8.87 8.17 6.49 5.99h22.64V48.58zm0 0" fill="#003553"/><path d="M48.23 55.84L30.5 39.5 2.98 61.83h51.74l-6.49-5.99zm0 0" fill="#12608c"/></svg>
    </div>
    <div class="search-result-body">
      <div class="search-result-heading">
        <h2 class="search-result-title">
          <template v-if="result.title">{{ result.title.raw }}</template>
          <span v-if="result.type">{{ translate(result.type.raw) }}</span>
          <span v-if="externalHost"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M8.33 55.82h41.24v-2l.17-14.43c.1-2.66 1.76-3.98 4.2-3.85 1.95.1 3.44 1.83 3.53 4.17l.01 4.2-.02 12.52c-.06 4.42-3 7.33-7.4 7.33H7.78c-4.35-.01-7.33-3-7.34-7.4V14.1c.01-4.3 2.9-7.28 7.23-7.33l16.74-.01c2.57.02 4.26 1.63 4.26 3.92 0 2.28-1.7 3.92-4.25 3.95l-16.1.01v41.2zM56.4 13.48l-1.56 1.47-20 20c-1.1 1.1-2.25 1.74-3.9 1.45-2.97-.52-4.32-3.78-2.48-6.18.33-.43.73-.8 1.12-1.18l21.2-21.2-6.62-.05c-1.57 0-3.14.05-4.7-.02-2.32-.1-3.9-1.77-3.9-3.96.01-2.18 1.63-3.85 3.96-3.86l18.04.02C61.3.05 64.17 3 64.22 6.8l.01 17.88c-.02 2.34-1.66 3.95-3.84 4-2.23.03-3.95-1.64-4-4.03l-.01-11.16z"/></svg></span>
        </h2>
        <span v-if="result.price" v-html="result.price.raw" class="search-result-price"></span>
      </div>
      <div
        v-if="result.content && result.content.snippet"
        class="search-description"
        v-html="result.content.snippet"
      ></div>
      <span v-if="outOfStock" class="search-result-out-of-stock secondary small">{{ translate("outOfStock") }}</span>
    </div>
  </article>
</template>

<script>
import getTranslations from "../mixins/translate";

export default {
  props: {
    result: {
      type: Object,
      required: true
    },
    driver: {
      type: Object,
      required: true
    }
  },
  computed: {
    externalHost() {
      return !this.result.url.raw.includes(window.location.host);
    },
    outOfStock() {
      return this.result?.inStock?.raw === 'false'
    }
  },
  methods: {
    followLink() {
      this.driver.trackClickThrough(this.result.id.raw);

      if (this.result.url.raw) {
        if (this.externalHost) {
          window.open(this.result.url.raw, '_blank');
          return false;
        }

        window.location.href = this.result.url.raw;
      }
    }
  },
  mixins: [getTranslations]
};
</script>

<style lang="scss" scoped>
.search-result {
  @extend %padding-base;
  @extend %flex;

  border-bottom: 1px solid $color-border-default;
  cursor: pointer;

  &:hover {
    background-color: $color-highlight;
    border-color: $color-support-secondary;
  }

  .image-placeholder,
  .image {
    @extend %padding-right-small;

    flex: 0 0 calc(80px + .75rem);

    img {
      max-width: 80px;
      height: auto;
    }
  }

  .image-placeholder svg {
    width: 80px;
    height: auto;
  }

  .search-result-body {
    display: flex;
    justify-content: flex-start;
    align-self: flex-start;
    flex-direction: column;
    -ms-flex: 0 0 90%; // For IE
  }

  .search-result-heading {
    @extend %flex;

    justify-content: space-between;

    .search-result-title {
      @extend %width-auto;

      font-size: 15px;
      font-weight: 400;
      margin: 0;

      span {
        font-size: 12px;
        color: $color-label-font;
        text-transform: uppercase;
      }

      svg {
        fill: $color-global-halftone;
        width: 12px;
        height: 12px; //For IE
      }
    }

    .search-result-price {
      @extend %width-auto;

      color: $color-primary;
      white-space: nowrap;
      line-height: 1.4;
    }
  }

  .search-result-out-of-stock {
    align-self: baseline;
    font-size: 12px;
    text-align: center;
    line-height: 1;
    border-radius: 25px;
    box-sizing: border-box;
    text-transform: uppercase;

    &.secondary {
      background-color: #e1e3eb;
      color: $color-font-base;
    }

    &.small {
      padding: 4px 8px;
      min-width: 20px;
      position: relative;
    }
  }

  .search-result__data {
    padding-top: 50px;
  }

  .search-result__image {
    flex: none;
    width: 256px;
    height: 387px;
  }

  .search-description {
    font-size: 15px;
    height: 48px; // fallback for IE
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  img {
    max-width: 100%;
  }

  &.out-of-stock {
    .search-result-title,
    .search-result-price {
      color: $color-global-dark;
    }

    .search-description {
      color: $color-global-halftone;
    }

    .image img,
    .image-placeholder svg {
      filter: grayscale(1);
    }
  }
}
</style>
