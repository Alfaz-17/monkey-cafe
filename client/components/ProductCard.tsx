'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';
import ProductModal from '@/components/ProductModal';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, removeFromCart, decrementFromCart, cartItems } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Calculate total quantity of this product in cart (across all variants)
  const qty = cartItems
    .filter(item => item._id === product._id)
    .reduce((acc, item) => acc + item.qty, 0);

  const hasCustomizations = product.customizations && product.customizations.length > 0;

  const handleAdd = (e: React.MouseEvent) => {
       e.stopPropagation();
       if (hasCustomizations) {
           setIsModalOpen(true);
       } else {
           addToCart({
              _id: product._id,
              name: product.name,
              price: product.price,
              category: product.category,
              description: product.description,
              isPopular: product.isPopular,
              isActive: product.isActive,
              isVeg: product.isVeg,
              qty: 1,
              uniqueId: product._id, // Simple products use ID as uniqueId
              image: product.image,
              selectedCustomizations: []
           });
           if (navigator.vibrate) navigator.vibrate(50);
       }
  };

  const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      // For simple products, we can use the main ID
      if (!hasCustomizations) {
          decrementFromCart(product._id);
          if (navigator.vibrate) navigator.vibrate(50);
      } else {
          // For customizable products, the +/- on the card is ambiguous.
          // We might want to open a "Manager" or just not show +/-. 
          // For now, let's just open the modal for any interaction if it's customizable
          // or show a toast "Please manage in cart".
          // Strategy: If customizable, clicking minus is hard. 
          // Let's hide the +/- UI for customizable products and just show "Add" or "Customize"
          // BUT if the user wants to add *another* one, they click Add/Customize.
          // Removing must happen in Cart.
      }
  };

  const isAvailable = product.isActive !== false;

  return (
    <>
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`
        bg-white rounded-[1.25rem] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100 
        overflow-hidden flex flex-col h-full relative select-none
        ${!isAvailable ? 'opacity-60 grayscale' : ''}
      `}
      onClick={() => isAvailable && setIsModalOpen(true)} // Clicking card opens details
    >
        {/* 🔥 Popular Tag */}
        {product.isPopular && (
            <div className="absolute top-0 left-0 z-10 bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold px-2 py-1 rounded-br-lx rounded-tl-[1.25rem] shadow-sm">
                Popular
            </div>
        )}

        {/* 🖼️ FOOD IMAGE */}
        <div className="relative aspect-[4/3] w-full bg-[#F5EFE6] overflow-hidden">
            {product.image ? (
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-[#9CA3AF]">
                    <span className="text-xs">No Image</span>
                </div>
            )}
            
            <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-sm border border-white/20">
                 <span className="text-[10px] font-bold text-[#1F2937]">4.5</span>
                 <Star className="w-[8px] h-[8px] fill-[#F59E0B] text-[#F59E0B]" />
            </div>

            <div className="absolute top-2 right-2 bg-white p-1 rounded-sm shadow-sm">
                <div className={`w-3 h-3 border border-${product.isVeg ? 'green' : 'red'}-600 flex items-center justify-center`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-${product.isVeg ? 'green' : 'red'}-600`}></div>
                </div>
            </div>
        </div>

        {/* 📝 CONTENT */}
        <div className="p-3 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-1">
                 <h3 className="font-semibold text-[#1F2937] text-[16px] leading-snug line-clamp-2 flex-1 mr-2 tracking-tight">
                    {product.name}
                 </h3>
            </div>

            <p className="text-[13px] text-[#6B7280] leading-relaxed line-clamp-2 mb-3 font-normal">
                {product.description}
            </p>
            
            <div className="mt-auto flex items-center justify-between">
                <div className="text-[15px] font-medium text-[#374151]">
                    ${product.price.toFixed(2)}
                </div>

                {/* 🔘 ADD BUTTON */}
                {isAvailable ? (
                    (qty === 0 || hasCustomizations) ? (
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleAdd}
                            className="bg-[#6F4E37] hover:bg-[#5A3E2B] active:bg-[#5A3E2B] text-white font-medium text-sm px-6 py-2 rounded-full shadow-sm transition-colors min-h-[36px]"
                        >
                            {qty > 0 && hasCustomizations ? 'Add +' : 'Add'}
                        </motion.button>
                    ) : (
                        <div className="flex items-center bg-white border border-[#E5E7EB] text-[#1F2937] rounded-full shadow-sm h-9 px-1 gap-1" onClick={e => e.stopPropagation()}>
                            <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={handleRemove}
                                className="w-8 h-full flex items-center justify-center active:bg-gray-50 rounded-l-full touch-manipulation text-[#6F4E37]"
                            >
                                <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="text-[15px] font-semibold w-5 text-center tabular-nums text-[#1F2937]">{qty}</span>
                            <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={handleAdd}
                                className="w-8 h-full flex items-center justify-center active:bg-gray-50 rounded-r-full touch-manipulation text-[#6F4E37]"
                            >
                                <Plus className="w-4 h-4" />
                            </motion.button>
                        </div>
                    )
                ) : (
                    <span className="text-[12px] font-medium text-[#9CA3AF] bg-[#F3F4F6] px-3 py-1 rounded-full">
                        Sold Out
                    </span>
                )}
            </div>
        </div>
    </motion.div>

    <ProductModal 
        product={product} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
    />
    </>
  );
}
