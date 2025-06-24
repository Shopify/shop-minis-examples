import { ProductCard, useProductSearch } from "@shopify/shop-minis-react";

export const CategorySearch = ({
  category,
  screenOffset = "0",
}: {
  category: string;
  screenOffset?: string;
}) => {
  const { products, loading, error } = useProductSearch({
    query: "",
    filters: {
      category: [category],
    },
  });

  const negativeMarginStyle = `calc(var(--spacing) * -${screenOffset})`;
  const paddingClassName = `px-${screenOffset}`;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <p>Error loading products</p>
      </div>
    );
  }

  return (
    <div
      className={`min-w-full overflow-x-auto flex gap-4 ${paddingClassName}`}
      style={{
        marginLeft: negativeMarginStyle,
        marginRight: negativeMarginStyle,
      }}
    >
      {products?.map((product) => (
        <div className="w-1/4 shrink-0 mb-4">
          <ProductCard key={product.id} product={product} />
        </div>
      ))}
    </div>
  );
};
