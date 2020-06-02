<template>
  <div class="search-component">
    <SearchBar
      v-model="searchInputValue"
      @submit="handleFormSubmit"
      @keyUpEvent="handleFlyOutEvent"
      @clear="clearFlyOut"
      @show="showFlyOut"
      :class="pageType"
    />
    <template v-if="pageType === 'flyout'">
      <div class="results-flyout-wrapper">
        <div class="results-flyout search-scrollbar">
          <SearchPagingInfoFlyout
            :search-state="searchState"
          ></SearchPagingInfoFlyout>
          <SearchResults
            v-show="thereAreResults"
            :results="searchState.results"
            :driver="this.driver"
          />
          <div class="search-show-all" @click="handleFormSubmit">
            {{ translate("showAll") }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import getTranslations from "./../mixins/translate";
import { SearchDriver } from "@elastic/search-ui";
import config from "./../config";
import SearchResults from "./elements/SearchResults";
import SearchBar from "./elements/SearchBar.vue";
import SearchPagingInfoFlyout from "./elements/SearchPagingInfoFlyout";

const MIN_CHARACTERS = 3;
const MIN_SCORE = 0.5;

export default {
  name: "SearchHeader",
  components: {
    SearchPagingInfoFlyout,
    SearchResults,
    SearchBar,
  },
  props: {
    language: {
      type: String,
      required: true,
    },
    env: {
      type: String,
      default: () => "production",
    },
    detailUri: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      searchInputValue: "",
      searchState: {},
      race: [],
      rarity: [],
      type: [],
      set: [],
      card_class: [],
      cost: [],
      sortBy: "relevance",
      pageType: null,
      driver: {},
    };
  },
  computed: {
    thereAreResults() {
      return this.searchState.totalResults && this.searchState.totalResults > 0;
    },
  },
  watch: {
    sortBy(newSortBy) {
      this.driver.setSort(newSortBy, "asc");
    },
  },
  mounted() {
    if (window.location.search.includes("q=")) {
      this.setupSearchDriver();
    }
  },
  methods: {
    setupSearchDriver() {
      this.driver = new SearchDriver(config(this.env, this.language));
      this.driver.setResultsPerPage(10);

      const { searchTerm, sortField } = this.driver.getState();

      // restoring UI from url query
      this.searchInputValue = searchTerm;
      this.sortBy = sortField;

      this.driver.subscribeToStateChanges((state) => {
        this.searchState = this.filterResultsByScore(state);
      });
    },

    filterResultsByScore(state) {
      let results = state.results.filter(
        (result) => result._meta.score > MIN_SCORE
      );

      state.results = results.slice(0, 10);
      state.totalResults = results.length;
      state.totalPages = 0;

      return state;
    },

    handleFormSubmit() {
      window.location.href = this.detailUri + "?q=" + this.searchInputValue;
    },
    handleFlyOutEvent() {
      if (this.pageType === null) {
        this.pageType = "flyout";
      }
      this.driver.getActions().setSearchTerm(this.searchInputValue);
    },
    clearFlyOut() {
      setTimeout(() => {
        if (this.pageType === "flyout") {
          this.pageType = null;
        }
      }, 200);
    },
    showFlyOut() {
      if (Object.keys(this.driver).length === 0) {
        this.setupSearchDriver();
      }

      if (this.searchInputValue.length >= MIN_CHARACTERS) {
        this.pageType = "flyout";
      }
    },
  },
  mixins: [getTranslations],
  provide() {
    return {
      language: this.language,
    };
  },
};
</script>

<style lang="scss">
@import "./../scss/style.scss";

.search-component {
  @extend %width-3of4\|tablet-landscape;

  font-family: $font-default;

  .search-show-all {
    @extend %padding-base;
    @extend %flex;

    cursor: pointer;
    text-align: center;
    color: $color-secondary;
    font-weight: 700;
    justify-content: flex-end;

    &:hover {
      background-color: $color-highlight;
    }
  }

  .search-body {
    @extend %flex;
    @extend %padding-vertical-base;

    background-color: $color-global-light;
  }
  .search-filters {
    @extend %width-1of4;
    @extend %padding-right-base;
    @extend %margin-right-base;

    margin-top: 80px;
    border-right: 1px solid $color-border-default;
  }
  .search-main-body {
    @extend %width-3of4;
  }

  .search-pagination {
    text-align: center;
  }

  .results-flyout-wrapper {
    position: absolute;
    z-index: 200;
  }

  .results-flyout {
    background: $color-global-light;
    border: 1px solid $color-border-default;
    border-top: none;
    max-height: 70vh;
    width: calc(100% - 60px);
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  }

  em {
    font-style: normal;
    font-weight: 700;
  }
}

// Search global styles
.search-scrollbar {
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: $color-scrollbar $color-scrollbar-background;
}

.search-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.search-scrollbar::-webkit-scrollbar-track {
  background: $color-scrollbar-background;
}

.search-scrollbar::-webkit-scrollbar-thumb {
  background-color: $color-scrollbar;
}

.search-button {
  @extend %padding-vertical-tiny;
  @extend %padding-horizontal-base;
  @extend %inline-block;
  @extend %font-size-senary;

  border-radius: rem($button-border-radius / 2);
  border: 1px solid transparent;
  color: $color-global-light;
  text-decoration: none;
  vertical-align: bottom;
  white-space: nowrap;
  line-height: 1;
  appearance: none;
  height: 37px;

  &:hover {
    cursor: pointer;
  }

  svg {
    display: inline-block;
    vertical-align: bottom;
    width: 20px;
  }

  &.primary {
    background-color: $color-button-primary;
    border-color: $color-button-primary;

    &:hover {
      background-color: $color-button-primary-hover;
      border-color: $color-button-primary-hover;
    }

    &:active,
    &:focus {
      outline: none;
      box-shadow: 0 0 5px rgba($color-button-primary, 0.75);
    }

    svg {
      fill: $color-global-light;
    }
  }

  span {
    @extend %visually-hidden;
  }
}
</style>
