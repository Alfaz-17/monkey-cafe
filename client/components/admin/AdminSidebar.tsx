'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Coffee, QrCode, ClipboardList, LogOut, Store, ChefHat, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Orders', icon: ChefHat },
    { href: '/admin/history', label: 'History', icon: ClipboardList },
    { href: '/admin/menu', label: 'Menu', icon: Coffee },
    { href: '/admin/tables', label: 'Tables', icon: QrCode },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
        {/* Brand Header */}
        <div className="p-6 border-b border-[#F0EDE8]/50 relative">
             <Link href="/admin/dashboard" className="flex items-center gap-2" onClick={onClose}>
                <div className="h-8 w-8 bg-[#6F4E37] rounded-lg flex items-center justify-center text-white">
                    <Store className="h-4 w-4" />
                </div>
                <span className="font-bold text-lg text-[#3E2723]">Monkey Admin</span>
             </Link>
             
             {/* Mobile Close Button */}
             <button 
                onClick={onClose}
                className="md:hidden absolute top-6 right-6 w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 border border-gray-100"
             >
                <X className="w-4 h-4" />
             </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                            isActive 
                            ? 'text-[#6F4E37] bg-[#FAF7F2]' 
                            : 'text-[#8D7F75] hover:text-[#3E2723] hover:bg-[#FAF7F2]/50'
                        }`}
                    >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#6F4E37]' : 'text-[#A68966] group-hover:text-[#6F4E37]'}`} />
                        {item.label}
                    </Link>
                 );
            })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#F0EDE8]">
            <button 
                onClick={() => {
                    if(confirm("Sign out?")) {
                        localStorage.removeItem('userInfo');
                        window.location.href = '/admin/login';
                    }
                }}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#8D7F75] hover:text-red-600 hover:bg-red-50 rounded-xl w-full transition-colors group"
            >
                <LogOut className="w-4 h-4" />
                Sign Out
            </button>
        </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white text-[#3E2723] border-r border-[#F0EDE8] flex-col h-screen sticky top-0 shadow-sm z-50 hidden md:flex font-['Outfit']">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-[#3E2723]/40 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white z-[70] md:hidden shadow-2xl font-['Outfit']"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
