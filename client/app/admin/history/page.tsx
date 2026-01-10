'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { RefreshCcw, Search, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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

export default function HistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
      if (!searchTerm) {
          setFilteredOrders(orders);
      } else {
          const lower = searchTerm.toLowerCase();
          setFilteredOrders(orders.filter(o => 
              o.customerName.toLowerCase().includes(lower) || 
              o._id.toLowerCase().includes(lower) ||
              o.tableNo.toString().includes(lower)
          ));
      }
  }, [searchTerm, orders]);

  const fetchHistory = async () => {
    setLoading(true); 
    try {
        const { data } = await api.get('/orders');
        setOrders(data);
        setFilteredOrders(data);
    } catch (error) {
        console.error('Error fetching history:', error);
    } finally {
        setLoading(false);
    }
  };

  const statusMap: Record<string, { label: string; bg: string; text: string }> = {
      'Pending': { label: 'In Queue', bg: 'bg-yellow-50', text: 'text-yellow-700' },
      'Preparing': { label: 'Cooking', bg: 'bg-blue-50', text: 'text-blue-700' },
      'Served': { label: 'Delivered', bg: 'bg-orange-50', text: 'text-orange-700' },
      'Paid': { label: 'Settled', bg: 'bg-green-600', text: 'text-white' },
      'Cancelled': { label: 'Voided', bg: 'bg-red-500', text: 'text-white' },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-['Outfit']">
      {/* Simple Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-black text-[#3E2723]">History</h1>
            <p className="text-xs font-medium text-[#A68966] mt-1">View past orders and records</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A68966] opacity-50" />
                <Input
                    type="search"
                    placeholder="Search orders..."
                    className="h-10 pl-10 pr-4 rounded-lg bg-white border-[#F0EDE8] text-sm font-bold w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Button 
                variant="outline" 
                size="icon" 
                onClick={fetchHistory}
                className="h-10 w-10 rounded-lg border-[#F0EDE8] bg-white"
            >
                <RefreshCcw className={cn("h-4 w-4 text-[#6F4E37]", loading ? "animate-spin" : "")} />
            </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <Card className="hidden lg:block rounded-xl border border-[#F0EDE8] shadow-sm overflow-hidden bg-white">
          <div className="w-full overflow-x-auto">
              <table className="w-full text-sm">
                  <thead>
                      <tr className="border-b border-gray-50 bg-[#FAF7F2]/30">
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#A68966]">Order ID</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#A68966]">Customer</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#A68966]">Table</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#A68966]">Date & Time</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#A68966]">Amount</th>
                          <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#A68966]">Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredOrders.map((order) => (
                          <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                              <td className="px-6 py-4 font-mono text-[10px] text-[#A68966]">
                                  #{order._id.slice(-6).toUpperCase()}
                              </td>
                              <td className="px-6 py-4 font-bold text-[#3E2723]">
                                  {order.customerName}
                              </td>
                              <td className="px-6 py-4">
                                  <span className="h-7 w-7 bg-[#FAF7F2] rounded-md flex items-center justify-center text-[11px] font-bold text-[#6F4E37]">
                                      {order.tableNo}
                                  </span>
                              </td>
                              <td className="px-6 py-4">
                                  <div className="flex flex-col">
                                      <span className="font-bold text-xs text-[#3E2723]">{new Date(order.createdAt).toLocaleDateString()}</span>
                                      <span className="text-[10px] text-[#A68966]">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                  </div>
                              </td>
                              <td className="px-6 py-4 font-bold text-[#6F4E37]">
                                  ${order.totalAmount.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <Badge className={cn("px-2 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-wider border-none shadow-none", 
                                      order.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                      order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                      'bg-gray-100 text-gray-700'
                                  )}>
                                      {order.status}
                                  </Badge>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </Card>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
          <AnimatePresence mode='popLayout'>
              {filteredOrders.map((order) => (
                  <motion.div 
                    layout
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                      <Card className="rounded-xl border border-[#F0EDE8] p-4 bg-white shadow-sm flex flex-col gap-3">
                          <div className="flex justify-between items-start">
                              <div>
                                  <span className="text-[9px] font-bold text-[#A68966] uppercase">#{order._id.slice(-6).toUpperCase()}</span>
                                  <h3 className="text-sm font-bold text-[#3E2723]">{order.customerName}</h3>
                              </div>
                              <Badge className={cn("px-2 py-0.5 rounded-md font-bold text-[9px] uppercase border-none", 
                                  order.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                  order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                  'bg-gray-100 text-gray-700'
                              )}>
                                  {order.status}
                              </Badge>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                              <div>
                                  <span className="text-sm font-bold text-[#6F4E37]">${order.totalAmount.toFixed(2)}</span>
                                  <span className="text-[10px] text-[#A68966] ml-2 font-medium">Table {order.tableNo}</span>
                              </div>
                              <div className="text-right text-[10px] text-[#A68966] font-medium">
                                  {new Date(order.createdAt).toLocaleDateString()}
                              </div>
                          </div>
                      </Card>
                  </motion.div>
              ))}
          </AnimatePresence>
      </div>

      {filteredOrders.length === 0 && !loading && (
          <div className="py-20 text-center border-2 border-dashed border-[#F0EDE8] rounded-2xl">
              <Calendar className="w-10 h-10 mx-auto mb-3 text-[#A68966] opacity-20" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#A68966]">No records found</p>
          </div>
      )}
      
      <div className="text-center pt-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68966] opacity-30">
              Total {filteredOrders.length} records found
          </span>
      </div>
    </div>
  );
}
