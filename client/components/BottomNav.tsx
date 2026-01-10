'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Home, Clock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalQty } = useCart();

  // Don't show on admin pages or success page
  if (pathname.includes('/admin') || pathname.includes('/order-success')) {
    return null;
  }

  const isMenuPage = pathname.includes('/menu/');
  const isCartPage = pathname === '/cart';

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E7DCCA] pb-safe md:hidden"
    >
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto px-4">
        
        {/* Menu Button */}
        <button
          onClick={() => router.back()}
          className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all ${
            isMenuPage ? 'text-[#6F4E37]' : 'text-[#A68966]'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Menu</span>
        </button>

        {/* Cart Button */}
        <button
          onClick={() => router.push('/cart')}
          className={`relative flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all ${
            isCartPage ? 'text-[#6F4E37]' : 'text-[#A68966]'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            {totalQty > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-[#6F4E37] text-white text-[9px] font-black rounded-full flex items-center justify-center px-1"
              >
                {totalQty}
              </motion.span>
            )}
          </div>
          <span className="text-[10px] font-bold">Cart</span>
        </button>

        {/* Orders Button (Future feature) */}
        <button
          onClick={() => router.push('/orders')}
          className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all ${
            pathname === '/orders' ? 'text-[#6F4E37]' : 'text-[#A68966]'
          }`}
        >
          <Clock className="w-6 h-6" />
          <span className="text-[10px] font-bold">Orders</span>
        </button>
      </div>
    </motion.nav>
  );
}
