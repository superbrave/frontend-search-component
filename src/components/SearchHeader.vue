<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Test</p>
  </div>
</template>

<script>
export default {
  name: "SearchHeader",
  data() {
    return {
      title: "SearchHeader",
    };
  },
};
</script>

<style>
h1 {
  color: greenyellow;
}
</style>
