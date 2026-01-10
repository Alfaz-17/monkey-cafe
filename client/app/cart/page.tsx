'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
  Sparkles
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
        clearCart();
        router.push(`/order-success?orderId=${data._id}`);
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
                onClick={() => router.push(tableId ? `/menu/${tableId}` : '/')}
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
                  <div className="flex flex-col cursor-pointer" onClick={() => router.push(tableId ? `/menu/${tableId}` : '/')}>
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

      <main className="px-4 sm:px-6 space-y-6 sm:space-y-10 scrollbar-hide">
          
          {/* Order Items Section */}
          <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between px-1">
                  <h2 className="text-xs font-black text-[#A68966] uppercase tracking-[0.2em]">Selected Delights</h2>
                  <span className="text-[10px] font-bold bg-[#E7DCCA] text-[#6F4E37] px-2 py-0.5 rounded-full">{cartItems.length} ITEMS</span>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                  <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                      <motion.div 
                        key={item.uniqueId || item._id}
                        layout 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group relative bg-white p-4 rounded-[2rem] border border-[#F0EDE8] hover:border-[#D4A373]/30 transition-all hover:shadow-[0_20px_40px_rgba(111,78,55,0.05)]"
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
                                        <span key={idx} className="text-[9px] font-bold bg-[#FAF7F2] text-[#8D7F75] px-2 py-0.5 rounded-full border border-[#F0EDE8]">
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
                                    <div className="flex items-center gap-3 bg-[#FAF7F2] border border-[#F0EDE8] rounded-2xl p-1">
                                        <button 
                                            onClick={() => updateQty(item.uniqueId || item._id, -1)}
                                            className="h-8 w-8 rounded-xl flex items-center justify-center text-[#6F4E37] hover:bg-white hover:shadow-sm active:scale-90 transition-all"
                                        >
                                            {item.qty === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-400" /> : <Minus className="w-3.5 h-3.5" />}
                                        </button>
                                        <span className="font-black text-sm w-4 text-center">{item.qty}</span>
                                        <button 
                                            onClick={() => updateQty(item.uniqueId || item._id, 1)}
                                            className="h-8 w-8 rounded-xl flex items-center justify-center bg-[#6F4E37] text-white shadow-sm hover:bg-[#5A3E2B] active:scale-95 transition-all"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
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
              <h2 className="text-xs font-black text-[#A68966] uppercase tracking-[0.2em] pl-1">Personal Touch</h2>
              <div className="bg-white p-7 rounded-[2.5rem] border border-[#F0EDE8] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] space-y-6">
                  
                  <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#8D7F75] ml-1 tracking-wider">
                          <UserIcon className="w-3 h-3" /> Full Name
                      </div>
                      <Input 
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="h-14 rounded-2xl bg-[#FAF7F2] border-transparent focus:bg-white focus:ring-2 focus:ring-[#D4A373]/20 focus:border-[#D4A373]/40 transition-all font-bold px-5"
                        placeholder="e.g. John Doe"
                      />
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#8D7F75] ml-1 tracking-wider">
                            <MapPin className="w-3 h-3" /> Table
                        </div>
                        <Input 
                            type="number" 
                            value={tableNo}
                            onChange={e => setTableNo(e.target.value)}
                            className="h-14 rounded-2xl bg-[#FAF7F2] border-transparent focus:bg-white focus:ring-2 focus:ring-[#D4A373]/20 text-center font-black text-xl"
                            placeholder="00"
                            disabled={!!tableId}
                        />
                    </div>
                    <div className="col-span-3 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#8D7F75] ml-1 tracking-wider">
                            <Phone className="w-3 h-3" /> WhatsApp
                        </div>
                        <Input 
                            type="tel"
                            value={customerMobile}
                            onChange={e => setCustomerMobile(e.target.value)}
                            className="h-14 rounded-2xl bg-[#FAF7F2] border-transparent focus:bg-white focus:ring-2 focus:ring-[#D4A373]/20 transition-all font-bold"
                            placeholder="+1..."
                        />
                    </div>
                  </div>
              </div>
          </section>

          {/* Luxury Bill Summary */}
          <section className="bg-[#5D4037] p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="w-20 h-20" />
              </div>
              
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center opacity-60 text-xs font-bold uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center opacity-40 text-[10px] italic border-b border-white/10 pb-3">
                    <span>Complimentary Service</span>
                    <span>$0.00</span>
                </div>
                
                <div className="pt-3 flex justify-between items-end">
                    <div>
                        <p className="text-xs font-black uppercase text-white/40 tracking-[0.2em]">Grand Total</p>
                        <h3 className="text-4xl font-black mt-1 leading-none tracking-tighter">
                            ₹{totalPrice.toFixed(2)}
                        </h3>
                    </div>
                    <div className="text-right pb-1">
                        <p className="text-[10px] font-medium text-white/50 tracking-wide uppercase italic">Tax Included ✓</p>
                    </div>
                </div>
              </div>

              {/* Decorative Hole Punches */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FAF7F2] rounded-full"></div>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FAF7F2] rounded-full"></div>
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
