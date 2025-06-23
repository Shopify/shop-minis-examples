import { useState } from 'react'
import {
  useRecommendedProducts,
  useProduct,
  useProductVariants,
  useProductMedia,
} from '@shopify/shop-minis-react'

export function ProductDetails() {
  const { products, loading, error } = useRecommendedProducts()
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  )

  // Use the first product's ID if available
  const productId =
    selectedProductId ||
    (products && products.length > 0 ? products[0].id : null)

  // Fetch product details, variants, and media using the real hooks
  const {
    product,
    loading: productLoading,
    error: productError,
  } = useProduct({ id: productId || '' })

  const {
    variants,
    loading: variantsLoading,
    error: variantsError,
  } = useProductVariants({ id: productId || '' })

  const {
    media,
    loading: mediaLoading,
    error: mediaError,
  } = useProductMedia({ id: productId || '' })

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Product Details, Variants & Media
      </h3>

      {loading && <p className="text-blue-600">Loading products...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      <div className="space-y-3">
        <h4 className="text-md font-semibold">
          Select a product to view details:
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
        <>
          <div className="mt-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h4 className="text-md font-semibold mb-3">
              Product Details (useProduct):
            </h4>
            {productLoading && (
              <p className="text-blue-600">Loading product details...</p>
            )}
            {productError && (
              <p className="text-red-600">Error: {productError.message}</p>
            )}
            {product && (
              <div className="space-y-2 text-sm">
                <p>
                  <strong>ID:</strong> {product.id}
                </p>
                <p>
                  <strong>Title:</strong> {product.title}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 p-4 border border-green-200 rounded-lg bg-green-50">
            <h4 className="text-md font-semibold mb-3">
              Product Variants (useProductVariants):
            </h4>
            {variantsLoading && (
              <p className="text-blue-600">Loading variants...</p>
            )}
            {variantsError && (
              <p className="text-red-600">Error: {variantsError.message}</p>
            )}
            {variants && variants.length > 0 && (
              <div className="space-y-2">
                {variants.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="text-sm p-2 bg-white rounded"
                  >
                    <p>
                      <strong>Variant {index + 1}:</strong> {variant.id}
                    </p>
                    <p className="text-gray-600">
                      Price: ${variant.price?.amount || 'N/A'}
                    </p>
                    <p className="text-gray-600">
                      Image:
                      <img
                        src={variant.image?.url}
                        alt={variant.id}
                        className="w-10 h-10 object-cover rounded"
                      />
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 p-4 border border-purple-200 rounded-lg bg-purple-50">
            <h4 className="text-md font-semibold mb-3">
              Product Media (useProductMedia):
            </h4>
            {mediaLoading && <p className="text-blue-600">Loading media...</p>}
            {mediaError && (
              <p className="text-red-600">Error: {mediaError.message}</p>
            )}
            {media && media.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {media.slice(0, 4).map((media, index) => (
                  <div key={media.id} className="text-sm">
                    <div className="bg-gray-100 rounded aspect-square flex items-center justify-center">
                      {media.mediaContentType === 'IMAGE' &&
                      media.image?.url ? (
                        <img
                          src={media.image.url}
                          alt={media.alt || `Media ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-500">
                          {media.mediaContentType}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {media.mediaContentType}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Responses
        </summary>
        <div className="p-4 pt-0 space-y-4">
          <div>
            <p className="font-semibold text-sm mb-2">useProduct:</p>
            <pre className="text-sm text-gray-600 overflow-auto">
              {JSON.stringify(product, null, 2)}
            </pre>
          </div>
          <div>
            <p className="font-semibold text-sm mb-2">useProductVariants:</p>
            <pre className="text-sm text-gray-600 overflow-auto">
              {JSON.stringify(variants, null, 2)}
            </pre>
          </div>
          <div>
            <p className="font-semibold text-sm mb-2">useProductMedia:</p>
            <pre className="text-sm text-gray-600 overflow-auto">
              {JSON.stringify(media, null, 2)}
            </pre>
          </div>
        </div>
      </details>
    </div>
  )
}
