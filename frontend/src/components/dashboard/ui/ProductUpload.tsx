'use client';

import { useState } from 'react';
import { Upload, X, Plus, ImageIcon } from 'lucide-react';
import axios from 'axios';
import { uploadMultipleToCloudinary } from '@/lib/cloudinary';

interface ProductForm {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  images: string[];
  sku: string;
  brand: string;
  tags: string[];
}

export default function ProductUpload() {
  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [],
    sku: '',
    brand: '',
    tags: [],
  });
  const [newTag, setNewTag] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);
    
    // Create preview URLs
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm({ ...form, tags: [...form.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Upload images to Cloudinary first
      setUploadingImages(true);
      let imageUrls: string[] = [];
      
      if (imageFiles.length > 0) {
        const uploadedImages = await uploadMultipleToCloudinary(imageFiles);
        imageUrls = uploadedImages.map((img) => img.secure_url);
      }
      setUploadingImages(false);

      const productData = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        stock: parseInt(form.stock),
        images: imageUrls,
        sku: form.sku,
        brand: form.brand,
        tags: form.tags,
      };

      // Post to backend API
      await axios.post('/api/products', productData);
      
      setMessage({ type: 'success', text: 'Product uploaded successfully!' });
      
      // Reset form
      setForm({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: [],
        sku: '',
        brand: '',
        tags: [],
      });
      setImageFiles([]);
      setImagePreview([]);
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || 'Failed to upload product. Please try again.';
      setMessage({ type: 'error', text: errorMsg });
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-amber-100">
      <div className="mb-6">
        <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2">Upload New Product</h2>
        <p className="text-amber-700">Add a new product to your shop</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter product name"
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">
              SKU *
            </label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Product SKU"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">
              Price (৳ BDT) *
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="0.00"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">
              Stock Quantity *
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Available quantity"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home & Garden</option>
              <option value="books">Books</option>
              <option value="sports">Sports & Outdoors</option>
              <option value="toys">Toys & Games</option>
              <option value="beauty">Beauty & Personal Care</option>
              <option value="food">Food & Beverages</option>
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Brand name"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Detailed product description"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-2">
            Product Images *
          </label>
          <div className="mb-3">
            <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-amber-300 rounded-lg cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-amber-400 mb-2" />
                <span className="text-sm text-amber-700">Click to upload images</span>
                <span className="text-xs text-amber-600 block mt-1">PNG, JPG, WebP up to 10MB</span>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          {imagePreview.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {imagePreview.map((preview, index) => (
                <div key={index} className="relative group">
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg border-2 border-amber-200" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} /> Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center gap-2 border border-amber-300"
              >
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || uploadingImages}
            className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg"
          >
            <Upload size={20} />
            {uploadingImages ? 'Uploading Images...' : loading ? 'Creating Product...' : 'Upload Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
