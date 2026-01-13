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
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-4 py-1.5 mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#6F4E37] animate-pulse" />
            <span className="text-xs font-semibold tracking-wide uppercase text-zinc-500">The ROI-Focussed OS for Restaurants</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-outfit font-black text-4xl sm:text-5xl md:text-8xl leading-[0.95] tracking-tighter mb-6 md:mb-8 italic"
          >
            THE OS FOR <br className="hidden md:block"/>
            <span className="text-[#6F4E37] not-italic">PROFITABLE</span> DINING.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-2xl text-zinc-500 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-medium px-4 md:px-0"
          >
            Stop losing revenue to manual errors and friction. Media Masala is the high-fidelity system that turns your menu into a <span className="text-zinc-900 font-black">Conversion Machine</span>.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0"
          >
            <Link 
              href="#features"
              className="w-full sm:w-auto bg-zinc-900 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-zinc-800 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-2xl shadow-zinc-900/10 min-h-[56px]"
            >
              Start Scaling Today <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/demo"
              className="w-full sm:w-auto bg-white border-2 border-zinc-200 text-zinc-900 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg hover:border-[#6F4E37] hover:text-[#6F4E37] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group min-h-[56px]"
            >
            See The Demo <Sparkles className="w-4 h-4 text-[#6F4E37] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>


          {/* High-Fidelity Hero Showcase */}
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
                    // Disable heavy scaling on mobile to prevent lag
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

            {/* Background Glows (Original static ones, kept for layering) */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#6F4E37]/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-200/20 blur-[100px] rounded-full" />

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
                initial={{ opacity: 0, x: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 50, y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 30 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="lg:col-span-4 relative group flex justify-center lg:block"
              >
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
                            Scan to Order
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


      {/* Premium Demo CTA Section */}
      <section className="py-32 px-6 bg-zinc-900 text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-[#6F4E37]/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#6F4E37]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full"
              >
                <span className="w-2 h-2 rounded-full bg-[#6F4E37] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A373]">Live Interactive Simulation</span>
              </motion.div>
              
              <div className="space-y-6">
                <h2 className="font-outfit font-black text-4xl md:text-6xl leading-[1.1]">
                  Experience the <span className="text-[#D4A373]">Future</span> of Dining.
                </h2>
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium max-w-xl">
                  Don't just take our word for it. Step into our dual-perspective demo and see how orders flow seamlessly from customer to kitchen in real-time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="/demo" 
                  className="bg-[#D4A373] text-zinc-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#E5B585] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#D4A373]/20 hover:scale-[1.02] active:scale-95 group"
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
              {/* Laptop Perspective */}
              <motion.div 
                initial={{ opacity: 0, y: 40, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <LaptopFrame className="scale-90 md:scale-100 origin-right transition-transform group-hover:scale-[1.02] duration-700">
                  <div className="bg-zinc-50 h-full p-4">
                    <div className="flex gap-2 mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-zinc-100" />
                      <div className="flex-1 space-y-2">
                        <div className="w-24 h-2 bg-zinc-200 rounded" />
                        <div className="w-16 h-2 bg-zinc-100 rounded" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-24 bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-[#6F4E37] opacity-20" />
                      </div>
                      <div className="h-24 bg-white rounded-2xl shadow-sm border border-zinc-100 p-3 space-y-2">
                         <div className="w-full h-1 bg-green-100 rounded" />
                         <div className="w-[80%] h-1 bg-green-100 rounded" />
                         <div className="w-full h-1 bg-green-100 rounded" />
                      </div>
                    </div>
                  </div>
                </LaptopFrame>
              </motion.div>

              {/* Overlapping Phone Perspective */}
              <motion.div 
                initial={{ opacity: 0, x: 40, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: -5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute -left-12 -bottom-20 md:-left-20 md:-bottom-12 z-20 scale-75 md:scale-90"
              >
                <PhoneFrame className="transition-transform group-hover:rotate-0 group-hover:scale-95 duration-700">
                  <div className="bg-white h-full flex flex-col">
                     <div className="p-4 border-b border-zinc-100 flex justify-between items-center">
                        <div className="w-8 h-8 bg-zinc-900 rounded-lg" />
                        <ShoppingCart className="w-4 h-4 text-zinc-300" />
                     </div>
                     <div className="flex-1 p-4 space-y-4 bg-[#FAFAFA]">
                        <div className="aspect-square bg-white rounded-3xl shadow-sm border border-zinc-100 flex items-center justify-center text-3xl">☕</div>
                        <div className="space-y-1">
                          <div className="w-20 h-2 bg-zinc-200 rounded" />
                          <div className="w-full h-8 bg-[#6F4E37]/10 rounded-xl" />
                        </div>
                     </div>
                  </div>
                </PhoneFrame>
              </motion.div>

              {/* Floating Success Indicator */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-10 -right-4 z-30 bg-white p-4 rounded-2xl shadow-2xl border border-zinc-100 hidden md:flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-none">Status</p>
                  <p className="text-[10px] font-bold text-zinc-900">Order Sent</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Social Proof */}
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


      {/* Cinematic Feature Universe */}
      <section id="features" className="py-48 px-6 bg-white relative overflow-hidden">
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
          
          <div className="text-center mb-40">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-8 shadow-2xl"
            >
                <Sparkles className="w-3 h-3 text-amber-400" /> System Architecture
            </motion.div>
            <h3 className="font-outfit font-black text-5xl md:text-9xl tracking-tighter leading-none">
              ZERO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F4E37] to-amber-200">WAIT.</span><br/>
              MAX PROFIT.
            </h3>
            <p className="text-zinc-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
              Every touchpoint is designed for conversion. High-fidelity ordering mechanics that turn guests into loyal brand advocates.
            </p>
          </div>

          <div className="space-y-64">
            
            {/* Section 1: The Digital Gateway (QR Menu + Table Ordering) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10 order-2 lg:order-1">
                <div className="space-y-6">
                   <div className="w-16 h-16 bg-[#6F4E37] rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-[#6F4E37]/30 mb-8">
                      <QrCode className="w-8 h-8" />
                   </div>
                   <h3 className="font-outfit font-black text-4xl md:text-6xl tracking-tight">The Digital Gateway.</h3>
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

              <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2 group">
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



      {/* Pricing */}
      {/* Pricing Teaser */}
      <section className="py-24 px-6 bg-zinc-50 border-y border-zinc-200">
         <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-outfit font-bold text-3xl md:text-5xl mb-6">Fair, Usage-Based Pricing</h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto mb-10">We don't sell plans. We calculate a fair price based on your business size and needs.</p>
            
            <Link 
                href="/pricing"
                className="inline-flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all hover:scale-105 shadow-xl shadow-zinc-900/10"
            >
                Calculate Your Price <ArrowRight className="w-4 h-4" />
            </Link>
         </div>
      </section>

      {/* FAQ / Final CTA */}
      <section className="py-24 px-6 bg-white border-t border-zinc-100">
          <div className="container mx-auto max-w-4xl text-center">
              <h2 className="font-outfit font-bold text-4xl mb-6">Ready to transform your business?</h2>
              <p className="text-zinc-500 text-lg mb-10">Join 500+ restaurants using Media Masala to power their ordering.</p>
              <Link 
                href="#features"
                className="inline-block bg-zinc-900 text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl shadow-zinc-900/10 hover:shadow-2xl hover:scale-105 transition-all text-center"
              >
                  Get Started for Free
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
                          <li><a href="#" className="hover:text-zinc-900">Features</a></li>
                          <li><a href="#" className="hover:text-zinc-900">Pricing</a></li>
                          <li><a href="#" className="hover:text-zinc-900">Showcase</a></li>
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



function ShowcaseFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white border border-zinc-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all"
        >
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-900 mb-6 transition-transform hover:scale-110">
                {icon}
            </div>
            <h3 className="font-bold text-xl mb-3 font-outfit">{title}</h3>
            <p className="text-zinc-500 leading-relaxed text-sm font-medium">{desc}</p>
        </motion.div>
    );
}




