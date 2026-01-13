'use client';

import { useState, useEffect } from 'react';
import { Save, Store, DollarSign, Truck, Mail } from 'lucide-react';
import axios from 'axios';

interface Settings {
  storeName: string;
  storeDescription: string;
  currency: string;
  taxRate: string;
  shippingFee: string;
  freeShippingThreshold: string;
  contactEmail: string;
  contactPhone: string;
  storeAddress: string;
  returnPolicy: string;
  termsAndConditions: string;
}

export default function SettingsPanel() {
  const [settings, setSettings] = useState<Settings>({
    storeName: 'karukotha',
    storeDescription: 'Timeless Elegance from Bangladesh',
    currency: 'BDT',
    taxRate: '0',
    shippingFee: '100',
    freeShippingThreshold: '5000',
    contactEmail: 'contact@karukotha.com',
    contactPhone: '',
    storeAddress: '',
    returnPolicy: '',
    termsAndConditions: '',
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      const data = response.data;
      setSettings({
        storeName: data.store_name,
        storeDescription: data.store_description,
        currency: data.currency,
        taxRate: data.tax_rate.toString(),
        shippingFee: data.shipping_fee.toString(),
        freeShippingThreshold: data.free_shipping_threshold.toString(),
        contactEmail: data.contact_email,
        contactPhone: data.contact_phone || '',
        storeAddress: data.store_address || '',
        returnPolicy: data.return_policy || '',
        termsAndConditions: data.terms_and_conditions || '',
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const settingsData = {
        store_name: settings.storeName,
        store_description: settings.storeDescription,
        currency: settings.currency,
        tax_rate: parseFloat(settings.taxRate),
        shipping_fee: parseFloat(settings.shippingFee),
        free_shipping_threshold: parseFloat(settings.freeShippingThreshold),
        contact_email: settings.contactEmail,
        contact_phone: settings.contactPhone,
        store_address: settings.storeAddress,
        return_policy: settings.returnPolicy,
        terms_and_conditions: settings.termsAndConditions,
      };

      await axios.put('/api/settings', settingsData);
      
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-amber-100">
        <div className="text-center py-12 text-amber-700">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-amber-100">
      <div className="mb-6">
        <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2">Store Settings</h2>
        <p className="text-amber-700">Configure your store preferences and policies</p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Store Information */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Store className="text-amber-600" size={24} />
            <h3 className="text-xl font-semibold text-amber-900">Store Information</h3>
          </div>
          <div className="space-y-4 ml-8">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">Store Description</label>
              <textarea
                name="storeDescription"
                value={settings.storeDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Financial Settings */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="text-green-600" size={24} />
            <h3 className="text-xl font-semibold text-amber-900">Financial Settings</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="BDT">BDT (৳)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Truck className="text-purple-600" size={24} />
            <h3 className="text-xl font-semibold text-amber-900">Shipping Settings</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Standard Shipping Fee (৳ BDT)
              </label>
              <input
                type="number"
                name="shippingFee"
                value={settings.shippingFee}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Free Shipping Threshold (৳ BDT)
              </label>
              <input
                type="number"
                name="freeShippingThreshold"
                value={settings.freeShippingThreshold}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Mail className="text-red-600" size={24} />
            <h3 className="text-xl font-semibold text-amber-900">Contact Information</h3>
          </div>
          <div className="space-y-4 ml-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={settings.contactEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={settings.contactPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">Store Address</label>
              <textarea
                name="storeAddress"
                value={settings.storeAddress}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Full store address"
              />
            </div>
          </div>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-xl font-semibold text-amber-900 mb-4">Store Policies</h3>
          <div className="space-y-4 ml-8">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">Return Policy</label>
              <textarea
                name="returnPolicy"
                value={settings.returnPolicy}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Describe your return policy..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Terms and Conditions
              </label>
              <textarea
                name="termsAndConditions"
                value={settings.termsAndConditions}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Your terms and conditions..."
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t-2 border-amber-200">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg"
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
