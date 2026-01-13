"use client";

import Navbar from "@/components/Navbar";
import PricingEstimator from "@/components/PricingEstimator";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function PricingCard({ title, price, features, isPopular, desc }: { title: string, price: string, features: string[], isPopular?: boolean, desc: string }) {
    return (
        <div className={`p-8 rounded-3xl border flex flex-col h-full relative ${isPopular ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xl scale-105 z-10' : 'bg-white border-zinc-200 text-zinc-900'}`}>
            {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Best Value
                </div>
            )}
            <div className="mb-8">
                <h3 className={`font-bold text-lg mb-2 ${isPopular ? 'text-zinc-300' : 'text-zinc-500'}`}>{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="font-bold text-4xl font-outfit">{price}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isPopular ? 'text-zinc-400' : 'text-zinc-400'}`}>One-Time Setup</span>
                </div>
                <p className={`mt-4 text-sm leading-relaxed ${isPopular ? 'text-zinc-400' : 'text-zinc-500'}`}>{desc}</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isPopular ? 'text-amber-400' : 'text-green-500'}`} />
                        <span className={isPopular ? 'text-zinc-300' : 'text-zinc-600'}>{feat}</span>
                    </li>
                ))}
            </ul>
            
            <button className={`w-full py-4 rounded-xl font-bold transition-all ${isPopular ? 'bg-white text-zinc-900 hover:bg-zinc-100' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}>
                Choose {title}
            </button>
        </div>
    );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-900">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
            
            {/* Header */}
            <div className="text-center mb-20">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-outfit font-black text-4xl md:text-6xl mb-6"
                >
                    Fair Pricing for Every Stage
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-500 text-xl max-w-2xl mx-auto"
                >
                    Choose a popular configuration or use our Fair Pricing Engine to customize your exact needs.
                </motion.p>
            </div>

            {/* Popular Configurations */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start mb-32"
            >
                <PricingCard 
                    title="Essential"
                    price="₹25,000"
                    desc="Digital-first basics for small cafes."
                    features={[
                        "Digital QR Menu", 
                        "Table-Based Ordering", 
                        "Customisation Engine", 
                        "Cart & Checkout", 
                        "Live Status Tracking"
                    ]}
                />
                <PricingCard 
                    title="Growth"
                    price="₹50,000"
                    desc="Everything you need to scale up."
                    features={[
                        "Everything in Essential",
                        "In-App Waiter Call",
                        "Personalized 'Welcome Back'",
                        "Inventory Tracking",
                        "Staff Management"
                    ]}
                />
                <PricingCard 
                    title="Elite"
                    price="₹75,000"
                    isPopular
                    desc="Powered by AI for maximum profit."
                    features={[
                        "Everything in Growth",
                        "AI Helper Food Suggestions",
                        "Dynamic AI 'Happy Hour'",
                        "Smart Analytics",
                        "WhatsApp Alerts"
                    ]}
                />
                <PricingCard 
                    title="Infinity"
                    price="₹100,000"
                    desc="Ultimate solution for chains."
                    features={[
                        "Everything in Elite",
                        "AI Voice Ordering (Smart Mic)",
                        "WhatsApp 'Win-Back' Logic",
                        "Multi-Outlet Sync",
                        "White Labeling"
                    ]}
                />
            </motion.div>
            
            {/* Estimator Section */}
            <div id="estimator" className="scroll-mt-32">
                <div className="text-center mb-12">
                    <div className="inline-block bg-zinc-200 text-zinc-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                        Custom Plan
                    </div>
                    <h2 className="font-outfit font-bold text-3xl md:text-4xl">Need a specific setup?</h2>
                    <p className="text-zinc-500 mt-2">Use our engine to calculate your exact investment.</p>
                </div>
                <PricingEstimator />
            </div>

        </div>
      </div>
    </div>
  );
}
