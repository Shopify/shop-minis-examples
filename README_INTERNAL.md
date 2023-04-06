# shop-minis-runtime

For now, this package just lists the dependencies that we share with partners and is responsible for making sure that the version we provide matches the version of that dependency used by Shop.

## Development

#### Installing dependencies

Use `yarn`, don't create or commit an npm `package-lock.json`. `yarn.lock` is the source of truth.

## Creating a new release

1. Check out and pull the latest `main` branch.
2. Run `yarn version --patch`.
3. Push both the version bump commit and the tag `git push origin main --follow-tags`
4. In [shipit](https://shipit.shopify.io/shopify/shop-minis-runtime/production), find the commit corresponding to the new release and deploy it.
5. After the deploy succeeds, the new version should be published in the [npm public registry](https://www.npmjs.com/package/@shopify/shop-minis-runtime) and ready to be used.

## TODO

- Migrate React provider components from the minis SDK to this package
- Automate synchronization of dependency versions between this package and Shop
- Nice to have: move patch-package related stuff here instead of having it in the minis templates
- Move to a monorepo with other minis related packages
