'use client';

import { useState } from 'react';
import { Star, Check } from 'lucide-react';

interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  verified: boolean;
  date: string;
}

interface ProductTabsProps {
  description: string;
  features?: string[];
  specifications?: Record<string, string>;
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export default function ProductTabs({
  description,
  features,
  specifications,
  reviews,
  rating,
  reviewCount
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  return (
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
            Reviews ({reviewCount})
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
                {description}
              </p>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-serif font-bold text-amber-900 mb-3 sm:mb-4">
                Key Features
              </h4>
              {features && features.length > 0 ? (
                <ul className="space-y-2 sm:space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No features available</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-900 mb-4 sm:mb-6">
              Product Specifications
            </h3>
            {specifications && Object.keys(specifications).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-3">
                    <dt className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">{key}</dt>
                    <dd className="text-sm sm:text-base text-gray-900">{value}</dd>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specifications available</p>
            )}
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
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-base sm:text-lg font-semibold">{rating} out of 5</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Based on {reviewCount} reviews</p>
              </div>
              <button className="bg-amber-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-amber-800 transition text-sm sm:text-base">
                Write a Review
              </button>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4 sm:space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
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
                      <span className="text-xs sm:text-sm text-gray-500">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm sm:text-base">No reviews yet. Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}