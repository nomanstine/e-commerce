'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
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
            <Link href="/shop">
              <Button>
                Explore Collection
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline">
                Learn More
              </Button>
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
  );
}
