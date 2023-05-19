# shop-minis-runtime

shop-minis-runtime is responsible for guaranteeing that the context of Minis in development matches the context provided by Shop in production.

## Dependencies

Dependencies are provided by Shop itself during production runtime, however, that's not the case when the Mini is executed in a remote setup during development. In those cases, shop-minis-runtime will be the source of truth for which dependencies are available (and which versions they have).

## React context values

React context values are also missing when the Mini is executed in development mode. shop-minis-runtime will expose provider components that mimic the production environment of Shop.

## Metro config

To use the metro config exposed in this package you can use this example `metro.config.js` file:

```js
// metro.config.js
const { getMinisMetroConfig } = require("@shopify/shop-minis-runtime/metro-config");

module.exports = getMinisMetroConfig();
```

## Babel preset

To use the babel preset exposed in this package you can use this example `babel.config.js` file:

```js
// babel.config.js
module.exports = {
  presets: ["@shopify/shop-minis-runtime/babel-preset"],
};
```
