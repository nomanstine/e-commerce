import ProductCard from '@/components/home/ui/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  stock: number;
  tags: string[];
}

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  emptyMessage?: string;
  getBadge?: (tags: string[]) => string | undefined;
}

export default function ProductGrid({
  products,
  loading,
  emptyMessage = 'No products found.',
  getBadge = () => undefined
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900"></div>
        <p className="mt-4 text-amber-700">Loading products...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0] || '/placeholder.jpg',
              category: product.category,
              badge: getBadge(product.tags)
            }}
          />
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">{emptyMessage}</p>
        </div>
      )}
    </>
  );
}