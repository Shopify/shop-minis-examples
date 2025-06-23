import {
  ProductLink,
  useProductList,
  useProductLists,
} from '@shopify/shop-minis-react'
import { useState } from 'react'

export function ProductList() {
  // First get available product lists
  const {
    productLists,
    loading: listsLoading,
    error: listsError,
  } = useProductLists()
  const lists = productLists || []

  // Use the first list ID if available
  const [selectedListId, setSelectedListId] = useState<string | null>(null)
  const listId =
    selectedListId || (lists.length > 0 ? lists[0].id : 'default-list')

  const { productList, loading: productListLoading } = useProductList({
    id: listId,
  })

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Product List</h3>
      <p className="text-sm text-gray-600">
        Fetches a specific product list by ID. Select a list to view its
        products.
      </p>

      {lists.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a product list:
          </label>
          <select
            value={selectedListId || listId}
            onChange={e => setSelectedListId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {lists.map((list: any) => (
              <option key={list.id} value={list.id}>
                {list.title || list.name || `List ${list.id}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {(productListLoading || listsLoading) && (
        <p className="text-blue-600">Loading product list...</p>
      )}
      {listsError && (
        <p className="text-red-600">Error: {listsError.message}</p>
      )}

      <div className="space-y-3">
        {productList &&
          productList.products.length > 0 &&
          productList.products.map((product: any) => (
            <ProductLink key={product.id} product={product} />
          ))}
      </div>

      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Response
        </summary>
        <div className="p-4 pt-0">
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify({ listId, productList }, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  )
}
