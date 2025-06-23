// Hook interface and hook-related metadata for use across the app

export interface Hook {
  name: string
  description: string
  category: string
  emoji: string
}

export const categories = [
  'User',
  'Product',
  'Storage',
  'Navigation',
  'Shop',
  'Utility',
]

// Minimalist category icons (single letters)
export const categoryIcons: Record<string, string> = {
  User: 'U',
  Product: 'P',
  Storage: 'S',
  Navigation: 'N',
  Shop: 'S',
  Utility: 'U',
}
