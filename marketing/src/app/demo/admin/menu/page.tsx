'use client';

import { useState } from 'react';
import CategoriesTab from './CategoriesTab';
import ProductsTab from './ProductsTab';

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#3E2723]">Menu Management</h1>

      <div className="mb-6 border-b">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('products')}
            className={`whitespace-nowrap pb-3 sm:pb-4 px-2 sm:px-1 border-b-2 font-medium text-sm sm:text-base ${
              activeTab === 'products'
                ? 'border-[#6F4E37] text-[#6F4E37]'
                : 'border-transparent text-gray-500 hover:text-[#6F4E37] hover:border-gray-300'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`whitespace-nowrap pb-3 sm:pb-4 px-2 sm:px-1 border-b-2 font-medium text-sm sm:text-base ${
              activeTab === 'categories'
                ? 'border-[#6F4E37] text-[#6F4E37]'
                : 'border-transparent text-gray-500 hover:text-[#6F4E37] hover:border-gray-300'
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
