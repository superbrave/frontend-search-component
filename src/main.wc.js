/**
 * Vue CLI WebComponent mode
 *
 * For adding a script tag and using the element as html tag
 */
import Vue from "vue";
import wrap from "@vue/web-component-wrapper";
import SearchHeader from "./components/SearchHeader.vue";
import SearchDetail from "./components/SearchDetail.vue";

window.customElements.define("search-header", wrap(Vue, SearchHeader));
window.customElements.define("search-detail", wrap(Vue, SearchDetail));
