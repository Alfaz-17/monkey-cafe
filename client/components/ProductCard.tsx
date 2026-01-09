'use client';

import { motion } from 'framer-motion';
import { Plus, Minus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  isVeg?: boolean;
  isPopular?: boolean;
  isActive?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, removeFromCart, cartItems } = useCart();
  
  // Find current quantity in cart
  const cartItem = cartItems.find(item => item.id === product._id);
  const qty = cartItem ? cartItem.qty : 0;

  const handleAdd = (e: React.MouseEvent) => {
       e.stopPropagation();
       addToCart({
          id: product._id,
          name: product.name,
          price: product.price,
          qty: 1,
          image: product.image
       });
       if (navigator.vibrate) navigator.vibrate(50);
  };

  const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      removeFromCart(product._id);
      if (navigator.vibrate) navigator.vibrate(50);
  };

  // Zomato Standard: Gray Scale Image if inactive
  const isAvailable = product.isActive !== false;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`
        bg-white rounded-[1.25rem] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100 
        overflow-hidden flex flex-col h-full relative select-none
        ${!isAvailable ? 'opacity-60 grayscale' : ''}
      `}
    >
        {/* 🔥 Popular Tag (Top Left) */}
        {product.isPopular && (
            <div className="absolute top-0 left-0 z-10 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-xl rounded-tl-[1.25rem] shadow-sm">
                Popular
            </div>
        )}

        {/* 🖼️ FOOD IMAGE (60-70% Height - Aspect 4:3 or 1:1) */}
        <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
            {product.image ? (
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-stone-300">
                    <span className="text-xs">No Image</span>
                </div>
            )}
            
            {/* Rating Pill (Bottom Left of Image - Standard food app pattern) */}
            <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-sm border border-white/20">
                 <span className="text-[10px] font-bold text-stone-800">4.5</span>
                 <Star className="w-[8px] h-[8px] fill-orange-500 text-orange-500" />
            </div>

            {/* Veg/Non-Veg (Top Right) */}
            <div className="absolute top-2 right-2 bg-white p-1 rounded-sm shadow-sm">
                <div className={`w-3 h-3 border border-${product.isVeg ? 'green' : 'red'}-600 flex items-center justify-center`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-${product.isVeg ? 'green' : 'red'}-600`}></div>
                </div>
            </div>
        </div>

        {/* 📝 CONTENT */}
        <div className="p-3 flex flex-col flex-1">
            
            {/* Name & Price Row */}
            <div className="flex justify-between items-start mb-1">
                 <h3 className="font-semibold text-stone-900 text-[15px] leading-snug line-clamp-2 flex-1 mr-2">
                    {product.name}
                 </h3>
            </div>

            {/* Short Desc (Optional, kept very light) */}
            <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2 mb-3">
                {product.description}
            </p>
            
            {/* Footer: Price & Action */}
            <div className="mt-auto flex items-center justify-between">
                <div className="text-[15px] font-medium text-stone-900">
                    ${product.price.toFixed(2)}
                </div>

                {/* 🔘 ADD BUTTON (The Hero) - Mobile Optimized */}
                {isAvailable ? (
                    qty === 0 ? (
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleAdd}
                            className="bg-stone-50 hover:bg-stone-100 active:bg-orange-50 text-orange-600 font-bold text-xs uppercase px-6 py-2.5 rounded-xl border border-stone-200 shadow-sm transition-colors min-h-[36px]"
                        >
                            Add
                        </motion.button>
                    ) : (
                        <div className="flex items-center bg-stone-900 text-white rounded-xl shadow-lg h-9 px-1 gap-1">
                            <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={handleRemove}
                                className="w-8 h-full flex items-center justify-center active:text-stone-300 touch-manipulation"
                            >
                                <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="text-sm font-bold w-4 text-center tabular-nums">{qty}</span>
                            <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={handleAdd}
                                className="w-8 h-full flex items-center justify-center active:text-stone-300 touch-manipulation"
                            >
                                <Plus className="w-4 h-4" />
                            </motion.button>
                        </div>
                    )
                ) : (
                    <span className="text-[10px] font-bold text-stone-400 uppercase border border-stone-200 px-2 py-1 rounded">
                        Sold Out
                    </span>
                )}
            </div>
        </div>
    </motion.div>
  );
}
