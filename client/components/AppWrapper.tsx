'use client';

import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import BottomNav from '@/components/BottomNav';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <div className="w-full min-h-screen bg-stone-50">{children}</div>;
  }

  return (
    <div className="flex justify-center min-h-screen lg:py-10 lg:px-4">
        {/* Immersive Desktop Background with Soft Ambient Decor */}
        <div className="fixed inset-0 -z-10 bg-[#FAF7F2] hidden lg:block overflow-hidden">
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#6F4E37]/5 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#D4A373]/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Floating Aesthetic Elements */}
            <div className="absolute top-20 left-20 opacity-20 rotate-12">
                <div className="text-8xl">☕</div>
            </div>
            <div className="absolute bottom-40 right-20 opacity-10 -rotate-12">
                <div className="text-[120px]">🍃</div>
            </div>
            <div className="absolute top-1/2 left-10 opacity-5">
                <h2 className="text-9xl font-serif font-black italic select-none">Monkey</h2>
            </div>
        </div>

        <div className="relative flex w-full max-w-[1200px] gap-10 items-start justify-center">
            
            {/* Desktop Brand Sidebar (Hidden on Mobile/Tablet) */}
            <aside className="hidden xl:flex flex-col w-[320px] sticky top-10 space-y-8 py-6">
                <div className="space-y-4">
                    <h2 className="text-5xl font-black font-serif italic text-[#3E2723] leading-none mb-2">Monkey<br/>Cafe</h2>
                    <p className="text-[#A68966] text-xs font-black uppercase tracking-[0.4em]">Artisan Brews & Bites</p>
                </div>
                
                <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-[#F0EDE8] space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#FAF7F2] rounded-2xl flex items-center justify-center text-xl shadow-inner italic font-serif">M</div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#A68966]">Live Status</h4>
                            <p className="text-sm font-black text-[#3E2723]">Kitchen is Active</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[11px] font-bold text-[#8D7F75] leading-relaxed">
                            Experience the finest specialty coffee and hand-crafted treats, delivered straight to your table.
                        </p>
                    </div>
                </div>

                <div className="pt-10 space-y-2">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#A68966]/50">Global Support</p>
                        <p className="text-xs font-bold text-[#6F4E37]">+1 (800) MONKEY-COFFEE</p>
                </div>
            </aside>

            {/* The Core App Container - Responsive Widths */}
            <div className="w-full sm:max-w-[480px] md:max-w-[540px] lg:max-w-[600px] min-h-screen bg-[#FAF7F2] lg:rounded-[3.5rem] lg:shadow-[0_40px_100px_rgba(111,78,55,0.08)] relative flex flex-col overflow-hidden lg:border-[8px] lg:border-white ring-1 ring-[#000]/5">
                {children}
            </div>

            {/* Extra Right Space for balance on very large screens */}
            <div className="hidden xl:block w-[320px]"></div>
        </div>
        
        {/* Native App Bottom Navigation */}
        <BottomNav />
    </div>
  );
}
