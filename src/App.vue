<template>
  <div id="app" lang="de">
    <h1>Header + Flyout</h1>
    <search-header env="production" language="en" />

    <h1>Search Detail</h1>
    <SearchDetail env="production" language="en" />
  </div>
</template>

<script>
import SearchHeader from "./components/SearchHeader";
import SearchDetail from "./components/SearchDetail";

export default {
  components: {
    SearchHeader,
    SearchDetail,
  },
};
</script>
