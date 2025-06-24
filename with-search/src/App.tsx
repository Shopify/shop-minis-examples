import { useState, useEffect, useCallback, useRef } from 'react'
import { useProductSearch, ProductCard } from '@shopify/shop-minis-react'
import type { ProductFilters } from '@shopify/shop-minis-react'
import { ProductFilters as ProductFiltersComponent } from './ProductFilters'
import { LoadingState } from './components/LoadingState'
import { EmptyState } from './components/EmptyState'

export function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [filters, setFilters] = useState<ProductFilters>({})
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      setAllProducts([]) // Reset products on new search
    }, 200)
    
    return () => clearTimeout(timer)
  }, [searchQuery])
  
  // Fetch products using the search hook with filters
  const { products, loading, hasNextPage, fetchMore } = useProductSearch({
    query: debouncedQuery,
    filters: filters,
    first: 20
  })
  
  // Accumulate products for infinite scroll
  useEffect(() => {
    if (products?.length) {
      setAllProducts(prev => {
        const existingIds = new Set(prev.map(p => p.id))
        const newProducts = products.filter(p => !existingIds.has(p.id))
        return [...prev, ...newProducts]
      })
    }
  }, [products])
  
  // Reset products when filters change
  useEffect(() => {
    setAllProducts([])
  }, [filters])
  
  // Infinite scroll setup
  const observerRef = useRef<IntersectionObserver>()
  const loadMoreRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore) return
    if (observerRef.current) observerRef.current.disconnect()
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && fetchMore && !isLoadingMore) {
        setIsLoadingMore(true)
        fetchMore().finally(() => setIsLoadingMore(false))
      }
    })
    
    if (node) observerRef.current.observe(node)
  }, [hasNextPage, fetchMore, isLoadingMore])
  
  const isInitialLoading = loading && allProducts.length === 0
  const isEmpty = !loading && allProducts.length === 0
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed header */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        {/* Search input */}
        <div className="px-4 pt-4 pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 pr-10 text-sm border border-gray-200 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        {/* Filters */}
        <ProductFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
      
      {/* Product grid */}
      <div className="px-4 pt-4 pb-6">
        {isInitialLoading ? (
          <LoadingState />
        ) : isEmpty ? (
          <EmptyState query={debouncedQuery} hasFilters={Object.keys(filters).length > 0} />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Infinite scroll trigger */}
            {hasNextPage && (
              <div ref={loadMoreRef} className="flex justify-center pt-6 pb-2">
                {isLoadingMore && (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
                    <span className="text-sm text-gray-500">Loading more...</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
