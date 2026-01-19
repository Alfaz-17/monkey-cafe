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
              Modern menus for 
              <br />
              <span className="text-[#6F4E37]">happy guests.</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Increase orders and guest happiness with a menu that sells itself.
              <br className="hidden md:block" />
              Built for owners who value both speed and style.
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
                <span className="font-semibold text-zinc-900">Live Demo: Your Storefront</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-200" />
                <span className="font-medium">See it in action</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works: From Guest to Kitchen */}
      <section className="pb-24 lg:pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 bg-[#6F4E37]/10 border border-[#6F4E37]/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#6F4E37] mb-4">How it Works</span>
                <h2 className="font-outfit font-black text-4xl md:text-6xl text-[#3E2723] leading-tight mb-6">Orders flow instantly from <br className="hidden md:block" /> guest to kitchen.</h2>
                <div className="w-20 h-1 bg-[#6F4E37]/20 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-12 relative">
                <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                    {/* Guest View */}
                    <div className="space-y-6 text-center lg:text-left max-w-sm">
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-[#F0EDE8] flex items-center justify-center text-[#6F4E37] mx-auto lg:mx-0">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black text-[#3E2723]">Guest Orders</h3>
                        <p className="text-[#A68966] font-medium leading-relaxed">Guests scan the QR code and order from a beautiful, calm menu on their phone.</p>
                    </div>

                    {/* The Connection */}
                    <div className="hidden lg:flex items-center gap-4 text-[#6F4E37]/30">
                        <div className="w-2 h-2 rounded-full bg-current" />
                        <div className="w-32 h-[1px] bg-zinc-100" />
                        <Zap className="w-6 h-6" />
                        <div className="w-32 h-[1px] bg-zinc-100" />
                        <div className="w-2 h-2 rounded-full bg-current" />
                    </div>

                    {/* Kitchen View */}
                    <div className="space-y-6 text-center lg:text-left max-w-sm">
                        <div className="w-12 h-12 bg-zinc-900 rounded-2xl shadow-sm flex items-center justify-center text-[#D4A373] mx-auto lg:mx-0">
                            <Utensils className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black text-[#3E2723]">Kitchen Receives</h3>
                        <p className="text-[#A68966] font-medium leading-relaxed">Orders appear instantly on the kitchen screen. No paper, no confusion.</p>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Guest Experience Section */}
      <section className="py-16 md:py-40 bg-[#FAF7F2] border-y border-[#F0EDE8] overflow-hidden">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-32 space-y-4 md:space-y-6">
             <span className="inline-block px-4 py-1.5 bg-[#6F4E37]/10 border border-[#6F4E37]/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#6F4E37]">The Guest Experience</span>
             <h2 className="font-outfit font-black text-3xl md:text-7xl text-[#3E2723] leading-tight tracking-tight">Beautifully simple for your guests.</h2>
             <p className="text-[#A68966] text-base md:text-xl font-medium leading-relaxed">
                We focus on making the digital experience feel as warm and natural as your hospitality.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6F4E37]/5 to-transparent blur-3xl -z-10" />
            
            {[
              { 
                title: "Calm & Beautiful", 
                desc: "No cluttered apps or messy layouts. Just a clean, branded menu that makes your food the star.", 
                icon: <Sparkles className="w-8 h-8"/>,
                accent: "bg-white",
                delay: 0
              },
              { 
                title: "Clear & Simple", 
                desc: "Ingredients and spice levels are easy to see. No more shouting to ask 'Is this spicy?'.", 
                icon: <Utensils className="w-8 h-8"/>,
                accent: "bg-white",
                delay: 0.1
              },
              { 
                title: "Always Fast", 
                desc: "Built to load instantly on any phone. No downloading, no waiting, just scanning and ordering.", 
                icon: <Zap className="w-8 h-8"/>,
                accent: "bg-zinc-900 text-white",
                delay: 0.2
              },
              { 
                title: "For Everyone", 
                desc: "Designed to be readable and usable by everyone — from kids to grandparents.", 
                icon: <Users className="w-8 h-8"/>,
                accent: "bg-white",
                delay: 0.3
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.6 }}
                className={`${item.accent} p-6 md:p-14 rounded-2xl md:rounded-[3rem] border border-[#F0EDE8] shadow-[0_20px_50px_rgba(0,0,0,0.03)] group hover:scale-[1.01] transition-all duration-500`}
              >
                <div className="space-y-6 md:space-y-8">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-sm ${item.accent === "bg-zinc-900 text-white" ? "bg-white/10 text-[#D4A373]" : "bg-[#FAF7F2] text-[#6F4E37]"} group-hover:scale-110 transition-transform duration-500`}>
                    <div className="scale-75 md:scale-100">{item.icon}</div>
                  </div>
                  <div className="space-y-2 md:space-y-4">
                    <h3 className="font-outfit font-black text-xl md:text-4xl leading-tight">{item.title}</h3>
                    <p className={`text-sm md:text-lg leading-relaxed font-medium ${item.accent === "bg-zinc-900 text-white" ? "text-zinc-400" : "text-[#A68966]"}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Examples Showcase Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
                <p className="text-[#6F4E37] font-black uppercase tracking-[0.3em] text-xs mb-4">Proof of Quality</p>
                <h2 className="text-3xl md:text-5xl font-outfit font-black text-zinc-900 mb-6">Simple and clear. Built to help you sell.</h2>
                <div className="w-20 h-1 bg-[#6F4E37]/20 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                    { name: "Café Latte", price: "₹139", desc: "Smooth espresso with milk", img: "/latte.png" },
                    { name: "Hot Chocolate", price: "₹149", desc: "Rich Belgian hot chocolate", badge: "Popular", img: "/chai.png" },
                    { name: "Cold Coffee", price: "₹169", desc: "Premium hazelnut syrup", badge: "New", img: "/coffee.png" },
                    { name: "Peri Peri Sandwich", price: "₹159", desc: "Spicy peri peri paneer", badge: "Popular", img: "/sandwich.png" },
                    { name: "Margherita Pizza", price: "₹199", desc: "Fresh mozzarella & basil", img: "/pizza.png" },
                    { name: "Chocolate Brownie", price: "₹139", desc: "Warm brownie & ice cream", badge: "Popular", img: "/brownie.png" },
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-zinc-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.03)] transition-all duration-500 relative overflow-hidden"
                    >
                        {item.badge && (
                            <div className="absolute top-4 right-4 z-10">
                                <span className="bg-[#6F4E37] text-white text-[7px] font-black px-2 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                                    {item.badge}
                                </span>
                            </div>
                        )}
                        <div className="w-full aspect-[4/3] bg-[#FAF7F2] rounded-xl flex items-center justify-center mb-4 group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden relative border border-[#F0EDE8]">
                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-sm md:text-base font-black text-zinc-900 truncate pr-2">{item.name}</h3>
                                <span className="text-[#6F4E37] font-black text-xs md:text-sm">{item.price}</span>
                            </div>
                            <p className="text-zinc-500 text-[10px] md:text-xs leading-relaxed font-medium line-clamp-1">
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Built for your brand</p>
            </div>
        </div>
      </section>

      {/* Simple Pricing Teaser Section */}
      <section className="py-16 md:py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-2 md:space-y-4">
                <span className="inline-block px-4 py-1.5 bg-[#6F4E37]/10 border border-[#6F4E37]/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#6F4E37]">Plans & Pricing</span>
                <h2 className="font-outfit font-black text-3xl md:text-6xl text-zinc-900 leading-tight">Investment for every stage.</h2>
                <p className="text-zinc-500 text-base md:text-lg font-medium">Clear, transparent pricing ranges. See what fits your business best.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                    { name: "Starter", price: "₹10k – ₹25k", focus: "Essential digital menu", color: "text-zinc-500" },
                    { name: "Growing", price: "₹30k – ₹60k", focus: "Busy restaurants", color: "text-[#6F4E37]" },
                    { name: "Pro", price: "₹80k – ₹1.4L", focus: "Premium dining", color: "text-[#6F4E37]" },
                    { name: "Group", price: "₹1.8L – ₹3L+", focus: "Large brands", color: "text-zinc-900" },
                ].map((plan, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-zinc-100 shadow-sm flex flex-col justify-between group hover:border-[#6F4E37]/20 transition-all"
                    >
                        <div className="space-y-2">
                            <h3 className="font-outfit font-black text-lg md:text-xl text-zinc-900">{plan.name}</h3>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{plan.focus}</p>
                            <div className={`text-xl md:text-2xl font-black pt-2 md:pt-4 ${plan.color}`}>{plan.price}</div>
                            <p className="text-[10px] font-bold text-zinc-400">PER YEAR</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-10 md:mt-16 text-center">
                <Link 
                    href="/pricing"
                    className="inline-flex items-center gap-3 bg-[#6F4E37] text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-[2rem] font-bold text-base md:text-lg hover:bg-zinc-900 transition-all shadow-xl shadow-[#6F4E37]/10"
                >
                    View Detailed Pricing & Plans <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
      </section>


      {/* Philosophy Section */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900 text-white relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-outfit font-black mb-8 leading-[1.1]">Built for You.</h2>
            <p className="text-xl font-medium text-zinc-400 mb-16">We don't use templates. Every restaurant gets a fully customized menu built to match their unique style.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-left border-t border-white/5 pt-16">
                {[
                    { type: "Small Venue", desc: "Boutique & Kiosks", color: "bg-white/5" },
                    { type: "Family Dining", desc: "Warm & Comfortable", color: "bg-[#6F4E37]/20" },
                    { type: "Cosy Cafés", desc: "Casual & Friendly", color: "bg-amber-100/10" },
                    { type: "Fine Dining", desc: "Premium & Elegant", color: "bg-white/10" },
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        className={`${item.color} p-6 rounded-2xl border border-white/5`}
                    >
                        <h4 className="font-outfit font-black text-lg mb-1">{item.type}</h4>
                        <p className="text-[10px] font-medium opacity-50 uppercase tracking-widest">{item.desc}</p>
                    </motion.div>
                ))}
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
