'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '@/lib/api';
import { Trash2, Minus, Plus, ArrowLeft, Loader2, CreditCard, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, totalPrice, clearCart, tableId } = useCart();
  const router = useRouter();
  
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [loading, setLoading] = useState(false);
  // Auto-fill from context if available
  const [tableNo, setTableNo] = useState(tableId || '');

  const handlePlaceOrder = async () => {
    if (!customerName || !customerMobile || !tableNo) {
        // Highlight errors visually in real app
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
                product: item.id,
                name: item.name,
                price: item.price,
                qty: item.qty
            })),
            totalPrice: totalPrice,
        };

        const { data } = await api.post('/orders', orderData);
        clearCart();
        router.push('/order-success');
    } catch (error: any) {
        console.error(error);
        alert(error.response?.data?.message || 'Order Failed');
    } finally {
        setLoading(false);
    }
  };

  const updateQty = (id: string, delta: number) => {
      const item = cartItems.find(x => x.id === id);
      if (!item) return;
      if (item.qty + delta > 0) addToCart({ ...item, qty: delta });
      else removeFromCart(id);
  };

  if (cartItems.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 p-6 text-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-8 rounded-full shadow-lg mb-6"
              >
                <div className="text-6xl">🛒</div>
              </motion.div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Your Tray is Empty</h2>
              <p className="text-stone-500 mb-8 max-w-xs leading-relaxed">Delicious fresh coffee and snacks are just a click away.</p>
              <Button 
                onClick={() => router.back()}
                className="bg-stone-900 text-white px-8 h-12 rounded-full font-bold shadow-lg hover:bg-stone-800"
              >
                  Start Ordering
              </Button>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-40">
      
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-stone-100 p-4 flex items-center gap-4 z-20">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-stone-100">
              <ArrowLeft className="w-5 h-5 text-stone-800" />
          </Button>
          <h1 className="text-lg font-bold text-stone-900">Your Order</h1>
      </header>

      <main className="max-w-md mx-auto p-5 space-y-8">
          
          {/* Order Items */}
          <section className="space-y-4">
              <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest pl-1">Items</h2>
              <AnimatePresence>
              {cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-100 shadow-sm"
                  >
                     <div className="flex items-center gap-4">
                         {item.image ? (
                             <img src={item.image} className="h-16 w-16 rounded-xl object-cover bg-stone-100" />
                         ) : (
                             <div className="h-16 w-16 rounded-xl bg-stone-100" />
                         )}
                         <div>
                            <h3 className="font-bold text-stone-900">{item.name}</h3>
                            <p className="text-stone-500 text-sm font-medium mt-0.5">${(item.price * item.qty).toFixed(2)}</p>
                         </div>
                     </div>
                     <div className="flex flex-col items-center gap-2 bg-stone-50 rounded-lg p-1">
                          <button 
                            onClick={() => updateQty(item.id, 1)}
                            className="h-8 w-8 rounded-md bg-white shadow-sm flex items-center justify-center text-stone-800 hover:text-orange-600 active:scale-95 transition-all"
                          >
                              <Plus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-sm text-stone-900">{item.qty}</span>
                          <button 
                            onClick={() => updateQty(item.id, -1)}
                            className="h-8 w-8 rounded-md bg-white shadow-sm flex items-center justify-center text-stone-800 hover:text-red-600 active:scale-95 transition-all"
                          >
                              {item.qty === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-400" /> : <Minus className="w-4 h-4" />}
                          </button>
                     </div>
                  </motion.div>
              ))}
              </AnimatePresence>
          </section>

          {/* Checkout Form */}
          <section className="space-y-4">
             <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest pl-1">Table Details</h2>
             <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 space-y-5">
                 <div className="space-y-1.5">
                     <label className="text-xs font-semibold text-stone-500 ml-1">Table Number</label>
                     <Input 
                        type="number" 
                        value={tableNo}
                        onChange={e => setTableNo(e.target.value)}
                        className="h-12 rounded-xl bg-stone-50 border-transparent focus:bg-white focus:border-stone-200 transition-all font-bold text-lg"
                        placeholder="e.g. 5"
                        disabled={!!tableId}
                     />
                 </div>
                 <div className="flex gap-4">
                     <div className="space-y-1.5 flex-1">
                         <label className="text-xs font-semibold text-stone-500 ml-1">Name</label>
                         <Input 
                            value={customerName}
                            onChange={e => setCustomerName(e.target.value)}
                            className="h-12 rounded-xl bg-stone-50 border-transparent focus:bg-white focus:border-stone-200 transition-all"
                            placeholder="Your Name"
                         />
                     </div>
                 </div>
                 <div className="space-y-1.5">
                     <label className="text-xs font-semibold text-stone-500 ml-1">WhatsApp (Optional)</label>
                     <Input 
                        type="tel"
                        value={customerMobile}
                        onChange={e => setCustomerMobile(e.target.value)}
                        className="h-12 rounded-xl bg-stone-50 border-transparent focus:bg-white focus:border-stone-200 transition-all"
                        placeholder="+1 234..."
                     />
                 </div>
             </div>
          </section>

          {/* Summary */}
          <div className="py-2">
            <div className="flex justify-between items-center text-stone-500 text-sm mb-2">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-stone-500 text-sm mb-4">
                <span>Service Fee</span>
                <span>$0.00</span>
            </div>
            <Separator className="bg-stone-200 my-4" />
            <div className="flex justify-between items-center">
                <span className="font-bold text-stone-900 text-lg">Total</span>
                <span className="font-extrabold text-stone-900 text-2xl">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-stone-400 mt-2 text-right">Inclusive of all taxes</p>
          </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-stone-100 z-30">
        <div className="max-w-md mx-auto">
             <Button 
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-200 font-bold text-lg flex items-center justify-center gap-2 group transition-all hover:scale-[1.02]"
             >
                {loading ? <Loader2 className="animate-spin" /> : (
                    <>
                    Confirm Order <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
             </Button>
        </div>
      </div>
    </div>
  );
}
