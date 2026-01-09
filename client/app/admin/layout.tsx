'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 flex font-sans selection:bg-orange-500/30">
      {/* Sidebar Component */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
          
          {/* Mobile Header (Visible only on small screens) */}
          <div className="md:hidden bg-stone-900 text-white p-4 flex justify-between items-center sticky top-0 z-20">
             <span className="font-bold">Monkey Admin</span>
             {/* Mobile Menu Trigger would go here */}
          </div>

          <main className="flex-1 p-6 lg:p-10 max-w-[1600px] w-full mx-auto overflow-y-auto">
             {children}
          </main>
      </div>
    </div>
  );
}
