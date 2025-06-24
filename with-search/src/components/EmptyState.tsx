interface EmptyStateProps {
  query: string
  hasFilters: boolean
}

export function EmptyState({ query, hasFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <svg
        className="mx-auto h-12 w-12 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-gray-500 font-medium">No products found</p>
      {(query || hasFilters) && (
        <p className="text-sm text-gray-400 mt-1">
          Try adjusting your search or filters
        </p>
      )}
    </div>
  )
} 