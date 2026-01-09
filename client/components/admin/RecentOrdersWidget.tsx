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
    <Card className="col-span-3 border-none shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]">
        <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <div className="text-sm text-stone-500">
            Latest transaction history.
        </div>
        </CardHeader>
        <CardContent>
        <div className="space-y-6">
                {orders.slice(0, 5).map(order => (
                    <div key={order._id} className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                            {order.customerName.charAt(0)}
                        </div>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none text-stone-900">{order.customerName}</p>
                            <p className="text-xs text-stone-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
                        </div>
                        <div className="ml-auto font-medium text-stone-900">+${order.totalAmount.toFixed(2)}</div>
                    </div>
                ))}
                {orders.length === 0 && <p className="text-sm text-stone-500">No sales yet.</p>}
        </div>
        </CardContent>
    </Card>
  );
}
