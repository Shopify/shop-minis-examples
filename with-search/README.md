# Shop Mini Search Example

A clean, mobile-first Shop Mini that demonstrates how to implement product search with filters and infinite scroll pagination using the `@shopify/shop-minis-react` SDK.

## Demo

[Watch Demo Video](./demo.mp4)

## Features

- 🔍 **Real-time Search** - Debounced search input (200ms) for optimal performance
- 🎯 **Product Filters** - Collapsible filter section with multiple categories
- 📱 **Mobile-Optimized** - Designed specifically for mobile webviews
- ♾️ **Infinite Scroll** - Automatic pagination as users scroll
- 🎨 **Clean UI** - Modern design with Tailwind CSS v4
- ⚡ **Performance** - Optimized loading states and duplicate prevention

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Shop Minis CLI

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd with-search

# Install dependencies
npm install

# Start the development server
npx shop-minis dev
```


## Key Components

### App Component (`App.tsx`)

The main component that:
- Manages search state with debouncing
- Handles product fetching via `useProductSearch` hook
- Implements infinite scroll with Intersection Observer
- Manages filter state

### FilterSection Component (`FilterSection.tsx`)

A reusable component that:
- Displays available filters in a collapsible UI
- Shows active filter count
- Handles filter selection/deselection
- Provides a "Clear all" option

## Available Filters

The example includes three filter categories:
- **Category**: Electronics, Clothing, Home & Garden, Books, Sports & Outdoors
- **Price**: Under $25, $25-$50, $50-$100, $100-$200, Over $200
- **Availability**: In Stock, Ships in 1-2 days, Pre-order

## Customization

### Adding New Filters

Update the `AVAILABLE_FILTERS` constant in `App.tsx`:

```typescript
const AVAILABLE_FILTERS = {
  'Category': ['Your', 'Categories', 'Here'],
  'Brand': ['Brand A', 'Brand B', 'Brand C'],
  // Add more filter groups...
}
```

### Adjusting Search Debounce

Change the delay in the debounce effect:

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(searchQuery)
  }, 300) // Change from 200ms to 300ms
  
  return () => clearTimeout(timer)
}, [searchQuery])
```

### Modifying Pagination

Adjust the number of products loaded per page:

```typescript
const { products, loading, hasNextPage, fetchMore } = useProductSearch({
  query: debouncedQuery,
  first: 30 // Change from 20 to 30 products per page
})
```

## Best Practices Demonstrated

1. **Debounced Search** - Prevents excessive API calls while typing
2. **Duplicate Prevention** - Ensures products aren't duplicated during infinite scroll
3. **Loading States** - Clear feedback for initial load and pagination
4. **Empty States** - Helpful messages when no products are found
5. **Accessibility** - Semantic HTML and ARIA-friendly components
6. **Performance** - Intersection Observer for efficient scroll detection

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE). 