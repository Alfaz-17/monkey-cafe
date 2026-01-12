'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import BottomNav from '@/components/BottomNav';
import Navbar from '@/components/Navbar';


export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname?.startsWith('/demo/admin');
  const isTourPage = pathname === '/demo';

  if (isAdmin) {
    return <div className="w-full min-h-screen bg-stone-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative flex flex-col">
        {/* Global Marketing Navbar for all Demo views to feel "Wrapped" */}
        <Navbar />

        {isTourPage ? (
          <div className="flex-1 w-full">{children}</div>
        ) : (
          <div className="flex-1 flex justify-center pt-32 pb-20 px-4 lg:px-10">
              {/* The Core App Container - Responsive Widths */}
              <div className={`w-full sm:max-w-[480px] md:max-w-[540px] lg:max-w-[600px] min-h-[80vh] bg-[#FAF7F2] lg:rounded-[3.5rem] lg:shadow-[0_40px_100px_rgba(111,78,55,0.08)] relative flex flex-col overflow-hidden lg:border-[8px] lg:border-white ring-1 ring-[#000]/5`}>
                  <main className="flex-1 overflow-y-auto">
                      {children}
                  </main>
                  
                  <BottomNav />
              </div>
          </div>
        )}
    </div>
  );
}
