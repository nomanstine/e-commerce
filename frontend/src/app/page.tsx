'use client';

import Link from 'next/link';
import {
  ProductCard,
  Hero,
  Features,
  Categories,
  FeaturedProducts,
  About,
  Newsletter
} from '@/components/home';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  stock: number;
  tags: string[];
}

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

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, settingsResponse] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/settings')
        ]);
        setFeaturedProducts(productsResponse.data.slice(0, 6)); // Get first 6 products
        setSettings(settingsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      <Hero />
      <Features settings={settings} />
      <Categories />
      <FeaturedProducts featuredProducts={featuredProducts} loading={loading} />
      <About />
      <Newsletter />
    </div>
  );
}
