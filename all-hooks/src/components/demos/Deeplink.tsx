import { useDeeplink } from '@shopify/shop-minis-react'

export function Deeplink() {
  const { path, queryParams, hash } = useDeeplink()

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Deep Link Information</h3>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Path:</p>
          <p className="font-mono text-sm">{path || 'No path detected'}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Query Parameters:</p>
          {queryParams && Object.keys(queryParams).length > 0 ? (
            <div className="font-mono text-sm">
              {Object.entries(queryParams).map(([key, value]) => (
                <div key={key} className="mb-1">
                  <span className="text-blue-600">{key}</span>: {value}
                </div>
              ))}
            </div>
          ) : (
            <p className="font-mono text-sm text-gray-400">
              No query parameters
            </p>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Hash:</p>
          <p className="font-mono text-sm">{hash || 'No hash detected'}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This hook returns information about the deep
            link URL that was used to open this Mini. If the Mini was not opened
            via a deep link, all values will be undefined.
          </p>
        </div>
      </div>
    </div>
  )
}
