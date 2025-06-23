import { useFollowedShops } from '@shopify/shop-minis-react'

export function FollowedShops() {
  const { shops, loading, error } = useFollowedShops()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Followed Shops</h3>
      {loading && <p className="text-blue-600">Loading followed shops...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      <div className="space-y-3">
        {shops && shops.length > 0 ? (
          shops.map((shop: any) => (
            <div
              key={shop.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{shop.name}</h4>
                  {shop.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {shop.description}
                    </p>
                  )}
                  {shop.followersCount && (
                    <p className="text-xs text-gray-500 mt-2">
                      {shop.followersCount} followers
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
          ))
        ) : (
          <p className="text-gray-500">
            No followed shops yet. Follow shops using the
            useFollowedShopsActions hook!
          </p>
        )}
      </div>

      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Response
        </summary>
        <div className="p-4 pt-0">
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(shops, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  )
}
