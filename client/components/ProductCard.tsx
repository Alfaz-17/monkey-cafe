'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Star, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';
import ProductModal from '@/components/ProductModal';
import { getImageUrl } from '@/lib/utils/resolveImage';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, removeFromCart, decrementFromCart, cartItems } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
              uniqueId: product._id,
              image: product.image,
              selectedCustomizations: []
           });
           if (navigator.vibrate) navigator.vibrate(50);
       }
  };

  const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasCustomizations) {
          // If customizable, remove the most recently added variant of this product
          const productVariants = cartItems.filter(item => item._id === product._id);
          if (productVariants.length > 0) {
              const lastVariant = productVariants[productVariants.length - 1];
              decrementFromCart(lastVariant.uniqueId || lastVariant._id);
          }
      } else {
          decrementFromCart(product._id);
      }
      if (navigator.vibrate) navigator.vibrate(50);
  };

  const isAvailable = product.isActive !== false;

  return (
    <>
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true, margin: "-20px" }}
      className={`
        bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-[#F0EDE8] 
        overflow-hidden flex flex-col h-full relative select-none transition-all
        ${!isAvailable ? 'opacity-60 grayscale' : ''}
      `}
      onClick={() => isAvailable && setIsModalOpen(true)}
    >
        {/* 🔥 Popular Tag */}
        {product.isPopular && (
            <div className="absolute top-3 left-3 z-10 bg-[#5D4037] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                Popular
            </div>
        )}

        {/* Veg/Non-Veg */}
        <div className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-md p-1.5 rounded-lg shadow-sm">
            <div className={`w-3 h-3 border border-${product.isVeg ? 'green' : 'red'}-600 flex items-center justify-center`}>
                <div className={`w-1.5 h-1.5 rounded-full bg-${product.isVeg ? 'green' : 'red'}-600`}></div>
            </div>
        </div>

        {/* 🖼️ FOOD IMAGE */}
        <div className="relative aspect-square w-full bg-[#F5EFE6] overflow-hidden">
            {product.image ? (
                <img 
                    src={getImageUrl(product.image)} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#F5EFE6]">
                    <ShoppingBag className="w-8 h-8 text-[#A68966]/20" />
                </div>
            )}
            
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-xl flex items-center gap-1 shadow-sm border border-[#F0EDE8]">
                 <Star className="w-2.5 h-2.5 fill-orange-400 text-orange-400" />
                 <span className="text-[10px] font-black text-[#3E2723]">4.5</span>
            </div>
        </div>

        {/* 📝 CONTENT */}
        <div className="p-3.5 flex flex-col flex-1">
            <h3 className="font-black text-[#3E2723] text-[15px] leading-tight line-clamp-2 tracking-tight mb-3 font-['Outfit']">
                {product.name}
            </h3>
            
            <div className="mt-auto flex items-center justify-between gap-1">
                <div>
                    <span className="text-[9px] font-black text-[#A68966] block uppercase tracking-tighter">Price</span>
                    <div className="text-lg font-black text-[#3E2723] font-['Outfit'] leading-none">
                        <span className="text-xs font-medium mr-0.5 opacity-60">₹</span>
                        {product.price.toFixed(2)}
                    </div>
                </div>

                {/* 🔘 ADD BUTTON */}
                {isAvailable ? (
                    (qty === 0 || hasCustomizations) ? (
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleAdd}
                            className="bg-[#6F4E37] hover:bg-[#5A3E2B] text-white font-black text-[10px] uppercase tracking-widest h-9 px-4 rounded-xl shadow-[0_8px_16px_rgba(111,78,55,0.15)] transition-all flex-shrink-0"
                        >
                            {qty > 0 && hasCustomizations ? 'Add +' : 'Add'}
                        </motion.button>
                    ) : (
                        <div className="flex items-center bg-[#FAF7F2] border border-[#F0EDE8] text-[#3E2723] rounded-xl p-0.5 gap-1.5" onClick={e => e.stopPropagation()}>
                            <button 
                                onClick={handleRemove}
                                className="w-7 h-7 flex items-center justify-center bg-white shadow-sm rounded-lg text-[#6F4E37]"
                            >
                                {qty === 1 ? <Trash2 size={12} className="text-red-400" /> : <Minus size={12} />}
                            </button>
                            <span className="text-xs font-black w-3 text-center">{qty}</span>
                            <button 
                                onClick={handleAdd}
                                className="w-7 h-7 flex items-center justify-center bg-[#6F4E37] text-white shadow-md rounded-lg"
                            >
                                <Plus size={12} />
                            </button>
                        </div>
                    )
                ) : (
                    <span className="text-[9px] font-black text-[#A68966] bg-[#F5EFE6] px-2 py-1 rounded-lg uppercase tracking-widest">
                        Out
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
