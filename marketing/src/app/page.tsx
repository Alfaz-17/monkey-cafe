"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Check,
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
  Plus,
  Coffee,
  Utensils,
  Clock,
  Shield,
  Star,
  Users
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
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6F4E37]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 rounded-full shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-zinc-700">  POWERED BY MEDIAAMASALA PVT LTD</span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-outfit font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-zinc-900"
            >
              Turn your menu into a 
              <br />
              <span className="text-[#6F4E37]">hospitality experience.</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Menus designed to build comfort, trust, and brand value — not just display food items.
              <br className="hidden md:block" />
              Built for restaurant owners who care about how customers feel.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link 
                href="/demo"
                className="group w-full sm:w-auto bg-[#6F4E37] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#5A3E2B] transition-all hover:shadow-2xl hover:shadow-[#6F4E37]/20 flex items-center justify-center gap-2"
              >
                See how it looks 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/trial"
                className="w-full sm:w-auto bg-white border-2 border-zinc-200 text-zinc-900 px-8 py-4 rounded-xl font-bold text-lg hover:border-[#6F4E37] hover:text-[#6F4E37] transition-all hover:shadow-lg flex items-center justify-center gap-2"
              >
                For restaurant owners
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-zinc-500"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6F4E37]" />
                <span className="font-semibold text-zinc-900">Live Demo: SWAT x Café</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-200" />
                <span className="font-medium">See it in action</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SWAT x Café Showcase Section */}
      <section className="pb-24 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
                <p className="text-[#6F4E37] font-black uppercase tracking-[0.3em] text-xs mb-4">A real menu we built</p>
                <h2 className="text-3xl md:text-5xl font-outfit font-black text-zinc-900 mb-6">Calm browsing, clear descriptions.</h2>
                <div className="w-20 h-1 bg-[#6F4E37]/20 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { name: "Café Latte", price: "₹139", desc: "Smooth espresso with velvety steamed milk", icon: "☕" },
                    { name: "Hot Chocolate", price: "₹149", desc: "Rich and creamy Belgian hot chocolate", badge: "Popular", icon: "🍫" },
                    { name: "Hazelnut Cold Coffee", price: "₹169", desc: "Premium cold coffee with rich hazelnut syrup", badge: "New", icon: "🧊" },
                    { name: "Paneer Peri Peri Sandwich", price: "₹159", desc: "Grilled sandwich with spicy peri peri paneer", badge: "Popular", icon: "🥪" },
                    { name: "Margherita Pizza", price: "₹199", desc: "Classic pizza with mozzarella and fresh basil", icon: "🍕" },
                    { name: "Chocolate Brownie", price: "₹139", desc: "Warm fudgy brownie with vanilla ice cream", badge: "Popular", icon: "🍰" },
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-white p-8 rounded-[2.5rem] border border-zinc-100 hover:shadow-[0_40px_100px_rgba(0,0,0,0.04)] transition-all duration-700 relative overflow-hidden"
                    >
                        {item.badge && (
                            <div className="absolute top-6 right-6">
                                <span className="bg-[#6F4E37] text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                                    {item.badge}
                                </span>
                            </div>
                        )}
                        <div className="w-16 h-16 bg-[#FAF7F2] rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-700">
                            {item.icon}
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-xl font-black text-zinc-900">{item.name}</h3>
                                <span className="text-[#6F4E37] font-black">{item.price}</span>
                            </div>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <Link 
                    href="/demo"
                    className="inline-flex items-center gap-3 bg-zinc-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-black/10"
                >
                    Explore Full Demo Menu
                    <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="mt-6 text-zinc-400 text-sm font-bold uppercase tracking-widest">Fully branded, customized menu experience</p>
            </div>
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
                   <div className="bg-white h-full flex flex-col">
                      {/* Header */}
                      <div className="p-4 border-b border-zinc-100 flex justify-between items-center bg-[#FAF7F2]">
                         <span className="text-[10px] font-black text-[#3E2723]">AI MENU SYSTEM</span>
                         <div className="relative">
                            <ShoppingCart className="w-4 h-4 text-[#A68966]" />
                            <span className="absolute -top-1.5 -right-1.5 bg-[#6F4E37] text-white text-[7px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-black">2</span>
                         </div>
                      </div>
                      
                      {/* Menu Item Card */}
                      <div className="flex-1 p-5 space-y-5 bg-white overflow-hidden">
                         <div className="bg-[#FAF7F2] rounded-[2rem] p-6 border border-[#F0EDE8] shadow-sm">
                            <div className="text-center space-y-4">
                               <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto text-3xl">
                                  ☕
                               </div>
                               <div>
                                  <h5 className="text-sm font-black text-[#3E2723]">Caramel Latte</h5>
                                  <p className="text-[9px] text-[#A68966] font-bold mt-1 uppercase tracking-widest">Premium Coffee</p>
                               </div>
                               <div className="flex justify-between items-center pt-2">
                                  <span className="text-xs font-black text-[#6F4E37]">₹380.00</span>
                                  <div className="flex gap-1">
                                     {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-[#6F4E37]/20" />)}
                                  </div>
                               </div>
                            </div>
                         </div>
                         
                         <div className="w-full h-12 bg-[#6F4E37] rounded-2xl flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#6F4E37]/20 border-b-4 border-[#3E2723]/30">
                            Add to Order
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


      {/* Experience Pillars Section */}
      <section className="py-24 md:py-32 bg-[#FAF7F2] border-y border-[#F0EDE8]">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 md:mb-24 text-center md:text-left">
            <div className="max-w-xl space-y-4 mx-auto md:mx-0">
               <span className="inline-block px-4 py-1.5 bg-[#6F4E37]/10 border border-[#6F4E37]/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#6F4E37]">The Guest Experience</span>
               <h2 className="font-outfit font-black text-4xl md:text-6xl text-[#3E2723] leading-tight">This is what your customers experience.</h2>
               <p className="text-[#A68966] text-sm md:text-lg font-medium leading-relaxed">
                  A calm, clean, beautifully branded menu that helps guests understand food easily and order confidently.
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {[
              { 
                num: "01", 
                title: "Beautiful First Impression", 
                desc: "Your restaurant's identity shines through — colors, fonts, and personality that match your brand.", 
                icon: <Sparkles className="w-8 h-8"/>,
              },
              { 
                num: "02", 
                title: "Clear Dish Understanding", 
                desc: "Ingredients, taste profiles, and spice levels explained in ways that help guests decide confidently.", 
                icon: <Utensils className="w-8 h-8"/>,
              },
              { 
                num: "03", 
                title: "Comfortable Browsing", 
                desc: "No confusion, no rushing. Guests take their time and enjoy the experience.", 
                icon: <Clock className="w-8 h-8"/>,
              },
              { 
                num: "04", 
                title: "Family-Friendly Design", 
                desc: "Readable by everyone — from kids to elders. Built for how Indian families actually dine.", 
                icon: <Users className="w-8 h-8"/>,
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 group"
              >
                <div className="flex-shrink-0">
                    <div className="text-5xl font-outfit font-black text-[#6F4E37]/10 group-hover:text-[#6F4E37]/20 transition-colors duration-500 mb-2">
                        {item.num}
                    </div>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-[#F0EDE8] flex items-center justify-center text-[#6F4E37]">
                    {item.icon}
                  </div>
                  <h3 className="font-outfit font-black text-xl md:text-2xl text-[#3E2723]">{item.title}</h3>
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
                className="absolute -left-10 -bottom-16 md:-left-16 md:-bottom-8 z-20 scale-[0.6] md:scale-[0.7]"
              >
                {/* <PhoneFrame className="transition-transform group-hover:rotate-0 group-hover:scale-95 duration-700">
                  <div className="bg-white h-full flex flex-col font-outfit">
                     <div className="p-5 border-b border-[#F0EDE8] flex justify-between items-center bg-[#FAF7F2]">
                        <span className="text-[10px] font-black text-[#3E2723]">AI MENU SYSTEM</span>
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
                </PhoneFrame> */}
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Social Proof Section
      <section className="py-12 border-y border-zinc-100 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-10">Trusted by modern hospitality leaders</p>
          <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             {["The Saffron Kitchen", "Himalayan Brews", "Urban Tandoor", "Masala Republic"].map((brand, i) => (
               <span key={i} className="text-2xl font-black font-outfit text-zinc-800">{brand}</span>
             ))}
          </div>
        </div>
      </section> */}


      {/* Philosophy Section - Problem & Solution */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900 text-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Problem */}
            <div className="space-y-12">
               <div className="space-y-4">
                  <span className="text-[#D4A373] text-[10px] font-black uppercase tracking-[0.3em]">The industry problem</span>
                  <h2 className="text-3xl md:text-5xl font-outfit font-black leading-tight">Why most menus don't help restaurants grow.</h2>
               </div>
               <div className="space-y-6">
                  {[
                    "Customers feel confused choosing dishes",
                    "Menus look the same everywhere",
                    "Staff repeats the same explanations",
                    "Brand value is not visible",
                    "Wrong orders and dissatisfaction happen"
                  ].map((text, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 text-zinc-400 group"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-[#D4A373] transition-colors" />
                        <span className="text-lg font-medium group-hover:text-white transition-colors">{text}</span>
                    </motion.div>
                  ))}
               </div>
               <p className="text-[#D4A373] font-black text-xl italic pt-8 border-t border-white/5">
                 "Your food may be great — but your menu doesn't show it."
               </p>
            </div>

            {/* Solution */}
            <div className="bg-[#1A1A1A] p-8 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                    <CheckCircle2 className="w-12 h-12 text-[#6F4E37] opacity-20" />
                </div>
                <div className="relative z-10 space-y-10">
                    <div className="space-y-4">
                        <span className="text-[#6F4E37] text-[10px] font-black uppercase tracking-[0.3em]">The Hospitality Solution</span>
                        <h2 className="text-3xl font-outfit font-black leading-tight italic">Built for hospitality, not software.</h2>
                    </div>
                    <div className="space-y-8">
                       {[
                         { title: "Brand-owned menu", desc: "Your restaurant's colours, fonts, language, and tone — not a template." },
                         { title: "Comfortable browsing", desc: "Guests take their time and feel confident ordering." },
                         { title: "Clear dish understanding", desc: "Ingredients, taste, spice level explained properly." },
                         { title: "Designed for Indian culture", desc: "Family-friendly, practical, and respectful." }
                       ].map((item, i) => (
                         <div key={i} className="flex gap-6">
                             <div className="w-6 h-6 rounded-full bg-[#6F4E37]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <Check className="w-3 h-3 text-[#6F4E37]" />
                             </div>
                             <div className="space-y-1">
                                <h4 className="font-black text-lg text-white">{item.title}</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                             </div>
                         </div>
                       ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Identity & Re-categorization Section */}
      <section className="py-24 md:py-32 px-6 bg-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-12 text-center max-w-3xl mx-auto space-y-6 mb-12">
                   <h2 className="text-4xl md:text-7xl font-outfit font-black text-zinc-900 leading-tight">Your restaurant. Your identity.</h2>
                   <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed">
                     Every restaurant is different. Your menu should look and feel that way too.
                   </p>
                </div>

                <div className="lg:col-span-5 space-y-8">
                    <div className="space-y-6">
                        {[
                          "Café, family dining, fine dining — each gets its own style",
                          "Colours, typography, layout, and language tone are customizable",
                          "Menu structure designed around your food, not software limits"
                        ].map((text, i) => (
                          <div key={i} className="flex gap-4">
                             <div className="flex-shrink-0 mt-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#6F4E37]" /></div>
                             <p className="font-outfit font-black text-xl text-zinc-900 leading-tight italic">{text}</p>
                          </div>
                        ))}
                    </div>
                    <div className="pt-8 space-y-2">
                        <p className="text-4xl font-outfit font-black text-[#6F4E37] leading-[1.1]">Your menu doesn't look like an app.</p>
                        <p className="text-5xl font-outfit font-black text-zinc-900 leading-[1.1]">It looks like your restaurant.</p>
                    </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-8">
                    {[
                      { type: "Small Restaurants", desc: "Intimate dining spaces", color: "bg-zinc-50" },
                      { type: "Family Dining", desc: "Warm family gatherings", color: "bg-[#6F4E37]/5" },
                      { type: "Cafés", desc: "Casual coffee spots", color: "bg-amber-50" },
                      { type: "Fine Dining", desc: "Premium experiences", color: "bg-zinc-900 text-white" },
                      { type: "Hotels & Franchises", desc: "Multi-location brands", color: "bg-zinc-50", full: true }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`${item.color} p-8 rounded-[2rem] border border-zinc-100 flex flex-col justify-end min-h-[160px] ${item.full ? 'col-span-2' : ''}`}
                      >
                         <h4 className="font-outfit font-black text-lg md:text-2xl mb-1">{item.type}</h4>
                         <p className="text-sm font-medium opacity-60 uppercase tracking-widest">{item.desc}</p>
                      </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </section>


      {/* Bespoke Philosophy Section */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6F4E37]/10 to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-12"
            >
               The Anti-Template Commitment
            </motion.div>
            <h2 className="text-4xl md:text-8xl font-outfit font-black mb-12 leading-[1.1]">No two menus are same.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-16">
                <div className="space-y-6">
                    <p className="text-xl font-medium text-zinc-400">We do not use fixed templates. We do not reuse designs. Every restaurant gets a fully customized, branded menu experience, built specifically for them.</p>
                </div>
                <div className="space-y-4">
                    <p className="text-[#D4A373] font-black uppercase tracking-widest text-sm">You get full control over:</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        {["Colours", "Fonts", "Language tone", "Menu structure", "Dish presentation"].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-1 h-1 rounded-full bg-[#D4A373]" />
                                <span className="font-bold text-lg">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pt-12 border-t border-white/5">
                <p className="text-2xl md:text-4xl font-outfit font-black italic">"This is not a menu we give you. This is a menu we build for you."</p>
            </div>
        </div>
      </section>

      {/* Coming Soon: Digital Hospitality Assistant */}
      <section className="py-24 md:py-40 px-6 bg-[#FAFAFA] relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8 order-2 lg:order-1">
                    <div className="space-y-4">
                        <span className="bg-[#6F4E37] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">Coming Soon</span>
                        <h2 className="text-4xl md:text-6xl font-outfit font-black text-zinc-900 leading-tight">Digital hospitality assistant.</h2>
                        <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed">
                            An optional voice-based assistant to help guests understand the menu politely and comfortably — only when needed.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-[#6F4E37] font-black uppercase tracking-widest text-sm">
                        <Clock className="w-5 h-5" />
                        Available later as an optional add-on
                    </div>
                </div>
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                    <div className="w-72 h-72 rounded-full border-4 border-[#6F4E37]/10 flex items-center justify-center p-8 relative">
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-4 bg-[#6F4E37]/5 rounded-full"
                        />
                        <div className="w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center relative z-10 border border-zinc-100">
                             <div className="space-y-1 text-center">
                                <div className="flex gap-1 justify-center mb-2">
                                    {[1,2,3,4].map(i => (
                                        <motion.div 
                                            key={i}
                                            animate={{ height: [4, 12, 4] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                            className="w-1 bg-[#6F4E37] rounded-full"
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] font-black text-[#6F4E37] uppercase tracking-widest leading-none">AI Voice</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* See how it looks Section */}
      <section className="py-24 md:py-40 px-6 bg-white">
          <div className="container mx-auto max-w-4xl text-center space-y-12">
              <h2 className="font-outfit font-black text-4xl md:text-7xl text-zinc-900 leading-[1.1]">See how your restaurant will look.</h2>
              <p className="text-zinc-500 text-xl md:text-2xl font-medium italic">"No pressure. No obligation. Just experience the difference."</p>
              <div className="pt-8">
                  <Link 
                    href="/demo"
                    className="inline-block bg-[#6F4E37] text-white px-12 py-6 rounded-2xl text-xl font-black shadow-2xl shadow-[#6F4E37]/20 hover:scale-105 transition-all text-center"
                  >
                      Experience Now <ArrowRight className="inline-block ml-3 w-6 h-6" />
                  </Link>
              </div>
          </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#FAFAFA] border-t border-zinc-200 pt-20 pb-10 px-6">
          <div className="container mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
    <div className="flex items-center gap-1">
  <span className="text-2xl font-extrabold text-primary">AI</span>
  <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
    Menu System
  </span>
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
                  <p>© 2024 SWAT x Café Menu System. All rights reserved.</p>
                  {/* <div className="flex gap-6">
                      <a href="#" className="hover:text-zinc-900">Twitter</a>
                      <a href="#" className="hover:text-zinc-900">LinkedIn</a>
                      <a href="#" className="hover:text-zinc-900">Instagram</a>
                  </div> */}
              </div>
          </div>
      </footer>
    </div>
  );
}
