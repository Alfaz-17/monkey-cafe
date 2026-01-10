'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    description?: string;
}

export default function StatsCard({ title, value, icon: Icon, trend, description }: StatsCardProps) {
  return (
    <Card className="rounded-xl border border-[#F0EDE8] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-4 px-5">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-[#A68966]">{title}</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-[#FAF7F2] flex items-center justify-center text-[#6F4E37]">
                <Icon className="h-4 w-4" />
            </div>
        </CardHeader>
        <CardContent className="px-5 pb-4">
            <div className="text-2xl font-bold text-[#3E2723]">{value}</div>
            {(trend || description) && (
                <p className="text-[9px] font-bold text-[#A68966] mt-1 uppercase tracking-wider">
                    {trend && <span className="text-green-600 mr-1">{trend}</span>}
                    {description}
                </p>
            )}
        </CardContent>
    </Card>
  );
}
