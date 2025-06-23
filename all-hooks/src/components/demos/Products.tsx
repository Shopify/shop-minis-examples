import {
  ProductLink,
  useProducts,
  usePopularProducts,
} from '@shopify/shop-minis-react'

export function Products() {
  // Get real product IDs from popular products
  const { products: popularProducts, loading: popularLoading } =
    usePopularProducts()

  // Use the first 3 product IDs from popular products
  const productIds = popularProducts?.slice(0, 3).map((p: any) => p.id) || []

  const { products, loading, error } = useProducts({ ids: productIds })

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Products by IDs</h3>
      <p className="text-sm text-gray-600">
        Fetches specific products by their IDs. This is useful when you have a
        list of product IDs and need to fetch their details.
      </p>

      {(loading || popularLoading) && (
        <p className="text-blue-600">Loading products...</p>
      )}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      <div className="space-y-3">
        {products && products.length > 0
          ? products.map((product: any) => (
              <div key={product.id}>
                <p className="text-xs text-gray-600">{product.id}</p>
                <ProductLink product={product} />
              </div>
            ))
          : !loading &&
            !popularLoading && (
              <p className="text-gray-500">No products found</p>
            )}
      </div>

      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Response
        </summary>
        <div className="p-4 pt-0">
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify({ productIds, products }, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  )
}
