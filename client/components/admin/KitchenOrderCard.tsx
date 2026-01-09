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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
        <Card className={cn("overflow-hidden border-l-[6px] shadow-sm transition-all hover:shadow-md h-full flex flex-col", getStatusColor(order.status))}>
            <CardHeader className="bg-white/50 pb-2 border-b border-stone-100 flex flex-row justify-between items-start space-y-0">
                <div className="flex gap-3 items-center">
                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center font-black text-2xl shadow-inner", 
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-stone-100 text-stone-700'
                    )}>
                        {order.tableNo}
                    </div>
                    <div>
                        <h3 className="font-bold text-stone-900 leading-none">{order.customerName}</h3>
                        <div className="flex items-center gap-1 text-xs text-stone-500 font-medium mt-1">
                            <Clock className="w-3 h-3" />
                            {timeElapsed(order.createdAt)}
                        </div>
                    </div>
                </div>
                {order.status === 'Pending' && <Badge className="bg-yellow-500 hover:bg-yellow-600 border-none animate-pulse">New</Badge>}
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col pt-4 bg-white/60">
                <div className="flex-1 space-y-3 mb-4">
                    {order.items.map((item) => (
                        <div key={item._id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <span className={cn("h-6 w-6 rounded-md flex items-center justify-center text-xs font-bold",
                                    order.status === 'Pending' ? "bg-yellow-100 text-yellow-700" : "bg-stone-100 text-stone-600"
                                )}>
                                    {item.qty}
                                </span>
                                <span className="font-semibold text-stone-800 text-sm group-hover:text-stone-900">{item.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Single-Tap Actions */}
                <div className="grid grid-cols-1 gap-2 mt-auto">
                    {order.status === 'Pending' && (
                        <div className="grid grid-cols-4 gap-2">
                             <Button 
                                onClick={() => onUpdateStatus(order._id, 'Cancelled')}
                                variant="outline"
                                className="col-span-1 h-12 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                                title="Reject/Cancel"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                            <Button 
                                onClick={() => onUpdateStatus(order._id, 'Preparing')}
                                className="col-span-3 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-200"
                            >
                                Accept & Cook <ChefHat className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    )}
                    {order.status === 'Preparing' && (
                        <div className="grid grid-cols-4 gap-2">
                             <Button 
                                onClick={() => onUpdateStatus(order._id, 'Cancelled')}
                                variant="outline"
                                className="col-span-1 h-12 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                                title="Cancel Order"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                            <Button 
                                onClick={() => onUpdateStatus(order._id, 'Served')}
                                className="col-span-3 bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-green-200"
                            >
                                Ready to Serve <Check className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    )}
                     {order.status === 'Served' && (
                        <div className="flex gap-2">
                            <Button 
                                onClick={() => onUpdateStatus(order._id, 'Paid')}
                                className="flex-1 bg-stone-800 hover:bg-stone-900 text-white font-bold h-12 rounded-xl"
                            >
                                Mark Paid <DollarSign className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    </motion.div>
  );
}
