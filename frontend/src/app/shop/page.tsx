'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Breadcrumb, PageHeader, Filters, ProductGrid, NavigationButtons } from '@/components/shop';

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

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getBadge = (tags: string[]) => {
    if (tags.includes('bestseller')) return 'Bestseller';
    if (tags.includes('new arrival')) return 'New Arrival';
    if (tags.includes('limited')) return 'Limited';
    return undefined;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(product => product.category))];

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Shop' }
      ]} />

      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Shop All Products"
          subtitle="Discover our complete collection of antique treasures"
        />

        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        <ProductGrid
          products={filteredProducts}
          loading={loading}
          emptyMessage="No products found matching your criteria."
          getBadge={getBadge}
        />

        <NavigationButtons buttons={[
          { href: '/', label: 'Back to Home', primary: true }
        ]} />
      </div>
    </>
  );
}