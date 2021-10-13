<template>
  <a
    href="#"
    class="search-result"
    :class="{ 'out-of-stock': outOfStock }"
    @click="followLink"
    :aria-label="result.title.raw || ''"
  >
    <div v-if="result.image_url" class="image">
      <img :src="result.image_url.raw" alt="" />
    </div>
    <div v-else-if="result.type.raw === 'leaflet'" class="image">
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><path d="M0 0h64v64H0z" fill="transparent"/><path d="M53.84 41.47l-6.2 15.83h-35.4l6.2-15.83h35.4zm0 0" fill="#eff7ff"/><path d="M51.18 41.47l-6.2 15.83h2.66l6.2-15.83h-2.66zm0 0" fill="#3fa9f6"/><path d="M53.84 41.47H18.42L11.34 24.8h35.42l7.08 16.67zm0 0" fill="#e7eced"/><path d="M46.76 24.8H44.1l7.08 16.67h2.66L46.76 24.8zm0 0" fill="#3fa9f6"/><path d="M53.84 8.97L46.76 24.8H11.34l7.08-15.83h35.42zm0 0" fill="#eff7ff"/><path d="M51.18 8.97L44.1 24.8h2.66l7.08-15.83h-2.66zm-5.12 3.33h-8.94c-.46 0-.56.13-.84.84l-3.63 7.5c-.23.53-.15.84.84.84h8.94c.46 0 .6-.25.84-.84l3.63-7.5c.23-.62-.1-.84-.84-.84z" fill="#3fa9f6"/><g fill="#fff"><path d="M14 24.8l7.08-15.83h-2.66L11.34 24.8l7.08 16.67-6.2 15.83h2.66l6.2-15.83L14 24.8zm0 0"/><path d="M11.38 57.03l2.45-6.25 1.66.58-2.45 6.25-1.66-.58zm0 0"/></g><defs><path id="a" d="M10.46 8.13h44.86v50H10.46z"/></defs><clipPath id="b"><use xlink:href="#a"/></clipPath><g fill="#12608c"><path d="M13.47 55a.94.94 0 01-.77-.4c-.16-.26-.16-.57 0-.83s.45-.42.76-.42h.01c.5 0 .9.37.9.83-.01.46-.4.83-.9.83zm41.2-13.84L47.72 24.8l6.94-15.5c.12-.26.1-.55-.08-.78s-.44-.37-.74-.37H18.42a.89.89 0 00-.82.51L10.52 24.5a.91.91 0 000 .63l6.95 16.37-3.63 9.27c-.17.43.07.9.53 1.07s.97-.06 1.14-.5l3.53-9.03h33.53l-5.55 14.17h-34.8c-.5 0-.9.37-.9.83s.4.83.9.83h35.42c.37 0 .7-.22.83-.55l6.2-15.83c.06-.2.06-.4-.01-.6zm-2.13-.53h-33.5l-6.37-15h33.5l6.37 15zM19 9.8h33.5l-6.34 14.17h-33.5L19 9.8zm0 0" clip-path="url(#b)"/><path d="M43.2 28.97c0-.46-.4-.83-.9-.83h-23c-.5 0-.9.37-.9.83s.4.83.9.83h23.02c.5 0 .88-.37.88-.83zm-15.92 4.16c0-.46-.4-.83-.9-.83h-5.3c-.5 0-.9.37-.9.83s.4.83.9.83h5.3c.5.01.9-.37.9-.83zm0 0M29.05 33.13c0 .46.4.83.9.83H44.1c.5 0 .9-.37.9-.83s-.4-.83-.9-.83H29.93c-.48 0-.88.37-.88.83zm16.82 3.34H23.74c-.5 0-.9.37-.9.83s.4.83.9.83h22.13c.5 0 .9-.37.9-.83s-.4-.83-.9-.83zm2.66 10c0-.46-.4-.83-.9-.83h-11.5c-.5 0-.9.37-.9.83s.4.83.9.83h11.5c.5 0 .9-.37.9-.83zm-6.2 2.5c-.5 0-.9.37-.9.83s.4.83.9.83h3.54c.5 0 .9-.37.9-.83s-.4-.83-.9-.83h-3.54zm0 0M33.48 49.8c0 .46.4.83.9.83h4.43c.5 0 .9-.37.9-.83s-.4-.83-.9-.83h-4.43c-.5 0-.9.37-.9.83zm-1.78 3.33c0 .46.4.83.9.83h11.5c.5 0 .9-.37.9-.83s-.4-.83-.9-.83H32.6c-.5 0-.9.37-.9.83zm-14.16-32.5h11.5c.5 0 .9-.37.9-.83s-.4-.83-.9-.83h-11.5c-.5 0-.9.37-.9.83s.4.83.9.83zm1.76-3.33h3.54c.5 0 .9-.37.9-.83s-.4-.83-.9-.83H19.3c-.5 0-.9.37-.9.83s.4.83.9.83zm0 0M30.82 15.63H26.4c-.5 0-.9.37-.9.83s.4.83.9.83h4.43c.5 0 .9-.37.9-.83-.01-.45-.4-.83-.9-.83zm-9.74-1.66h11.5c.5 0 .9-.37.9-.83s-.4-.83-.9-.83h-11.5c-.5 0-.9.37-.9.83 0 .45.4.83.9.83zm0 0"/></g><path d="M29.86 44.8H23c-.35 0-.43.07-.57.6l-2.86 7.73c-.17.53-.12.84.64.84h6.86c.35 0 .46-.25.64-.84l2.8-7.5c.17-.62-.07-.84-.64-.84z" fill="#3fa9f6"/></svg>
    </div>
    <div v-else-if="result.type.raw === 'post'" class="image">
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M52.97 24.02c-3.96-2.98-9.04-4.74-14.74-4.74-12.2 0-22.2 8.53-22.2 18.96 0 1.35.16 2.57.48 3.8-4.6-3.52-7.45-8.53-7.45-14.08C9.06 17.52 19.05 9 31.26 9c10.77-.13 19.65 6.37 21.7 15.03z" fill="#c0e0fc"/><path d="M32.02 26.4a2.5 2.5 0 1 1 0 5 2.5 2.5 0 1 1 0-5h0zm8.75 2.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0h0zm-22.5 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0h0z" fill="#3fa9f6"/><path d="M56.77 29.28c0 2.98-.72 5.94-2.14 8.8a1.92 1.92 0 1 1-3.46-1.72c1.15-2.33 1.73-4.7 1.73-7.1 0-10.02-9.38-18.17-20.9-18.17s-20.9 8.15-20.9 18.17c0 4.02 1.5 7.83 4.33 11 .5.56.63 1.36.34 2.04l-2.97 7.04 8.8-3.72c.48-.2 1-.2 1.5-.01 2.8 1.14 5.8 1.72 8.9 1.72a38.9 38.9 0 0 0 1.08-.02 1.94 1.94 0 0 1 2.02 1.84c.04 1.07-.8 1.98-1.85 2.02-.42.02-.84.03-1.25.03-3.34 0-6.56-.58-9.6-1.7L9.92 54.78c-.24.1-.5.15-.75.15-.5 0-1-.2-1.37-.56-.56-.56-.72-1.4-.4-2.12l4.36-10.33c-2.96-3.7-4.52-8.05-4.52-12.64C7.23 17.13 18.34 7.24 32 7.24s24.77 9.9 24.77 22.04z" fill="#12608c"/><path d="M50.5 57.9L35.8 43.2l.18-4 16.6 16.6z" fill="#3fa9f6"/><path d="M52.53 57.08l4.18-4.18c.98-.98.98-2.58 0-3.56L43.36 36a.89.89 0 0 0-.42-.24l-8.57-2.1c-.66-.16-1.25.44-1.1 1.1l2.1 8.57c.04.16.12.3.24.42l13.35 13.35c.97 1 2.56 1 3.55.01zM35.38 35.75l5.58 1.37-4.2 4.2-1.37-5.58zm2.15 7.35l5.2-5.2L53.1 48.27l-5.2 5.2L37.53 43.1zm12.7 12.7l-1.04-1.04 5.2-5.2 1.04 1.04c.28.28.28.74 0 1.02l-4.18 4.18c-.28.28-.74.28-1.02 0z" fill="#12608c"/></svg>
    </div>
    <div v-else-if="result.type.raw === 'product'" class="image">
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path fill="#eff7ff" d="M1.49 2.24h77.22v74.49H1.49z"/><path fill="none" stroke="#ced4da" stroke-width="3.127" stroke-miterlimit="10" d="M1.61 2h77.1v76.11H1.61z"/><path d="M26.17 20.96c0 3.76-3.05 6.81-6.81 6.81-3.75 0-6.8-3.05-6.8-6.81s3.05-6.81 6.8-6.81c3.76 0 6.81 3.05 6.81 6.81zm0 0" fill="#3fa9f6"/><path fill="#ced4da" d="M1.49 61.83h75.87v14.9H1.49z"/><path d="M77.36 48.58l-1.61-1.65-19.41-16.39-16.97 17.13 8.87 8.17 6.49 5.99h22.64V48.58zm0 0" fill="#003553"/><path d="M48.23 55.84L30.5 39.5 2.98 61.83h51.74l-6.49-5.99zm0 0" fill="#12608c"/></svg>
    </div>
    <div v-else-if="result.type.raw === 'category'" class="image">
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M0 0h64v64H0z" fill="transparent"/><path d="M27.4 29.6H9.25C8 29.6 7 28.6 7 27.35V9.25C7 8 8 7 9.25 7H27.4c1.24 0 2.25 1 2.25 2.25v18.1a2.26 2.26 0 01-2.25 2.24z" fill="#12608c"/><path d="M54.75 29.6H36.6c-1.24 0-2.25-1-2.25-2.25V9.25C34.34 8 35.35 7 36.6 7h18.16C56 7 57 8 57 9.25v18.1c0 1.23-1 2.24-2.25 2.24z" fill="#3fa9f6"/><path d="M27.4 57H9.25C8 57 7 56 7 54.75v-18.1c0-1.24 1-2.25 2.25-2.25H27.4c1.24 0 2.25 1 2.25 2.25v18.1A2.26 2.26 0 0127.41 57z" fill="#c0e0fc"/><path d="M54.75 57H36.6c-1.24 0-2.25-1-2.25-2.25v-18.1c0-1.24 1-2.25 2.25-2.25h18.16c1.24 0 2.25 1 2.25 2.25v18.1A2.256 2.256 0 0154.75 57z" fill="#eff7ff" stroke="#12608c" stroke-width="2" stroke-miterlimit="10"/></svg>
    </div>
    <div v-else-if="result.type.raw === 'page'" class="image">
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><path d="M50.18 46.66h-11.1c-1.24 0-2.25-1-2.25-2.25V33.36c0-1.24 1-2.25 2.25-2.25h11.1c1.24 0 2.25 1 2.25 2.25v11.06c.01 1.23-1 2.24-2.24 2.24z" fill="#3fa9f6"/><path d="M55.6 24.3H9.14a3.75 3.75 0 0 1-3.74-3.74V13.3a3.75 3.75 0 0 1 3.74-3.74H55.6a3.75 3.75 0 0 1 3.74 3.74v7.25a3.762 3.762 0 0 1-3.75 3.74z" fill="#c0e0fc"/><g fill="#12608c"><path d="M29.56 30.54H11.62a1.12 1.12 0 1 0 0 2.24h17.94a1.12 1.12 0 1 0 0-2.24zm0 7.22H11.62a1.12 1.12 0 1 0 0 2.24h17.94a1.12 1.12 0 0 0 0-2.24zm0 7.22H11.62a1.12 1.12 0 0 0 0 2.24h17.94a1.12 1.12 0 0 0 0-2.24zm25.6-36.25H8.85a4.94 4.94 0 0 0-4.94 4.94v37.3a4.94 4.94 0 0 0 4.94 4.94h46.3a4.94 4.94 0 0 0 4.94-4.94v-37.3c-.01-2.72-2.22-4.94-4.94-4.94zm-46.9 2.64h47.6c.93 0 1.7.76 1.7 1.7v9.36h-51v-9.36c0-.93.76-1.7 1.7-1.7zm47.6 41.73H8.24c-.93 0-1.7-.76-1.7-1.7V25.8h50.98v25.6a1.7 1.7 0 0 1-1.7 1.7zm0 0"/><use xlink:href="#B"/></g><use xlink:href="#B" x="7.22" fill="#3fa9f6"/><use xlink:href="#B" x="14.44" fill="#e7eced"/><path d="M51.15 47.35h-12.5c-1.23 0-2.23-1-2.23-2.24V32.65c0-1.23 1-2.24 2.23-2.24h12.5c1.23 0 2.23 1 2.23 2.24V45.1c0 1.23-1 2.24-2.23 2.24zM38.65 31.8c-.47 0-.86.4-.86.86V45.1c0 .47.4.86.86.86h12.5c.47 0 .86-.4.86-.86V32.65c0-.47-.4-.86-.86-.86h-12.5z" fill="#3fa9f6"/><defs ><path id="B" d="M13.88 16.9c0 .93-.76 1.7-1.7 1.7s-1.7-.76-1.7-1.7.76-1.7 1.7-1.7 1.7.76 1.7 1.7zm0 0"/></defs></svg>
    </div>
    <div v-else-if="result.type.raw === 'faq'" class="image">
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M0 0h64v64H0z" fill="transparent"/><path d="M52.78 29.48c0 11.3-9.24 20.54-20.54 20.54-1.6 0-3.08-.15-4.55-.6l-9.54 6.46 1.47-10.12c-4.84-3.8-7.92-9.68-7.92-16.28 0-11.3 9.24-20.54 20.54-20.54s20.54 9.23 20.54 20.53z" fill="#eff7ff"/><path d="M52.34 25.37c-3.67-3.23-8.36-5.13-13.64-5.13-11.3 0-20.54 9.24-20.54 20.54 0 1.47.15 2.8.44 4.1-4.25-3.8-6.9-9.24-6.9-15.26 0-11.3 9.24-20.54 20.54-20.54 9.97-.15 18.2 6.9 20.1 16.28z" fill="#c0e0fc"/><path d="M19.62 45.77l-.3 1.9c-.3-.88-.6-1.9-.73-2.8.43.3.73.58 1.02.88z" fill="#77c587"/><path d="M17.42 57.06c-.44-.3-.73-.88-.73-1.47l1.47-9.4c-5-4.25-7.92-10.27-7.92-16.87a21.98 21.98 0 0122.01-22 21.98 21.98 0 0122.01 22.01 21.98 21.98 0 01-22.01 22.01c-1.47 0-2.93-.15-4.25-.44l-8.95 6.02c-.6.44-1.2.58-1.63.14zM32.24 10.4c-10.56 0-19.07 8.5-19.07 19.07 0 5.87 2.64 11.44 7.34 15.1.44.3.6.88.6 1.32l-1.03 6.9 6.75-4.55c.3-.3.73-.3 1.17-.15 1.47.3 2.8.44 4.25.44 10.56 0 19.07-8.5 19.07-19.07S42.8 10.4 32.24 10.4z" fill="#12608c"/><path d="M32.24 37.4c-.88 0-1.47-.6-1.47-1.47V31.1c0-.88.6-1.47 1.47-1.47 2.05 0 3.67-1.6 3.67-3.67s-1.6-3.67-3.67-3.67-3.67 1.6-3.67 3.67c0 .88-.6 1.47-1.47 1.47s-1.47-.6-1.47-1.47c0-3.67 2.93-6.6 6.6-6.6s6.6 2.93 6.6 6.6c0 3.08-2.2 5.72-5.13 6.46v3.52c0 .74-.58 1.47-1.46 1.47zm-1.04 3.82c-.6-.6-.6-1.6 0-2.05.6-.6 1.47-.6 2.05 0s.6 1.47 0 2.05c-.58.73-1.46.58-2.05 0z" fill="#3fa9f6"/></svg>
    </div>
    <div v-else class="image-placeholder">
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path fill="#eff7ff" d="M1.49 2.24h77.22v74.49H1.49z"/><path fill="none" stroke="#ced4da" stroke-width="3.127" stroke-miterlimit="10" d="M1.61 2h77.1v76.11H1.61z"/><path d="M26.17 20.96c0 3.76-3.05 6.81-6.81 6.81-3.75 0-6.8-3.05-6.8-6.81s3.05-6.81 6.8-6.81c3.76 0 6.81 3.05 6.81 6.81zm0 0" fill="#3fa9f6"/><path fill="#ced4da" d="M1.49 61.83h75.87v14.9H1.49z"/><path d="M77.36 48.58l-1.61-1.65-19.41-16.39-16.97 17.13 8.87 8.17 6.49 5.99h22.64V48.58zm0 0" fill="#003553"/><path d="M48.23 55.84L30.5 39.5 2.98 61.83h51.74l-6.49-5.99zm0 0" fill="#12608c"/></svg>
    </div>
    <div class="search-result-body">
      <div class="search-result-heading">
        <h3 class="search-result-title">
          <template v-if="result.title">{{ result.title.raw }}</template>
          <span v-if="result.type">{{ translate(result.type.raw) }}</span>
          <span v-if="externalHost"
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
              <path
                d="M8.33 55.82h41.24v-2l.17-14.43c.1-2.66 1.76-3.98 4.2-3.85 1.95.1 3.44 1.83 3.53 4.17l.01 4.2-.02 12.52c-.06 4.42-3 7.33-7.4 7.33H7.78c-4.35-.01-7.33-3-7.34-7.4V14.1c.01-4.3 2.9-7.28 7.23-7.33l16.74-.01c2.57.02 4.26 1.63 4.26 3.92 0 2.28-1.7 3.92-4.25 3.95l-16.1.01v41.2zM56.4 13.48l-1.56 1.47-20 20c-1.1 1.1-2.25 1.74-3.9 1.45-2.97-.52-4.32-3.78-2.48-6.18.33-.43.73-.8 1.12-1.18l21.2-21.2-6.62-.05c-1.57 0-3.14.05-4.7-.02-2.32-.1-3.9-1.77-3.9-3.96.01-2.18 1.63-3.85 3.96-3.86l18.04.02C61.3.05 64.17 3 64.22 6.8l.01 17.88c-.02 2.34-1.66 3.95-3.84 4-2.23.03-3.95-1.64-4-4.03l-.01-11.16z"
              /></svg
          ></span>
        </h3>
        <span
          v-if="result.price"
          v-html="result.price.raw"
          class="search-result-price"
        ></span>
      </div>
      <div
        v-if="result.content && result.content.snippet"
        class="search-description"
        v-html="result.content.snippet"
      ></div>
      <span
        v-if="outOfStock"
        class="search-result-out-of-stock secondary small"
        >{{ translate("outOfStock") }}</span
      >
    </div>
  </a>
