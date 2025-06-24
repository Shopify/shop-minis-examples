import {
  Card,
  CardContent,
  useRecommendedShops,
} from '@shopify/shop-minis-react'

export function RecommendedShops() {
  const { shops, loading, error } = useRecommendedShops()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recommended Shops</h3>
      {loading && <p className="text-blue-600">Loading shops...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      <div className="space-y-3">
        {(shops && shops.length > 0 ? shops : []).map((shop: any) => (
          <Card key={shop.id} className="shadow-sm">
            <CardContent className="p-4">
              <h4 className="font-semibold">{shop.name}</h4>
              <p className="text-sm text-gray-600">{shop.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm font-semibold mb-2">Hook API:</p>
        <pre className="text-sm">{JSON.stringify(shops, null, 2)}</pre>
      </div>
    </div>
  )
}
