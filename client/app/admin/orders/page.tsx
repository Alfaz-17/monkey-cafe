'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { RefreshCcw, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import KitchenOrderCard from '@/components/admin/KitchenOrderCard';
import { AnimatePresence, motion } from 'framer-motion';

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
    const interval = setInterval(fetchOrders, 5000); // Poll faster for KDS
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    // Only show loading on initial fetch to avoid flickering
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
    // Optimistic update
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status: status as any } : o));
    
    try {
        await api.put(`/orders/${id}/status`, { status });
        // Background re-fetch to ensure consistency
        fetchOrders();
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Failed to update status');
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Preparing');
  const completedOrders = orders.filter(o => o.status === 'Served');

  return (
    <div className="space-y-8 h-[calc(100vh-100px)] flex flex-col font-sans">
      <div className="flex justify-between items-center shrink-0">
        <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 flex items-center gap-3">
                <ChefHat className="h-8 w-8 text-orange-600" />
                Kitchen Display
            </h1>
            <p className="text-stone-500 mt-1 font-medium">Live Order Stream</p>
        </div>
        <div className="flex items-center gap-4">
             <div className="bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm flex gap-4 text-sm font-bold text-stone-600">
                 <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Pending: {orders.filter(o => o.status === 'Pending').length}</span>
                 <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Prep: {orders.filter(o => o.status === 'Preparing').length}</span>
             </div>
             <Button variant="outline" onClick={fetchOrders} className="gap-2 rounded-xl">
                <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> 
                Refresh
             </Button>
        </div>
      </div>

      {/* Main Grid: Active Orders */}
      <div className="flex-1 overflow-y-auto pr-2 pb-10">
          {orders.length === 0 && !loading && (
             <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                <ChefHat className="h-24 w-24 text-stone-300 mb-4" />
                <h3 className="text-xl font-bold text-stone-400">All caught up!</h3>
                <p className="text-stone-400">Waiting for new orders...</p>
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
             <AnimatePresence>
                {/* Pending & Preparing first */}
                {pendingOrders.map((order) => (
                    <KitchenOrderCard key={order._id} order={order} onUpdateStatus={updateStatus} />
                ))}
                
                {/* Separator if needed, or just mix them. Let's show Separator if we have both types */}
                {pendingOrders.length > 0 && completedOrders.length > 0 && (
                    <div className="col-span-full py-4 flex items-center gap-4 opacity-50">
                        <div className="h-px bg-stone-300 flex-1"></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Ready to Serve</span>
                        <div className="h-px bg-stone-300 flex-1"></div>
                    </div>
                )}

                {/* Served / Ready */}
                {completedOrders.map((order) => (
                    <div key={order._id} className="opacity-75 hover:opacity-100 transition-opacity">
                        <KitchenOrderCard order={order} onUpdateStatus={updateStatus} />
                    </div>
                ))}
             </AnimatePresence>
          </div>
      </div>
    </div>
  );
}
