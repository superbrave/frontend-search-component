<template>
  <div id="app">
    <search-header />
    <search-detail />
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
