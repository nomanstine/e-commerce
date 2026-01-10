'use client';

import Link from 'next/link';

const categories = [
  { name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', count: 45 },
  { name: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', count: 28 },
  { name: 'Pottery & Brass', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400', count: 67 },
  { name: 'Decor', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400', count: 89 }
];

export default function Categories() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-2 sm:mb-4">Shop by Category</h2>
          <p className="text-sm sm:text-base text-gray-600">Explore our curated collections</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/shop/category/${category.name.toLowerCase()}`} className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-square bg-gray-200">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-3 sm:p-4 md:p-6">
                <h3 className="text-white font-serif text-base sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1">{category.name}</h3>
                <p className="text-amber-200 text-xs sm:text-sm">{category.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
