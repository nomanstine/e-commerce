'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
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

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/settings');
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setError('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-serif">⚜️</div>
              <div>
                <h1 className="text-2xl font-serif font-bold">{settings?.store_name}</h1>
                <p className="text-sm text-amber-200">Store Settings</p>
              </div>
            </div>
            <Link href="/" className="text-amber-200 hover:text-white transition">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-amber-900 mb-8">Store Configuration</h2>

          {/* Store Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">🏪</span>
              Store Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 font-medium">Store Name</label>
                <p className="text-lg text-gray-900">{settings?.store_name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">Currency</label>
                <p className="text-lg text-gray-900">{settings?.currency}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 font-medium">Description</label>
                <p className="text-lg text-gray-900">{settings?.store_description}</p>
              </div>
            </div>
          </div>

          {/* Pricing & Fees */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">💰</span>
              Pricing & Fees
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-amber-50 p-4 rounded-lg">
                <label className="text-sm text-gray-600 font-medium">Tax Rate</label>
                <p className="text-2xl font-bold text-amber-900">{settings?.tax_rate}%</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <label className="text-sm text-gray-600 font-medium">Shipping Fee</label>
                <p className="text-2xl font-bold text-amber-900">{settings?.currency} {settings?.shipping_fee}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <label className="text-sm text-gray-600 font-medium">Free Shipping Threshold</label>
                <p className="text-2xl font-bold text-amber-900">{settings?.currency} {settings?.free_shipping_threshold}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">📞</span>
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 font-medium">Email</label>
                <p className="text-lg text-gray-900">{settings?.contact_email}</p>
              </div>
              {settings?.contact_phone && (
                <div>
                  <label className="text-sm text-gray-600 font-medium">Phone</label>
                  <p className="text-lg text-gray-900">{settings.contact_phone}</p>
                </div>
              )}
              {settings?.store_address && (
                <div>
                  <label className="text-sm text-gray-600 font-medium">Address</label>
                  <p className="text-lg text-gray-900">{settings.store_address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Policies */}
          {(settings?.return_policy || settings?.terms_and_conditions) && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">📋</span>
                Policies
              </h3>
              <div className="space-y-4">
                {settings?.return_policy && (
                  <div>
                    <label className="text-sm text-gray-600 font-medium">Return Policy</label>
                    <p className="text-gray-900 mt-1 whitespace-pre-line">{settings.return_policy}</p>
                  </div>
                )}
                {settings?.terms_and_conditions && (
                  <div>
                    <label className="text-sm text-gray-600 font-medium">Terms and Conditions</label>
                    <p className="text-gray-900 mt-1 whitespace-pre-line">{settings.terms_and_conditions}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Admin Link */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6 text-center">
            <p className="text-gray-700 mb-4">Need to update these settings?</p>
            <Link 
              href="/dashboard" 
              className="inline-block bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 transition"
            >
              Go to Admin Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-amber-200">
            &copy; 2026 {settings?.store_name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
