'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, ShoppingBag, Utensils, TrendingUp, Sparkles, Activity } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import RecentOrdersWidget from '@/components/admin/RecentOrdersWidget';
import { motion } from 'framer-motion';

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
    <div className="space-y-8 animate-in fade-in duration-500 font-['Outfit']">
      {/* Simple Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-black text-[#3E2723]">Dashboard</h1>
            <p className="text-xs font-medium text-[#A68966] mt-1">Quick summary of today's performance</p>
        </div>
      </div>
      
      {/* 1. Key Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
            title="Total Revenue" 
            value={`₹${stats.totalRevenue.toFixed(2)}`} 
            icon={IndianRupee} 
            description="Lifetime earnings"
        />
        <StatsCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon={ShoppingBag} 
            description="Total transactions"
        />
        <StatsCard 
            title="Active Orders" 
            value={stats.activeTables} 
            icon={Utensils} 
            description="In preparation"
        />
        <StatsCard 
            title="Avg Order" 
            value={`₹${stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : '0.00'}`} 
            icon={TrendingUp} 
            description="Per ticket"
        />
      </div>

      {/* 2. Charts & Lists Grid */}
      <div className="grid gap-6 lg:grid-cols-7 pb-10">
        
        {/* Simple Chart Widget */}
        <Card className="lg:col-span-4 rounded-2xl border border-[#F0EDE8] shadow-sm bg-white overflow-hidden">
          <div className="p-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#A68966] mb-6">Revenue Analysis</h3>
            <div className="h-[300px] flex items-center justify-center bg-[#FAF7F2] rounded-xl border border-dashed border-[#F0EDE8]">
               <div className="text-center">
                   <TrendingUp className="h-6 w-6 text-[#A68966] mx-auto mb-2" />
                   <p className="text-xs font-bold text-[#3E2723]">Analytics Pending</p>
                   <p className="text-[10px] text-[#A68966] mt-1">Data points will appear here</p>
               </div>
            </div>
          </div>
        </Card>

        {/* Recent Sales Widget (Taking up 3 columns) */}
        <div className="lg:col-span-3">
             <RecentOrdersWidget orders={[...stats.recentOrders].reverse().slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}
