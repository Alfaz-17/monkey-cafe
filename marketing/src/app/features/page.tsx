'use client';

import React from 'react';
import { motion } from "framer-motion";
import { QrCode, ShoppingCart, TrendingUp, Sparkles, CheckCircle2, Plus } from "lucide-react";
import Link from "next/link";
import { PhoneFrame, LaptopFrame } from "@/components/DeviceFrames";
import Navbar from "@/components/Navbar";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden text-zinc-900">
      <Navbar />
      
      {/* Cinematic Feature Universe */}
      <section className="pt-20 md:pt-32 pb-24 md:pb-48 px-4 md:px-6 bg-white relative overflow-hidden">
        {/* Infinite Momentum Background Elements - Optimized for Mobile */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              opacity: [0.03, 0.06, 0.03],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[#6F4E37]/5 blur-[80px] md:blur-[120px] rounded-full will-change-transform"
          />
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-amber-100/20 blur-[100px] md:blur-[150px] rounded-full hidden md:block will-change-transform"
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          
          <div className="text-center mb-20 md:mb-40">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-8 shadow-2xl"
            >
                <Sparkles className="w-3 h-3 text-amber-400" /> System Architecture
            </motion.div>
            <h1 className="font-outfit font-black text-4xl md:text-9xl tracking-tighter leading-none">
              ZERO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F4E37] to-amber-200">WAIT.</span><br/>
              MAX PROFIT.
            </h1>
            <p className="text-zinc-400 text-base md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mt-4 md:mt-6">
              Every touchpoint is designed for conversion. High-fidelity ordering mechanics that turn guests into loyal brand advocates.
            </p>
          </div>

          <div className="space-y-32 md:space-y-64">
            
            {/* Section 1: The Digital Gateway (QR Menu + Table Ordering) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="space-y-6 md:space-y-10 order-2 lg:order-1">
                <div className="space-y-6">
                   <div className="w-16 h-16 bg-[#6F4E37] rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-[#6F4E37]/30 mb-8">
                      <QrCode className="w-8 h-8" />
                   </div>
                 <h3 className="font-outfit font-black text-3xl md:text-6xl tracking-tight">The Digital Gateway.</h3>
                   <div className="space-y-4">
                      <div>
                        <h4 className="font-black text-lg text-zinc-900">Digital QR Menu</h4>
                        <p className="text-zinc-500 text-lg leading-relaxed font-medium max-w-lg">
                          A high-fidelity digital menu that loads instantly upon scan. No apps to download, no friction.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-black text-lg text-zinc-900">Table-Based Ordering</h4>
                        <p className="text-zinc-500 text-lg leading-relaxed font-medium max-w-lg">
                          Orders are automatically tied to table IDs, ensuring your staff knows exactly where to serve.
                        </p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2">
                  <Link href="/demo" className="absolute inset-0 z-50 cursor-pointer group/demo" aria-label="Try Demo">
                    <div className="absolute inset-0 bg-[#6F4E37]/0 group-hover/demo:bg-[#6F4E37]/5 transition-all rounded-3xl flex items-center justify-center">
                      <div className="opacity-0 group-hover/demo:opacity-100 transition-opacity bg-[#6F4E37] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-2xl">
                        <Sparkles className="w-4 h-4" />
                        Try Interactive Demo
                      </div>
                    </div>
                  </Link>
                  {/* 3D Angled Phone Frame */}
                 <motion.div 
                  style={{ perspective: 1000 }}
                  whileHover={{ rotateY: -15, rotateX: 5 }}
                  className="relative transition-transform duration-700 ease-out z-20 w-full flex justify-center"
                 >
                    <PhoneFrame className="scale-75 sm:scale-90 lg:scale-100 shadow-[30px_50px_100px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                      <div className="bg-[#FAF7F2] h-full p-4 flex flex-col pt-12 items-center">
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6">
                           <QrCode className="w-10 h-10 text-[#6F4E37]" />
                        </div>
                        <div className="w-32 h-2 bg-zinc-200 rounded-full mb-2" />
                        <div className="w-24 h-2 bg-zinc-100 rounded-full" />
                      </div>
                    </PhoneFrame>
                 </motion.div>

                 {/* Exploding UI Layers */}
                 {[
                   { text: "Table #12", color: "bg-zinc-900 text-white", top: "5%", left: "0%", delay: 0.2, isTag: true, mobileOnly: false },
                   { text: "Scan Success", color: "bg-green-500 text-white", top: "0%", right: "0%", delay: 0.4, isTag: true, mobileOnly: false },
                   { icon: <CheckCircle2 className="w-6 h-6 text-green-500" />, color: "bg-white", bottom: "10%", left: "0%", delay: 0.6, mobileOnly: true }
                 ].map((layer: any, i) => (
                   <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, zIndex: 50 }}
                    transition={{ delay: layer.delay }}
                    className={`absolute z-30 shadow-2xl p-3 lg:p-4 rounded-2xl border border-zinc-100 backdrop-blur-md ${layer.color} ${layer.isTag ? 'px-4 lg:px-6 py-2 lg:py-3 font-black text-[8px] lg:text-[10px] uppercase tracking-widest' : ''} ${layer.mobileOnly ? 'lg:block' : 'block'}`}
                    style={{ 
                      top: layer.top, bottom: layer.bottom, left: layer.left, right: layer.right,
                      transform: `translateZ(${30 + (i * 20)}px)` 
                    }}
                   >
                     {layer.icon || layer.text}
                   </motion.div>
                 ))}
                 
                 <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <div className="w-[500px] h-[500px] border border-zinc-100 rounded-full animate-pulse" />
                 </div>
              </div>
            </div>

            {/* Section 2: The Conversion Engine (Customisation + Cart/Checkout) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center group order-2 lg:order-1">
                  <Link href="/demo" className="absolute inset-0 z-50 cursor-pointer group/demo" aria-label="Try Demo">
                    <div className="absolute inset-0 bg-[#6F4E37]/0 group-hover/demo:bg-[#6F4E37]/5 transition-all rounded-3xl flex items-center justify-center">
                      <div className="opacity-0 group-hover/demo:opacity-100 transition-opacity bg-[#6F4E37] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-2xl">
                        <Sparkles className="w-4 h-4" />
                        Try Interactive Demo
                      </div>
                    </div>
                  </Link>
                 {/* 3D Angled Phone */}
                 <motion.div 
                  style={{ perspective: 1000 }}
                  whileHover={{ rotateY: 15, rotateX: 5 }}
                  className="relative transition-transform duration-700 ease-out z-20"
                 >
                    <PhoneFrame className="scale-75 sm:scale-90 lg:scale-100 shadow-[30px_50px_100px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                      <div className="bg-white h-full p-4 flex flex-col pt-12 items-center">
                         <div className="text-4xl mb-6">☕</div>
                         <div className="w-full h-8 bg-[#6F4E37] rounded-xl mb-4" />
                         <div className="w-full h-24 border border-dashed border-zinc-200 rounded-2xl" />
                      </div>
                    </PhoneFrame>
                 </motion.div>

                 {/* Exploding Layers */}
                 {[
                    { text: "Extra Sugar?", color: "bg-white", top: "15%", right: "5%", delay: 0.2, isTag: true },
                    { text: "Cart (2 items)", color: "bg-[#6F4E37] text-white", bottom: "15%", right: "2%", delay: 0.4, isTag: true },
                    { icon: <Plus className="w-4 h-4" />, color: "bg-white", top: "10%", left: "2%", delay: 0.6 }
                 ].map((layer: any, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className={`absolute z-30 shadow-2xl p-3 lg:p-4 rounded-2xl border border-zinc-100 backdrop-blur-md ${layer.color} ${layer.isTag ? 'px-4 lg:px-6 py-2 lg:py-3 font-black text-[8px] lg:text-[10px] uppercase tracking-widest' : ''}`}
                      style={{ top: layer.top, bottom: layer.bottom, left: layer.left, right: layer.right }}
                    >
                      {layer.icon || layer.text}
                    </motion.div>
                 ))}
              </div>

              <div className="space-y-10 order-1 lg:order-2">
                <div className="space-y-6">
                   <div className="w-16 h-16 bg-zinc-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl mb-8">
                      <ShoppingCart className="w-8 h-8" />
                   </div>
                   <h3 className="font-outfit font-black text-4xl md:text-6xl tracking-tight">The Conversion<br/>Engine.</h3>
                   <div className="space-y-4">
                      <div>
                        <h4 className="font-black text-lg text-zinc-900">Customisation Engine</h4>
                        <p className="text-zinc-500 text-lg leading-relaxed font-medium max-w-lg">
                          Allow guests to tailor their meals with intuitive selection cards, driving up average order value effortlessly.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-black text-lg text-zinc-900">Cart & Checkout</h4>
                        <p className="text-zinc-500 text-lg leading-relaxed font-medium max-w-lg">
                          A fluid, one-tap checkout experience that minimizes abandonment and maximizes conversion.
                        </p>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Section 3: Real-time Intelligence (Live Track + AI Upsells) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                <div className="space-y-6">
                   <div className="w-16 h-16 bg-[#6F4E37] rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-[#6F4E37]/30 mb-8">
                      <TrendingUp className="w-8 h-8" />
                   </div>
                   <h3 className="font-outfit font-black text-4xl md:text-6xl tracking-tight">Real-time <br/>Intelligence.</h3>
                   <div className="space-y-4">
                      <div>
                        <h4 className="font-black text-lg text-zinc-900">Live Status Tracking</h4>
                        <p className="text-zinc-500 text-lg leading-relaxed font-medium max-w-lg">
                          Keep guests engaged with a real-time progress bar. Preparing, Ready, Served—all updated instantly.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-black text-lg text-zinc-900">AI-Powered Upsells</h4>
                        <p className="text-zinc-500 text-lg leading-relaxed font-medium max-w-lg">
                          Our smart engine suggests the perfect sides based on trending combos and margin goals.
                        </p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="relative h-[400px] lg:h-[600px] order-2 group">
                  <Link href="/demo" className="absolute inset-0 z-50 cursor-pointer group/demo" aria-label="Try Demo">
                    <div className="absolute inset-0 bg-[#6F4E37]/0 group-hover/demo:bg-[#6F4E37]/5 transition-all rounded-3xl flex items-center justify-center">
                      <div className="opacity-0 group-hover/demo:opacity-100 transition-opacity bg-[#6F4E37] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-2xl">
                        <Sparkles className="w-4 h-4" />
                        Try Interactive Demo
                      </div>
                    </div>
                  </Link>
                 <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  className="z-10 relative h-full flex items-center justify-center"
                 >
                    <LaptopFrame className="scale-75 sm:scale-90 lg:scale-100 shadow-[0_50px_100px_rgba(111,78,55,0.15)] ring-1 ring-black/5">
                       <div className="bg-zinc-900 h-full flex flex-col p-6 lg:p-8 overflow-hidden">
                          <div className="flex justify-between items-center mb-6 lg:mb-10">
                             <div className="flex items-center gap-2 lg:gap-3">
                               <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#6F4E37] rounded-xl flex items-center justify-center text-white font-black text-xs lg:text-base">AI</div>
                               <div className="text-[8px] lg:text-[10px] font-black text-white/40 uppercase tracking-widest">Engine</div>
                             </div>
                             <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center justify-center text-[8px] lg:text-[10px] font-black text-green-400">LIVE SYNC</div>
                          </div>
                          <div className="space-y-4 lg:space-y-6">
                             <div className="h-10 bg-white/5 rounded-xl border border-white/5 flex items-center px-4 justify-between">
                                <div className="text-[8px] lg:text-[10px] font-black text-white/20 uppercase tracking-widest">Status: Preparing</div>
                                <div className="w-1/3 lg:w-1/2 h-1 bg-white/10 rounded-full overflow-hidden">
                                   <motion.div 
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-full h-full bg-[#6F4E37]"
                                   />
                                </div>
                             </div>
                             <div className="grid grid-cols-2 gap-3 lg:gap-4">
                                <div className="aspect-square bg-white/5 rounded-2xl border border-white/5 p-3 lg:p-4 flex flex-col justify-end">
                                   <div className="text-xl lg:text-2xl mb-1 lg:mb-2">🍰</div>
                                   <div className="text-[6px] lg:text-[8px] font-black text-[#D4A373] uppercase tracking-widest">+12% LIFT</div>
                                </div>
                                <div className="aspect-square bg-white/5 rounded-2xl border border-white/5 p-3 lg:p-4 flex flex-col justify-end">
                                   <div className="text-xl lg:text-2xl mb-1 lg:mb-2">☕</div>
                                   <div className="text-[6px] lg:text-[8px] font-black text-green-400 uppercase tracking-widest">BEST COMBO</div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </LaptopFrame>
                 </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA to Demo */}
      <section className="py-24 px-6 bg-zinc-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-outfit font-black text-4xl md:text-6xl mb-6">Ready to see it in action?</h2>
          <p className="text-zinc-400 text-lg mb-10">Experience the full system with our interactive demo.</p>
          <Link href="/demo" className="inline-flex items-center gap-2 bg-[#6F4E37] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#5A3E2B] transition-all hover:scale-105 shadow-2xl">
            <Sparkles className="w-5 h-5" />
            Launch Interactive Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
