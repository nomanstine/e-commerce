'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface Settings {
  id: number;
  store_name: string;
  store_description: string;
  currency: string;
  tax_rate: number;
  shipping_fee: number;
  free_shipping_threshold: number;
  contact_email: string;
  contact_phone: string | null;
  store_address: string | null;
  return_policy: string | null;
  terms_and_conditions: string | null;
}

interface HeaderProps {
  settings: Settings | null;
}

export default function Header({ settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="text-2xl sm:text-3xl font-serif">⚜️</div>
            <div>
              <h1 className="text-base sm:text-xl md:text-2xl font-serif font-bold tracking-wide">{settings?.store_name || 'karukotha'}</h1>
              <p className="text-[10px] sm:text-xs text-amber-200 hidden sm:block">{settings?.store_description || 'Timeless Elegance from Bangladesh'}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8 text-sm">
            <Link href="/" className="hover:text-amber-200 transition">Home</Link>
            <Link href="/shop" className="hover:text-amber-200 transition">Shop</Link>
            <Link href="/shop/category" className="hover:text-amber-200 transition">Categories</Link>
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
              <Link href="/shop/category" className="hover:text-amber-200 transition py-2" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
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
  );
}
