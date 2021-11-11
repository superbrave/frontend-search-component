<template>
  <div class="search-detail-page" ref="searchFilters">
    <SearchBar
      v-model="searchInputValue"
      @submit="handleDetailFormSubmit"
      @keyUpEvent="handleDetailFormSubmit"
      :class="pageType"
    />
    <div v-if="searchState.wasSearched" class="search-body">
      <div class="search-filters">
        <div class="search-filters-head">
          <div class="search-filter-title">
            {{ translate("filter")
            }}<span class="mobile-only"> {{ translate("andSort") }}</span>
          </div>
          <span
            class="mobile-only"
            @click="toggleFilters"
            tabindex="0"
            @keyup.space="toggleFilters"
            ><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.467 7.878l6.025-5.893a.849.849 0 000-1.22L14.966.25a.892.892 0 00-.623-.25.883.883 0 00-.622.253L7.877 5.965 2.038.253A.883.883 0 001.416 0a.883.883 0 00-.623.253l-.53.514a.85.85 0 000 1.218L6.28 7.87.258 13.765a.849.849 0 000 1.22l.527.515c.165.16.388.25.622.25.236 0 .458-.09.623-.252l5.842-5.713 5.84 5.713a.883.883 0 00.623.252c.235 0 .457-.09.622-.252l.528-.515a.85.85 0 000-1.218L9.467 7.877z"
                fill="#2E2E2E"
              />
            </svg>
          </span>
        </div>
        <div class="search-filters-body">
          <SearchFacet
            v-show="thereAreResults"
            :checked="type"
            :facet="searchState.facets.type[0]"
            @change="handleFacetChange($event, 'type')"
          />
        </div>
        <div class="search-filters-footer mobile-only">
          <button class="search-button primary" @click="toggleFilters">
            {{ translate("filter") }}
          </button>
        </div>
      </div>
      <div class="search-main-body">
        <div class="search-meta">
          <SearchPagingInfo :search-state="searchState" />
          <div class="mobile-only search-filters-toggle">
            <button
              @click="toggleFilters"
              class="search-button outline-secondary"
            >
              <!-- prettier-ignore -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" xml:space="preserve"><path d="M109.4 103.8 76.7 71c11.6-14.8 9.1-36.2-5.7-47.8s-36.2-9.1-47.8 5.7-9.1 36.1 5.7 47.8c12.4 9.7 29.8 9.7 42.2 0l32.7 32.7c.8.8 2 .8 2.8 0l2.8-2.8c.8-.8.8-2.1 0-2.8zM50 76c-14.4 0-26-11.6-26-26s11.6-26 26-26 26 11.6 26 26-11.6 26-26 26z" /></svg>
              {{ translate("filter") }} {{ translate("andSort") }}
            </button>
          </div>
        </div>
        <div>
          <SearchResults
            v-show="thereAreResults"
            :results="searchState.results"
            :driver="this.driver"
          />
        </div>
        <div
          class="search-pagination"
          v-if="Math.min(searchState.totalPages, 100) > 1"
        >
          <SearchPagination
            v-show="thereAreResults"
            :total-pages="Math.min(searchState.totalPages, 100)"
            :click-handler="setCurrentPage"
            :currentPage="currentPage"
          />
        </div>
      </div>
    </div>
    <div class="search-no-results" v-else>
      {{ translate("searchPlaceholder") }}
    </div>
  </div>
</template>

<script>
import { SearchDriver } from "@elastic/search-ui";
import config from "./../config";
import getTranslations from "./../mixins/translate";
import SearchResults from "./elements/SearchResults";
import SearchFacet from "./elements/SearchFacet";
import SearchBar from "./elements/SearchBar";
import SearchPagingInfo from "./elements/SearchPagingInfo";

const MIN_CHARACTERS = 3;
const MIN_SCORE = 0.5;

