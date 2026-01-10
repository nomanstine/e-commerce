'use client';

export default function Newsletter() {
  return (
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
  );
}
