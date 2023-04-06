# shop-minis-runtime

shop-minis-runtime is responsible for guaranteeing that the context of Minis in development matches the context provided by Shop in production.

## Dependencies

Dependencies are provided by Shop itself during production runtime, however, that's not the case when the Mini is executed in a remote setup during development. In those cases, shop-minis-runtime will be the source of truth for which dependencies are available (and which versions they have).

## React context values

React context values are also missing when the Mini is executed in development mode. shop-minis-runtime will expose provider components that mimic the production environment of Shop.
