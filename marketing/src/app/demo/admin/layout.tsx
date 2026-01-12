'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Menu } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (

    <div className="min-h-screen bg-[#FAF7F2] flex font-['Outfit'] selection:bg-[#6F4E37] selection:text-white overflow-hidden">
      {/* Sidebar Component */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
          
          {/* Simple Mobile Header */}
          <div className="md:hidden bg-white border-b border-gray-100 p-4 flex justify-between items-center sticky top-0 z-40">
             <span className="font-bold text-base text-[#3E2723]">Admin Console</span>
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500"
             >
                <Menu className="w-5 h-5" />
             </button>
          </div>

          {/* Clean Top Bar for Desktop */}
          <header className="hidden md:flex h-14 items-center justify-between px-8 bg-white border-b border-gray-100 sticky top-0 z-30">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#A68966]">Control Console</h2>
          </header>

          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
             <div className="max-w-[1400px] mx-auto w-full">
                {children}
             </div>
          </main>
      </div>
    </div>
  );
}
