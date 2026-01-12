'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Coffee, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LandingPage() {
  const router = useRouter();
  const { tableId, setTableId } = useCart();
  const [manualTable, setManualTable] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    if (tableId) {
      router.replace(`/menu/${tableId}`);
    } else {
      setIsRedirecting(false);
    }
  }, [tableId, router]);

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualTable) {
        setTableId(manualTable);
        router.push(`/menu/${manualTable}`);
    }
  };

  if (isRedirecting && tableId) {
    return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
            <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl"
            >
                ☕
            </motion.div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-['Outfit'] text-[#3E2723] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#6F4E37]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#D4A373]/5 rounded-full blur-3xl"></div>

      <main className="w-full text-center space-y-12 relative z-10">
        
        {/* Logo & Brand */}
        <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-4"
        >
            <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center mx-auto border border-[#F0EDE8] relative">
                <Coffee className="w-12 h-12 text-[#6F4E37]" />
            </div>
            <div>
                <h1 className="text-5xl font-black tracking-tighter italic font-serif leading-none">Media Masala</h1>
                <p className="text-[#A68966] text-[10px] font-black uppercase tracking-[0.4em] mt-3">Precision Operations & Kitchen</p>
            </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
        >
            <h2 className="text-3xl font-black tracking-tight leading-tight">Welcome to the <br /> <span className="text-[#6F4E37]">Perfect Brew</span> Experience</h2>
            <p className="text-[#8D7F75] text-sm font-medium">Please scan the QR code on your table <br /> or enter your table number below to start.</p>
        </motion.div>

        {/* Action Area */}
        <motion.form 
            onSubmit={handleGo}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
        >
            <div className="relative group">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A68966] group-focus-within:text-[#6F4E37] transition-all" />
                <Input 
                    placeholder="Enter Table Number (e.g. 05)"
                    type="number"
                    value={manualTable}
                    onChange={(e) => setManualTable(e.target.value)}
                    className="h-16 pl-14 pr-6 bg-white rounded-[2rem] border-transparent shadow-[0_20px_40px_rgba(0,0,0,0.04)] focus:ring-2 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37]/20 transition-all text-lg font-black text-center pr-14"
                />
            </div>

            <Button 
                type="submit"
                disabled={!manualTable}
                className="w-full h-16 rounded-[2rem] bg-[#6F4E37] hover:bg-[#5A3E2B] text-white shadow-xl shadow-[#6F4E37]/20 flex items-center justify-center gap-3 group transition-all hover:scale-[1.03] active:scale-95 border-b-4 border-[#3E2723]/30 disabled:opacity-50"
            >
                <span className="text-lg font-black tracking-tight uppercase">Enter Cafe</span>
                <div className="bg-white/10 p-1.5 rounded-full backdrop-blur-md group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5 text-white" />
                </div>
            </Button>
        </motion.form>

        {/* Footer */}
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[10px] font-black text-[#A68966] uppercase tracking-[0.3em]"
        >
            Freshly roasted • Always perfect
        </motion.p>

      </main>
    </div>
  );
}
