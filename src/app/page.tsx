'use client';

import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Package, Shield, Truck, HeadphonesIcon, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const featuredProducts = [
    {
      id: 1,
      name: 'Vintage Brass Lamp',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500',
      category: 'Lighting',
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Antique Wooden Cabinet',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500',
      category: 'Furniture',
      badge: 'New Arrival'
    },
    {
      id: 3,
      name: 'Traditional Brass Pottery',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500',
      category: 'Decor'
    },
    {
      id: 4,
      name: 'Vintage Photo Frame',
      price: 2800,
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500',
      category: 'Decor'
    },
    {
      id: 5,
      name: 'Antique Mirror',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500',
      category: 'Decor',
      badge: 'Limited'
    },
    {
      id: 6,
      name: 'Classic Wall Clock',
      price: 6500,
      image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500',
      category: 'Decor'
    }
  ];

  const categories = [
    { name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', count: 45 },
    { name: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', count: 28 },
    { name: 'Pottery & Brass', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400', count: 67 },
    { name: 'Decor', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400', count: 89 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="text-2xl sm:text-3xl font-serif">⚜️</div>
              <div>
                <h1 className="text-base sm:text-xl md:text-2xl font-serif font-bold tracking-wide">Heritage Treasures</h1>
                <p className="text-[10px] sm:text-xs text-amber-200 hidden sm:block">Timeless Elegance from Bangladesh</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8 text-sm">
              <Link href="/" className="hover:text-amber-200 transition">Home</Link>
              <Link href="/shop" className="hover:text-amber-200 transition">Shop</Link>
              <Link href="/categories" className="hover:text-amber-200 transition">Categories</Link>
              <Link href="/about" className="hover:text-amber-200 transition">About</Link>
              <Link href="/contact" className="hover:text-amber-200 transition">Contact</Link>
            </nav>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="hover:text-amber-200 transition hidden sm:block">🔍</button>
              <button className="hover:text-amber-200 transition hidden sm:block">❤️</button>
              <button className="hover:text-amber-200 transition relative">
                🛒
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">3</span>
              </button>
              <button 
                className="lg:hidden hover:text-amber-200 transition p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-amber-700 pt-4">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="hover:text-amber-200 transition py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link href="/shop" className="hover:text-amber-200 transition py-2" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
                <Link href="/categories" className="hover:text-amber-200 transition py-2" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
                <Link href="/about" className="hover:text-amber-200 transition py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link href="/contact" className="hover:text-amber-200 transition py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                <div className="flex space-x-4 pt-2 border-t border-amber-700">
                  <button className="hover:text-amber-200 transition">🔍 Search</button>
                  <button className="hover:text-amber-200 transition">❤️ Wishlist</button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[500px] sm:min-h-[550px] md:h-[600px] bg-gradient-to-r from-amber-100 to-orange-100 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 h-full flex items-center relative z-10 py-12 sm:py-16">
          <div className="max-w-2xl">
            <div className="inline-block bg-amber-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm mb-4">
              ✨ Authentic Bangladeshi Antiques
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-900 mb-4 sm:mb-6 leading-tight">
              Discover Timeless
              <br />
              <span className="text-orange-700">Heritage & Elegance</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Curated collection of authentic antique and vintage pieces from across Bangladesh. 
              Each item tells a story of craftsmanship and tradition.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/shop" className="bg-amber-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-amber-800 transition shadow-lg hover:shadow-xl text-center">
                Explore Collection
              </Link>
              <Link href="/about" className="bg-white text-amber-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-50 transition shadow-lg border-2 border-amber-900 text-center">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden xl:block absolute right-20 top-1/2 -translate-y-1/2">
            <div className="relative w-64 h-64 xl:w-80 xl:h-80 animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-3xl opacity-20"></div>
              <div className="relative text-8xl xl:text-9xl">🏺</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 sm:py-12 bg-white border-y border-amber-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full mb-2 sm:mb-4">
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Authentic Items</h3>
              <p className="text-xs sm:text-sm text-gray-600">100% genuine antiques</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full mb-2 sm:mb-4">
                <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Free Delivery</h3>
              <p className="text-xs sm:text-sm text-gray-600">All over Bangladesh</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full mb-2 sm:mb-4">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Secure Payment</h3>
              <p className="text-xs sm:text-sm text-gray-600">bKash, Nagad & Cards</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full mb-2 sm:mb-4">
                <HeadphonesIcon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">24/7 Support</h3>
              <p className="text-xs sm:text-sm text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-2 sm:mb-4">Shop by Category</h2>
            <p className="text-sm sm:text-base text-gray-600">Explore our curated collections</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`} className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
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

      {/* Featured Products */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-2 sm:mb-4">Featured Collection</h2>
            <p className="text-sm sm:text-base text-gray-600">Handpicked antiques for discerning collectors</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link href="/shop" className="inline-block bg-amber-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-amber-800 transition shadow-lg text-sm sm:text-base">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-amber-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 sm:mb-6">Our Heritage Story</h2>
              <p className="text-amber-100 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                For over 25 years, we've been preserving and sharing Bangladesh's rich cultural heritage through authentic antiques. 
                Each piece in our collection is carefully sourced from local artisans, estates, and collectors.
              </p>
              <p className="text-amber-100 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                From traditional brass work to vintage furniture, we bring you the finest examples of Bangladeshi craftsmanship 
                that have stood the test of time.
              </p>
              <Link href="/about" className="inline-block bg-white text-amber-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-amber-50 transition text-sm sm:text-base">
                Our Story →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-amber-800 p-4 sm:p-6 rounded-lg text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">25+</div>
                <div className="text-amber-200 text-xs sm:text-sm">Years Experience</div>
              </div>
              <div className="bg-amber-800 p-4 sm:p-6 rounded-lg text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">5000+</div>
                <div className="text-amber-200 text-xs sm:text-sm">Happy Customers</div>
              </div>
              <div className="bg-amber-800 p-4 sm:p-6 rounded-lg text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">800+</div>
                <div className="text-amber-200 text-xs sm:text-sm">Unique Items</div>
              </div>
              <div className="bg-amber-800 p-4 sm:p-6 rounded-lg text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">100%</div>
                <div className="text-amber-200 text-xs sm:text-sm">Authentic</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-900 mb-2 sm:mb-4">Join Our Community</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Subscribe to get updates on new arrivals and exclusive offers</p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 text-sm sm:text-base"
              />
              <button className="bg-amber-900 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-amber-800 transition text-sm sm:text-base whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold mb-3 sm:mb-4">Heritage Treasures</h3>
              <p className="text-amber-200 text-xs sm:text-sm">Preserving Bangladesh's cultural heritage, one antique at a time.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-200">
                <li><Link href="/shop" className="hover:text-white transition">Shop</Link></li>
                <li><Link href="/categories" className="hover:text-white transition">Categories</Link></li>
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Customer Care</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-200">
                <li><Link href="/shipping" className="hover:text-white transition">Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-white transition">Returns</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="/care" className="hover:text-white transition">Care Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-200">
                <li>📍 Dhaka, Bangladesh</li>
                <li>📞 +880 1XXX-XXXXXX</li>
                <li>📧 info@heritagetreasures.bd</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-700 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-amber-200">
            <p>&copy; 2026 Heritage Treasures. All rights reserved. | Proudly Made in Bangladesh 🇧🇩</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
