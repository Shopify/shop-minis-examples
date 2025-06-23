import { useCurrentUser } from '@shopify/shop-minis-react'

export function CurrentUser() {
  const { currentUser, loading, error } = useCurrentUser()

  return (
    <div className="flex flex-col gap-5">
      {loading && (
        <p className="text-sm text-gray-500 m-0">Loading user data...</p>
      )}

      {error && (
        <div className="px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-red-700">
          <p className="text-sm text-red-600 m-0">
            Error loading user: {error.message}
          </p>
        </div>
      )}

      {currentUser && (
        <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
          {/* User Header */}
          <div className="flex items-start gap-4 p-5 bg-gray-50 border-b border-gray-200">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-semibold shrink-0">
              {currentUser.displayName?.charAt(0).toUpperCase() || 'U'}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">
                {currentUser.displayName || 'Shop User'}
              </h3>
            </div>
          </div>

          {/* Details Section */}
          <details className="bg-gray-50">
            <summary className="list-none px-5 py-3 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between">
              View Raw Data
              <span className="text-xs text-gray-500">▼</span>
            </summary>
            <div className="px-4 pb-4">
              <pre className="text-xs bg-white p-3 rounded-lg overflow-x-auto max-h-[200px] overflow-y-auto">
                {JSON.stringify(currentUser, null, 2)}
              </pre>
            </div>
          </details>
        </div>
      )}
    </div>
  )
}
