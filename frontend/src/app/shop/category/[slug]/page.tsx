'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Breadcrumb, PageHeader, SearchBar, ProductGrid, NavigationButtons } from '@/components/shop';

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

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        // Filter products by category (convert slug back to category name)
        const categoryName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const filteredProducts = response.data.filter((product: Product) =>
          product.category.toLowerCase() === categoryName.toLowerCase()
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  const getBadge = (tags: string[]) => {
    if (tags.includes('bestseller')) return 'Bestseller';
    if (tags.includes('new arrival')) return 'New Arrival';
    if (tags.includes('limited')) return 'Limited';
    return undefined;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const categoryName = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/shop' },
        { label: categoryName }
      ]} />

      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title={categoryName}
          subtitle={`Explore our ${categoryName.toLowerCase()} collection`}
        />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search in this category..."
        />

        <ProductGrid
          products={filteredProducts}
          loading={loading}
          emptyMessage={searchTerm ? 'No products found matching your search.' : `No products found in ${categoryName} category.`}
          getBadge={getBadge}
        />

        <NavigationButtons buttons={[
          { href: '/shop', label: 'View All Products', primary: true },
          { href: '/', label: 'Back to Home' }
        ]} />
      </div>
    </>
  );
}