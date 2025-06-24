import { useState } from 'react'
import { useRecommendedShops, useShop } from '@shopify/shop-minis-react'

export function Shop() {
  const recommendedResult = useRecommendedShops()
  const shops =
    (recommendedResult as any).shops || (recommendedResult as any).data
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null)

  // Use the first shop's ID if available
  const shopId =
    selectedShopId || (shops && shops.length > 0 ? shops[0].id : null)

  // Fetch shop details using the real hook
  const shopResult = useShop({ id: shopId || '' })

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Shop Details</h3>

      <div className="space-y-3">
        <h4 className="text-md font-semibold">
          Select a shop to view details:
        </h4>
        {recommendedResult.loading && (
          <p className="text-blue-600">Loading shops...</p>
        )}
        {recommendedResult.error && (
          <p className="text-red-600">
            Error: {recommendedResult.error.message}
          </p>
        )}

        {shops && shops.length > 0 && (
          <div className="grid gap-2">
            {shops.slice(0, 5).map((shop: any) => (
              <div
                key={shop.id}
                onClick={() => setSelectedShopId(shop.id)}
                className={`cursor-pointer border rounded-lg p-4 transition-colors ${
                  shopId === shop.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{shop.name}</h4>
                    {shop.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {shop.description}
                      </p>
                    )}
                    {shop.productCount && (
                      <p className="text-xs text-gray-500 mt-2">
                        {shop.productCount} products
                      </p>
                    )}
                  </div>
                  {shop.logo && (
                    <img
                      src={shop.logo}
                      alt={shop.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {shopId && (
        <div className="mt-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
          <h4 className="text-md font-semibold mb-3">
            Shop Details (useShop):
          </h4>
          {shopResult.loading && (
            <p className="text-blue-600">Loading shop details...</p>
          )}
          {shopResult.error && (
            <p className="text-red-600">Error: {shopResult.error.message}</p>
          )}
          {(shopResult as any).data && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>ID:</strong> {(shopResult as any).data.id}
              </p>
              <p>
                <strong>Name:</strong> {(shopResult as any).data.name}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {(shopResult as any).data.description || 'N/A'}
              </p>
              <p>
                <strong>Website:</strong>{' '}
                {(shopResult as any).data.websiteUrl || 'N/A'}
              </p>
              <p>
                <strong>Products Count:</strong>{' '}
                {(shopResult as any).data.productCount || 'N/A'}
              </p>
              <p>
                <strong>Following:</strong>{' '}
                {(shopResult as any).data.isFollowing ? 'Yes' : 'No'}
              </p>
              {(shopResult as any).data.categories && (
                <p>
                  <strong>Categories:</strong>{' '}
                  {(shopResult as any).data.categories.join(', ')}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Responses
        </summary>
        <div className="p-4 pt-0 space-y-4">
          <div>
            <p className="font-semibold text-sm mb-2">useRecommendedShops:</p>
            <pre className="text-sm text-gray-600 overflow-auto">
              {JSON.stringify(recommendedResult, null, 2)}
            </pre>
          </div>
          <div>
            <p className="font-semibold text-sm mb-2">useShop:</p>
            <pre className="text-sm text-gray-600 overflow-auto">
              {JSON.stringify(shopResult, null, 2)}
            </pre>
          </div>
        </div>
      </details>
    </div>
  )
}
