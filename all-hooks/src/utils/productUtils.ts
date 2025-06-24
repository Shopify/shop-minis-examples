import { usePopularProducts } from '@shopify/shop-minis-react'

export interface MockProduct {
  id: string
  title: string
  price: {
    amount: string
    currencyCode: string
  }
  shop: {
    id: string
    name: string
  }
  defaultVariantId?: string
}

export interface MockShop {
  id: string
  name: string
  description?: string
}

/**
 * Custom hook that provides the first product from usePopularProducts
 * as a standardized product for use throughout the app
 */
export function useFirstPopularProduct() {
  const popularProducts = usePopularProducts()
  const { products, loading, error } = popularProducts as any

  const firstProduct = products?.[0] || null

  // Extract shop from the first product
  const firstShop = firstProduct?.shop || null

  return {
    product: firstProduct,
    shop: firstShop,
    loading,
    error,
  }
}
