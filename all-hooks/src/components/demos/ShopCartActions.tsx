/* eslint-disable no-undef */
import { useState } from 'react'
import {
  Button,
  ProductLink,
  useShopCartActions,
} from '@shopify/shop-minis-react'
import { useFirstPopularProduct } from '../../utils/productUtils'

export function ShopCartActions() {
  const { addToCart, buyProduct } = useShopCartActions()
  const [loadingAddToCart, setLoadingAddToCart] = useState(false)
  const [loadingBuyNow, setLoadingBuyNow] = useState(false)

  const { product } = useFirstPopularProduct()

  const handleAddToCart = async () => {
    setLoadingAddToCart(true)
    try {
      await addToCart({
        productId: product.id,
        productVariantId: product.defaultVariantId,
        quantity: 1,
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setLoadingAddToCart(false)
    }
  }

  const handleBuyNow = async () => {
    setLoadingBuyNow(true)
    try {
      await buyProduct({
        productId: product.id,
        productVariantId: product.defaultVariantId,
        quantity: 1,
      })
    } catch (error) {
      console.error('Error with buy now:', error)
    } finally {
      setLoadingBuyNow(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Shop Cart Actions</h3>
      {product && <ProductLink product={product} />}
      <div className="flex gap-2">
        <Button onClick={handleAddToCart}>
          {loadingAddToCart ? 'Adding...' : 'Add to Cart'}
        </Button>
        <Button onClick={handleBuyNow}>
          {loadingBuyNow ? 'Processing...' : 'Buy Now'}
        </Button>
      </div>
    </div>
  )
}
