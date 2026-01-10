'use client';

import { Package, Shield, Truck, HeadphonesIcon } from 'lucide-react';

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

interface FeaturesProps {
  settings: Settings | null;
}

export default function Features({ settings }: FeaturesProps) {
  return (
    <section className="py-8 sm:py-12 bg-white border-y border-amber-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full mb-2 sm:mb-4">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Authentic Items</h3>
            <p className="text-xs sm:text-sm text-gray-600">100% genuine antiques</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full mb-2 sm:mb-4">
              <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Free Delivery</h3>
            <p className="text-xs sm:text-sm text-gray-600">Orders over {settings?.currency || 'BDT'} {settings?.free_shipping_threshold || 5000}</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full mb-2 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Secure Payment</h3>
            <p className="text-xs sm:text-sm text-gray-600">bKash, Nagad & Cards</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full mb-2 sm:mb-4">
              <HeadphonesIcon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">24/7 Support</h3>
            <p className="text-xs sm:text-sm text-gray-600">Always here to help</p>
          </div>
        </div>
      </div>
    </section>
  );
}
