'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

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

interface SettingsDisplayProps {
  compact?: boolean;
}

export default function SettingsDisplay({ compact = false }: SettingsDisplayProps) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/settings');
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!settings) {
    return <div className="text-red-600">Failed to load settings</div>;
  }

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Currency:</span>
          <span className="font-semibold">{settings.currency}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Shipping Fee:</span>
          <span className="font-semibold">{settings.currency} {settings.shipping_fee}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Free Shipping:</span>
          <span className="font-semibold">Over {settings.currency} {settings.free_shipping_threshold}</span>
        </div>
        {settings.tax_rate > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Tax Rate:</span>
            <span className="font-semibold">{settings.tax_rate}%</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-amber-900 mb-4">{settings.store_name}</h3>
      <p className="text-gray-600 mb-4">{settings.store_description}</p>
      
      <div className="space-y-3 border-t pt-4">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Pricing Information</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Currency:</span>
              <span className="ml-2 font-semibold">{settings.currency}</span>
            </div>
            <div>
              <span className="text-gray-600">Tax Rate:</span>
              <span className="ml-2 font-semibold">{settings.tax_rate}%</span>
            </div>
            <div>
              <span className="text-gray-600">Shipping Fee:</span>
              <span className="ml-2 font-semibold">{settings.currency} {settings.shipping_fee}</span>
            </div>
            <div>
              <span className="text-gray-600">Free Shipping:</span>
              <span className="ml-2 font-semibold">{settings.currency} {settings.free_shipping_threshold}+</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Contact Information</h4>
          <div className="space-y-1 text-sm">
            <div>
              <span className="text-gray-600">📧 Email:</span>
              <span className="ml-2">{settings.contact_email}</span>
            </div>
            {settings.contact_phone && (
              <div>
                <span className="text-gray-600">📞 Phone:</span>
                <span className="ml-2">{settings.contact_phone}</span>
              </div>
            )}
            {settings.store_address && (
              <div>
                <span className="text-gray-600">📍 Address:</span>
                <span className="ml-2">{settings.store_address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
