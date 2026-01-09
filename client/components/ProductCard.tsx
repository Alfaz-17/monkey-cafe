'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

export default function ProductCard({ product, onAdd }: { product: Product, onAdd: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileTap={{ scale: 0.98 }}
      className="flex gap-4 p-4 bg-white rounded-2xl border border-stone-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 overflow-hidden relative group"
    >
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-between z-10">
            <div>
                <h3 className="font-bold text-stone-900 text-lg leading-tight mb-1">{product.name}</h3>
                <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">{product.description}</p>
            </div>
            
            <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-lg text-stone-900 font-mono">${product.price.toFixed(2)}</span>
                <Button 
                    size="sm" 
                    onClick={(e) => { e.stopPropagation(); onAdd(); }}
                    className="rounded-full h-9 w-9 p-0 bg-stone-900 hover:bg-orange-600 text-white shadow-lg transition-colors duration-300"
                >
                    <Plus className="h-5 w-5" />
                </Button>
            </div>
        </div>

        {/* Image */}
        {product.image && (
            <div className="w-28 h-28 shrink-0 rounded-xl bg-stone-100 overflow-hidden relative">
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover" 
                />
            </div>
        )}
    </motion.div>
  );
}
