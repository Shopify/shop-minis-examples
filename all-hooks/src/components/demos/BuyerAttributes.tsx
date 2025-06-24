import { useBuyerAttributes } from '@shopify/shop-minis-react'

export function BuyerAttributes() {
  const { buyerAttributes, loading, error } = useBuyerAttributes()

  // Access buyer attributes from the correct structure
  const categoryAffinities = buyerAttributes?.categoryAffinities
  const genderAffinity = buyerAttributes?.genderAffinity

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Buyer Attributes</h3>

      {loading && <p className="text-blue-600">Loading attributes...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      {buyerAttributes && (
        <div className="space-y-6">
          {/* Gender Affinity Section */}
          {genderAffinity && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Gender Affinity
              </h4>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {genderAffinity}
              </span>
            </div>
          )}

          {/* Category Affinities Section */}
          {categoryAffinities && categoryAffinities.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-700">
                Category Affinities
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryAffinities.map((category: any) => (
                  <div
                    key={category.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mb-3">
                      <h5 className="font-medium text-gray-900 text-sm">
                        {category.name}
                      </h5>
                    </div>

                    {category.ancestors && category.ancestors.length > 0 && (
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Category Path:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {category.ancestors.map(
                            (ancestor: any, index: number) => (
                              <span
                                key={ancestor.id}
                                className="inline-flex items-center"
                              >
                                {index > 0 && <span className="mx-1">→</span>}
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                                  {ancestor.name}
                                </span>
                              </span>
                            )
                          )}
                          <span className="mx-1">→</span>
                          <span className="bg-blue-50 px-2 py-1 rounded text-xs font-medium">
                            {category.name}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && !buyerAttributes && (
        <div className="text-gray-500 text-center py-8">
          <p>No buyer attributes available</p>
        </div>
      )}

      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Response
        </summary>
        <div className="p-4 pt-0">
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(buyerAttributes, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  )
}
