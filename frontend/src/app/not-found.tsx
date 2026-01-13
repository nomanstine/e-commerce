import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <div className="text-8xl mb-4">🔍</div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-900 mb-2">
            Oops!
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            We couldn&apos;t find that page
          </h2>
          <p className="text-gray-600">
            But don&apos;t worry, let&apos;s get you back to exploring our beautiful collection of heritage crafts.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-amber-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transition duration-200 shadow-lg"
          >
            Go Home
          </Link>

          <Link
            href="/shop"
            className="block w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}