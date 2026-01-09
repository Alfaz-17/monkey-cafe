'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { RefreshCcw, Search, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
      // Basic Search Logic
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
        // Filter for "History" relevant statuses (Served, Paid, Cancelled)
        // Actually, usually History shows EVERYTHING, or maybe just closed ones.
        // Let's show EVERYTHING but sorted new to old.
        // 'data' is already sorted by backend usually, but let's confirm.
        setOrders(data);
        setFilteredOrders(data);
    } catch (error) {
        console.error('Error fetching history:', error);
    } finally {
        setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'Pending': return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
          case 'Preparing': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Preparing</Badge>;
          case 'Served': return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Served</Badge>;
          case 'Paid': return <Badge className="bg-green-600 text-white hover:bg-green-700">Paid</Badge>;
          case 'Cancelled': return <Badge variant="destructive">Cancelled</Badge>;
          default: return <Badge variant="outline">{status}</Badge>;
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900">Order History</h1>
            <p className="text-stone-500 mt-1">Archive of all past transactions and activities.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
                <Calendar className="mr-2 h-4 w-4" /> Filter Date
            </Button>
            <Button variant="outline" size="sm" onClick={fetchHistory}>
                <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-stone-50/50 pb-4 border-b border-stone-100">
            <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500" />
                <Input
                    type="search"
                    placeholder="Search by customer, id, or table..."
                    className="pl-9 bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </CardHeader>
        <CardContent className="p-0">
             <div className="rounded-md border-none">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Order ID</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Table</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <TableRow key={order._id} className="hover:bg-stone-50/50">
                                    <TableCell className="font-mono text-xs text-stone-500">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-stone-700">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className="text-xs text-stone-400">
                                                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-stone-900">
                                        {order.customerName}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-normal bg-stone-50 text-stone-600">
                                            Tb {order.tableNo}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate text-stone-500 text-sm" title={order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}>
                                        {order.items.length === 1 
                                            ? `${order.items[0].qty}x ${order.items[0].name}`
                                            : `${order.items[0].qty}x ${order.items[0].name} +${order.items.length - 1} more`
                                        }
                                    </TableCell>
                                    <TableCell className="font-bold text-stone-900">
                                        ${order.totalAmount.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(order.status)}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-stone-500">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-xs text-stone-400">
          Showing {filteredOrders.length} records.
      </div>
    </div>
  );
}
