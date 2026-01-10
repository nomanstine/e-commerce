import ProductCard from '@/components/home/ui/ProductCard';

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-6 sm:mb-8">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}