'use client';

import Link from 'next/link';
import ProductCard from '@/components/home/ui/ProductCard';
import { Button } from '@/components/ui/button';

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

interface FeaturedProductsProps {
  featuredProducts: Product[];
  loading: boolean;
}

export default function FeaturedProducts({ featuredProducts, loading }: FeaturedProductsProps) {
  const getBadge = (tags: string[]) => {
    if (tags.includes('bestseller')) return 'Bestseller';
    if (tags.includes('new arrival')) return 'New Arrival';
    if (tags.includes('limited')) return 'Limited';
    return undefined;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-2 sm:mb-4">Featured Collection</h2>
          <p className="text-sm sm:text-base text-gray-600">Handpicked antiques for discerning collectors</p>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900"></div>
            <p className="mt-4 text-amber-700">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0],
                  category: product.category,
                  badge: getBadge(product.tags)
                }}
              />
            ))}
          </div>
        )}
        <div className="text-center mt-8 sm:mt-12">
          <Link href="/shop">
            <Button>
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
