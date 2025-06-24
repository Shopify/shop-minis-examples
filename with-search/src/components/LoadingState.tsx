export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4" />
      <p className="text-sm text-gray-500">Loading products...</p>
    </div>
  )
} 