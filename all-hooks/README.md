# Shop Minis SDK Hooks Demo

A comprehensive showcase of all available hooks in the Shop Minis SDK. This mini provides interactive demonstrations of each hook, allowing developers to explore and understand their functionality.

## Overview

This mini serves as a reference application for developers building Shop Minis. It demonstrates the proper usage of every hook available in the `@shopify/shop-minis-react` SDK, organized by category for easy navigation.

## Features

- **Interactive Hook Demos**: Each hook includes a working demonstration showing its functionality
- **Categorized Navigation**: Hooks are organized into 6 categories for easy discovery:
  - **User**: Hooks for user data, preferences, and personalization
  - **Product**: Hooks for fetching and displaying product information
  - **Storage**: Hooks for persistent and secure data storage
  - **Navigation**: Hooks for navigating within the Shop app
  - **Shop**: Hooks for shop-specific functionality and cart management
  - **Utility**: Hooks for common utilities like error handling and sharing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Running the Mini

1. Navigate to the all-hooks directory:
   ```bash
   cd all-hooks
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the mini:
   ```bash
   npx shop-minis start
   ```

   This will start the development server and open the mini in the Shop Minis development environment.

## Available Hooks

The mini demonstrates the following hooks:

### User Hooks
- `useRecommendedProducts` - Fetches personalized product recommendations
- `useCurrentUser` - Gets current user data
- `useFollowedShops` - Manages followed shops
- `useOrders` - Retrieves recent Shopify orders
- `useRecentProducts` - Shows recently viewed products
- `useBuyerAttributes` - Manages buyer attributes
- `useSavedProducts` - Handles saved/favorited products
- `useRecentShops` - Shows recently visited shops
- `useRecommendedShops` - Fetches shop recommendations

### Product Hooks
- `usePopularProducts` - Fetches trending products
- `useProductSearch` - Search products with filters
- `useProducts` - Fetch products by IDs
- `useProductList` - Retrieves curated product lists
- `useProductVariants` - Manages product variants
- `useProductMedia` - Handles product images and videos

### Storage Hooks
- `useAsyncStorage` - Persistent storage operations
- `useSecureStorage` - Secure storage for sensitive data

### Navigation Hooks
- `useShopNavigation` - Navigate within the Shop app
- `useCloseMini` - Close the current mini
- `useDeeplink` - Handle deep link parameters

### Shop Hooks
- `useShopCartActions` - Cart management functions
- `useShop` - Get shop information

### Utility Hooks
- `useErrorToast` - Display error messages
- `useErrorScreen` - Handle error states
- `useShare` - Native sharing functionality
- `useImagePicker` - Camera and gallery access

## Development

### Project Structure

```
all-hooks/
├── src/
│   ├── App.tsx                    # Main application component
│   │   ├── HookDemo.tsx          # Hook demonstration wrapper
│   │   └── demos/                # Individual hook demos
│   ├── utils/
│   │   ├── hooksData.ts          # Hook metadata
│   │   └── hooksMeta.ts          # Type definitions
│   └── manifest.json             # Mini configuration
├── package.json
└── vite.config.mjs               # Vite configuration
```

### Adding New Hook Demos

1. Create a new demo component in `src/components/demos/`
2. Add the hook metadata to `src/utils/hooksData.ts`
3. The demo will automatically appear in the UI

## Learn More

- [Shop Minis React SDK](https://www.npmjs.com/package/@shopify/shop-minis-react)
- [Shop Minis Examples Repository](https://github.com/Shopify/shop-minis-examples)

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE.md) file for details.
