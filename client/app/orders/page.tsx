'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, CheckCircle2, ChefHat, ArrowLeft, RefreshCw, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveStatus = async (savedOrders: any[]) => {
    try {
      const updatedOrders = await Promise.all(
        savedOrders.map(async (order) => {
          if (!order._id) return order;
          try {
            const { data } = await api.get(`/orders/${order._id}`);
            return { ...order, ...data };
          } catch (err) {
            console.error(`Failed to fetch status for order ${order._id}`);
            return order;
          }
        })
      );
      setOrders(updatedOrders);
      // Update localStorage with latest data
      localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
    } catch (error) {
      console.error('Error polling order status', error);
    }
  };

  useEffect(() => {
    const savedOrdersStr = localStorage.getItem('userOrders');
    if (savedOrdersStr) {
      const savedOrders = JSON.parse(savedOrdersStr);
      setOrders(savedOrders);
      fetchLiveStatus(savedOrders);
    }
    setLoading(false);

    // Set up polling interval
    const interval = setInterval(() => {
      const currentOrdersStr = localStorage.getItem('userOrders');
      if (currentOrdersStr) {
        fetchLiveStatus(JSON.parse(currentOrdersStr));
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-5 h-5" />;
      case 'Preparing':
        return <ChefHat className="w-5 h-5" />;
      case 'Served':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Preparing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Served':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-[#6F4E37] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-[#A68966]">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-[100vh] min-h-[100dvh] bg-[#FAF7F2] pb-32">
      {/* Header */}
      <header className="sticky top-0 bg-[#FAF7F2]/98 backdrop-blur-xl z-30 px-4 sm:px-6 py-4 border-b border-[#E7DCCA]/40 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-xl bg-white border border-[#F0EDE8] flex items-center justify-center text-[#6F4E37] hover:bg-[#FAF7F2]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-[#3E2723]">Order History</h1>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] font-bold text-[#A68966] uppercase tracking-[0.1em]">Live Tracking Active</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => {
                const s = localStorage.getItem('userOrders');
                if(s) fetchLiveStatus(JSON.parse(s));
            }}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#A68966] hover:text-[#6F4E37] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Orders List */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <AnimatePresence mode="popLayout">
          {orders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white rounded-[2rem] border border-[#F0EDE8] shadow-sm"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#F0EDE8]/50 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-[#A68966] opacity-30" />
              </div>
              <h3 className="text-xl font-black text-[#3E2723] mb-2 tracking-tight">No Orders Yet</h3>
              <p className="text-sm text-[#A68966] mb-8 font-medium">Your delicious journey starts here!</p>
              <button
                onClick={() => router.push('/')}
                className="px-8 py-3.5 bg-[#6F4E37] text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
              >
                Start Ordering
              </button>
            </motion.div>
          ) : (
            orders.map((order, index) => (
              <motion.div
                key={order._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group bg-white rounded-[2rem] p-5 sm:p-6 border border-[#F0EDE8] shadow-sm hover:shadow-md transition-all relative overflow-hidden"
              >
                {/* Status Bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl flex items-center justify-center ${getStatusColor(order.status || 'Pending')} bg-opacity-10 border-none`}>
                      {getStatusIcon(order.status || 'Pending')}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#A68966] uppercase tracking-widest leading-none mb-1">
                        Order #{order._id?.slice(-6) || 'N/A'}
                      </p>
                      <span className={`text-xs font-black uppercase tracking-tight ${
                        order.status === 'Served' ? 'text-green-600' : 
                        order.status === 'Preparing' ? 'text-blue-600' : 'text-[#A68966]'
                      }`}>
                        {order.status || 'Pending'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-[#A68966] uppercase tracking-widest leading-none mb-1">
                      {new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-sm font-black text-[#3E2723]">
                      {new Date(order.createdAt || Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="bg-[#FAF7F2]/50 rounded-2xl p-4 mb-5 border border-[#F0EDE8]/50">
                    <div className="space-y-2">
                        {order.items?.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                                <span className="text-[#3E2723] font-medium">
                                    <span className="text-[#A68966] font-bold mr-2">{item.qty}x</span>
                                    {item.name}
                                </span>
                                <span className="font-bold text-[#6F4E37]">₹{(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#A68966] uppercase tracking-widest">Total</span>
                        <span className="text-lg font-black text-[#6F4E37]">₹{order.totalAmount?.toFixed(2)}</span>
                    </div>
                    
                    <button 
                        onClick={() => router.push(`/order-success?orderId=${order._id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#6F4E37] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-sm"
                    >
                        Track Real-time
                    </button>
                </div>

                {/* Table Badge */}
                {order.tableNo && (
                    <div className="absolute top-0 right-0 py-1.5 px-4 bg-[#6F4E37] text-white text-[9px] font-black rounded-bl-2xl uppercase tracking-widest">
                        Table {order.tableNo}
                    </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Reorder Floating Action Button */}
      {orders.length > 0 && (
         <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40"
         >
            <button
                onClick={() => router.push('/')}
                className="bg-[#3E2723] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all border border-white/10"
            >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xs">☕</span>
                </div>
                Order Something Else
            </button>
         </motion.div>
      )}
    </div>
  );
}

