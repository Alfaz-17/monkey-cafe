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
      
  

      {/* Professional Features Showcase */}
      <section className="py-24 md:py-32 px-4 md:px-6 bg-gradient-to-b from-zinc-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#6F4E37]/10 border border-[#6F4E37]/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6 text-[#6F4E37]"
            >
              <Sparkles className="w-3 h-3" /> Complete Platform
            </motion.div>
            <h2 className="font-outfit font-black text-4xl md:text-7xl tracking-tight mb-6">
              Everything You Need.<br/>
              <span className="text-[#6F4E37]">All in One Place.</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              From inventory to customer relationships, our platform handles every aspect of your restaurant operations.
            </p>
          </div>

          <div className="space-y-24 md:space-y-32">
            
            {/* Inventory Management */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-red-600">
                  Low Stock Alert
                </div>
                <h3 className="font-outfit font-black text-3xl md:text-5xl">Inventory Management</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  Track every ingredient in real-time. Get automatic low-stock alerts, manage reorder levels, and visualize inventory trends to prevent stockouts and reduce waste.
                </p>
                <ul className="space-y-3">
                  {['Real-time stock tracking', 'Automated reorder alerts', 'Inventory trend analytics', 'Multi-unit support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2">
                <img 
                  src="/inventory-dashboard.png" 
                  alt="Inventory Management Dashboard" 
                  className="w-full rounded-2xl shadow-2xl border border-zinc-200"
                />
              </div>
            </motion.div>

            {/* Digital Menu */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-1">
                <img 
                  src="/digital-menu.png" 
                  alt="Digital Menu on Tablet" 
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
              <div className="space-y-6 order-2">
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-amber-700">
                  QR Powered
                </div>
                <h3 className="font-outfit font-black text-3xl md:text-5xl">Digital Menu Experience</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  Beautiful, interactive menus that guests can access instantly by scanning a QR code. No apps to download, no friction—just pure ordering simplicity.
                </p>
                <ul className="space-y-3">
                  {['Instant QR code access', 'High-quality food photography', 'Real-time menu updates', 'Multi-language support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Analytics Dashboard */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-blue-600">
                  Live Data
                </div>
                <h3 className="font-outfit font-black text-3xl md:text-5xl">Analytics Dashboard</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  Make data-driven decisions with comprehensive analytics. Track revenue, monitor order trends, identify popular items, and measure customer satisfaction—all in real-time.
                </p>
                <ul className="space-y-3">
                  {['Revenue tracking & KPIs', 'Order trend analysis', 'Popular items insights', 'Customer satisfaction metrics'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2">
                <img 
                  src="/analytics-dashboard.png" 
                  alt="Analytics Dashboard" 
                  className="w-full rounded-2xl shadow-2xl border border-zinc-200"
                />
              </div>
            </motion.div>

            {/* Kitchen Display System */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-1">
                <img 
                  src="/kitchen-display.png" 
                  alt="Kitchen Display System" 
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
              <div className="space-y-6 order-2">
                <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-orange-600">
                  Real-Time Sync
                </div>
                <h3 className="font-outfit font-black text-3xl md:text-5xl">Kitchen Display System</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  Streamline kitchen operations with a real-time order display. Orders flow instantly from guest to kitchen with zero manual entry. Track preparation status, manage timing, and ensure nothing gets missed.
                </p>
                <ul className="space-y-3">
                  {['Instant order notifications', 'Color-coded status tracking', 'Order timing & priority', 'Zero-error order flow'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

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
