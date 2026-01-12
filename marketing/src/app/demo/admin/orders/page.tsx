'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import KitchenOrderCard from '@/components/admin/KitchenOrderCard';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OrderItem {
    _id: string;
    name: string;
    qty: number;
    price: number;
}

interface Order {
    _id: string;
    tableNo: number;
    customerName: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'Pending' | 'Preparing' | 'Served' | 'Paid' | 'Cancelled';
    createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); 
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    if (orders.length === 0) setLoading(true); 
    try {
        const { data } = await api.get('/orders');
        setOrders(data);
    } catch (error) {
        console.error('Error fetching orders:', error);
    } finally {
        setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status: status as any } : o));
    try {
        await api.put(`/orders/${id}/status`, { status });
        fetchOrders();
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Failed to update status');
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Preparing');
  const completedOrders = orders.filter(o => o.status === 'Served');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-['Outfit']">
      {/* Simple Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
            <h1 className="text-3xl font-black text-[#3E2723]">Orders</h1>
            <p className="text-xs font-medium text-[#A68966] mt-1">Live kitchen order stream</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
             <div className="flex-1 lg:flex-none bg-white px-6 py-3 rounded-xl border border-[#F0EDE8] shadow-sm flex items-center gap-6">
                 <div className="flex flex-col">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68966]">New</span>
                     <span className="text-lg font-black text-[#6F4E37]">{orders.filter(o => o.status === 'Pending').length}</span>
                 </div>
                 <div className="flex flex-col">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68966]">Preparing</span>
                     <span className="text-lg font-black text-[#6F4E37]">{orders.filter(o => o.status === 'Preparing').length}</span>
                 </div>
             </div>
             
             <Button 
                variant="outline" 
                onClick={fetchOrders} 
                className="h-12 px-4 rounded-xl border-[#F0EDE8] bg-white text-xs font-bold uppercase tracking-widest"
             >
                <RefreshCcw className={cn("w-4 h-4 mr-2", loading ? "animate-spin" : "")} /> 
                Refresh
             </Button>
        </div>
      </div>

      {/* Main Order Stream */}
      <div className="pb-10">
          <AnimatePresence mode='wait'>
          {orders.length === 0 && !loading ? (
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-20 flex flex-col items-center justify-center text-center px-10 border-2 border-dashed border-[#F0EDE8] rounded-2xl"
             >
                <h3 className="text-xl font-bold text-[#3E2723] mb-1">No Orders</h3>
                <p className="text-xs text-[#A68966]">Waiting for incoming traffic...</p>
             </motion.div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
                <AnimatePresence mode='popLayout'>
                    {/* Active Cluster */}
                    {pendingOrders.map((order) => (
                        <KitchenOrderCard key={order._id} order={order} onUpdateStatus={updateStatus} />
                    ))}
                    
                    {/* Visual Threshold */}
                    {pendingOrders.length > 0 && completedOrders.length > 0 && (
                        <div className="col-span-full py-10 flex items-center gap-6">
                            <div className="h-[1px] bg-[#F0EDE8] flex-1"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A68966]/50">Served & Ready</span>
                            <div className="h-[1px] bg-[#F0EDE8] flex-1"></div>
                        </div>
                    )}

                    {/* Completion Cluster */}
                    {completedOrders.map((order) => (
                        <motion.div 
                            layout
                            key={order._id} 
                            className="opacity-60 hover:opacity-100 transition-opacity duration-500"
                        >
                            <KitchenOrderCard order={order} onUpdateStatus={updateStatus} />
                        </motion.div>
                    ))}
                </AnimatePresence>
             </div>
          )}
          </AnimatePresence>
      </div>
    </div>
  );
}
