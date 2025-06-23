import { Button, useShopNavigation, useOrders } from '@shopify/shop-minis-react'
import { useFirstPopularProduct } from '../../utils/productUtils'

export function ShopNavigation() {
  const {
    navigateToProduct,
    navigateToShop,
    navigateToOrder,
    navigateToCheckout,
  } = useShopNavigation()

  const { product } = useFirstPopularProduct()
  const { orders } = useOrders()
  const orderId = orders?.[0]?.id

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Shop Navigation</h3>
      <p className="text-sm text-gray-600">
        Navigate to different sections of the shop
      </p>
      <div className="grid grid-cols-2 gap-2">
        {product && (
          <Button onClick={() => navigateToProduct({ productId: product.id })}>
            Navigate to Product
          </Button>
        )}
        {product?.shop && (
          <>
            <Button onClick={() => navigateToShop({ shopId: product.shop.id })}>
              Navigate to Shop
            </Button>
            <Button
              onClick={() => navigateToCheckout({ shopId: product.shop.id })}
            >
              Navigate to Checkout
            </Button>
          </>
        )}
        {orderId && (
          <Button onClick={() => navigateToOrder({ orderId })}>
            Navigate to Order
          </Button>
        )}
      </div>
    </div>
  )
}
