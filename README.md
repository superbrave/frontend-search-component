# SuperBrave Frontend Search Component

## Project setup

```
yarn add @superbrave/dok-search-vue
```

## Webpack Config

```js
import Vue from "vue"; // Make sure to install Vue first
import { dokSearchHeader, dokSearchDetail } from "@superbrave/dok-search-vue"; // Import the components
```

Import the CSS. This can be done in JS or CSS

```css
import '@superbrave/dok-search-vue/dist/sbdoksearch.css'
```

Now you can create a new Vue instance and add the components

```js
// For the Search Header
new Vue({
  el: "#dokSearchHeader",
  components: {
    SearchHeader: dokSearchHeader,
  },
});

// For the Detail page
new Vue({
  el: "#dokSearchDetail",
  components: {
    SearchDetail: dokSearchDetail,
  },
});
```

Example HTML:

```html
<!-- For the Search Header -->
<div id="dokSearchHeader">
  <search-header env="dev" language="nl" />
</div>

<!-- For the Detail page -->
<div id="dokSearchDetail">
  <search-detail env="dev" language="nl" />
</div>
```

| Parameter  | Required | Default | Info                                   |
| ---------- | -------- | ------- | -------------------------------------- |
| `language` | Yes      | `''`    | ISO 639-1 language code                |
| `env`      | No       | `prod`  | Options: `dev`, `test`, `acc`, `prod`. |

\* Please note that this combination wil determine the AppSearch engine so results may vary due to the chosen `env` mode and the `language`.

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

### Run tests

Unit test will always run before pushing to git

```
yarn test:unit
```
