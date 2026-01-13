"use client";

import Navbar from "@/components/Navbar";
import PricingEstimator from "@/components/PricingEstimator";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function PricingCard({ title, price, features, isPopular, desc }: { title: string, price: string, features: string[], isPopular?: boolean, desc: string }) {
    return (
        <div className={`p-4 md:p-8 rounded-2xl md:rounded-3xl border flex flex-col h-full relative ${isPopular ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xl md:scale-105 z-10' : 'bg-white border-zinc-200 text-zinc-900'}`}>
            {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 text-[10px] md:text-xs font-bold px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Best Value
                </div>
            )}
            <div className="mb-4 md:mb-8">
                <h3 className={`font-bold text-sm md:text-lg mb-2 ${isPopular ? 'text-zinc-300' : 'text-zinc-500'}`}>{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="font-bold text-2xl md:text-4xl font-outfit">{price}</span>
                    <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${isPopular ? 'text-zinc-400' : 'text-zinc-400'}`}>Setup</span>
                </div>
                <p className={`mt-2 md:mt-4 text-xs md:text-sm leading-relaxed ${isPopular ? 'text-zinc-400' : 'text-zinc-500'}`}>{desc}</p>
            </div>
            
            <ul className="space-y-2 md:space-y-4 mb-4 md:mb-8 flex-1">
                {features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm">
                        <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 ${isPopular ? 'text-amber-400' : 'text-green-500'}`} />
                        <span className={isPopular ? 'text-zinc-300' : 'text-zinc-600'}>{feat}</span>
                    </li>
                ))}
            </ul>
            
            <button className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base transition-all ${isPopular ? 'bg-white text-zinc-900 hover:bg-zinc-100' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}>
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

            {/* Realistic Setup Examples */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-4 md:gap-8 items-start mb-32"
            >
                <PricingCard 
                    title="Small Café"
                    price="₹18,000"
                    desc="Perfect starter for neighborhood cafés."
                    features={[
                        "QR Digital Menu", 
                        "Online Ordering", 
                        "Basic Analytics",
                        "WhatsApp Notifications",
                        "Up to 10 tables"
                    ]}
                />
                <PricingCard 
                    title="Growing Restaurant"
                    price="₹40,000"
                    isPopular
                    desc="Complete solution for busy restaurants."
                    features={[
                        "Everything in Small Café",
                        "Kitchen Display System",
                        "Auto Billing & GST",
                        "Owner Dashboard",
                        "Up to 25 tables"
                    ]}
                />
                <PricingCard 
                    title="Premium Setup"
                    price="₹80,000"
                    desc="Advanced features for high-volume outlets."
                    features={[
                        "Everything in Growing Restaurant",
                        "AI Recommendations",
                        "Customer Analytics",
                        "Inventory Management",
                        "Up to 50 tables"
                    ]}
                />
                <PricingCard 
                    title="Multi-Location"
                    price="₹1,30,000"
                    desc="Enterprise solution for chains."
                    features={[
                        "All Premium Features",
                        "Central Dashboard",
                        "Branch-wise Reports",
                        "Advanced Analytics",
                        "2-4 outlets included"
                    ]}
                />
            </motion.div>
            
            
            {/* Custom Pricing Calculator Section */}
            <div id="estimator" className="scroll-mt-32 mt-20">
                <div className="text-center mb-12 md:mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6F4E37]/10 to-amber-100 text-[#6F4E37] px-6 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-6 border border-[#6F4E37]/20"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Build Your Custom Setup
                    </motion.div>
                    <h2 className="font-outfit font-black text-3xl md:text-5xl mb-4 md:mb-6 text-zinc-900">
                        Get Your Exact Price
                    </h2>
                    <p className="text-zinc-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Select your business size, table count, and required features. Our smart calculator shows transparent, fair pricing—no hidden costs, no surprises.
                    </p>
                </div>
                <PricingEstimator />
            </div>

        </div>
      </div>
    </div>
  );
}
