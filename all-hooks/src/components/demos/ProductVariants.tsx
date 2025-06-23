import { useState } from 'react'
import {
  useRecommendedProducts,
  useProductVariants,
} from '@shopify/shop-minis-react'

export function ProductVariants() {
  const { products, loading, error } = useRecommendedProducts()
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  )

  // Use the first product's ID if available
  const productId =
    selectedProductId ||
    (products && products.length > 0 ? products[0].id : null)

  const {
    variants,
    loading: variantsLoading,
    error: variantsError,
  } = useProductVariants({ id: productId || '' })

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Product Variants</h3>

      {loading && <p className="text-blue-600">Loading products...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      <div className="space-y-3">
        <h4 className="text-md font-semibold">
          Select a product to view variants:
        </h4>
        {products && products.length > 0 && (
          <div className="grid gap-2">
            {products.slice(0, 3).map((product: any) => (
              <div
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
                className={`cursor-pointer border rounded-lg p-3 transition-colors ${
                  productId === product.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">
                      {product.title}
                    </h5>
                    {product.vendor && (
                      <p className="text-sm text-gray-500">{product.vendor}</p>
                    )}
                  </div>
                  {product.price && (
                    <p className="text-sm font-semibold text-gray-900">
                      ${product.price.amount}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {productId && (
        <div className="mt-4 p-4 border border-green-200 rounded-lg bg-green-50">
          <h4 className="text-md font-semibold mb-3">
            Variants for selected product:
          </h4>
          {variantsLoading && (
            <p className="text-blue-600">Loading variants...</p>
          )}
          {variantsError && (
            <p className="text-red-600">Error: {variantsError.message}</p>
          )}
          {variants && variants.length > 0 ? (
            <div className="space-y-3">
              {variants.map((variant, index) => (
                <div
                  key={variant.id}
                  className="bg-white p-3 rounded-lg border border-green-100"
                >
                  <div className="flex items-start gap-3">
                    {variant.image?.url && (
                      <img
                        src={variant.image.url}
                        alt={`Variant ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">Variant {index + 1}</p>
                      <p className="text-sm text-gray-600">ID: {variant.id}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        Price: ${variant.price?.amount || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No variants available for this product
            </p>
          )}
        </div>
      )}

      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Response
        </summary>
        <div className="p-4 pt-0">
          <p className="font-semibold text-sm mb-2">useProductVariants:</p>
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(variants, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  )
}
