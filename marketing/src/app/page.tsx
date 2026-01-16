"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Smartphone, 
  LayoutDashboard, 
  QrCode,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Sparkles,
  ShoppingCart,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { PhoneFrame, LaptopFrame } from "@/components/DeviceFrames";


const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden text-zinc-900">
      
      <Navbar />


      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#FAF0F4] text-[#8C5E6E] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm border border-[#EAD0DB]/50"
          >
            POWERED BY MEDIAMASALA PVT LTD
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-outfit font-black text-3xl sm:text-4xl md:text-7xl leading-[1.1] tracking-tight mb-6 md:mb-8"
          >
            Build the Right Restaurant System for Your Business Size
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-zinc-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium px-4 md:px-0"
          >
            Tell us about your business. Choose what you need. Pricing adapts automatically.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0"
          >
            <Link 
              href="/demo"
              className="w-full sm:w-auto bg-[#6F4E37] text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-[#5A3E2B] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-2xl shadow-[#6F4E37]/20 min-h-[56px]"
            >
              See How It Works <ArrowRight/>
            </Link>
            <Link 
              href="/trial"
              className="w-full sm:w-auto bg-white border-2 border-zinc-200 text-zinc-900 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg hover:border-[#6F4E37] hover:text-[#6F4E37] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group min-h-[56px]"
            >
              Start 7-Day Free Trial <ArrowRight className="w-4 h-4 text-[#6F4E37] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* High-Fidelity Hero Showcase */}
      <section className="pb-16 md:pb-32 px-6">
        <div className="container mx-auto">
          <div className="mt-24 relative max-w-5xl mx-auto">
            {/* Infinite Momentum Hero Background */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
               <motion.div 
                 animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.4, 0.3]
                 }}
                 transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatType: "mirror"
                 }}
                 className="absolute -top-40 -left-20 w-[120%] h-[120%] bg-[#6F4E37]/5 blur-[60px] md:blur-[120px] rounded-full will-change-transform"
               />
               <motion.div 
                 animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.3, 0.2]
                 }}
                 transition={{ 
                    duration: 25, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatType: "mirror"
                 }}
                 className="absolute -bottom-40 -right-20 w-[100%] h-[100%] bg-amber-100/20 blur-[100px] md:blur-[150px] rounded-full hidden md:block will-change-transform"
               />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Laptop Display (Admin Perspective) */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="lg:col-span-8 group"
              >
                <div className="relative">
                  <LaptopFrame className="shadow-2xl shadow-zinc-300 transform transition-transform group-hover:scale-[1.01] duration-700">
                    <div className="bg-zinc-900 h-full flex flex-col p-6 overflow-hidden">
                          <div className="flex justify-between items-center mb-8">
                             <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-[#6F4E37] rounded-lg flex items-center justify-center text-white font-black text-xs">AI</div>
                               <div className="w-24 h-2 bg-white/10 rounded-full" />
                             </div>
                             <div className="w-16 h-5 bg-green-500/10 rounded-full border border-green-500/20 flex items-center justify-center text-[8px] font-black text-green-500">LIVE GAIN</div>
                          </div>
                          <div className="flex-1 flex items-end gap-2 px-2">
                             {[40, 70, 55, 90, 65, 100, 80, 110].map((h, i) => (
                               <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: 0.8 + (i * 0.1), duration: 1 }}
                                className="flex-1 bg-gradient-to-t from-[#6F4E37] to-[#D4A373] rounded-t-lg opacity-80"
                               />
                             ))}
                          </div>
                          <div className="mt-6 flex gap-4">
                             <div className="flex-1 h-12 bg-white/5 rounded-xl border border-white/5 p-2 flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-500/20 rounded-lg" />
                                <div className="w-12 h-2 bg-white/10 rounded-full" />
                             </div>
                             <div className="flex-1 h-12 bg-white/5 rounded-xl border border-white/5 p-2 flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#6F4E37]/20 rounded-lg" />
                                <div className="w-12 h-2 bg-white/10 rounded-full" />
                             </div>
                          </div>
                       </div>
                  </LaptopFrame>

                  {/* Floating Feature Badges */}
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4, 
                      ease: "easeInOut" 
                    }}
                    className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-zinc-100 flex items-center gap-3 z-20 will-change-transform"
                  >
                    <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white shadow-lg shadow-black/10">
                      <TrendingUp className="w-5 h-5 text-[#D4A373]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">Yield Lift</p>
                      <p className="text-xs font-bold text-zinc-900">+112% Accuracy</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Phone Display (Guest Perspective) */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="lg:col-span-4 relative group flex justify-center lg:block"
              >
                <Link href="/demo" className="absolute inset-0 z-50 cursor-pointer group/demo flex items-center justify-center" aria-label="Try Demo">
                  <div className="opacity-0 group-hover/demo:opacity-100 transition-opacity bg-[#6F4E37] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-2xl">
                    <Sparkles className="w-4 h-4" />
                    Try Interactive Demo
                  </div>
                </Link>
                <PhoneFrame className="scale-85 sm:scale-95 lg:scale-100 lg:-ml-12 shadow-2xl shadow-zinc-300 transform transition-transform group-hover:scale-[1.01] active:scale-95 duration-700">
                   <div className="bg-[#FAF7F2] h-full flex flex-col pt-12">
                      <div className="flex-1 px-5 space-y-6 flex flex-col items-center">
                         <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-2">
                           <QrCode className="w-10 h-10 text-[#6F4E37]" />
                         </div>
                         <div className="text-center space-y-2">
                            <div className="w-32 h-2 bg-zinc-200 rounded-full mx-auto" />
                            <div className="w-24 h-2 bg-zinc-100 rounded-full mx-auto" />
                         </div>
                         <div className="w-full h-10 bg-[#6F4E37] rounded-xl flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest">
                            See Demo<ArrowRight/>
                         </div>
                      </div>
                   </div>
                </PhoneFrame>

                {/* Floating Feature Badges */}
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-4 -right-2 lg:-bottom-6 lg:-right-12 bg-white p-3 lg:p-4 rounded-2xl shadow-xl border border-zinc-100 flex items-center gap-2 lg:gap-3 z-20"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-amber-400 rounded-full flex items-center justify-center text-amber-900 shadow-lg shadow-amber-400/20">
                    <Sparkles className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <div>
                    <p className="text-[8px] lg:text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">AI Engine</p>
                    <p className="text-[10px] lg:text-xs font-bold text-zinc-900">+14% Growth</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute top-1/2 -left-4 lg:-left-20 bg-zinc-900 p-2 lg:p-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2 lg:gap-3 z-20"
                >
                   <QrCode className="w-4 h-4 lg:w-5 lg:h-5 text-[#D4A373]" />
                   <div className="text-[8px] lg:text-[9px] font-black text-zinc-400 uppercase tracking-widest">Digital Menu</div>
                </motion.div>

                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                   className="absolute -top-12 right-0 bg-white p-3 rounded-2xl shadow-xl border border-zinc-100 hidden md:flex items-center gap-2 z-20"
                 >
                  <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none">Recovered <br/><span className="text-green-600 font-black">10.4% Revenue</span></div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>


      {/* How it Works Section */}
      <section className="py-24 md:py-32 bg-[#FAF7F2] border-y border-[#F0EDE8]">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 md:mb-20">
            <div className="max-w-xl space-y-4">
               <span className="inline-block px-4 py-1.5 bg-[#6F4E37]/10 border border-[#6F4E37]/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#6F4E37]">The Workflow</span>
               <h2 className="font-outfit font-black text-4xl md:text-6xl text-[#3E2723] leading-none">How It Works</h2>
               <p className="text-[#A68966] text-sm md:text-lg font-medium">Three simple steps to transition your legacy service into a modern high-performance operation.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-[#E7DCCA] -z-0" />
            
            {[
              { 
                step: "01", 
                title: "Scan & Browse", 
                desc: "Guest scans the table QR. No apps, no logins. Instant access to your premium digital menu.", 
                icon: <QrCode className="w-8 h-8"/>,
                color: "bg-white",
                textColor: "text-[#6F4E37]"
              },
              { 
                step: "02", 
                title: "Order & Pay", 
                desc: "Intuitive customization and secure checkout. Orders are placed in seconds with 0% error rate.", 
                icon: <Smartphone className="w-8 h-8"/>,
                color: "bg-[#6F4E37]",
                textColor: "text-white"
              },
              { 
                step: "03", 
                title: "Live Kitchen Sync", 
                desc: "Orders hit the kitchen display instantly. Staff gets notified and starts cooking with zero manual entry.", 
                icon: <Zap className="w-8 h-8"/>,
                color: "bg-white",
                textColor: "text-[#6F4E37]"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left group"
              >
                <div className={`w-20 h-20 ${item.color} ${item.textColor} rounded-[2rem] shadow-xl flex items-center justify-center mb-8 border border-[#F0EDE8] group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <span className="text-[10px] font-black text-[#6F4E37] bg-white border border-[#F0EDE8] px-2 py-0.5 rounded-full">{item.step}</span>
                    <h3 className="font-outfit font-black text-xl md:text-2xl text-[#3E2723]">{item.title}</h3>
                  </div>
                  <p className="text-[#A68966]/80 text-sm md:text-base leading-relaxed font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Premium Demo CTA Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-[#6F4E37]/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#6F4E37]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="space-y-6 md:space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full"
              >
                <span className="w-2 h-2 rounded-full bg-[#6F4E37] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A373]">Live Interactive Simulation</span>
              </motion.div>
              
              <div className="space-y-4 md:space-y-6">
                <h2 className="font-outfit font-black text-3xl md:text-6xl leading-[1.1]">
                  Experience the <span className="text-[#D4A373]">Future</span> of Dining.
                </h2>
                <p className="text-zinc-400 text-base md:text-xl leading-relaxed font-medium max-w-xl">
                  Don't just take our word for it. Step into our dual-perspective demo and see how orders flow seamlessly from customer to kitchen in real-time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <Link 
                  href="/demo" 
                  className="bg-[#D4A373] text-zinc-900 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:bg-[#E5B585] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#D4A373]/20 hover:scale-[1.02] active:scale-95 group"
                >
                  Launch Full Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+20}`} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">
                    <span className="text-white">1.2k+</span> restauranteurs <br/> tried today
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div>
                  <div className="text-[#D4A373] font-black text-2xl mb-1">0%</div>
                  <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Sign-up required</div>
                </div>
                <div>
                  <div className="text-[#D4A373] font-black text-2xl mb-1">Side-by-Side</div>
                  <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Admin/Guest View</div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <motion.div 
                initial={{ opacity: 0, y: 40, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <LaptopFrame className="scale-90 md:scale-100 origin-right transition-transform group-hover:scale-[1.02] duration-700">
                  <div className="bg-[#FAF7F2] h-full p-6 flex flex-col font-outfit">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-[#A68966]">Live Dashboard</p>
                        <h4 className="text-sm font-black text-[#3E2723]">Kitchen Display</h4>
                      </div>
                      <div className="bg-[#6F4E37] text-white px-3 py-1 rounded-full text-[9px] font-black">₹44,250</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div className="bg-white rounded-2xl p-4 border border-[#F0EDE8] shadow-sm space-y-3">
                         <div className="flex justify-between items-center">
                            <span className="text-[7px] font-black text-[#6F4E37] uppercase">Active Ticket</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                         </div>
                         <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[9px] font-bold">
                               <span className="text-zinc-600">Table #5</span>
                               <span className="text-[#3E2723]">₹920</span>
                            </div>
                            <div className="h-0.5 bg-[#FAF7F2] w-full" />
                            <p className="text-[8px] text-[#A68966] leading-tight font-medium">1x Kashmiri Chai<br/>1x Paneer Tikka</p>
                         </div>
                      </div>
                      <div className="space-y-3">
                         <div className="bg-white rounded-2xl p-3 border border-[#F0EDE8] shadow-sm flex items-center gap-3">
                            <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
                               <TrendingUp className="w-4 h-4 text-amber-600" />
                            </div>
                            <div>
                               <p className="text-[7px] font-black text-[#A68966] uppercase">Efficiency</p>
                               <p className="text-xs font-black text-[#3E2723]">98.4%</p>
                            </div>
                         </div>
                         <div className="bg-zinc-900 rounded-2xl p-3 shadow-xl flex items-center gap-3 border border-white/5">
                            <div className="w-8 h-8 bg-[#6F4E37] rounded-xl flex items-center justify-center">
                               <Zap className="w-4 h-4 text-white" />
                            </div>
                            <div>
                               <p className="text-[7px] font-black text-white/40 uppercase">Growth</p>
                               <p className="text-xs font-black text-white">+14.2%</p>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </LaptopFrame>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: -5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute -left-10 -bottom-16 md:-left-16 md:-bottom-8 z-20 scale-75 md:scale-90"
              >
                <PhoneFrame className="transition-transform group-hover:rotate-0 group-hover:scale-95 duration-700">
                  <div className="bg-white h-full flex flex-col font-outfit">
                     <div className="p-5 border-b border-[#F0EDE8] flex justify-between items-center bg-[#FAF7F2]">
                        <span className="text-[10px] font-black text-[#3E2723]">MEDIA MASALA</span>
                        <div className="relative">
                           <ShoppingCart className="w-4 h-4 text-[#A68966]" />
                           <span className="absolute -top-1.5 -right-1.5 bg-[#6F4E37] text-white text-[7px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-black">2</span>
                        </div>
                     </div>
                     <div className="flex-1 p-5 space-y-5 bg-white">
                        <div className="aspect-square bg-[#FAF7F2] rounded-[2rem] shadow-inner border border-[#F0EDE8] flex flex-col items-center justify-center p-6 text-center">
                           <span className="text-5xl mb-4 drop-shadow-lg">☕</span>
                           <h5 className="text-sm font-black text-[#3E2723]">Caramel Latte</h5>
                           <p className="text-[9px] text-[#A68966] font-bold mt-1 uppercase tracking-widest">Premium Coffee</p>
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between items-center">
                              <span className="text-xs font-black text-[#6F4E37]">₹380.00</span>
                              <div className="flex gap-1">
                                 {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#6F4E37]/10" />)}
                              </div>
                           </div>
                           <div className="w-full h-12 bg-[#6F4E37] rounded-2xl flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#6F4E37]/20 border-b-4 border-[#3E2723]/30">
                              Customize Order
                           </div>
                        </div>
                     </div>
                  </div>
                </PhoneFrame>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Social Proof Section */}
      <section className="py-12 border-y border-zinc-100 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-10">Trusted by modern hospitality leaders</p>
          <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             {["The Saffron Kitchen", "Himalayan Brews", "Urban Tandoor", "Masala Republic"].map((brand, i) => (
               <span key={i} className="text-2xl font-black font-outfit text-zinc-800">{brand}</span>
             ))}
          </div>
        </div>
      </section>


      {/* Brief Feature Highlights */}
      <section id="features" className="py-16 md:py-32 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 bg-zinc-100 border border-zinc-200 rounded-full text-xs font-black uppercase tracking-widest text-zinc-600 mb-6">What You Get</span>
            <h2 className="font-outfit font-black text-3xl md:text-6xl mb-4 md:mb-6">Everything You Need<br className="md:hidden" /> to Scale</h2>
            <p className="text-zinc-500 text-sm md:text-lg max-w-2xl mx-auto">A complete system that handles everything from QR ordering to kitchen sync to AI-powered growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 md:p-8 bg-zinc-50 rounded-2xl md:rounded-3xl border border-zinc-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#6F4E37] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <QrCode className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="font-black text-lg md:text-xl mb-2 md:mb-3 text-zinc-900">Digital Gateway</h3>
              <p className="text-zinc-600 leading-relaxed text-sm md:text-base">QR menu, table ordering, zero app downloads. Instant ordering for guests.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-6 md:p-8 bg-zinc-50 rounded-2xl md:rounded-3xl border border-zinc-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-900 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="font-black text-lg md:text-xl mb-2 md:mb-3 text-zinc-900">Conversion Engine</h3>
              <p className="text-zinc-600 leading-relaxed text-sm md:text-base">Customization, cart, checkout. Maximize order value with zero friction.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-6 md:p-8 bg-zinc-50 rounded-2xl md:rounded-3xl border border-zinc-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#6F4E37] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="font-black text-lg md:text-xl mb-2 md:mb-3 text-zinc-900">Real-time Intelligence</h3>
              <p className="text-zinc-600 leading-relaxed text-sm md:text-base">Live tracking, AI upsells, instant kitchen sync. All in real-time.</p>
            </motion.div>
          </div>

          <div className="text-center">
            <Link href="/features" className="inline-flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all hover:scale-105 shadow-xl">
              Explore All Features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* Trial Teaser */}
      <section className="py-24 px-6 bg-[#FAF7F2] border-y border-[#F0EDE8]">
         <div className="container mx-auto max-w-4xl text-center">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 bg-[#6F4E37]/10 text-[#6F4E37] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-[#6F4E37]/20"
            >
               Zero Risk • Full Access
            </motion.div>
            <h2 className="font-outfit font-black text-3xl md:text-5xl mb-6 text-[#3E2723]">Experience the Difference Yourself</h2>
            <p className="text-[#A68966] text-lg max-w-2xl mx-auto mb-10 font-medium">No plans, no complexity. Request your 7-day free trial today and see how our ecosystem scales your restaurant.</p>
            
            <Link 
                href="/trial"
                className="inline-flex items-center gap-2 bg-[#6F4E37] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#5A3E2B] transition-all hover:scale-105 shadow-xl shadow-[#6F4E37]/20"
            >
                Start Your 7-Day Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
         </div>
      </section>


      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-white border-t border-zinc-100">
          <div className="container mx-auto max-w-4xl text-center">
              <h2 className="font-outfit font-bold text-4xl mb-6">Ready to transform your business?</h2>
              <p className="text-zinc-500 text-lg mb-10">Join 500+ restaurants using Media Masala to power their ordering.</p>
              <Link 
                href="/demo"
                className="inline-block bg-[#6F4E37] text-white px-10 py-5 rounded-full text-lg font-black shadow-xl shadow-[#6F4E37]/20 hover:shadow-2xl hover:scale-105 transition-all text-center"
              >
                  Launch Live Demo <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </Link>
          </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#FAFAFA] border-t border-zinc-200 pt-20 pb-10 px-6">
          <div className="container mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                  <div className="col-span-2 md:col-span-1">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-base">M</span>
                        </div>
                        <span className="font-outfit font-bold text-xl">Media Masala</span>
                      </div>
                      <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                          Empowering hospitality businesses with next-gen digital tools.
                      </p>
                  </div>
                  <div>
                      <h4 className="font-bold mb-6">Product</h4>
                      <ul className="space-y-4 text-sm text-zinc-500">
                          <li><Link href="/features" className="hover:text-zinc-900">Features</Link></li>
                          <li><Link href="/trial" className="hover:text-zinc-900">Start Trial</Link></li>
                          <li><Link href="/demo" className="hover:text-zinc-900">Showcase</Link></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="font-bold mb-6">Company</h4>
                      <ul className="space-y-4 text-sm text-zinc-500">
                          <li><a href="#" className="hover:text-zinc-900">About</a></li>
                          <li><a href="#" className="hover:text-zinc-900">Contact</a></li>
                          <li><a href="#" className="hover:text-zinc-900">Careers</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="font-bold mb-6">Legal</h4>
                      <ul className="space-y-4 text-sm text-zinc-500">
                          <li><a href="#" className="hover:text-zinc-900">Privacy</a></li>
                          <li><a href="#" className="hover:text-zinc-900">Terms</a></li>
                      </ul>
                  </div>
              </div>
              <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-400">
                  <p>© 2024 Media Masala. All rights reserved.</p>
                  <div className="flex gap-6">
                      <a href="#" className="hover:text-zinc-900">Twitter</a>
                      <a href="#" className="hover:text-zinc-900">LinkedIn</a>
                      <a href="#" className="hover:text-zinc-900">Instagram</a>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
}
