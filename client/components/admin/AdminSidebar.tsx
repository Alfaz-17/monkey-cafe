'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Coffee, QrCode, ClipboardList, LogOut, Store, Settings, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Live Kitchen', icon: ChefHat },
    { href: '/admin/history', label: 'Order History', icon: ClipboardList }, // New History Link
    { href: '/admin/menu', label: 'Menu Management', icon: Coffee },
    { href: '/admin/tables', label: 'Floor Plan', icon: QrCode },
  ];

  return (
    <aside className="w-72 bg-stone-900 text-stone-300 border-r border-stone-800 flex flex-col h-screen sticky top-0 shadow-2xl z-50 hidden md:flex">
        {/* Brand Header */}
        <div className="p-8 border-b border-stone-800/50">
             <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                <div className="h-10 w-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Store className="h-6 w-6" />
                </div>
                <div>
                    <span className="font-bold text-xl text-stone-100 tracking-tight block">Monkey Cafe</span>
                    <span className="text-xs text-stone-500 font-medium uppercase tracking-widest">Admin Console</span>
                </div>
             </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2">
            <p className="px-4 text-xs font-bold text-stone-600 uppercase tracking-widest mb-4">Operations</p>
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group overflow-hidden ${
                            isActive 
                            ? 'text-white bg-white/10 shadow-inner' 
                            : 'text-stone-400 hover:text-stone-100 hover:bg-white/5'
                        }`}
                    >
                        {isActive && (
                            <motion.div 
                                layoutId="sidebar-active"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r-full"
                            />
                        )}
                        <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-orange-500' : 'text-stone-500 group-hover:text-stone-300'}`} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-800/50 bg-stone-900/50">
            <button 
                onClick={() => {
                    if(confirm("Are you sure?")) {
                        localStorage.removeItem('userInfo');
                        window.location.href = '/admin/login';
                    }
                }}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl w-full transition-all group"
            >
                <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Sign Out
            </button>
        </div>
    </aside>
  );
}
