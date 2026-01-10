'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, use } from 'react';
import { Breadcrumb } from '@/components/shop';
import {
  ProductGallery,
  ProductInfo,
  ProductFeatures,
  ProductTabs,
  RelatedProducts
} from '@/components/product';
import axios from 'axios';

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
  features?: string[];
  specifications?: Record<string, string>;
  shipping?: {
    standard?: string;
    express?: string;
    returns?: string;
  };
}

interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  verified: boolean;
  date: string;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/products/${id}`);
      setProduct(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/${id}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [fetchProduct, fetchReviews]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
          <Link href="/" className="text-amber-900 hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const productRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 4.8;
  const productReviews = reviews.length;

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/shop' },
        { label: product.category, href: `/shop/category/${product.category.toLowerCase()}` },
        { label: product.name }
      ]} />

      {/* Product Section */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16">
          {/* Image Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <ProductInfo
            product={product}
            rating={productRating}
            reviewCount={productReviews}
          />
        </div>

        {/* Product Features */}
        <div className="mb-12 sm:mb-16">
          <ProductFeatures shipping={product.shipping} />
        </div>

        {/* Tabs Section */}
        <ProductTabs
          description={product.description}
          features={product.features}
          specifications={product.specifications}
          reviews={reviews}
          rating={productRating}
          reviewCount={productReviews}
        />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
