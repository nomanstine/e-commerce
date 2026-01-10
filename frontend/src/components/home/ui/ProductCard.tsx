import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 bg-amber-900 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
          {product.badge}
        </div>
      )}
      
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-amber-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 sm:gap-4">
          <button className="bg-white text-amber-900 p-2 sm:p-3 rounded-full hover:bg-amber-100 transition transform hover:scale-110">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="bg-amber-900 text-white p-2 sm:p-3 rounded-full hover:bg-amber-800 transition transform hover:scale-110">
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5">
        <div className="text-[10px] sm:text-xs text-amber-700 font-semibold mb-1 sm:mb-2 uppercase tracking-wide">
          {product.category}
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-serif text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-1 sm:mb-2 hover:text-amber-900 transition line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-amber-900">৳{product.price.toLocaleString()}</span>
          </div>
          <Link 
            href={`/product/${product.id}`}
            className="text-amber-900 text-xs sm:text-sm font-semibold hover:text-amber-700 transition"
          >
            View Details →
          </Link>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-amber-100 border-l-[60px] border-l-transparent opacity-50"></div>
      </div>
    </div>
  );
}
