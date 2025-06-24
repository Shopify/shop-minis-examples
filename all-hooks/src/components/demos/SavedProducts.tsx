import { ProductLink, useSavedProducts } from '@shopify/shop-minis-react'

export function SavedProducts() {
  const { products, loading, error } = useSavedProducts()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Saved Products</h3>
      {loading && <p className="text-blue-600">Loading saved products...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      <div className="space-y-3">
        {products && products.length > 0 ? (
          products.map((product: any) => (
            <ProductLink key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500">
            No saved products yet. Save products using the
            useSavedProductsActions hook!
          </p>
        )}
      </div>

      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Response
        </summary>
        <div className="p-4 pt-0">
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  )
}
