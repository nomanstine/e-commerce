'use client';

import Link from 'next/link';

export default function About() {
  return (
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
  );
}
