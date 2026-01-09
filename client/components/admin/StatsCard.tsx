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
    <Card className="border-none shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-stone-500">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-stone-100 flex items-center justify-center">
            <Icon className="h-4 w-4 text-stone-600" />
        </div>
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold text-stone-900">{value}</div>
        {(trend || description) && (
            <p className="text-xs text-stone-500 mt-1">
                {trend && <span className="text-green-600 font-medium mr-1">{trend}</span>}
                {description}
            </p>
        )}
        </CardContent>
    </Card>
  );
}
