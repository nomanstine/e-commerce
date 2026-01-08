'use client';

import { useState } from 'react';
import { Upload, Settings, Package, BarChart3 } from 'lucide-react';
import ProductUpload from '@/components/admin/ProductUpload';
import ProductList from '@/components/admin/ProductList';
import SettingsPanel from '@/components/admin/SettingsPanel';
import DashboardStats from '@/components/admin/DashboardStats';

type TabType = 'overview' | 'upload' | 'products' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, name: 'Overview', icon: BarChart3 },
    { id: 'upload' as TabType, name: 'Upload Product', icon: Upload },
    { id: 'products' as TabType, name: 'Manage Products', icon: Package },
    { id: 'settings' as TabType, name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 text-white shadow-lg min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <div className="text-2xl font-serif">⚜️</div>
              <div>
                <h1 className="text-xl font-serif font-bold">
                  Admin Panel
                </h1>
                <p className="text-xs text-amber-200">Heritage Treasures</p>
              </div>
            </div>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-amber-700 text-white shadow-lg'
                        : 'text-amber-100 hover:bg-amber-800/50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && <DashboardStats />}
            {activeTab === 'upload' && <ProductUpload />}
            {activeTab === 'products' && <ProductList />}
            {activeTab === 'settings' && <SettingsPanel />}
          </div>
        </main>
      </div>
    </div>
  );
}