export default {
  components: {
    SearchResults,
    SearchFacet,
    SearchBar,
    SearchPagingInfo,
  },
  props: {
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: false,
    },
    env: {
      type: String,
      default: () => "production",
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
      currentPage: 1,
      searchResults: [],
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
  beforeMount() {
    this.driver = new SearchDriver(
      config(this.env, this.language, this.country)
    );
    this.driver.setResultsPerPage(50);
  },
  mounted() {
    const { searchTerm, sortField, filters, facets } = this.driver.getState();

    // restoring UI from url query
    this.searchInputValue = searchTerm;
    this.sortBy = sortField;
    filters.forEach((filter) => {
      if (facets?.[filter.field]?.[0].type === "range") {
        this[filter.field] = filter.values.map((value) => value.name);
      } else {
        this[filter.field] = filter.values;
      }
    });

    this.driver.subscribeToStateChanges((state) => {
      if (
        this.searchInputValue.length >= MIN_CHARACTERS &&
        state.isLoading === false
      ) {
        this.searchState = this.filterResultsByScore(state);
      }
    });
  },
  methods: {
    handleDetailFormSubmit() {
      // First reset the current results
      this.type = []; // Reset filter checkboxes

      this.driver.setSearchTerm(this.searchInputValue);
    },

    filterResultsByScore(state) {
      let results = state.results.filter(
        (result) => result._meta.score > MIN_SCORE
      );

      this.searchResults = results;
      state.results = this.searchResults;
      state.totalResults = results.length;
      state.totalPages = 0;
      state.facets = this.recalculateFilterCount(state);

      return state;
    },

    recalculateFilterCount(state) {
      Object.keys(state.facets).forEach((filterKey) => {
        state.facets[filterKey][0]["data"].map((facet) => {
          facet.count = this.searchResults.filter(
            (result) => result.type.raw === facet.value
          ).length;

          if (facet.count === 0) {
            const key = state.facets[filterKey][0]["data"].indexOf(facet);
            state.facets[filterKey][0]["data"][key]["hidden"] = true;
          }
        });
      });

      return state.facets;
    },

    handleFacetChange(event, facet) {
      const { value, checked } = event.target;

      if (checked) {
        this[facet].push(value);
      } else {
        const index = this[facet].indexOf(value);
        if (index > -1) {
          this[facet].splice(index, 1);
        }
      }
      this.filterResults(facet);
    },

    /**
     * Dynamically filter the results based on the origin response
     */
    filterResults(facet) {
      if (this[facet].length < 1) {
        this.searchState.results = this.searchResults;
        this.searchState.totalResults = this.searchResults.length;

        return;
      }

      const activeFilters = Object.keys(this[facet]).map(
        (key) => this[facet][key]
      );
      const newResults = this.searchResults.filter(
        (result) => activeFilters.includes(result[facet].raw) === true
      );

      this.searchState.results = newResults;
      this.searchState.totalResults = newResults.length;
    },

    toggleFilters() {
      this.$refs.searchFilters.classList.toggle("show-filters");

      if (this.$refs.searchFilters.classList.contains("show-filters")) {
        document.querySelector(".search-filters-head > .mobile-only").focus();
      }
    },
  },
  mixins: [getTranslations],
  provide() {
    return {
      country: this.country,
      language: this.language,
    };
  },
};
</script>

<style lang="scss">
@import "./../scss/style.scss";

.content > .elasticsearch {
  margin-left: -1.25em;
  margin-right: -1.25em;
}

.search-no-results {
  @extend %padding-base;
}

.search-detail-page {
  .search-body {
    @extend %flex;
    @extend %padding-vertical-base;

    background-color: $color-global-light;
  }

  .search-filters {
    @extend %width-1of4\|tablet-landscape;
    @extend %margin-right-base\|tablet-landscape;
    @extend %margin-top-base\|tablet-landscape;
    @extend %padding-right-base;

    background-color: $color-global-light;
    transition: height 0.3s ease-in-out;
    height: 0;
    position: fixed;
    bottom: 58px;
    left: 0;
    right: 0;
    border-top-left-radius: 8px;
    opacity: 0;

    @include break(tablet-landscape) {
      height: auto;
      border-right: 1px solid $color-border-default;
      position: static;
      padding-bottom: 0;
      border-radius: 0;
      opacity: 1;
    }
  }

  .search-filters-head {
    @extend %flex;
    @extend %margin-bottom-tiny;

    align-items: center;
    border-bottom: 1px solid $color-border-default;

    @include break(tablet-landscape) {
      border-bottom: none;
    }
  }

  .search-filters-body {
    .search-sort-by {
      @extend %padding-bottom-base;
      @extend %margin-bottom-tiny;
      @extend %block;

      border-bottom: 1px solid $color-border-default;

      .sort-label {
        @extend %margin-bottom-tiny;
      }

      select {
        width: 100%;
      }
    }
  }

  .search-filters-footer {
    @extend %margin-top-base;
    @extend %padding-bottom-base;

    button {
      @extend %padding-vertical-small;

      width: 100%;
      font-size: rem($base-font-size);
    }
  }

  .search-filter-title {
    flex-grow: 1;
    color: $color-font-base;
    margin: 0;
  }

  .search-main-body {
    @extend %width-3of4\|tablet-landscape;
  }

  .search-meta {
    @extend %flex\|tablet-landscape;
    @extend %padding-vertical-small;
    @extend %padding-horizontal-base;

    align-items: center;
    justify-content: space-between;
  }

  .search-filters-toggle {
    text-align: right;
  }

  .search-pagination {
    text-align: center;
  }

  .results-flyout {
    background: $color-global-light;
    border: 1px solid $color-border-default;
    border-top: none;
    max-height: 70vh;
    width: calc(100% - 108px);
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  }

  .mobile-only {
    @extend %none\|tablet-landscape;
  }
  .desktop-only {
    @extend %none;
    @extend %block\|tablet-landscape;
  }

  em {
    font-style: normal;
    font-weight: 700;
  }

  &.show-filters {
    position: relative;
    z-index: 1;

    &:before {
      @extend %block;
      @extend %none\|tablet-landscape;

      content: "";
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.35);
    }

    .search-filters {
      @extend %block;
      @extend %padding-horizontal-base;
      @extend %padding-top-base;

      opacity: 1;
      background-color: $color-global-light;
      height: 70vh;
      overflow-y: scroll;
      transition: height 0.3s ease-in-out;
    }
  }
  .search-button.outline-secondary {
    background-color: transparent;
    border-color: $color-border-default;
    color: $color-button-secondary;
    line-height: 1.3;

    &:hover {
      border-color: $color-button-secondary-hover;
      color: $color-button-secondary-hover;
    }

    &:active,
    &:focus {
      outline: none;
      box-shadow: 0 0 5px rgba($color-button-secondary, 0.75);
    }

    svg {
      fill: $color-button-secondary;
    }
  }
}
</style>
