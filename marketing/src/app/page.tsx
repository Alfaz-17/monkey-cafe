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
  ShoppingCart
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
            className="font-outfit font-bold text-5xl md:text-7xl leading-[1.1] tracking-tight mb-8"
          >
            End the <span className="text-[#6F4E37]">Revenue Leakage</span><br className="hidden md:block"/>
            Grow with Data.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Stop losing 10% of your billings to manual errors. Media Masala is the zero-friction, AI-powered system that turns your menu into a profit-generating machine.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <button className="w-full md:w-auto bg-zinc-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
              Start Scaling Today <ArrowRight className="w-5 h-5" />
            </button>
            <Link 
              href="/demo"
              className="w-full md:w-auto bg-white border-2 border-zinc-200 text-zinc-900 px-8 py-4 rounded-full font-bold text-lg hover:border-[#6F4E37] hover:text-[#6F4E37] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
            See The Demo <Sparkles className="w-4 h-4 text-[#6F4E37] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>


          {/* High-Fidelity Hero Showcase */}
          <div className="mt-24 relative max-w-5xl mx-auto">
            {/* Background Glows */}
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
                    <div className="bg-zinc-50 h-full flex flex-col">
                      {/* Mock Admin UI */}
                      <div className="p-4 bg-white border-b border-zinc-100 flex justify-between items-center">
                         <div className="flex items-center gap-2">
                           <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">MM</div>
                           <div className="w-24 h-2 bg-zinc-100 rounded" />
                         </div>
                         <div className="w-20 h-6 bg-green-50 rounded-full border border-green-100 flex items-center justify-center">
                            <span className="text-[8px] font-black text-green-600 uppercase">Live: 14 Orders</span>
                         </div>
                      </div>
                      <div className="flex-1 p-6 grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-4">
                           <div className="h-40 bg-white rounded-3xl border border-zinc-100 shadow-sm p-4 flex flex-col justify-end">
                              <div className="flex items-end gap-1 h-20">
                                {[40, 70, 45, 90, 65, 80, 55, 100].map((h, i) => (
                                  <motion.div 
                                    key={i} 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 1 + (i * 0.1) }}
                                    className="flex-1 bg-[#6F4E37]/20 rounded-t-sm" 
                                  />
                                ))}
                              </div>
                              <p className="text-[10px] font-black text-zinc-400 mt-4 uppercase">Revenue Intelligence</p>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="h-24 bg-white rounded-3xl border border-zinc-100 shadow-sm" />
                              <div className="h-24 bg-white rounded-3xl border border-zinc-100 shadow-sm" />
                           </div>
                        </div>
                        <div className="space-y-4">
                           {[1,2,3].map(i => (
                             <div key={i} className="h-20 bg-white rounded-2xl border border-zinc-100 shadow-sm p-3 flex gap-3">
                                <div className="w-10 h-10 bg-zinc-50 rounded-lg" />
                                <div className="flex-1 space-y-2">
                                  <div className="w-full h-2 bg-zinc-100 rounded" />
                                  <div className="w-1/2 h-2 bg-zinc-50 rounded" />
                                </div>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </LaptopFrame>

                  {/* Floating Feature Badges */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-zinc-100 flex items-center gap-3 z-20"
                  >
                    <div className="w-10 h-10 bg-[#6F4E37] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#6F4E37]/20">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">Order Sync</p>
                      <p className="text-xs font-bold text-zinc-900">20ms Real-time</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Phone Display (Guest Perspective) */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="lg:col-span-4 relative group"
              >
                <PhoneFrame className="scale-90 lg:scale-100 lg:-ml-12 shadow-2xl shadow-zinc-300 transform transition-transform group-hover:scale-[1.03] active:scale-95 duration-700">
                   <div className="bg-[#FAF7F2] h-full flex flex-col">
                      <div className="p-4 bg-white border-b border-zinc-100 flex justify-between items-center">
                         <div className="w-6 h-6 bg-[#6F4E37] rounded flex items-center justify-center text-white text-[8px] font-black">M</div>
                         <ShoppingCart className="w-4 h-4 text-zinc-300" />
                      </div>
                      <div className="flex-1 p-5 space-y-6">
                         <div className="aspect-[4/5] bg-white rounded-[2.5rem] shadow-xl border border-zinc-100 overflow-hidden flex flex-col">
                            <div className="flex-1 flex items-center justify-center text-6xl">🍛</div>
                            <div className="p-4 space-y-2">
                               <div className="flex justify-between items-center">
                                  <div className="w-24 h-3 bg-zinc-200 rounded" />
                                  <div className="w-12 h-3 bg-[#6F4E37]/20 rounded" />
                               </div>
                               <div className="w-full h-8 bg-[#6F4E37] rounded-xl" />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square bg-white rounded-3xl border border-zinc-100 shadow-sm flex items-center justify-center text-2xl">☕</div>
                            <div className="aspect-square bg-white rounded-3xl border border-zinc-100 shadow-sm flex items-center justify-center text-2xl">🍰</div>
                         </div>
                      </div>
                   </div>
                </PhoneFrame>

                {/* Floating Feature Badges */}
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -right-6 lg:-right-12 bg-white p-4 rounded-2xl shadow-xl border border-zinc-100 flex items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-amber-900 shadow-lg shadow-amber-400/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">AI Engine</p>
                    <p className="text-xs font-bold text-zinc-900">+12% Upsell Lift</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute top-1/2 -left-12 lg:-left-20 bg-zinc-900 p-3 rounded-xl shadow-2xl border border-white/10 hidden lg:flex items-center gap-3 z-20"
                >
                   <QrCode className="w-5 h-5 text-[#D4A373]" />
                   <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Digital Concierge</div>
                </motion.div>
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


      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-[#FAFAFA] relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-zinc-200/50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Sparkles className="w-3 h-3" /> The Media Masala Difference
            </div>
            <h2 className="font-outfit font-black text-4xl md:text-6xl mb-6 tracking-tight">Luxury Intelligence for <br/>Restaurateurs</h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">We don't just provide a menu. We provide the operational infrastructure that turns hospitality into a science.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<QrCode className="w-6 h-6" />}
              title="The Digital Concierge"
              desc="Instant, zero-app ordering that removes friction between the guest's craving and your kitchen. 100% effortless."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="High-Velocity Menu Engine"
              desc="Engineered for speed. Our 20ms load times ensure guests never wait to spend. Instant gratification, instant profit."
            />
            <FeatureCard 
              icon={<LayoutDashboard className="w-6 h-6" />}
              title="The Intelligence Cockpit"
              desc="Total control over your entire operation from a single, high-fidelity dashboard. Monitor every heartbeat of your business."
            />
             <FeatureCard 
              icon={<Smartphone className="w-6 h-6" />}
              title="Luxury Mobile Interface"
              desc="A UI designed to match your brand's aesthetic. High-resolution visuals and fluid animations that drive massive upsells."
            />
             <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6" />}
              title="The Precision Ledger"
              desc="Capture 100% of your revenue. Our digital tracking eliminates bill leakage and verbal hand-off errors forever."
            />
             <FeatureCard 
              icon={<TrendingUp className="w-6 h-6" />}
              title="Profit Growth Lab"
              desc="Don't just see sales. Understand margins, peak habits, and customer loyalty patterns to engineer your next big move."
            />
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
                 <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                   <CheckCircle2 className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">Order Sent</p>
                    <p className="text-xs font-bold text-zinc-900">Table #4 Received</p>
                 </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
         <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-20">
                <h2 className="font-outfit font-bold text-3xl md:text-5xl mb-6">Simple, Transparent Pricing</h2>
                <p className="text-zinc-500 text-lg max-w-2xl mx-auto">Choose the plan that fits your business stage.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                        "Unlimited Orders",
                        "Inventory Tracking",
                        "Staff Management",
                        "Priority Support"
                    ]}
                />
                <PricingCard 
                    title="Elite"
                    price="₹75,000"
                    isPopular
                    desc="Powered by AI for maximum profit."
                    features={[
                        "Everything in Growth",
                        "AI-Powered Upsells",
                        "Smart Analytics",
                        "Customer Loyalty",
                        "WhatsApp Alerts"
                    ]}
                />
                <PricingCard 
                    title="Infinity"
                    price="₹100,000"
                    desc="Ultimate solution for chains."
                    features={[
                        "Everything in Elite",
                        "Multi-Outlet Sync",
                        "AI Voice Assistant",
                        "White Labeling",
                        "24/7 Concierge"
                    ]}
                />
            </div>
         </div>
      </section>

      {/* FAQ / Final CTA */}
      <section className="py-24 px-6 bg-white border-t border-zinc-100">
          <div className="container mx-auto max-w-4xl text-center">
              <h2 className="font-outfit font-bold text-4xl mb-6">Ready to transform your business?</h2>
              <p className="text-zinc-500 text-lg mb-10">Join 500+ restaurants using Media Masala to power their ordering.</p>
              <button className="bg-zinc-900 text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl shadow-zinc-900/10 hover:shadow-2xl hover:scale-105 transition-all">
                  Get Started for Free
              </button>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAFAFA] border-t border-zinc-200 pt-20 pb-10 px-6">
          <div className="container mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                  <div className="col-span-2 md:col-span-1">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs">M</span>
                        </div>
                        <span className="font-outfit font-bold text-lg">Media Masala</span>
                      </div>
                      <p className="text-zinc-500 text-sm leading-relaxed">
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

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white border border-zinc-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all"
        >
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-900 mb-6">
                {icon}
            </div>
            <h3 className="font-bold text-xl mb-3 font-outfit">{title}</h3>
            <p className="text-zinc-500 leading-relaxed text-sm">{desc}</p>
        </motion.div>
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

function SolutionItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex gap-4 group">
            <div className="w-6 h-6 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-1 group-hover:bg-green-500 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-white" />
            </div>
            <div>
                <h4 className="font-bold text-lg mb-1">{title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function PricingCard({ title, price, features, isPopular, desc }: { title: string, price: string, features: string[], isPopular?: boolean, desc: string }) {
    return (
        <div className={`p-8 rounded-3xl border flex flex-col h-full relative ${isPopular ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xl' : 'bg-white border-zinc-200 text-zinc-900'}`}>
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


