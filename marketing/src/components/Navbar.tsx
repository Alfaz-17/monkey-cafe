"use client"


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
          <img 
            src="/logo.png" 
            alt="AI Menu System" 
            className="h-70 w-70 ml-[-25] object-contain"
          />
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <Link href="/features" className="hover:text-zinc-900 transition-colors">Features</Link>
          <Link href="/trial" className="hover:text-zinc-900 transition-colors">Start Trial</Link>
          <Link href="/demo" className="hover:text-zinc-900 transition-colors bg-zinc-100 px-3 py-1 rounded-full">Interactive Demo</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/trial"
            className="bg-[#6F4E37] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#5A3E2B] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#6F4E37]/20"
          >
            Start Free Trial
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
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-zinc-600 font-medium">Home</Link>
            <Link href="/features" onClick={() => setIsMenuOpen(false)} className="block text-zinc-600 font-medium">Features</Link>
            <Link href="/trial" onClick={() => setIsMenuOpen(false)} className="block text-zinc-600 font-medium">Start Trial</Link>
            <Link href="/demo" onClick={() => setIsMenuOpen(false)} className="block text-zinc-900 font-bold">Interactive Demo</Link>
            <Link 
                href="/trial" 
                onClick={() => setIsMenuOpen(false)} 
                className="block w-full bg-[#6F4E37] text-white py-3 rounded-xl font-bold text-center"
            >
                Start Free Trial
            </Link>
        </motion.div>
      )}
    </nav>
  );

}
