'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, LayoutDashboard, QrCode, Zap, TrendingUp, Sparkles, ChevronLeft, ChevronRight, Plus, ShoppingCart, CheckCircle2, History, Coffee, IndianRupee, Bell, MessageCircle, X, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { LaptopFrame, PhoneFrame } from "@/components/DeviceFrames";



export default function DemoPage() {
    const router = useRouter();
    const { setTableId } = useCart();
    const [manualTable, setManualTable] = useState('');
    const [currentStep, setCurrentStep] = useState(0); // Master Flow State
    const managementSuiteRef = useRef<HTMLDivElement>(null);
    
    const [activePerspective, setActivePerspective] = useState<'guest' | 'staff'>('guest');
    
    const steps = [
        { id: 'start', label: 'Welcome', icon: <Sparkles className="w-4 h-4"/>, title: 'The Master Showcase', desc: 'Experience the entire AI Menu System ecosystem in one cohesive journey.' },
        { id: 'order', label: 'Guest Order', icon: <Smartphone className="w-4 h-4"/>, title: '1. The Digital Concierge', desc: 'Your guests experience a frictionless, beautiful menu that drives up average order value.' },
        { id: 'kitchen', label: 'Kitchen Sync', icon: <Zap className="w-4 h-4"/>, title: '2. Zero-Leakage Kitchen', desc: 'Orders flow instantly to the kitchen. No missed tickets, no manual entry, total precision.' },
        { id: 'analytics', label: 'Admin Intelligence', icon: <LayoutDashboard className="w-4 h-4"/>, title: '3. The Owner Command Center', desc: 'Real-time revenue tracking, efficiency metrics, and AI-driven growth predictions.' },
        { id: 'roi', label: 'ROI Results', icon: <TrendingUp className="w-4 h-4"/>, title: '4. The Professional Result', desc: 'See how AI Menu System transforms operational chaos into scalable profit.' },
    ];

    const [cartItems, setCartItems] = useState<{name: string, price: string, img: string, modifiers: string[]}[]>([]);
    const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [kitchenStatus, setKitchenStatus] = useState('Idle');
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [orderStatus, setOrderStatus] = useState<'Pending' | 'Preparing' | 'Ready' | 'Served'>('Pending');
    const [notifications, setNotifications] = useState<string[]>([]);
    const [showWaiterCall, setShowWaiterCall] = useState(false);
    const [waiterRequests, setWaiterRequests] = useState<string[]>([]);
    const [guestScreen, setGuestScreen] = useState<'menu' | 'status'>('menu');

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleGo = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualTable) {
            setTableId(manualTable);
            setCurrentStep(1);
            // In a real scenario, we might iframe the menu, 
            // but for this demo, we'll keep the frames as high-fidelity visual placeholders or actual iframes if possible.
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] pb-20">
            <Navbar />
            <div className="container mx-auto px-6">
                
                {/* Demo Progress Bar */}
                <div className="pt-24 md:pt-32 mb-12 max-w-4xl mx-auto">
                    <div className="overflow-x-auto pb-4 px-2 -mx-2 no-scrollbar">
                        <div className="flex justify-between items-center relative min-w-[600px]">
                            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-zinc-100 -z-10" />
                            <div 
                                className="absolute left-0 top-1/2 h-0.5 bg-[#6F4E37] -z-10 transition-all duration-700" 
                                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                            />
                            
                            {steps.map((step, i) => (
                                <button 
                                    key={step.id} 
                                    onClick={() => setCurrentStep(i)}
                                    className="flex flex-col items-center gap-3 group relative z-10 flex-shrink-0"
                                >
                                    <motion.div 
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                                            i <= currentStep ? 'bg-[#6F4E37] border-[#6F4E37] text-white shadow-lg' : 'bg-white border-zinc-200 text-zinc-400 group-hover:border-zinc-300'
                                        }`}
                                        animate={i === currentStep ? { scale: [1, 1.1, 1] } : {}}
                                        transition={{ repeat: i === currentStep ? Infinity : 0, duration: 2 }}
                                    >
                                        {step.icon}
                                    </motion.div>
                                    <div className="text-center absolute -bottom-8 whitespace-nowrap">
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${i <= currentStep ? 'text-[#6F4E37]' : 'text-zinc-400'}`}>{step.label}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dynamic Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 pt-10">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        <h1 className="text-4xl md:text-6xl font-black font-outfit">
                            {steps[currentStep].title.split('.')[0]}
                            {steps[currentStep].title.includes('.') && <span className="text-[#6F4E37]">. {steps[currentStep].title.split('.')[1]}</span>}
                        </h1>
                        <p className="text-zinc-500 text-lg font-medium">
                            {steps[currentStep].desc}
                        </p>
                    </motion.div>
                </div>

                {/* Perspective Switcher (Mobile Only) */}
                <div className="lg:hidden sticky top-20 z-[60] px-4 mb-8">
                    <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-zinc-200 flex gap-2">
                        <button 
                            onClick={() => setActivePerspective('guest')}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activePerspective === 'guest' ? 'bg-[#6F4E37] text-white shadow-lg' : 'text-zinc-400 hover:text-zinc-600'}`}
                        >
                            Guest View
                        </button>
                        <button 
                            onClick={() => setActivePerspective('staff')}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activePerspective === 'staff' ? 'bg-zinc-900 text-white shadow-lg' : 'text-zinc-400 hover:text-zinc-600'}`}
                        >
                            Admin Panel
                        </button>
                    </div>
                </div>

                {/* Interactive Demo Area */}
                <div className="mt-12 md:mt-20 px-4 md:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                        
                        {/* Left Side: Guest Experience */}
                        <div className={`space-y-8 transition-all duration-500 ${activePerspective === 'guest' || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 'block' : 'hidden lg:block'} ${currentStep === 1 || currentStep === 0 ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}`}>
                            <div className="flex justify-between items-end">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black font-outfit text-[#3E2723]">GUEST View</h2>
                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none">Smartphone Experience</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-black text-zinc-400 uppercase">Live Demo</span>
                                </div>
                            </div>
                            
                            <PhoneFrame className={currentStep === 1 ? 'ring-8 ring-[#6F4E37]/10' : ''}>
                                <div className="h-full flex flex-col bg-[#FAFAFA]">
                                    {/* Mini App Header */}
                                    <div className="p-4 bg-white border-b border-zinc-100 flex justify-between items-center">
                                        <div className="font-outfit font-black text-sm">AI Menu System</div>
                                        <div className="relative">
                                            <ShoppingCart className="w-4 h-4 text-zinc-400" />
                                            {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-[#6F4E37] text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{cartItems.length}</span>}
                                        </div>
                                    </div>

                                    {currentStep === 0 ? (
                                        <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-10 bg-[#FAF7F2]">
                                            <div className="w-20 h-20 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mx-auto border border-[#F0EDE8]">
                                                <Coffee className="w-10 h-10 text-[#6F4E37]" />
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-3xl font-black font-outfit text-[#3E2723]">AI Menu System</h3>
                                                <p className="text-xs text-[#A68966] font-medium leading-relaxed">Please scan the QR code on your table <br /> or click below to enter.</p>
                                            </div>
                                            <Button 
                                                onClick={() => {
                                                    setCurrentStep(1);
                                                    setGuestScreen('menu');
                                                }}
                                                className="w-full h-14 rounded-[1.5rem] bg-[#6F4E37] text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-[#6F4E37]/20 border-b-4 border-[#3E2723]/30"
                                            >
                                                Enter Cafe
                                            </Button>
                                        </div>
                                    ) : guestScreen === 'menu' ? (
                                        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#FAF7F2] relative">
                                            {orderPlaced && (
                                                <motion.button
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    onClick={() => setGuestScreen('status')}
                                                    className="absolute top-4 right-4 z-40 bg-zinc-900 text-white px-3 py-2 rounded-full text-[8px] font-black uppercase flex items-center gap-2 shadow-xl"
                                                >
                                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                    Track Status
                                                </motion.button>
                                            )}
                                            
                                            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                                {['Coffee', 'Burgers', 'Desserts'].map((cat, i) => (
                                                    <span key={cat} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-sm ${i === 0 ? 'bg-[#6F4E37] text-white' : 'bg-white text-[#A68966] border border-[#F0EDE8]'}`}>
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                            
                                            <div className="space-y-4">
                                                {[
                                                    { name: 'Caramel Latte', price: '₹380', desc: 'Rich espresso with steamed milk and caramel.', img: '☕' },
                                                    { name: 'Spicy Zinger Burger', price: '₹540', desc: 'Crunchy chicken fillet with spicy sauce.', img: '🍔' },
                                                    { name: 'Double Choco Brownie', price: '₹420', desc: 'Warm brownie with vanilla ice cream.', img: '🍰' }
                                                ].map((item) => (
                                                    <div key={item.name} className="p-5 bg-white rounded-[2rem] border border-[#F0EDE8] flex flex-col gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-4xl w-16 h-16 bg-[#FAF7F2] rounded-2xl flex items-center justify-center">{item.img}</div>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-black text-[#3E2723]">{item.name}</p>
                                                                <p className="text-[10px] text-[#A68966] font-bold leading-tight mt-1">{item.desc}</p>
                                                                <p className="text-sm font-black text-[#6F4E37] mt-2">{item.price}</p>
                                                            </div>
                                                        </div>
                                                        <Button 
                                                            onClick={() => {
                                                                setSelectedItem(item);
                                                                setShowCustomizer(true);
                                                            }}
                                                            className="w-full h-10 rounded-xl bg-[#FAF7F2] text-[#6F4E37] text-[10px] font-black hover:bg-[#6F4E37] hover:text-white border border-[#6F4E37]/10"
                                                        >
                                                            ADD TO ORDER
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>

                                             {/* Waiter Call Button - Always visible */}
                                             <div className="pt-4 sticky bottom-0 space-y-3">
                                                 <Button 
                                                     onClick={() => setShowWaiterCall(true)}
                                                     className="w-full h-12 rounded-xl bg-[#6F4E37] text-white font-black text-[10px] uppercase tracking-wider hover:bg-[#5A3E2B] transition-all shadow-md active:scale-95"
                                                 >
                                                     <Bell className="w-4 h-4 mr-2" />
                                                     Call Waiter
                                                 </Button>
                                                 
                                                 {cartItems.length > 0 && (
                                                     <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                                         <Button 
                                                             onClick={() => {
                                                                 setOrderPlaced(true);
                                                                 setKitchenStatus('Pending');
                                                                 setGuestScreen('status');
                                                                 
                                                                 // Mobile: Auto-switch to Admin Panel
                                                                 if (window.innerWidth < 1024) {
                                                                     setActivePerspective('staff');
                                                                 }
                                                                 // Cinematic Scroll to Management Suite
                                                                 managementSuiteRef.current?.scrollIntoView({ 
                                                                     behavior: 'smooth', 
                                                                     block: 'center' 
                                                                 });

                                                                 setTimeout(() => {
                                                                     setCurrentStep(2);
                                                                     setKitchenStatus('In Progress');
                                                                 }, 1500);
                                                             }}
                                                             className="w-full h-14 rounded-[1.5rem] bg-[#6F4E37] text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-[#6F4E37]/30 border-b-4 border-[#3E2723]/30"
                                                         >
                                                             Place Order (₹{cartItems.reduce((acc, item) => acc + parseInt(item.price.replace('₹', '')), 0)})
                                                         </Button>
                                                     </motion.div>
                                                 )}
                                             </div>
                                        </div>
                                    ) : (
                                        <div className="flex-1 flex flex-col bg-[#FAF7F2] overflow-hidden">
                                            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-10">
                                                <div className="relative">
                                                    <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center border border-[#F0EDE8]">
                                                        {orderStatus === 'Pending' && <Clock className="w-12 h-12 text-[#6F4E37] animate-pulse" />}
                                                        {orderStatus === 'Preparing' && <Zap className="w-12 h-12 text-orange-400 animate-bounce" />}
                                                        {orderStatus === 'Ready' && <Sparkles className="w-12 h-12 text-green-500" />}
                                                        {orderStatus === 'Served' && <CheckCircle2 className="w-12 h-12 text-green-600" />}
                                                    </div>
                                                    <div className="absolute -bottom-2 -right-2 bg-[#6F4E37] text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-white shadow-lg uppercase">
                                                        {orderStatus}
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-xl md:text-2xl font-black font-outfit text-[#3E2723]">
                                                        {orderStatus === 'Pending' && "Taking your order..."}
                                                        {orderStatus === 'Preparing' && "Chef is cooking..."}
                                                        {orderStatus === 'Ready' && "Order is Ready!"}
                                                        {orderStatus === 'Served' && "Enjoy your meal!"}
                                                    </h3>
                                                    <div className="flex justify-between items-center w-64 px-4">
                                                        {['Pending', 'Preparing', 'Ready', 'Served'].map((s, i, arr) => (
                                                            <React.Fragment key={s}>
                                                                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${arr.indexOf(orderStatus) >= i ? 'bg-[#6F4E37] scale-125' : 'bg-zinc-200'}`} />
                                                                {i < arr.length - 1 && <div className={`flex-1 h-0.5 mx-1 transition-all duration-500 ${arr.indexOf(orderStatus) > i ? 'bg-[#6F4E37]' : 'bg-zinc-100'}`} />}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </div>

                                                 {orderStatus === 'Served' ? (
                                                     <Button 
                                                         onClick={() => {
                                                             setOrderPlaced(false);
                                                             setOrderStatus('Pending');
                                                             setCartItems([]);
                                                             setNotifications([]);
                                                             setGuestScreen('menu');
                                                         }}
                                                         className="w-full h-14 rounded-[1.5rem] bg-[#6F4E37] text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#6F4E37]/20 hover:scale-[1.02] active:scale-95 transition-all"
                                                     >
                                                         Place New Order
                                                     </Button>
                                                 ) : (
                                                     <div className="w-full space-y-3">
                                                         <Button 
                                                             onClick={() => setGuestScreen('menu')}
                                                             className="w-full h-14 rounded-[1.5rem] bg-[#6F4E37] text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#6F4E37]/20 active:scale-95"
                                                         >
                                                             Order More Items
                                                         </Button>
                                                         <Button 
                                                             onClick={() => setShowWaiterCall(true)}
                                                             variant="outline"
                                                             className="w-full h-12 rounded-xl border-2 border-[#6F4E37] text-[#6F4E37] font-bold text-[10px] uppercase tracking-wider hover:bg-[#6F4E37] hover:text-white transition-all shadow-sm active:scale-95"
                                                         >
                                                             <Bell className="w-4 h-4 mr-2" />
                                                             Call Waiter
                                                         </Button>
                                                     </div>
                                                 )}
                                            </div>
                                        </div>
                                    )}

                                    {/* SHARED OVERLAYS (Visible in both Menu & Status) */}
                                    
                                    {/* Waiter Call Drawer */}
                                    <AnimatePresence>
                                        {showWaiterCall && (
                                            <motion.div 
                                                initial={{ y: "100%" }}
                                                animate={{ y: 0 }}
                                                exit={{ y: "100%" }}
                                                className="absolute inset-x-0 bottom-0 bg-white rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-[100] p-6 space-y-6"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-black text-lg text-[#3E2723]">Call Waiter</h4>
                                                    <button onClick={() => setShowWaiterCall(false)} className="p-2 bg-[#FAF7F2] rounded-full"><X className="w-4 h-4"/></button>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {['💧 Water', '🧻 Tissue', '🍴 Cutlery', '🧾 Bill'].map((req) => (
                                                        <Button
                                                            key={req}
                                                            onClick={() => {
                                                                setWaiterRequests(prev => [...prev, req]);
                                                                setNotifications(prev => [...prev, `Waiter request: ${req}`]);
                                                                setShowWaiterCall(false);
                                                                setCurrentStep(3);
                                                                
                                                                // Auto-switch to Admin Panel
                                                                setActivePerspective('staff');
                                                                
                                                                setTimeout(() => {
                                                                    managementSuiteRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                                }, 300);
                                                                setTimeout(() => setNotifications([]), 3000);
                                                            }}
                                                            className="h-16 rounded-xl bg-[#FAF7F2] text-[#3E2723] text-sm font-bold hover:bg-[#6F4E37] hover:text-white border border-[#6F4E37]/10"
                                                        >
                                                            {req}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Notifications */}
                                    <AnimatePresence>
                                        {notifications.length > 0 && (
                                            <motion.div 
                                                initial={{ y: -50, opacity: 0 }}
                                                animate={{ y: 20, opacity: 1 }}
                                                exit={{ y: -50, opacity: 0 }}
                                                className="absolute top-4 left-4 right-4 bg-[#6F4E37] p-4 rounded-2xl shadow-xl z-[110] border border-white/20 flex items-center gap-3"
                                            >
                                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                                                    <Bell className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Update</p>
                                                    <p className="text-xs font-bold text-white line-clamp-1">{notifications[notifications.length-1]}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Customizer Drawer */}
                                    <AnimatePresence>
                                        {showCustomizer && (
                                            <motion.div 
                                                initial={{ y: "100%" }}
                                                animate={{ y: 0 }}
                                                exit={{ y: "100%" }}
                                                className="absolute inset-x-0 bottom-0 bg-white rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-[100] p-6 space-y-6"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-black text-lg text-[#3E2723]">Customize Order</h4>
                                                    <button onClick={() => setShowCustomizer(false)} className="p-2 bg-[#FAF7F2] rounded-full"><X className="w-4 h-4"/></button>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <p className="text-[10px] font-black text-[#A68966] uppercase tracking-widest">Options</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {[
                                                               {id: 'spicy', label: 'Extra Spicy', emoji: '🔥'},
                                                               {id: 'oil', label: 'Less Oil', emoji: '💧'},
                                                               {id: 'onion', label: 'No Onion', emoji: '🚫'},
                                                               {id: 'cheese', label: 'Extra Cheese', emoji: '🧀'}
                                                            ].map((m) => (
                                                                <button 
                                                                   key={m.id} 
                                                                   onClick={() => setSelectedModifiers(prev => prev.includes(m.label) ? prev.filter(x => x !== m.label) : [...prev, m.label])}
                                                                   className={`px-4 py-3 rounded-2xl border transition-all text-xs font-bold flex items-center gap-2 ${selectedModifiers.includes(m.label) ? 'bg-[#6F4E37] text-white border-[#6F4E37] shadow-lg' : 'bg-white text-[#3E2723] border-[#F0EDE8]'}`}
                                                                >
                                                                   <span>{m.emoji}</span>
                                                                   {m.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button 
                                                    onClick={() => {
                                                        setCartItems(prev => [...prev, { ...selectedItem, modifiers: selectedModifiers }]);
                                                        setSelectedModifiers([]);
                                                        setShowCustomizer(false);
                                                    }}
                                                    className="w-full h-12 rounded-xl bg-[#6F4E37] text-white font-black uppercase text-[10px]"
                                                >
                                                    Add to Collection
                                                </Button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </PhoneFrame>
                        </div>

                        {/* Right Side: Operational Intelligence */}
                        <div 
                            ref={managementSuiteRef}
                            className={`space-y-8 transition-all duration-500 ${activePerspective === 'staff' || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 'block' : 'hidden lg:block'} ${currentStep >= 2 ? 'opacity-100 scale-100' : 'opacity-60 grayscale-[0.5] scale-95'}`}
                        >
                            <div className="flex justify-between items-end">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black font-outfit text-[#3E2723]">ADMIN Panel</h2>
                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none">Operational Command Center</p>
                                </div>
                                <div className="flex gap-2 items-center bg-zinc-900 px-3 py-1.5 rounded-full">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                    <span className="text-[9px] font-black text-white uppercase tracking-wider">LIVE DATA</span>
                                </div>
                            </div>

                            <LaptopFrame className={`${currentStep >= 2 ? 'ring-8 ring-[#6F4E37]/10' : ''} h-[300px] md:h-[450px]`}>
                                <div className="bg-white h-full relative overflow-hidden flex flex-col">
                                    {/* Mock Dashboard Sidebar/Header */}
                                    <div className="h-full flex">
                                        <div className="w-16 bg-zinc-900 flex flex-col items-center py-6 gap-6">
                                            <div className="w-8 h-8 bg-[#6F4E37] rounded-xl flex items-center justify-center text-white text-[10px] font-black">MM</div>
                                            <LayoutDashboard className="w-5 h-5 text-zinc-500" />
                                            <Zap className="w-5 h-5 text-[#6F4E37]" />
                                            <TrendingUp className="w-5 h-5 text-zinc-500" />
                                        </div>
                                        
                                        <div className="flex-1 bg-zinc-50 flex flex-col">
                                            <div className="p-4 bg-white border-b border-zinc-100 flex justify-between items-center">
                                                <span className="text-[10px] font-black uppercase text-zinc-400">Live Operations</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="px-2 py-1 rounded bg-[#6F4E37]/10 text-[#6F4E37] text-[8px] font-bold">STAFF: 4 ONLINE</div>
                                                </div>
                                            </div>

                                             <div className="flex-1 p-6 overflow-y-auto">
                                                {/* Global Waiter Requests - Visible in Steps 2 & 3 */}
                                                {(currentStep === 2 || currentStep === 3) && waiterRequests.length > 0 && (
                                                    <motion.div
                                                        initial={{ y: -20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        className="mb-6 bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 shadow-lg shadow-amber-900/5"
                                                    >
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="flex items-center gap-2">
                                                                <Bell className="w-4 h-4 text-amber-600 animate-bounce" />
                                                                <h4 className="font-black text-xs uppercase tracking-wider text-amber-900">Live Table Service</h4>
                                                            </div>
                                                            <span className="px-2 py-1 bg-amber-200 text-amber-900 rounded-full text-[9px] font-black">
                                                                {waiterRequests.length} PENDING
                                                            </span>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {waiterRequests.map((req, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    initial={{ x: -20, opacity: 0 }}
                                                                    animate={{ x: 0, opacity: 1 }}
                                                                    className="bg-white p-3 rounded-xl flex items-center justify-between border border-amber-100"
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-base">
                                                                            {req.split(' ')[0]}
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-[10px] font-bold text-zinc-900">{req}</p>
                                                                            <p className="text-[8px] text-zinc-500">Table #5 • Priority</p>
                                                                        </div>
                                                                    </div>
                                                                    <Button
                                                                        onClick={() => {
                                                                            setWaiterRequests(prev => prev.filter((_, idx) => idx !== i));
                                                                        }}
                                                                        className="bg-green-500 text-white text-[8px] font-black h-7 px-3 rounded-lg hover:bg-green-600"
                                                                    >
                                                                        DONE
                                                                    </Button>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {currentStep < 2 ? (
                                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                                                        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-300">
                                                            <Zap className="w-8 h-8" />
                                                        </div>
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Waiting for New Tickets...</p>
                                                    </div>
                                                ) : currentStep === 2 ? (
                                                    <div className="animate-in slide-in-from-right-10 duration-500 space-y-6">
                                                        <div className="flex justify-between items-center">
                                                            <h4 className="font-outfit font-black text-lg">Kitchen Display</h4>
                                                            <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-600 text-[8px] font-black uppercase">Active Now</span>
                                                        </div>
                                                        
                                                        <div className="p-5 bg-white rounded-3xl border border-[#6F4E37]/20 shadow-xl shadow-[#6F4E37]/5 space-y-4 relative overflow-hidden group">
                                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#6F4E37]" />
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <p className="text-[8px] font-black uppercase text-zinc-400">Order #842 • Table #5</p>
                                                                    <p className="text-xs font-black mt-1">2x Kashmiri Chai, 1x Paneer Tikka</p>
                                                                </div>
                                                                <span className="text-[10px] font-bold text-[#6F4E37] animate-pulse">Just Now</span>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button onClick={() => setCurrentStep(3)} className="bg-zinc-900 text-white text-[9px] font-black h-8 flex-1 rounded-xl">MARK AS SERVED</Button>
                                                                <Button variant="outline" className="border-zinc-100 text-[9px] font-black h-8 flex-1 rounded-xl">KOT PRINT</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : currentStep === 3 ? (
                                                    <div className="animate-in fade-in zoom-in duration-500 space-y-6">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 flex flex-col justify-between">
                                                                <div>
                                                                    <div className="flex items-center gap-2 text-zinc-400 mb-2">
                                                                        <IndianRupee className="w-3.5 h-3.5" />
                                                                        <span className="text-[10px] font-black uppercase tracking-widest">Revenue</span>
                                                                    </div>
                                                                    <p className="text-3xl font-black font-outfit text-zinc-900">₹44,250</p>
                                                                </div>
                                                                <div className="text-green-500 text-[10px] font-bold flex items-center gap-1">
                                                                    <TrendingUp className="w-3 h-3" /> +12% today
                                                                </div>
                                                            </div>
                                                            <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
                                                                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                                                                    <Zap className="w-3.5 h-3.5" />
                                                                    <span className="text-[10px] font-black uppercase tracking-widest">Efficiency</span>
                                                                </div>
                                                                <p className="text-3xl font-black font-outfit text-zinc-900">98.4%</p>
                                                                <p className="text-zinc-400 text-[10px] mt-1">Avg fix: 4.2m</p>
                                                            </div>
                                                        </div>

                                                        {/* Preparation Queue Simulation */}
                                                        <div className="bg-white border-2 border-dashed border-[#E7DCCA] rounded-[2.5rem] p-6 space-y-4">
                                                            <div className="flex justify-between items-center">
                                                                <h4 className="text-xs font-black text-[#6F4E37] uppercase tracking-[0.2em]">Active Kitchen Queue</h4>
                                                                <div className="flex gap-2">
                                                                    <span className="px-2 py-0.5 bg-[#FAF7F2] text-[#6F4E37] text-[8px] font-bold rounded-md">LIVE VIEW</span>
                                                                </div>
                                                            </div>

                                                            {!orderPlaced ? (
                                                                <div className="py-10 text-center space-y-3">
                                                                    <div className="w-12 h-12 bg-[#FAF7F2] rounded-2xl flex items-center justify-center mx-auto">
                                                                        <History className="w-6 h-6 text-[#A68966]/20" />
                                                                    </div>
                                                                    <p className="text-[10px] font-bold text-[#A68966]">Waiting for incoming orders...</p>
                                                                </div>
                                                            ) : (
                                                                <motion.div
                                                                    initial={{ x: -20, opacity: 0 }}
                                                                    animate={{ x: 0, opacity: 1 }}
                                                                    className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#F0EDE8] flex items-center justify-between"
                                                                >
                                                                        <div className="flex items-center justify-between">
                                                                           <div className="flex items-center gap-4">
                                                                               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                                                   <Coffee className="w-5 h-5 text-[#6F4E37]" />
                                                                               </div>
                                                                               <div>
                                                                                   <p className="text-xs font-black text-[#3E2723]">Table #5</p>
                                                                                   <p className="text-[9px] font-bold text-[#A68966]">{cartItems.length} Items Total</p>
                                                                               </div>
                                                                           </div>
                                                                           <div className="flex items-center gap-2">
                                                                               {orderStatus === 'Pending' && (
                                                                                   <Button
                                                                                       onClick={() => setOrderStatus('Preparing')}
                                                                                       className="h-8 px-4 bg-[#6F4E37] text-white text-[8px] font-black uppercase rounded-lg"
                                                                                   >
                                                                                       Start Prep
                                                                                   </Button>
                                                                               )}
                                                                               {orderStatus === 'Preparing' && (
                                                                                   <Button
                                                                                       onClick={() => {
                                                                                           setOrderStatus('Ready');
                                                                                           setNotifications(prev => [...prev, "Order is ready for pickup!"]);
                                                                                       }}
                                                                                       className="h-8 px-4 bg-orange-400 text-white text-[8px] font-black uppercase rounded-lg"
                                                                                   >
                                                                                       Mark Ready
                                                                                   </Button>
                                                                               )}
                                                                               {orderStatus === 'Ready' && (
                                                                                   <Button
                                                                                       onClick={() => {
                                                                                           setOrderStatus('Served');
                                                                                           setNotifications(prev => [...prev, "Order has been served!"]);
                                                                                           // Auto-hide notification after 4s
                                                                                           setTimeout(() => setNotifications([]), 4000);
                                                                                       }}
                                                                                       className="h-8 px-4 bg-green-500 text-white text-[8px] font-black uppercase rounded-lg"
                                                                                   >
                                                                                       Mark Served
                                                                                   </Button>
                                                                               )}
                                                                               {orderStatus === 'Served' && (
                                                                                   <Button 
                                                                                       onClick={() => {
                                                                                           setOrderPlaced(false);
                                                                                           setOrderStatus('Pending');
                                                                                           setNotifications(prev => [...prev, "Order settled: Paid and Gone."]);
                                                                                           setTimeout(() => setNotifications([]), 3000);
                                                                                       }}
                                                                                       className="h-8 px-4 bg-[#FAF7F2] text-[#6F4E37] text-[8px] font-black uppercase rounded-lg border border-[#6F4E37]/20"
                                                                                   >
                                                                                       Paid and Gone
                                                                                   </Button>
                                                                               )}
                                                                           </div>
                                                                        </div>

                                                                        <div className="space-y-2 border-t border-dashed border-[#E7DCCA] pt-3">
                                                                           {cartItems.map((item, idx) => (
                                                                               <div key={idx} className="flex justify-between items-start">
                                                                                   <div className="flex gap-2 items-center">
                                                                                       <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center text-[10px]">{item.img}</div>
                                                                                       <div>
                                                                                           <p className="text-[10px] font-bold text-[#3E2723]">{item.name}</p>
                                                                                           <div className="flex flex-wrap gap-1 mt-0.5">
                                                                                               {item.modifiers.map(m => (
                                                                                                   <span key={m} className="px-1.5 py-0.5 rounded-md bg-[#6F4E37]/10 text-[#6F4E37] text-[7px] font-black uppercase tracking-tighter">{m}</span>
                                                                                               ))}
                                                                                               {item.modifiers.length === 0 && <span className="text-[7px] text-[#A68966] font-medium italic">No modifications</span>}
                                                                                           </div>
                                                                                       </div>
                                                                                   </div>
                                                                                   <span className="text-[9px] font-black text-[#6F4E37]">{item.price}</span>
                                                                               </div>
                                                                           ))}
                                                                        </div>
                                                                </motion.div>
                                                            )}
                                                        </div>

                                                        {/* Waiter Requests Section */}
                                                        {waiterRequests.length > 0 && (
                                                            <div className="bg-white border-2 border-dashed border-orange-200 rounded-[2.5rem] p-6 space-y-4">
                                                                <div className="flex justify-between items-center">
                                                                    <h4 className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                                                        <Bell className="w-4 h-4" />
                                                                        Waiter Requests
                                                                    </h4>
                                                                    <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[8px] font-bold rounded-md">{waiterRequests.length} PENDING</span>
                                                                </div>
                                                                
                                                                <div className="space-y-2">
                                                                    {waiterRequests.map((request, idx) => (
                                                                        <motion.div
                                                                            key={idx}
                                                                            initial={{ x: -20, opacity: 0 }}
                                                                            animate={{ x: 0, opacity: 1 }}
                                                                            className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-center justify-between"
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-sm">
                                                                                    {request.split(' ')[0]}
                                                                                </div>
                                                                                <div>
                                                                                    <p className="text-sm font-bold text-zinc-900">{request}</p>
                                                                                    <p className="text-[10px] text-zinc-500">Table #12</p>
                                                                                </div>
                                                                            </div>
                                                                            <Button
                                                                                onClick={() => {
                                                                                    setWaiterRequests(prev => prev.filter((_, i) => i !== idx));
                                                                                    setNotifications(prev => [...prev, `Completed: ${request}`]);
                                                                                    setTimeout(() => setNotifications([]), 3000);
                                                                                }}
                                                                                className="h-8 px-4 bg-green-500 text-white text-[8px] font-black uppercase rounded-lg"
                                                                            >
                                                                                Done
                                                                            </Button>
                                                                        </motion.div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="p-5 bg-[#3E2723] text-white rounded-[2rem] space-y-4 border-b-4 border-black/20">
                                                            <div className="flex justify-between items-center">
                                                                <p className="text-[10px] font-black uppercase text-[#D4A373]">Live Intelligence</p>
                                                                <Sparkles className="w-4 h-4 text-[#D4A373]" />
                                                            </div>
                                                            <p className="text-xs font-medium leading-relaxed text-zinc-300">
                                                                "Spicy Zinger Burger" is trending! Add a <span className="text-[#D4A373] font-black">"Meal Upgrade"</span> option to increase revenue per order by <span className="underline decoration-[#D4A373] underline-offset-4">₹120</span>.
                                                            </p>
                                                            <Button onClick={() => setCurrentStep(4)} className="w-full bg-[#D4A373] text-[#3E2723] text-[10px] font-black h-10 rounded-xl hover:bg-[#E5B585]">VIEW ROI REPORT</Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-700">
                                                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl">
                                                            <TrendingUp className="w-12 h-12" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <h4 className="text-2xl font-black font-outfit">Mission Accomplished</h4>
                                                            <p className="text-xs text-zinc-500 font-medium max-w-[200px] mx-auto">See the final breakdown below to understand your potential for scale.</p>
                                                        </div>
                                                        <Button onClick={() => setCurrentStep(0)} variant="outline" className="text-[10px] font-black rounded-xl">RESTART GUIDED TOUR</Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </LaptopFrame>
                        </div>
                    </div>
                </div>

                {/* Features Highlights */}
                <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ShowcaseFeature 
                        icon={<QrCode className="w-6 h-6" />}
                        title="Scan & Pay"
                        desc="Fully integrated payments and QR generation out of the box."
                    />
                    <ShowcaseFeature 
                        icon={<Zap className="w-6 h-6" />}
                        title="Real-time Sync"
                        desc="Orders reach the kitchen instantly with zero delay."
                    />
                    <ShowcaseFeature 
                        icon={<TrendingUp className="w-6 h-6" />}
                        title="Grow Revenue"
                        desc="Smart recommendations and upsells increase average ticket size."
                    />
                </div>
                {/* Explicit Navigation Controls */}
                <div className="mt-12 flex justify-center items-center gap-6">
                    <Button 
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="h-12 w-12 rounded-2xl border-zinc-200 text-zinc-400 hover:text-zinc-800 hover:border-zinc-300 transition-all flex items-center justify-center p-0"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Button>
                    
                    <div className="px-6 py-2 bg-white rounded-full border border-zinc-100 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6F4E37]">
                            Step {currentStep} <span className="text-zinc-300 mx-2">/</span> {steps.length - 1}
                        </p>
                    </div>

                    <Button 
                        onClick={nextStep}
                        disabled={currentStep === steps.length - 1}
                        className="h-12 w-12 rounded-2xl bg-[#6F4E37] text-white hover:bg-[#5A3E2B] transition-all flex items-center justify-center p-0 shadow-lg shadow-[#6F4E37]/20"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function ShowcaseFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-10 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="text-[#6F4E37] mb-6">{icon}</div>
            <h3 className="font-bold text-lg mb-3">{title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium">{desc}</p>
        </div>
    );
}
