import { Button, useCloseMini } from '@shopify/shop-minis-react'

export function CloseMini() {
  const { closeMini } = useCloseMini()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Close Mini</h3>
      <p className="text-sm text-gray-600">
        Close the current mini and return to the host app
      </p>
      <Button onClick={() => closeMini()}>Close Mini</Button>
      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Response
        </summary>
        <div className="p-4 pt-0">
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(closeMini, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  )
}
