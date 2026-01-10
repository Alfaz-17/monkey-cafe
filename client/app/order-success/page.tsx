'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChefHat, CheckCircle2, ArrowLeft, User, RefreshCw, ShoppingBag, Sparkles, MapPin, ReceiptText } from 'lucide-react';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

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
        <div className="flex gap-6 relative">
            {/* Vertical Line */}
            {!isLast && (
                <div className={`
                    absolute left-[24px] top-12 bottom-[-16px] w-[3px] rounded-full
                    ${completed ? 'bg-[#6F4E37]' : 'bg-[#E7DCCA] opacity-30'}
                `} />
            )}
            
            {/* Icon Circle */}
            <div className={`
                relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center border-b-4
                transition-all duration-700
                ${active || completed 
                    ? 'bg-[#6F4E37] border-[#3E2723]/30 shadow-xl shadow-[#6F4E37]/20 scale-110' 
                    : 'bg-white border-[#F0EDE8] text-[#A68966]'}
            `}>
                <Icon className={`w-5 h-5 ${active || completed ? 'text-white' : 'text-[#A68966]'}`} />
                {active && (
                    <motion.div 
                        layoutId="active-glow"
                        className="absolute -inset-2 rounded-[1.5rem] bg-[#6F4E37]/10 -z-10"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                )}
            </div>

            {/* Text */}
            <div className={`pb-10 transition-all duration-500 ${active ? 'opacity-100 scale-105 origin-left' : 'opacity-40 grayscale'}`}>
                <h3 className={`text-xl font-black font-['Outfit'] tracking-tight ${active || completed ? 'text-[#3E2723]' : 'text-[#8D7F75]'}`}>
                    {title}
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A68966] mt-1">{subtitle}</p>
            </div>
        </div>
    );
};

function OrderTrackingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('orderId');
    const { tableId } = useCart();
    
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
        const interval = setInterval(fetchOrder, 5000);
        return () => clearInterval(interval);
    }, [orderId]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
             <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-16 h-16 bg-white rounded-[1.5rem] shadow-xl flex items-center justify-center"
             >
                <span className="text-3xl">☕</span>
             </motion.div>
        </div>
    );

    if (!order) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] p-8 text-center">
             <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-[#A68966] opacity-20" />
             </div>
             <h2 className="text-2xl font-black text-[#3E2723] mb-2 tracking-tight">Order Not Found</h2>
             <p className="text-[#8D7F75] mb-8 max-w-[240px] font-medium uppercase text-[10px] tracking-widest">It seems this order has vanished into the roast.</p>
             <Button 
                onClick={() => router.push(tableId ? `/menu/${tableId}` : '/')}
                className="bg-[#6F4E37] hover:bg-[#5A3E2B] text-white px-8 h-12 rounded-2xl font-black uppercase tracking-widest shadow-lg"
             >
                Explore Menu
             </Button>
        </div>
    );

    const steps = [
        { status: 'Pending', icon: Clock, title: 'Confirmed', subtitle: 'Order Received' },
        { status: 'Preparing', icon: ChefHat, title: 'In Creation', subtitle: 'Crafting your flavors' },
        { status: 'Served', icon: CheckCircle2, title: 'Delivered', subtitle: 'Ready for you' }
    ];

    const statusMap: Record<string, number> = { 'Pending': 0, 'Preparing': 1, 'Served': 2, 'Paid': 3, 'Cancelled': -1 };
    const currentStep = statusMap[order.status] ?? 0;

    return (
        <div className="min-h-screen bg-[#FAF7F2] font-['Outfit'] pb-20">
            {/* Achievement Toast-style Header */}
            <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#5A3E2B] text-white py-3 px-6 text-center text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2"
            >
                <Sparkles className="w-3 h-3 text-yellow-400" />
                Order Successfully Sent
                <Sparkles className="w-3 h-3 text-yellow-400" />
            </motion.div>

            {/* Premium Header */}
            <header className="sticky top-0 bg-[#FAF7F2]/80 backdrop-blur-xl z-30 px-6 py-5 border-b border-[#E7DCCA]/40 mb-6 font-['Outfit'] w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => router.push(tableId ? `/menu/${tableId}` : '/')} 
                            className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#6F4E37] hover:bg-[#6F4E37] hover:text-white transition-all active:scale-90 border border-[#F0EDE8]"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black tracking-tighter leading-none">Status</h1>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68966] mt-1">Live Updates</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="px-6 space-y-10 scrollbar-hide">
                
                {/* Visual Status Card */}
                <div className="bg-white p-8 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] border border-[#F0EDE8]">
                    <div className="flex items-center justify-between mb-8 opacity-40">
                        <div className="flex items-center gap-2">
                             <MapPin className="w-3 h-3 text-[#6F4E37]" />
                             <span className="text-[10px] font-black uppercase tracking-widest">Table {order.tableNo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <ReceiptText className="w-3 h-3 text-[#6F4E37]" />
                             <span className="text-[10px] font-black uppercase tracking-widest">#{orderId?.slice(-4)}</span>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
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
                </div>

                {/* Luxury Summary Card */}
                <section className="bg-[#5D4037] p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Sparkles className="w-20 h-20" />
                    </div>
                    
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xs font-black uppercase text-white/40 tracking-[0.2em] mb-1">Customer</h3>
                                <p className="text-xl font-black tracking-tight">{order.customerName}</p>
                            </div>
                            <div className="text-right">
                                <h3 className="text-xs font-black uppercase text-white/40 tracking-[0.2em] mb-1">Amount</h3>
                                <p className="text-xl font-black tracking-tight">${order.totalAmount?.toFixed(2)}</p>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Expected Time</span>
                            <span className="text-sm font-black flex items-center gap-2">
                                <Clock className="w-4 h-4 text-white/60" /> 10-15 MINS
                            </span>
                        </div>
                    </div>

                    {/* Decorative Hole Punches */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FAF7F2] rounded-full"></div>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FAF7F2] rounded-full"></div>
                </section>

                <div className="text-center space-y-3">
                    <p className="text-[#3E2723] text-lg font-black tracking-tight">
                        We're roasting it right for you.
                    </p>
                    <p className="text-[#A68966] text-[10px] font-black uppercase tracking-[0.3em]">
                        Freshly roasted • Always perfect
                    </p>
                </div>

                {/* Aesthetic Image */}
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white mb-10">
                    <img 
                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop" 
                        alt="Coffee Art" 
                        className="w-full h-64 object-cover hover:scale-110 transition-transform duration-1000" 
                    />
                </div>
            </main>
        </div>
    );
}

export default function OrderTrackingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
                 <RefreshCw className="animate-spin text-[#6F4E37]" />
            </div>
        }>
            <OrderTrackingContent />
        </Suspense>
    );
}
