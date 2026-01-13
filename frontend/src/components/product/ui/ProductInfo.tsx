'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Star, Check, Minus, Plus } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  images: string[];
  inStock: boolean;
  sku: string;
}

interface ProductInfoProps {
  product: Product;
  rating: number;
  reviewCount: number;
}

export default function ProductInfo({ product, rating, reviewCount }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || '/placeholder.jpg',
      },
    });
    // Could add a toast notification here
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Category & Stock */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="inline-block bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
          {product.category}
        </span>
        {product.inStock && (
          <span className="flex items-center text-green-600 text-xs sm:text-sm font-semibold">
            <Check className="w-4 h-4 mr-1" />
            In Stock
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-900">
        {product.name}
      </h1>

      {/* Rating & Reviews */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-sm sm:text-base text-gray-600">
          {rating} ({reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900">
          ৳{product.price.toLocaleString()}
        </span>
        {product.originalPrice && (
          <span className="text-lg sm:text-xl md:text-2xl text-gray-400 line-through">
            ৳{product.originalPrice.toLocaleString()}
          </span>
        )}
        {product.originalPrice && (
          <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      {/* SKU */}
      <p className="text-xs sm:text-sm text-gray-600">SKU: {product.sku}</p>

      {/* Description Preview */}
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        {product.description.substring(0, 200)}...
      </p>

      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-sm sm:text-base font-semibold text-gray-700">Quantity:</span>
        <div className="flex items-center border-2 border-amber-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 sm:p-3 hover:bg-amber-50 transition"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 sm:px-6 font-semibold text-base sm:text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 sm:p-3 hover:bg-amber-50 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-amber-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-amber-800 transition shadow-lg flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
        <button className="bg-white text-amber-900 border-2 border-amber-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-amber-50 transition flex items-center justify-center space-x-2">
          <Heart className="w-5 h-5" />
          <span className="hidden sm:inline">Wishlist</span>
        </button>
      </div>

      {/* Buy Now Button */}
      <button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition shadow-lg">
        Buy Now
      </button>
    </div>
  );
}