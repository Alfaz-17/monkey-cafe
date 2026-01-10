'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, ChefHat, CheckCircle2, ArrowLeft, User, RefreshCw } from 'lucide-react';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';

// Helper component for timeline items
const TimelineItem = ({ 
    active, 
    completed, 
    icon: Icon, 
    title, 
    subtitle, 
    isLast 
}: { 
    active: boolean; 
    completed: boolean; 
    icon: any; 
    title: string; 
    subtitle: string; 
    isLast?: boolean;
}) => {
    return (
        <div className="flex gap-4 relative">
            {/* Vertical Line */}
            {!isLast && (
                <div className={`
                    absolute left-[22px] top-12 bottom-[-16px] w-[2px] 
                    ${completed ? 'bg-[#6F4E37]' : 'bg-stone-200 border-l-2 border-dotted border-stone-300 bg-transparent'}
                `} />
            )}
            
            {/* Icon Circle */}
            <div className={`
                relative z-10 w-11 h-11 rounded-full flex items-center justify-center border-4
                transition-all duration-500
                ${active || completed 
                    ? 'bg-[#6F4E37] border-[#FAF7F2] shadow-lg' 
                    : 'bg-stone-200 border-[#FAF7F2] text-stone-400'}
            `}>
                <Icon className={`w-5 h-5 ${active || completed ? 'text-white' : 'text-stone-400'}`} />
            </div>

            {/* Text */}
            <div className={`pb-8 ${active ? 'opacity-100' : 'opacity-60 grayscale'}`}>
                <h3 className={`text-lg font-bold ${active || completed ? 'text-[#3E2723]' : 'text-stone-500'}`}>
                    {title}
                </h3>
                <p className="text-sm text-stone-500 mt-1">{subtitle}</p>
            </div>
        </div>
    );
};

function OrderTrackingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('orderId');
    
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${orderId}`);
                setOrder(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
        
        // Poll every 5 seconds
        const interval = setInterval(fetchOrder, 5000);
        return () => clearInterval(interval);
    }, [orderId]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
             <RefreshCw className="animate-spin text-[#6F4E37]" />
        </div>
    );

    if (!order) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] gap-4">
             <p className="text-stone-500">Order not found.</p>
             <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
    );

    const steps = [
        { status: 'Pending', icon: Clock, title: 'Pending', subtitle: 'Order Received' },
        { status: 'Preparing', icon: ChefHat, title: 'Preparing', subtitle: 'In the Kitchen' },
        { status: 'Served', icon: CheckCircle2, title: 'Served', subtitle: 'Order Served' }
    ];

    // Determine current step index
    const statusMap: Record<string, number> = { 'Pending': 0, 'Preparing': 1, 'Served': 2, 'Paid': 3, 'Cancelled': -1 };
    const currentStep = statusMap[order.status] ?? 0;

    return (
        <div className="min-h-screen bg-[#FAF7F2]">
            {/* Header */}
            <header className="bg-[#5D4037] text-white p-6 rounded-b-[2rem] shadow-lg sticky top-0 z-20">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => router.push('/')} className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="text-center">
                        <h1 className="text-lg font-bold tracking-wide">Order #{orderId?.slice(-4)}</h1>
                        <p className="text-white/70 text-sm">Table {order.tableNo}</p>
                    </div>
                    <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </header>

            <main className="p-6">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm shadow-[#E7DCCA]">
                    {steps.map((step, idx) => (
                        <TimelineItem 
                            key={step.title}
                            title={step.title}
                            subtitle={step.subtitle}
                            icon={step.icon}
                            active={idx === currentStep}
                            completed={idx < currentStep}
                            isLast={idx === steps.length - 1}
                        />
                    ))}
                </div>

                <div className="mt-8">
                     <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                        <h3 className="text-[#3E2723] font-bold mb-2">Order Summary</h3>
                        <p className="flex justify-between text-sm text-stone-600">
                            <span>Total Amount</span>
                            <span className="font-bold">${order.totalAmount?.toFixed(2)}</span>
                        </p>
                     </div>
                </div>

                <p className="text-center text-[#8D6E63] text-sm font-medium mt-8">
                    We're preparing your order. Sit tight!
                </p>

                {/* Hero Image Bottom */}
                <div className="mt-6 rounded-2xl overflow-hidden shadow-lg border border-stone-200">
                    <img 
                        src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop" 
                        alt="Chef Cooking" 
                        className="w-full h-48 object-cover" 
                    />
                </div>
            </main>
        </div>
    );
}

export default function OrderTrackingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderTrackingContent />
        </Suspense>
    );
}
