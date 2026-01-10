'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OrderMock {
    _id: string;
    customerName: string;
    totalAmount: number;
    status: string;
    createdAt: string;
}

export default function RecentOrdersWidget({ orders }: { orders: OrderMock[] }) {
  return (
    <Card className="col-span-1 lg:col-span-3 rounded-xl border border-[#F0EDE8] shadow-sm font-['Outfit']">
        <CardHeader className="pb-3 pt-6 px-6">
            <CardTitle className="text-base font-bold text-[#3E2723]">Recent Sales</CardTitle>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#A68966] mt-1">Latest transactions</p>
        </CardHeader>
        <CardContent className="px-6 pb-6">
            <div className="space-y-5">
                {orders.slice(0, 5).map(order => (
                    <div key={order._id} className="flex items-center">
                        <div className="h-9 w-9 rounded-lg bg-[#FAF7F2] text-[#6F4E37] flex items-center justify-center font-bold text-xs border border-[#F0EDE8]">
                            {order.customerName.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-bold text-[#3E2723]">{order.customerName}</p>
                            <p className="text-[9px] font-medium text-[#A68966] uppercase">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="ml-auto font-bold text-sm text-[#3E2723]">+${order.totalAmount.toFixed(2)}</div>
                    </div>
                ))}
                {orders.length === 0 && (
                    <div className="py-8 text-center text-[#A68966]/40">
                         <p className="text-xs font-bold uppercase tracking-widest">No sales yet</p>
                    </div>
                )}
            </div>
        </CardContent>
    </Card>
  );
}
