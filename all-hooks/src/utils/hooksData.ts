import { Hook } from './hooksMeta'

export const hooks: Hook[] = [
  // User Hooks
  {
    name: 'useRecommendedProducts',
    description: 'Fetches a list of recommended products for the user',
    category: 'User',
    emoji: '⭐',
  },
  {
    name: 'useCurrentUser',
    description: 'Fetches the current user data',
    category: 'User',
    emoji: '👤',
  },
  {
    name: 'useFollowedShops',
    description: 'Shows shops you follow',
    category: 'User',
    emoji: '👥',
  },
  {
    name: 'useOrders',
    description: 'Returns a set of recent Shopify orders for the current user',
    category: 'User',
    emoji: '📋',
  },
  {
    name: 'useRecentProducts',
    description: 'Shows recently viewed products',
    category: 'User',
    emoji: '🕐',
  },
  {
    name: 'useBuyerAttributes',
    description: 'Manages buyer attributes for the current user',
    category: 'User',
    emoji: '🏷️',
  },
  {
    name: 'useFollowedShopsActions',
    description: 'Manages following/unfollowing shops for the user',
    category: 'User',
    emoji: '👥',
  },
  {
    name: 'useSavedProductsActions',
    description: 'Allows saving and unsaving products for the current user',
    category: 'User',
    emoji: '💾',
  },
  {
    name: 'useRecentShops',
    description: 'Shows recently visited shops',
    category: 'User',
    emoji: '🕐',
  },
  {
    name: 'useSavedProducts',
    description: 'Shows saved products for the current user',
    category: 'User',
    emoji: '💖',
  },
  {
    name: 'useRecommendedShops',
    description: 'Fetches recommended shops for the user',
    category: 'User',
    emoji: '🏪',
  },

  // Product Hooks
  {
    name: 'usePopularProducts',
    description: 'Fetches popular products',
    category: 'Product',
    emoji: '🔥',
  },
  {
    name: 'useProductSearch',
    description: 'Search for products with filters',
    category: 'Product',
    emoji: '🔍',
  },
  {
    name: 'useProducts',
    description: 'Fetch products by IDs',
    category: 'Product',
    emoji: '📦',
  },
  {
    name: 'useProductList',
    description: 'Fetches a specific product list by ID',
    category: 'Product',
    emoji: '📝',
  },
  {
    name: 'useProductVariants',
    description: 'Fetches product variants and their options',
    category: 'Product',
    emoji: '🎨',
  },
  {
    name: 'useProductMedia',
    description: 'Fetches product media (images, videos, etc.)',
    category: 'Product',
    emoji: '📸',
  },

  // Storage Hooks
  {
    name: 'useAsyncStorage',
    description: 'Provides functions to interact with persistent storage',
    category: 'Storage',
    emoji: '💿',
  },
  {
    name: 'useSecureStorage',
    description: 'Provides functions to interact with secure storage',
    category: 'Storage',
    emoji: '🔐',
  },
  // {
  //   name: 'useImageUpload',
  //   description: 'Handles image upload functionality',
  //   category: 'Storage',
  //   emoji: '🖼️',
  // },

  // Navigation Hooks
  {
    name: 'useShopNavigation',
    description:
      'Provides functions to navigate to different parts of the Shop app',
    category: 'Navigation',
    emoji: '🧭',
  },
  {
    name: 'useCloseMini',
    description: 'Handles closing the current mini',
    category: 'Navigation',
    emoji: '❌',
  },
  {
    name: 'useDeeplink',
    description:
      'Returns the path, query parameters, and hash from the deep link URL that opened the Mini',
    category: 'Navigation',
    emoji: '🔗',
  },

  // Shop Hooks
  {
    name: 'useShopCartActions',
    description: 'Provides functions for managing the shopping cart',
    category: 'Shop',
    emoji: '🛒',
  },
  {
    name: 'useShop',
    description: 'Get detailed shop information',
    category: 'Shop',
    emoji: '🏬',
  },

  // Utility Hooks
  {
    name: 'useErrorToast',
    description: 'Provides functionality for showing error toasts',
    category: 'Utility',
    emoji: '🚨',
  },
  {
    name: 'useErrorScreen',
    description: 'Handles error screen display and management',
    category: 'Utility',
    emoji: '⚠️',
  },
  {
    name: 'useShare',
    description: 'Provides native sharing functionality',
    category: 'Utility',
    emoji: '📤',
  },
  {
    name: 'useImagePicker',
    description: 'Allows selecting images from camera or gallery',
    category: 'Utility',
    emoji: '📸',
  },
]
