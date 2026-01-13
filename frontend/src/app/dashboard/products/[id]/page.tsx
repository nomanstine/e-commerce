'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Trash2, Upload, X, Settings, ExternalLink } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

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

interface StoreSettings {
  storeName: string;
  storeDescription: string;
  currency: string;
  taxRate: number;
  shippingFee: number;
  freeShippingThreshold: number;
  contactEmail: string;
  contactPhone: string;
  storeAddress: string;
  returnPolicy: string;
}

export default function AdminProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [product, setProduct] = useState<Product>({
    id: id,
    name: '',
    price: 0,
    originalPrice: 0,
    category: '',
    description: '',
    images: [],
    inStock: true,
    sku: '',
    features: [''],
    specifications: {},
    shipping: {
      standard: '',
      express: '',
      returns: '',
    },
  });

  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    fetchProduct();
    fetchSettings();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      const data = response.data;
      setProduct({
        id: data.id || id,
        name: data.name || '',
        price: data.price || 0,
        originalPrice: data.originalPrice || 0,
        category: data.category || '',
        description: data.description || '',
        images: data.images || [],
        inStock: data.inStock !== undefined ? data.inStock : true,
        sku: data.sku || '',
        features: data.features || [''],
        specifications: data.specifications || {},
        shipping: data.shipping || {
          standard: '',
          express: '',
          returns: '',
        },
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      setMessage({ type: 'error', text: 'Failed to load product' });
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setProduct({
      ...product,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.checked });
  };

  const addFeature = () => {
    setProduct({ ...product, features: [...(product.features || []), ''] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(product.features || [])];
    newFeatures[index] = value;
    setProduct({ ...product, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = (product.features || []).filter((_, i) => i !== index);
    setProduct({ ...product, features: newFeatures });
  };

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      setProduct({
        ...product,
        specifications: {
          ...product.specifications,
          [newSpecKey]: newSpecValue,
        },
      });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    const newSpecs = { ...product.specifications };
    delete newSpecs[key];
    setProduct({ ...product, specifications: newSpecs });
  };

  const addImage = () => {
    if (newImage) {
      setProduct({ ...product, images: [...product.images, newImage] });
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setProduct({ ...product, images: product.images.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Transform frontend data to match backend API expectations
      const apiData = {
        id: parseInt(id),
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        stock: 10, // Default stock value
        inStock: product.inStock,
        images: product.images,
        sku: product.sku,
        brand: product.category, // Use category as brand for now
        tags: [],
        features: product.features || [],
        specifications: product.specifications || {},
        shipping: product.shipping || {},
      };
      
      await axios.put(`/api/products/${id}`, apiData);
      setMessage({ type: 'success', text: 'Product updated successfully!' });
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update product' });
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setDeleting(true);
    try {
      await axios.delete(`/api/products/${id}`);
      setMessage({ type: 'success', text: 'Product deleted!' });
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete product' });
      console.error('Delete error:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!settings) return;
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: ['taxRate', 'shippingFee', 'freeShippingThreshold'].includes(name) 
        ? parseFloat(value) 
        : value,
    });
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    setLoading(true);
    try {
      await axios.put('/api/settings', settings);
      setMessage({ type: 'success', text: 'Settings saved!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
      console.error('Settings save error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/product/${id}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Details Page
            </Link>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              {showSettings ? 'Hide Settings' : 'Show Settings'}
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-amber-900 mb-6">Edit Product</h1>

              {/* Basic Info */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ({settings?.currency || 'BDT'}) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price ({settings?.currency || 'BDT'})
                    </label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={product.originalPrice || 0}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select category</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Lighting">Lighting</option>
                      <option value="Decor">Decor</option>
                      <option value="Textiles">Textiles</option>
                      <option value="Jewelry">Jewelry</option>
                      <option value="Pottery">Pottery</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKU *
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={product.sku}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={product.inStock}
                    onChange={handleCheckbox}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">
                    In Stock
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="space-y-2">
                  {product.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={image}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="Enter image URL"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={addImage}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                <div className="space-y-2">
                  {product.features?.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Add Feature
                  </button>
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specifications
                </label>
                <div className="space-y-2 mb-2">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <input
                        type="text"
                        value={key}
                        readOnly
                        className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                      <input
                        type="text"
                        value={value}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecification(key)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    placeholder="Key (e.g., Material)"
                    className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                    placeholder="Value (e.g., Brass)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Shipping Information
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Standard Delivery
                    </label>
                    <input
                      type="text"
                      value={product.shipping?.standard || ''}
                      onChange={(e) => setProduct({
                        ...product,
                        shipping: {
                          ...product.shipping,
                          standard: e.target.value,
                        },
                      })}
                      placeholder="e.g., Free delivery in 3-5 business days"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Express Delivery
                    </label>
                    <input
                      type="text"
                      value={product.shipping?.express || ''}
                      onChange={(e) => setProduct({
                        ...product,
                        shipping: {
                          ...product.shipping,
                          express: e.target.value,
                        },
                      })}
                      placeholder="e.g., ৳500 - Next day delivery available"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Returns Policy
                    </label>
                    <input
                      type="text"
                      value={product.shipping?.returns || ''}
                      onChange={(e) => setProduct({
                        ...product,
                        shipping: {
                          ...product.shipping,
                          returns: e.target.value,
                        },
                      })}
                      placeholder="e.g., 7-day return policy"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Settings Panel */}
          {showSettings && settings && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-bold text-amber-900 mb-4">Store Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Store Name
                    </label>
                    <input
                      type="text"
                      name="storeName"
                      value={settings.storeName}
                      onChange={handleSettingsChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Currency
                    </label>
                    <input
                      type="text"
                      name="currency"
                      value={settings.currency}
                      onChange={handleSettingsChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      name="taxRate"
                      value={settings.taxRate}
                      onChange={handleSettingsChange}
                      step="0.01"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Shipping Fee ({settings.currency})
                    </label>
                    <input
                      type="number"
                      name="shippingFee"
                      value={settings.shippingFee}
                      onChange={handleSettingsChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Free Shipping Threshold
                    </label>
                    <input
                      type="number"
                      name="freeShippingThreshold"
                      value={settings.freeShippingThreshold}
                      onChange={handleSettingsChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={settings.contactEmail}
                      onChange={handleSettingsChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Return Policy
                    </label>
                    <textarea
                      name="returnPolicy"
                      value={settings.returnPolicy || ''}
                      onChange={handleSettingsChange}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
