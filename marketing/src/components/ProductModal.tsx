'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowLeft, Minus, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { getImageUrl } from '@/lib/utils/resolveImage';

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selections, setSelections] = useState<Record<string, string | string[]>>({});
    const [totalPrice, setTotalPrice] = useState(product.price);

    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
            setSelections({});
            const initialSelections: Record<string, string | string[]> = {};
            product.customizations?.forEach(cust => {
                if (cust.type === 'single') {
                    const defaultOpt = cust.options.find(o => o.isDefault);
                    if (defaultOpt) initialSelections[cust._id] = defaultOpt._id;
                    else if (cust.options.length > 0) initialSelections[cust._id] = cust.options[0]._id;
                } else {
                    initialSelections[cust._id] = [];
                }
            });
            setSelections(initialSelections);
        }
    }, [isOpen, product]);

    useEffect(() => {
        let base = product.price;
        product.customizations?.forEach(cust => {
            const sel = selections[cust._id];
            if (!sel) return;
            if (cust.type === 'single') {
                const opt = cust.options.find(o => o._id === sel);
                if (opt) base += opt.price;
            } else if (Array.isArray(sel)) {
                sel.forEach(optId => {
                    const opt = cust.options.find(o => o._id === optId);
                    if (opt) base += opt.price;
                });
            }
        });
        setTotalPrice(base * quantity);
    }, [selections, quantity, product]);

    const handleSingleSelect = (custId: string, optId: string) => {
        setSelections(prev => ({ ...prev, [custId]: optId }));
    };

    const handleMultiSelect = (custId: string, optId: string) => {
        setSelections(prev => {
            const current = (prev[custId] as string[]) || [];
            if (current.includes(optId)) {
                return { ...prev, [custId]: current.filter(id => id !== optId) };
            } else {
                return { ...prev, [custId]: [...current, optId] };
            }
        });
    };

    const handleAddToCart = () => {
        const selectedDetails: { name: string; optionName: string; price: number }[] = [];
        product.customizations?.forEach(cust => {
            const sel = selections[cust._id];
            if (cust.type === 'single' && typeof sel === 'string') {
                const opt = cust.options.find(o => o._id === sel);
                if (opt) selectedDetails.push({ name: cust.name, optionName: opt.name, price: opt.price });
            } else if (cust.type === 'multiple' && Array.isArray(sel)) {
                sel.forEach(optId => {
                    const opt = cust.options.find(o => o._id === optId);
                    if (opt) selectedDetails.push({ name: cust.name, optionName: opt.name, price: opt.price });
                });
            }
        });

        addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            qty: quantity,
            image: product.image,
            category: product.category,
            description: product.description,
            isPopular: product.isPopular,
            isActive: product.isActive,
            isVeg: product.isVeg,
            // @ts-ignore
            selectedCustomizations: selectedDetails,
            uniqueId: `${product._id}-${JSON.stringify(selections)}`
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="p-0 sm:max-w-[460px] overflow-hidden bg-[#FAF7F2] border-none rounded-[3rem] shadow-2xl">
                <DialogTitle className="sr-only">{product.name} Details</DialogTitle>
                <div className="relative h-full max-h-[92vh] overflow-y-auto scrollbar-hide">
                    
                    {/* Immersive Header Image */}
                    <div className="relative h-72 w-full overflow-hidden">
                         <div className="absolute top-6 left-6 z-20">
                            <button 
                                onClick={onClose} 
                                className="w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-xl rounded-2xl text-white flex items-center justify-center transition-all active:scale-90 border border-white/20 active:bg-white/30"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                        </div>
                        
                        {product.image ? (
                            <motion.img 
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                src={getImageUrl(product.image)} 
                                alt={product.name} 
                                className="w-full h-full object-cover" 
                            />
                        ) : (
                            <div className="w-full h-full bg-[#F5EFE6] flex items-center justify-center">
                                <ShoppingBag className="w-12 h-12 text-[#A68966]/20" />
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent" />
                    </div>

                    <div className="px-8 pb-32 -mt-12 relative z-10">
                        {/* Title & Description */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-black bg-[#5D4037] text-white px-3 py-1 rounded-full uppercase tracking-widest">
                                    {product.isVeg ? 'Veg' : 'Non-Veg'}
                                </span>
                                {product.isPopular && (
                                    <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" /> Popular
                                    </span>
                                )}
                            </div>
                            <h2 className="text-3xl font-black text-[#3E2723] leading-none mb-3 font-['Outfit'] tracking-tight">
                                {product.name}
                            </h2>
                            <p className="text-[#8D7F75] text-sm leading-relaxed font-bold uppercase tracking-wide opacity-70">
                                {product.description}
                            </p>
                        </div>

                        {/* Customizations Overhaul */}
                        <div className="space-y-8">
                            {product.customizations?.map((cust) => (
                                <div key={cust._id} className="space-y-4">
                                    <div className="flex items-center justify-between px-1">
                                        <h3 className="text-xs font-black text-[#A68966] uppercase tracking-[0.2em]">
                                            {cust.name}
                                        </h3>
                                        <span className="text-[9px] font-bold text-[#A68966]/60 uppercase italic">
                                            {cust.type === 'single' ? 'Select One' : 'Multiple'}
                                        </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                        {cust.options.map((opt) => {
                                            const isSelected = cust.type === 'single' 
                                                ? selections[cust._id] === opt._id
                                                : (selections[cust._id] as string[])?.includes(opt._id);
                                            
                                            return (
                                                <button
                                                    key={opt._id}
                                                    onClick={() => cust.type === 'single' ? handleSingleSelect(cust._id, opt._id) : handleMultiSelect(cust._id, opt._id)}
                                                    className={`
                                                        relative h-14 flex items-center justify-between px-4 rounded-2xl transition-all border font-bold text-sm
                                                        ${isSelected 
                                                            ? 'bg-[#6F4E37] text-white border-[#6F4E37] shadow-xl shadow-[#6F4E37]/20 scale-[1.02]' 
                                                            : 'bg-white text-[#8D7F75] border-[#F0EDE8] hover:border-[#D4A373]/30 active:bg-[#FAF7F2]'
                                                        }
                                                        active:scale-[0.97]
                                                    `}
                                                >
                                                    <span className="truncate pr-2">{opt.name}</span>
                                                    {opt.price > 0 && (
                                                        <span className={`text-[10px] ${isSelected ? 'text-white/60' : 'text-[#6F4E37]'}`}>
                                                            +₹{opt.price}
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Qty & Add to Cart Section */}
                        <div className="mt-10 mb-4 bg-white p-6 rounded-[2.5rem] border border-[#F0EDE8] flex items-center justify-between shadow-sm">
                            <span className="text-xs font-black text-[#A68966] uppercase tracking-widest pl-2">Quantity</span>
                            <div className="flex items-center gap-5">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#F0EDE8] flex items-center justify-center text-[#6F4E37] hover:bg-white transition-all active:scale-90 active:bg-[#F0EDE8]"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <span className="text-lg font-black text-[#3E2723] w-4 text-center">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-xl bg-[#6F4E37] text-white shadow-md flex items-center justify-center hover:bg-[#5A3E2B] transition-all active:scale-95"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Premium Floating Footer */}
                    <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white/95 to-transparent z-40">
                         <div className="max-w-[460px] mx-auto">
                            <Button 
                                onClick={handleAddToCart}
                                className="w-full h-16 rounded-[2rem] bg-[#6F4E37] hover:bg-[#5A3E2B] text-white shadow-[0_20px_50px_rgba(111,78,55,0.3)] flex items-center justify-between px-8 group transition-all hover:scale-[1.02] active:scale-95 border-b-4 border-[#3E2723]/30 active:bg-[#3E2723]"
                            >
                                <span className="text-lg font-black tracking-tight uppercase">Add to Tray</span>
                                <div className="flex items-center gap-3">
                                    <div className="h-6 w-px bg-white/20" />
                                    <span className="text-xl font-black">₹{totalPrice.toFixed(2)}</span>
                                </div>
                            </Button>
                         </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
