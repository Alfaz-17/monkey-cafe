'use client';

import { motion } from 'framer-motion';
import { Clock, Check, ChefHat, X, Coffee, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface KitchenOrderCardProps {
    order: Order;
    onUpdateStatus: (id: string, status: string) => void;
}

export default function KitchenOrderCard({ order, onUpdateStatus }: KitchenOrderCardProps) {
  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Pending': return 'border-yellow-400 bg-yellow-50/50';
          case 'Preparing': return 'border-blue-500 bg-blue-50/50';
          case 'Served': return 'border-green-500 bg-green-50/50';
          case 'Cancelled': return 'border-red-200 bg-red-50/50 opacity-60';
          default: return 'border-stone-200 bg-white';
      }
  };

  const timeElapsed = (dateString: string) => {
      const diff = Date.now() - new Date(dateString).getTime();
      const mins = Math.floor(diff / 60000);
      return `${mins}m ago`;
  };

  return (
    <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="h-full"
    >
        <Card className={cn("overflow-hidden border-t-4 rounded-2xl shadow-sm h-full flex flex-col font-['Outfit']", 
             order.status === 'Pending' ? "border-yellow-400" :
             order.status === 'Preparing' ? "border-blue-500" :
             order.status === 'Served' ? "border-green-500" :
             "border-gray-200"
        )}>
            <CardHeader className="p-5 border-b border-gray-100/50 flex flex-row justify-between items-start space-y-0">
                <div className="flex gap-3">
                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center font-bold text-xl", 
                        order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                        order.status === 'Preparing' ? 'bg-blue-50 text-blue-700' :
                        'bg-gray-50 text-gray-700'
                    )}>
                        {order.tableNo}
                    </div>
                    <div>
                        <h3 className="font-bold text-[#3E2723] leading-tight">{order.customerName}</h3>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A68966] mt-1">
                            <Clock className="w-3 h-3" />
                            {timeElapsed(order.createdAt)}
                        </div>
                    </div>
                </div>
                {order.status === 'Pending' && <Badge variant="outline" className="text-yellow-700 bg-yellow-50 border-yellow-200 text-[9px] uppercase font-bold py-0.5">New</Badge>}
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-5">
                <div className="flex-1 space-y-3 mb-6">
                    {order.items.map((item) => (
                        <div key={item._id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-[#6F4E37]">{item.qty}x</span>
                                <span className="text-sm text-[#3E2723] font-medium">{item.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-2 mt-auto">
                    {order.status === 'Pending' && (
                        <div className="flex gap-2">
                             <Button 
                                onClick={() => onUpdateStatus(order._id, 'Cancelled')}
                                variant="outline"
                                className="w-12 h-12 rounded-lg text-red-500 border-gray-200 hover:bg-red-50"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                            <Button 
                                onClick={() => onUpdateStatus(order._id, 'Preparing')}
                                className="flex-1 bg-[#6F4E37] hover:bg-[#3E2723] text-white font-bold uppercase text-[10px] h-12 rounded-lg shadow-sm"
                            >
                                Mark Preparing
                            </Button>
                        </div>
                    )}
                    {order.status === 'Preparing' && (
                        <div className="flex gap-2">
                             <Button 
                                onClick={() => onUpdateStatus(order._id, 'Cancelled')}
                                variant="outline"
                                className="w-12 h-12 rounded-lg text-red-500 border-gray-200 hover:bg-red-50"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                            <Button 
                                onClick={() => onUpdateStatus(order._id, 'Served')}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold uppercase text-[10px] h-12 rounded-lg shadow-sm"
                            >
                                Mark Ready
                            </Button>
                        </div>
                    )}
                     {order.status === 'Served' && (
                        <Button 
                            onClick={() => onUpdateStatus(order._id, 'Paid')}
                            className="w-full bg-[#3E2723] hover:bg-black text-white font-bold uppercase text-[10px] h-12 rounded-lg shadow-sm"
                        >
                            Complete Order
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    </motion.div>
  );
}
