'use client';

import { useState, useEffect } from 'react';
import { Package, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import axios from 'axios';

export default function DashboardStats() {
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/products');
      setProductCount(response.data.length);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Products',
      value: loading ? '...' : productCount.toString(),
      icon: Package,
      color: 'bg-amber-600',
      change: '+0%',
    },
    {
      title: 'Total Revenue',
      value: '৳ 0.00',
      icon: DollarSign,
      color: 'bg-green-600',
      change: '+0%',
    },
    {
      title: 'Orders',
      value: '0',
      icon: ShoppingCart,
      color: 'bg-purple-600',
      change: '+0%',
    },
    {
      title: 'Conversion Rate',
      value: '0%',
      icon: TrendingUp,
      color: 'bg-orange-600',
      change: '+0%',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2">Dashboard Overview</h2>
        <p className="text-amber-700">Monitor your store performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-lg p-6 border-2 border-amber-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-amber-700 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-amber-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-amber-100">
        <h3 className="text-xl font-semibold text-amber-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-amber-300 rounded-lg hover:border-amber-600 transition-colors text-amber-700 hover:text-amber-900 hover:bg-amber-50">
            <Package className="mx-auto mb-2" size={32} />
            <span className="font-medium">Add New Product</span>
          </button>
          <button className="p-4 border-2 border-dashed border-amber-300 rounded-lg hover:border-amber-600 transition-colors text-amber-700 hover:text-amber-900 hover:bg-amber-50">
            <ShoppingCart className="mx-auto mb-2" size={32} />
            <span className="font-medium">View Orders</span>
          </button>
          <button className="p-4 border-2 border-dashed border-amber-300 rounded-lg hover:border-amber-600 transition-colors text-amber-700 hover:text-amber-900 hover:bg-amber-50">
            <TrendingUp className="mx-auto mb-2" size={32} />
            <span className="font-medium">View Analytics</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-amber-100">
        <h3 className="text-xl font-semibold text-amber-900 mb-4">Recent Activity</h3>
        <div className="text-center py-8 text-amber-600">
          No recent activity to display. Start by uploading your first product!
        </div>
      </div>
    </div>
  );
}
