'use client';

import Link from 'next/link';

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

interface FooterProps {
  settings: Settings | null;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-serif font-bold mb-3 sm:mb-4">{settings?.store_name || 'karukotha'}</h3>
            <p className="text-amber-200 text-xs sm:text-sm">{settings?.store_description || 'Timeless Elegance from Bangladesh'}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-200">
              <li><Link href="/shop" className="hover:text-white transition">Shop</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Categories</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Customer Care</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-200">
              <li><Link href="/shipping" className="hover:text-white transition">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="/care" className="hover:text-white transition">Care Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-200">
              {settings?.store_address && <li>📍 {settings.store_address}</li>}
              {settings?.contact_phone && <li>📞 {settings.contact_phone}</li>}
              <li>📧 {settings?.contact_email || 'info@karukotha.com'}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-amber-700 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-amber-200">
          <p>&copy; 2026 {settings?.store_name || 'karukotha'}. All rights reserved. | Proudly Made in Bangladesh 🇧🇩</p>
        </div>
      </div>
    </footer>
  );
}
