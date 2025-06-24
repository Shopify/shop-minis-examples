import {
  Product,
  ProductLink,
  useRecommendedProducts,
} from '@shopify/shop-minis-react'

export function RecommendedProducts() {
  const { products, loading, error } = useRecommendedProducts()

  return (
    <div className="flex flex-col gap-5">
      {loading && (
        <p className="text-sm text-gray-500 m-0">Loading recommendations...</p>
      )}

      {error && (
        <p className="text-sm text-red-600 m-0">Error: {error.message}</p>
      )}

      {products && products.length > 0 && (
        <div className="flex flex-col gap-3">
          {products.map((product: Product) => (
            <ProductLink key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* API Debug Info */}
      <details className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
        <summary className="list-none cursor-pointer px-4 py-3 text-sm font-medium text-black hover:bg-gray-100 transition-colors flex items-center justify-between">
          Hook Response Data
          <span className="text-xs text-gray-500">▼</span>
        </summary>
        <div className="px-4 pb-4">
          <pre className="text-xs text-gray-500 overflow-auto m-0 font-mono leading-[1.5]">
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  )
}
