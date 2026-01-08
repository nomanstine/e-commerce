'use client';

import Link from 'next/link';
import { useState, use } from 'react';
import { Heart, ShoppingCart, Share2, Star, Truck, Shield, Package, Clock, ChevronLeft, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Mock product data
  const product = {
    id: id,
    name: 'Vintage Brass Lamp',
    price: 8500,
    originalPrice: 12000,
    category: 'Lighting',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    sku: 'VBL-2024-001',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800',
      'https://images.unsplash.com/photo-1550985616-10810253b84d?w=800'
    ],
    description: 'Exquisite vintage brass lamp from the early 1900s, handcrafted by master artisans in Old Dhaka. This stunning piece features intricate floral motifs and traditional Bengali patterns that reflect the rich cultural heritage of Bangladesh. The lamp has been carefully restored to preserve its authentic charm while ensuring functionality for modern use.',
    features: [
      'Authentic early 20th century design',
      'Hand-hammered brass construction',
      'Traditional Bengali floral patterns',
      'Fully restored and functional',
      'Original patina preserved',
      'Comes with authentication certificate'
    ],
    specifications: {
      'Era': 'Early 1900s',
      'Origin': 'Old Dhaka, Bangladesh',
      'Material': 'Solid Brass',
      'Height': '45 cm',
      'Width': '25 cm',
      'Weight': '3.2 kg',
      'Condition': 'Excellent (Restored)',
      'Style': 'Traditional Bengali'
    },
    shipping: {
      standard: 'Free delivery in 3-5 business days',
      express: '৳500 - Next day delivery available',
      returns: '7-day return policy'
    }
  };

  const relatedProducts = [
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
    }
  ];

  const reviews = [
    {
      id: 1,
      author: 'Ahmed Hassan',
      rating: 5,
      date: 'December 28, 2025',
      comment: 'Absolutely stunning piece! The craftsmanship is incredible. Perfect addition to my living room.',
      verified: true
    },
    {
      id: 2,
      author: 'Nadia Rahman',
      rating: 5,
      date: 'December 15, 2025',
      comment: 'Beautiful antique lamp with authentic Bengali design. Fast delivery and well-packaged.',
      verified: true
    },
    {
      id: 3,
      author: 'Karim Sheikh',
      rating: 4,
      date: 'November 30, 2025',
      comment: 'Great quality and condition. Minor restoration marks but adds to the character.',
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-amber-200">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-900">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-amber-900">Shop</Link>
            <span>/</span>
            <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-amber-900">{product.category}</Link>
            <span>/</span>
            <span className="text-amber-900 font-semibold truncate max-w-[150px] sm:max-w-none">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-amber-50 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 bg-white text-amber-900 p-2 sm:p-3 rounded-full hover:bg-amber-100 transition shadow-lg">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-amber-900 p-2 sm:p-3 rounded-full transition shadow-lg"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    onClick={() => setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-amber-900 p-2 sm:p-3 rounded-full transition shadow-lg"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === index ? 'border-amber-900' : 'border-transparent hover:border-amber-300'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
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
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm sm:text-base text-gray-600">
                {product.rating} ({product.reviews} reviews)
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
              <button className="flex-1 bg-amber-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-amber-800 transition shadow-lg flex items-center justify-center space-x-2">
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

            {/* Features */}
            <div className="bg-amber-50 rounded-lg p-4 sm:p-6 space-y-3">
              <div className="flex items-start space-x-3">
                <Truck className="w-5 h-5 text-amber-900 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base text-gray-800">{product.shipping.standard}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{product.shipping.express}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-amber-900 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base text-gray-800">Authentic Guarantee</p>
                  <p className="text-xs sm:text-sm text-gray-600">100% genuine antique with certificate</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Package className="w-5 h-5 text-amber-900 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base text-gray-800">Easy Returns</p>
                  <p className="text-xs sm:text-sm text-gray-600">{product.shipping.returns}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden mb-12 sm:mb-16">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-4 sm:px-8 py-3 sm:py-4 font-semibold transition whitespace-nowrap text-sm sm:text-base ${
                  activeTab === 'description' ? 'border-b-2 border-amber-900 text-amber-900' : 'text-gray-600 hover:text-amber-900'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`px-4 sm:px-8 py-3 sm:py-4 font-semibold transition whitespace-nowrap text-sm sm:text-base ${
                  activeTab === 'specifications' ? 'border-b-2 border-amber-900 text-amber-900' : 'text-gray-600 hover:text-amber-900'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 sm:px-8 py-3 sm:py-4 font-semibold transition whitespace-nowrap text-sm sm:text-base ${
                  activeTab === 'reviews' ? 'border-b-2 border-amber-900 text-amber-900' : 'text-gray-600 hover:text-amber-900'
                }`}
              >
                Reviews ({product.reviews})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 md:p-8">
            {activeTab === 'description' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-900 mb-3 sm:mb-4">
                    About This Item
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                    {product.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-amber-900 mb-3 sm:mb-4">
                    Key Features
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-900 mb-4 sm:mb-6">
                  Product Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-3">
                      <dt className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">{key}</dt>
                      <dd className="text-sm sm:text-base text-gray-900">{value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 sm:space-y-8">
                {/* Reviews Summary */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-900 mb-2">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-base sm:text-lg font-semibold">{product.rating} out of 5</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">Based on {product.reviews} reviews</p>
                  </div>
                  <button className="bg-amber-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-amber-800 transition text-sm sm:text-base">
                    Write a Review
                  </button>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-4 sm:space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-sm sm:text-base text-gray-900">{review.author}</span>
                            {review.verified && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center">
                                <Check className="w-3 h-3 mr-1" />
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-6 sm:mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
