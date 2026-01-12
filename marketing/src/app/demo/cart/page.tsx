'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getImageUrl } from '@/lib/utils/resolveImage';
import api from '@/lib/api';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowLeft, 
  Loader2, 
  ChevronRight, 
  ShoppingBag, 
  MapPin, 
  User as UserIcon, 
  Phone,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, decrementFromCart, totalPrice, clearCart, tableId } = useCart();
  const router = useRouter();
  
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [tableNo, setTableNo] = useState(tableId || '');

  // Auto-navigate to menu if cart becomes empty
  useEffect(() => {
    if (cartItems.length === 0 && !loading) {
        const timer = setTimeout(() => {
            router.push(tableId ? `/demo/menu/${tableId}` : '/demo');
        }, 800); // Small delay to let animations finish

        return () => clearTimeout(timer);
    }
  }, [cartItems.length, tableId, router, loading]);

  const handlePlaceOrder = async () => {
    if (!customerName || !customerMobile || !tableNo) {
        alert('Please fill all details');
        return;
    }
   
    
    setLoading(true);
    try {
        const orderData = {
            tableNo: Number(tableNo),
            customerName,
            customerMobile,
            orderItems: cartItems.map(item => ({
                product: item._id,
                name: item.name,
                price: item.price,
                qty: item.qty,
                customizations: item.selectedCustomizations?.map(c => ({
                    name: c.name + (c.optionName ? ` (${c.optionName})` : ''),
                    price: c.price
                }))
            })),
            totalPrice: totalPrice,
        };

        const { data } = await api.post('/orders', orderData);
        
        // Save to order history immediately for tracking
        try {
            const existingOrdersStr = localStorage.getItem('userOrders');
            let orders = [];
            try {
                orders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
                if (!Array.isArray(orders)) orders = [];
            } catch (e) {
                console.error("Failed to parse userOrders", e);
                orders = [];
            }

            if (!orders.some((o: any) => o._id === data._id)) {
                orders.unshift(data);
                // Keep only last 20 orders to prevent localStorage bloat
                if (orders.length > 20) orders = orders.slice(0, 20);
                localStorage.setItem('userOrders', JSON.stringify(orders));
            }
        } catch (error) {
            console.error("Error saving to local storage:", error);
        }
        
        clearCart();
        router.push(`/demo/order-success?orderId=${data._id}`);

    } catch (error: any) {
        console.error(error);
        alert(error.response?.data?.message || 'Order Failed');
    } finally {
        setLoading(false);
    }
  };

  const updateQty = (uniqueId: string, delta: number) => {
      const item = cartItems.find(x => (x.uniqueId || x._id) === uniqueId);
      if (!item) return;
      if (delta > 0) addToCart({ ...item, qty: 1 });
      else decrementFromCart(uniqueId);
  };

  if (cartItems.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF7F2] p-8 text-center">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative mb-8"
              >
                <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center relative z-10">
                    <ShoppingBag className="w-14 h-14 text-[#6F4E37] opacity-20" />
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <span className="text-5xl">☕</span>
                    </motion.div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#D4A373] rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                    <Plus className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              
              <h2 className="text-3xl font-bold text-[#3E2723] mb-3 tracking-tight tracking-tight">Your Tray is Empty</h2>
              <p className="text-[#8D7F75] mb-10 max-w-[280px] leading-relaxed text-lg">
                The aroma of fresh beans is waiting for you.
              </p>
              
              <Button 
                onClick={() => router.push(tableId ? `/demo/menu/${tableId}` : '/demo')}

                className="bg-[#6F4E37] hover:bg-[#5A3E2B] text-white px-10 h-14 rounded-2xl font-bold shadow-xl shadow-[#6F4E37]/20 transition-all hover:scale-105 active:scale-95"
              >
                  Explore Menu
              </Button>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3E2723] font-['Outfit'] pb-44">
      
      {/* Premium Header */}
      <header className="sticky top-0 bg-[#FAF7F2]/80 backdrop-blur-xl z-30 px-6 py-5 border-b border-[#E7DCCA]/50 mb-4">
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <button 
                    onClick={() => router.back()} 
                    className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#6F4E37] hover:bg-[#6F4E37] hover:text-white transition-all active:scale-90"
                  >
                      <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex flex-col cursor-pointer" onClick={() => router.push(tableId ? `/demo/menu/${tableId}` : '/demo')}>

                      <h1 className="text-2xl font-black tracking-tight leading-none">Your Tray</h1>
                      <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1 bg-[#6F4E37] px-1.5 py-0.5 rounded-lg border border-[#3E2723]/20">
                               <span className="text-[8px] font-black text-white uppercase tracking-widest">Step 2/2</span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68966]">Final Review</span>
                      </div>
                  </div>
              </div>
              <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-[#F0EDE8] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-black text-[#6F4E37]">TABLE {tableNo}</span>
              </div>
          </div>
      </header>

      <main className="px-4 sm:px-6 space-y-8 sm:space-y-12 scrollbar-hide py-6">
          
          {/* Order Items Section */}
          <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                  <h2 className="text-[11px] font-black text-[#6F4E37]/60 uppercase tracking-[0.25em]">Selected Delights</h2>
                  <span className="text-[9px] font-black bg-[#6F4E37]/10 text-[#6F4E37] px-3 py-1 rounded-lg">{cartItems.length} {cartItems.length === 1 ? 'ITEM' : 'ITEMS'}</span>
              </div>
              
              <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                      <motion.div 
                        key={item.uniqueId || item._id}
                        layout 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group relative bg-white p-5 rounded-[2.5rem] border border-[#F0EDE8] hover:border-[#D4A373]/30 transition-all hover:shadow-[0_25px_50px_-12px_rgba(111,78,55,0.08)]"
                      >
                         <div className="flex items-start gap-4">
                            {/* Image Container */}
                            <div className="relative h-20 w-20 flex-shrink-0">
                                {item.image ? (
                                    <img 
                                        src={getImageUrl(item.image)} 
                                        className="h-full w-full rounded-[1.5rem] object-cover bg-[#F5EFE6] shadow-inner" 
                                        alt={item.name}
                                    />
                                ) : (
                                    <div className="h-full w-full rounded-[1.5rem] bg-[#F5EFE6] flex items-center justify-center">
                                        <ShoppingBag className="w-6 h-6 text-[#A68966]/30" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-black text-[#3E2723] text-lg leading-tight truncate">{item.name}</h3>
                                
                                 <div className="flex flex-wrap gap-1 mt-1.5 min-h-[16px]">
                                    {item.selectedCustomizations?.map((cust, idx) => (
                                        <span key={idx} className="text-[8px] font-medium bg-[#FAF7F2] text-[#8D7F75] px-2 py-0.5 rounded-md border border-[#F0EDE8]/60">
                                            {cust.optionName}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <p className="text-[#6F4E37] font-black text-lg">
                                        <span className="text-xs font-medium mr-0.5 opacity-60">₹</span>
                                        {(item.price * item.qty).toFixed(2)}
                                    </p>
                                    
                                    {/* Controls Integrated */}
                                     <div className="flex items-center gap-3 bg-[#FAF7F2] rounded-2xl p-1 shadow-inner">
                                        <button 
                                            onClick={() => updateQty(item.uniqueId || item._id, -1)}
                                            className="h-9 w-9 rounded-xl flex items-center justify-center text-[#6F4E37] hover:bg-white hover:shadow-sm active:scale-90 transition-all"
                                        >
                                            {item.qty === 1 ? <Trash2 className="w-4 h-4 text-red-400" /> : <Minus className="w-4 h-4" />}
                                        </button>
                                        <span className="font-bold text-base w-5 text-center">{item.qty}</span>
                                        <button 
                                            onClick={() => updateQty(item.uniqueId || item._id, 1)}
                                            className="h-9 w-9 rounded-xl flex items-center justify-center bg-[#6F4E37] text-white shadow-md hover:bg-[#5A3E2B] active:scale-95 transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                         </div>
                      </motion.div>
                  ))}
                  </AnimatePresence>
              </div>
          </section>

          {/* Details Form Card */}
          <section className="space-y-4">
              <h2 className="text-[11px] font-black text-[#6F4E37]/60 uppercase tracking-[0.25em] pl-2">Personal Touch</h2>
              <div className="bg-white p-8 rounded-[3rem] border border-[#F0EDE8] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] space-y-8">
                  
                  <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#8D7F75]/70 ml-1 tracking-[0.1em]">
                          <UserIcon className="w-3.5 h-3.5 text-[#6F4E37]" /> Full Name
                      </div>
                      <Input 
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="h-16 rounded-2xl bg-[#FAF7F2] border-2 border-[#E7DCCA]/50 focus:bg-white focus:border-[#6F4E37]/20 focus:ring-4 focus:ring-[#6F4E37]/5 transition-all font-bold px-6 text-lg placeholder:text-[#8D7F75]/30"
                        placeholder="e.g. John Doe"
                      />
                  </div>

                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-4 space-y-3">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#8D7F75]/70 ml-1 tracking-[0.1em]">
                            <MapPin className="w-3.5 h-3.5 text-[#6F4E37]" /> Table
                        </div>
                        <Input 
                            type="number" 
                            value={tableNo}
                            onChange={e => setTableNo(e.target.value)}
                            className="h-16 rounded-2xl bg-[#FAF7F2] border-2 border-[#E7DCCA]/50 focus:bg-white focus:border-[#6F4E37]/20 focus:ring-4 focus:ring-[#6F4E37]/5 text-center font-black text-2xl p-0"
                            placeholder="00"
                            disabled={!!tableId}
                        />
                    </div>
                    <div className="col-span-8 space-y-3">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#8D7F75]/70 ml-1 tracking-[0.1em]">
                            <Phone className="w-3.5 h-3.5 text-[#6F4E37]" /> WhatsApp
                        </div>
                        <Input 
                            type="tel"
                            value={customerMobile}
                            onChange={e => setCustomerMobile(e.target.value)}
                            className="h-16 rounded-2xl bg-[#FAF7F2] border-2 border-[#E7DCCA]/50 focus:bg-white focus:border-[#6F4E37]/20 focus:ring-4 focus:ring-[#6F4E37]/5 transition-all font-bold px-6 text-lg placeholder:text-[#8D7F75]/30"
                            placeholder="+91..."
                        />
                    </div>
                  </div>
              </div>
          </section>

          {/* Updated Light Bill Summary */}
          <section className="bg-white p-8 sm:p-10 rounded-[3rem] border border-[#F0EDE8] shadow-[0_40px_80px_-20px_rgba(111,78,55,0.08)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-[#6F4E37]">
                  <Sparkles className="w-24 h-24" />
              </div>
              
              <div className="space-y-5 relative z-10">
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[#8D7F75] text-[11px] font-black uppercase tracking-[0.2em]">
                        <span>Service Value</span>
                        <span className="font-bold">₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#8D7F75] text-[11px] font-black uppercase tracking-[0.2em] opacity-40">
                        <span>Convenience Fee</span>
                        <span className="font-bold">₹0.00</span>
                    </div>
                </div>

                <div className="pt-5 border-t-2 border-[#FAF7F2] flex justify-between items-end">
                    <div>
                        <p className="text-[11px] font-black uppercase text-[#6F4E37]/50 tracking-[0.3em] mb-2">Total Amount</p>
                        <h3 className="text-5xl font-black text-[#6F4E37] tracking-tighter leading-none">
                            <span className="text-xl font-medium mr-1">₹</span>
                            {totalPrice.toFixed(2)}
                        </h3>
                    </div>
                    <div className="text-right pb-1">
                        <p className="text-[10px] font-bold text-green-600/70 tracking-tight uppercase flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> All Inclusive
                        </p>
                    </div>
                </div>
              </div>
          </section>

          <p className="text-center text-[#A68966] text-[10px] font-black uppercase tracking-[0.3em] py-4">
            Freshly roasted • Always perfect
          </p>

      </main>

      <div className="fixed bottom-16 sm:bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2] to-transparent z-40">
        <div className="w-full">
             <Button 
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full h-16 rounded-[2rem] bg-[#6F4E37] hover:bg-[#5A3E2B] text-white shadow-[0_20px_50_rgba(111,78,55,0.3)] flex items-center justify-center gap-3 group transition-all hover:scale-[1.03] active:scale-95 border-b-4 border-[#3E2723]/30 disabled:opacity-80"
             >
                {loading ? (
                    <div className="flex items-center gap-3">
                         <Loader2 className="animate-spin" />
                         <span className="text-lg font-black tracking-tight">SENDING TO KITCHEN...</span>
                    </div>
                ) : (
                    <>
                    <span className="text-lg font-black tracking-tight">CONFIRM ORDER</span>
                    <div className="bg-white/10 p-1.5 rounded-full backdrop-blur-md group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-5 h-5 text-white" />
                    </div>
                    </>
                )}
             </Button>
        </div>
      </div>
    </div>
  );
}
