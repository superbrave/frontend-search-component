# SuperBrave Frontend Search Component

## Project setup

```
yarn add [path to local 'frontend-search-component']
```

## Webpack Config

```js
import Vue from "vue"; // Make sure to install Vue first
import { SbSearchHeader, SbSearchDetail } from "sb-search-dok"; // Import the components
```

Now you can create a new Vue instance and add the components

```js
// For the Search Header
new Vue({
  el: "#sbElasticHeader",
  components: {
    SearchHeader: SbSearchHeader,
  },
});

// For the Detail page
new Vue({
  el: "#sbElasticDetail-content",
  components: {
    SearchDetail: SbSearchDetail,
  },
});
```

Your HTML will look something like this

```html
<div id="sbElasticHeader">
    <search-header lang="nl" />
</div>

<div id="sbElasticDetail">
    <search-detail lang="nl />
</div>
```

# Development

### Build the CommonJS module

```
yarn module
```

### Lints and fixes files

```
yarn lint
```

### Serve the module

```
yarn serve
```
