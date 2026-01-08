'use client';

import { useState, useEffect } from 'react';
import { Pencil, Trash2, Search } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  sku: string;
  brand: string;
  created_at?: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage({ type: 'error', text: 'Failed to load products' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      setMessage({ type: 'success', text: 'Product deleted successfully' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage({ type: 'error', text: 'Failed to delete product' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-amber-100">
      <div className="mb-6">
        <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2">Manage Products</h2>
        <p className="text-amber-700">View and manage your product inventory</p>
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

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500" size={20} />
          <input
            type="text"
            placeholder="Search products by name, category, or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900"></div>
          <p className="mt-4 text-amber-700">Loading products...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-amber-200">
                <th className="text-left py-4 px-4 font-serif text-amber-900">Image</th>
                <th className="text-left py-4 px-4 font-serif text-amber-900">Name</th>
                <th className="text-left py-4 px-4 font-serif text-amber-900">SKU</th>
                <th className="text-left py-4 px-4 font-serif text-amber-900">Category</th>
                <th className="text-left py-4 px-4 font-serif text-amber-900">Price</th>
                <th className="text-left py-4 px-4 font-serif text-amber-900">Stock</th>
                <th className="text-left py-4 px-4 font-serif text-amber-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-amber-700">
                    {searchTerm ? 'No products found matching your search.' : 'No products available. Upload your first product!'}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-amber-100 hover:bg-amber-50 transition-colors">
                    <td className="py-4 px-4">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg border-2 border-amber-200"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                          <span className="text-amber-400 text-xs">No image</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-amber-900">{product.name}</div>
                      <div className="text-sm text-amber-600 line-clamp-1">{product.description}</div>
                    </td>
                    <td className="py-4 px-4 text-amber-700">{product.sku}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-amber-900">৳{product.price.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          product.stock > 10
                            ? 'bg-green-100 text-green-800'
                            : product.stock > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/products/${product.id}`}
                          className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
