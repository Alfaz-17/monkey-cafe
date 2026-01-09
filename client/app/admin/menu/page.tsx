'use client';

import { useState } from 'react';
import CategoriesTab from './CategoriesTab';
import ProductsTab from './ProductsTab';

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Menu Management</h1>

      <div className="mb-6 border-b">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'products'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'categories'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Categories
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'products' ? <ProductsTab /> : <CategoriesTab />}
      </div>
    </div>
  );
}
