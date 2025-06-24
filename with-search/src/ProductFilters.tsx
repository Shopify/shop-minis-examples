import { useState } from 'react'
import type { ProductColorFilter, ProductFilters } from '@shopify/shop-minis-react'

interface ProductFiltersProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
}

// Define available colors based on SDK types
const AVAILABLE_COLORS: ProductColorFilter[] = [
  'BLACK', 'WHITE', 'GREY', 'BLUE', 'RED', 'GREEN', 
  'YELLOW', 'ORANGE', 'PINK', 'PURPLE', 'BROWN', 'BEIGE',
  'NAVY', 'GOLD', 'SILVER'
]

// Define price ranges
const PRICE_RANGES = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: undefined }
]

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const hasActiveFilters = (filters.color && filters.color.length > 0) || 
                          (filters.price && (filters.price.min !== undefined || filters.price.max !== undefined))
  
  const activeFilterCount = (filters.color?.length || 0) + (filters.price ? 1 : 0)
  
  const clearAllFilters = () => {
    onFiltersChange({})
  }
  
  const toggleColor = (color: ProductColorFilter) => {
    const currentColors = filters.color || []
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color]
    
    onFiltersChange({
      ...filters,
      color: newColors.length > 0 ? newColors : undefined
    })
  }
  
  const setPriceRange = (min?: number, max?: number) => {
    const currentPrice = filters.price
    const isSameRange = currentPrice?.min === min && currentPrice?.max === max
    
    onFiltersChange({
      ...filters,
      price: isSameRange ? undefined : { min, max }
    })
  }
  
  const isPriceRangeActive = (min?: number, max?: number) => {
    return filters.price?.min === min && filters.price?.max === max
  }
  
  return (
    <div className="px-4 pb-3 border-b border-gray-100">
      {/* Filter header with toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Filters</span>
          {hasActiveFilters && (
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      {/* Collapsible filter content */}
      {isExpanded && (
        <div className="space-y-4 pt-3">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          )}
          
          {/* Color filters */}
          <div>
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Color
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_COLORS.map((color) => {
                const isSelected = filters.color?.includes(color) || false
                const displayName = color.charAt(0) + color.slice(1).toLowerCase()
                
                return (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {displayName}
                  </button>
                )
              })}
            </div>
          </div>
          
          {/* Price filters */}
          <div>
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Price Range
            </h3>
            <div className="space-y-1.5">
              {PRICE_RANGES.map((range) => {
                const isSelected = isPriceRangeActive(range.min, range.max)
                
                return (
                  <button
                    key={range.label}
                    onClick={() => setPriceRange(range.min, range.max)}
                    className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 