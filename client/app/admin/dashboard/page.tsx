'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingBag, Users, Utensils, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import RecentOrdersWidget from '@/components/admin/RecentOrdersWidget';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeTables: 0, 
    recentOrders: []
  });

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const { data } = await api.get('/orders');
            const revenue = data.reduce((acc: number, order: any) => acc + order.totalAmount, 0);
            const active = data.filter((o: any) => o.status !== 'Paid' && o.status !== 'Cancelled').length;
            
            setStats({
                totalOrders: data.length,
                totalRevenue: revenue,
                activeTables: active,
                recentOrders: data
            });
        } catch (error) {
            console.error(error);
        }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900">Control Tower</h1>
          <p className="text-stone-500">Real-time overview of your cafe performance.</p>
      </div>
      
      {/* 1. Key Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
            title="Total Revenue" 
            value={`$${stats.totalRevenue.toFixed(2)}`} 
            icon={DollarSign} 
            description="Lifetime revenue"
        />
        <StatsCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon={ShoppingBag} 
            description="Lifetime orders"
        />
        <StatsCard 
            title="Live Orders" 
            value={stats.activeTables} 
            icon={Utensils} 
            description="Currently preparing/serving"
        />
        <StatsCard 
            title="Avg. Order Value" 
            value={`$${stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : '0.00'}`} 
            icon={TrendingUp} 
            description="Per customer"
        />
      </div>

      {/* 2. Charts & Lists Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Placeholder Chart Widget (Taking up 4 columns) */}
        <Card className="col-span-4 border-none shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
           <div className="h-[300px] flex items-center justify-center text-stone-400 bg-stone-50 rounded-xl m-4 border border-dashed border-stone-200">
               <div className="text-center">
                   <TrendingUp className="h-10 w-10 mx-auto mb-2 opacity-20" />
                   <p>Visualization Chart Area</p>
                   <p className="text-xs opacity-60">(Recharts Integration Ready)</p>
               </div>
           </div>
          </CardContent>
        </Card>

        {/* Recent Sales Widget (Taking up 3 columns) */}
        <RecentOrdersWidget orders={stats.recentOrders} />
      </div>
    </div>
  );
}
