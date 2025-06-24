import { useState } from 'react'
import {
  useRecommendedProducts,
  useProductMedia,
} from '@shopify/shop-minis-react'

export function ProductMedia() {
  const { products, loading, error } = useRecommendedProducts()
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  )

  // Use the first product's ID if available
  const productId =
    selectedProductId ||
    (products && products.length > 0 ? products[0].id : null)

  const {
    media,
    loading: mediaLoading,
    error: mediaError,
  } = useProductMedia({ id: productId || '' })

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Product Media</h3>

      {loading && <p className="text-blue-600">Loading products...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      <div className="space-y-3">
        <h4 className="text-md font-semibold">
          Select a product to view media:
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
        <div className="mt-4 p-4 border border-purple-200 rounded-lg bg-purple-50">
          <h4 className="text-md font-semibold mb-3">
            Media for selected product:
          </h4>
          {mediaLoading && <p className="text-blue-600">Loading media...</p>}
          {mediaError && (
            <p className="text-red-600">Error: {mediaError.message}</p>
          )}
          {media && media.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {media.map((mediaItem, index) => (
                  <div
                    key={mediaItem.id}
                    className="bg-white rounded-lg p-3 border border-purple-100"
                  >
                    <div className="bg-gray-100 rounded aspect-square flex items-center justify-center mb-2">
                      {mediaItem.mediaContentType === 'IMAGE' &&
                      mediaItem.image?.url ? (
                        <img
                          src={mediaItem.image.url}
                          alt={mediaItem.alt || `Media ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <div className="text-3xl mb-2">
                            {mediaItem.mediaContentType === 'VIDEO'
                              ? '🎥'
                              : mediaItem.mediaContentType === 'MODEL_3D'
                                ? '🎨'
                                : mediaItem.mediaContentType ===
                                    'EXTERNAL_VIDEO'
                                  ? '📹'
                                  : '📷'}
                          </div>
                          <span className="text-sm text-gray-600">
                            {mediaItem.mediaContentType}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      <p className="font-medium">
                        Type: {mediaItem.mediaContentType}
                      </p>
                      {mediaItem.alt && <p>Alt: {mediaItem.alt}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Total media items: {media.length}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No media available for this product</p>
          )}
        </div>
      )}

      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Response
        </summary>
        <div className="p-4 pt-0">
          <p className="font-semibold text-sm mb-2">useProductMedia:</p>
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(media, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  )
}
