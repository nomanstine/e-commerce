'use client';

import { useState } from 'react';
import { Breadcrumb, PageHeader, CategoriesGrid, NavigationButtons, SearchBar } from '@/components/shop';

const categories = [
  { name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', count: 45 },
  { name: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', count: 28 },
  { name: 'Pottery & Brass', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400', count: 67 },
  { name: 'Decor', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400', count: 89 }
];

export default function CategoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Categories' }
      ]} />

      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Shop by Category"
          subtitle="Explore our curated collections of antique treasures"
        />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search categories..."
        />

        <CategoriesGrid categories={filteredCategories} />

        <NavigationButtons buttons={[
          { href: '/shop', label: 'View All Products', primary: true }
        ]} />
      </div>
    </>
  );
}