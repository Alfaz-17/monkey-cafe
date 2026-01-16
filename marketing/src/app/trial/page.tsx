"use client";

import Navbar from "@/components/Navbar";
import TrialForm from "@/components/TrialForm";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, ShieldCheck, Sparkles } from "lucide-react";

export default function TrialPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-900">
      <Navbar />
      
      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col items-center text-center space-y-12">
                
                {/* Upper Side: Form & Primary Header */}
                <div className="w-full max-w-2xl space-y-8">
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 bg-[#FAF0F4] text-[#8C5E6E] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#EAD0DB]/50"
                        >
                            <Sparkles className="w-3 h-3" /> Special Offer: 7-Day Free Trial
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-outfit font-black text-4xl md:text-7xl leading-[1.1] text-[#3E2723]"
                        >
                            Try Before You Buy.
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-500 text-lg md:text-2xl leading-relaxed font-semibold max-w-2xl mx-auto"
                        >
                            Fill in your details below. We'll set up your full restaurant ecosystem in under 24 hours.
                        </motion.p>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#6F4E37]/5 blur-[80px] rounded-full -z-10" />
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-100/20 blur-[80px] rounded-full -z-10" />
                        <TrialForm />
                    </div>
                </div>

                {/* Below: Key Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 border-t border-zinc-100 w-full">
                    {[
                        { 
                            icon: <Zap className="w-6 h-6 text-[#6F4E37]" />, 
                            title: "24h Setup", 
                            desc: "Get your digital menu live instantly." 
                        },
                        { 
                            icon: <ShieldCheck className="w-6 h-6 text-[#6F4E37]" />, 
                            title: "No Credit Card", 
                            desc: "Truly free. No hidden costs or commitment." 
                        },
                        { 
                            icon: <CheckCircle2 className="w-6 h-6 text-[#6F4E37]" />, 
                            title: "Full Features", 
                            desc: "QR ordering, KDS, & Analytics included." 
                        }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            className="flex flex-col items-center space-y-4"
                        >
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-black text-zinc-900 text-lg">{item.title}</h3>
                                <p className="text-zinc-500 text-sm font-medium">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="pt-12 grayscale opacity-40">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6">Trusted by modern brands</p>
                    <div className="flex justify-center gap-12 flex-wrap">
                        <span className="font-outfit font-black text-2xl">Masala Republic</span>
                        <span className="font-outfit font-black text-2xl">Urban Tandoor</span>
                        <span className="font-outfit font-black text-2xl">The Saffron Kitchen</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
