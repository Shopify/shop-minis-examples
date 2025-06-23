/* eslint-disable no-undef */
import { useState } from 'react'
import {
  Button,
  ProductLink,
  useSavedProductsActions,
  Product,
} from '@shopify/shop-minis-react'
import { useFirstPopularProduct } from '../../utils/productUtils'

export function SavedProductsActions() {
  const { saveProduct, unsaveProduct } = useSavedProductsActions()
  const [savedProducts, setSavedProducts] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const { product: mainProduct } = useFirstPopularProduct()

  const handleSave = async (product: Product) => {
    setLoading(true)
    try {
      await saveProduct({
        shopId: product.shop.id,
        productId: product.id,
        productVariantId: product.defaultVariantId,
      })
      setSavedProducts(prev => [...prev, product.id])
    } catch (error) {
      console.error('Error saving product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUnsave = async (product: Product) => {
    setLoading(true)
    try {
      await unsaveProduct({
        shopId: product.shop.id,
        productId: product.id,
        productVariantId: product.defaultVariantId,
      })
      setSavedProducts(prev => prev.filter(id => id !== product.id))
    } catch (error) {
      console.error('Error unsaving product:', error)
    } finally {
      setLoading(false)
    }
  }

  const isSaved = mainProduct ? savedProducts.includes(mainProduct.id) : false

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Save/Unsave Products</h3>
      {mainProduct ? (
        <>
          <ProductLink product={mainProduct} />

          <div className="flex gap-2 items-center">
            <Button
              onClick={() =>
                isSaved ? handleUnsave(mainProduct) : handleSave(mainProduct)
              }
              disabled={loading}
            >
              {loading
                ? 'Processing...'
                : isSaved
                  ? 'Unsave Product'
                  : 'Save Product'}
            </Button>
            <span className="text-sm text-gray-600">
              Status: {isSaved ? 'Saved ✓' : 'Not Saved'}
            </span>
          </div>
        </>
      ) : (
        <div>No popular products found</div>
      )}
    </div>
  )
}