</template>

<script>
import getTranslations from "./../../mixins/translate";

export default {
  props: {
    result: {
      type: Object,
      required: true,
    },
    driver: {
      type: Object,
      required: true,
    },
  },
  computed: {
    externalHost() {
      return !!this.result.url.raw.match('((http(s?))://)')
    },
    outOfStock() {
      return this.result?.inStock?.raw === "false";
    },
  },
  methods: {
    followLink(event) {
      event.preventDefault();

      this.driver.trackClickThrough(this.result.id.raw);

      if (this.result.url.raw) {
        if (this.externalHost) {
          window.open(this.result.url.raw, "_blank");
          return false;
        }

        window.location.href = this.result.url.raw;
      }
    },
  },
  mixins: [getTranslations],
  inject: ["language"],
};
</script>

<style lang="scss" scoped>
@import "./../../scss/style.scss";

.search-result {
  @extend %padding-base;
  @extend %flex;

  border-bottom: 1px solid $color-border-default;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: $color-highlight;
    border-color: $color-support-secondary;
  }

  .image-placeholder,
  .image {
    @extend %padding-right-small;

    flex: 0 0 calc(80px + 0.75rem);

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
    flex: 1 1 100%;
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
      color: $color-primary;

      span {
        @extend %padding-left-tiny;

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
    color: $color-global-dark;
    font-size: 15px;
    height: 52px; // fallback for IE
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
