"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[70] bg-[#FAFAFA]/80 backdrop-blur-md border-b border-zinc-200/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="font-outfit font-bold text-xl tracking-tight">Media Masala</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <Link href="/#features" className="hover:text-zinc-900 transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-zinc-900 transition-colors">Pricing</Link>
          <Link href="/demo" className="hover:text-zinc-900 transition-colors bg-zinc-100 px-3 py-1 rounded-full">Interactive Demo</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/pricing"
            className="bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden p-3 text-zinc-600 active:scale-95 transition-transform"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-zinc-200 p-6 space-y-4 shadow-xl"
        >
            <Link href="/#features" onClick={() => setIsMenuOpen(false)} className="block text-zinc-600 font-medium">Features</Link>
            <Link href="/pricing" onClick={() => setIsMenuOpen(false)} className="block text-zinc-600 font-medium">Pricing</Link>
            <Link href="/demo" onClick={() => setIsMenuOpen(false)} className="block text-zinc-900 font-bold">Interactive Demo</Link>
            <Link 
                href="/pricing" 
                onClick={() => setIsMenuOpen(false)} 
                className="block w-full bg-zinc-900 text-white py-3 rounded-xl font-bold text-center"
            >
                Get Started
            </Link>
        </motion.div>
      )}
    </nav>
  );
}
