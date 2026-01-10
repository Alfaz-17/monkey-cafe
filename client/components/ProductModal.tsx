'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowLeft, Minus, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product, Customization, CustomizationOption, CartItem } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    
    // State for selections 
    // Map customization ID -> selected option ID (for single) or array of IDs (for multiple)
    const [selections, setSelections] = useState<Record<string, string | string[]>>({});

    const [totalPrice, setTotalPrice] = useState(product.price);

    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
            setSelections({});
            // Initialize defaults if any
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

    // Calculate Price
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
        // Construct selected customizations details
        const selectedDetails: { name: string; optionName: string; price: number }[] = [];
        
        product.customizations?.forEach(cust => {
            const sel = selections[cust._id];
            if (cust.type === 'single' && typeof sel === 'string') {
                const opt = cust.options.find(o => o._id === sel);
                if (opt) {
                    selectedDetails.push({ name: cust.name, optionName: opt.name, price: opt.price });
                }
            } else if (cust.type === 'multiple' && Array.isArray(sel)) {
                sel.forEach(optId => {
                    const opt = cust.options.find(o => o._id === optId);
                    if (opt) {
                        selectedDetails.push({ name: cust.name, optionName: opt.name, price: opt.price });
                    }
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
            // @ts-ignore - we need to update context type later
            selectedCustomizations: selectedDetails,
            uniqueId: `${product._id}-${JSON.stringify(selections)}`
        });
        
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="p-0 sm:max-w-[425px] overflow-hidden bg-[#FAF7F2] border-none rounded-[2rem]">
                <div className="relative h-full max-h-[90vh] overflow-y-auto scrollbar-hide">
                    {/* Header Image */}
                    <div className="relative h-64 w-full">
                         <div className="absolute top-4 left-4 z-20">
                            <button onClick={onClose} className="bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 rounded-full text-white transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </div>
                        {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400">No Image</div>
                        )}
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FAF7F2] to-transparent" />
                    </div>

                    <div className="px-6 pb-24 -mt-10 relative z-10">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#3E2723] mb-1">{product.name}</h2>
                            <p className="text-stone-500 text-sm leading-relaxed">{product.description}</p>
                        </div>

                        {/* Customizations */}
                        {product.customizations?.map((cust) => (
                            <div key={cust._id} className="mb-6">
                                <h3 className="text-sm font-semibold text-[#3E2723] mb-3">{cust.name}</h3>
                                
                                {cust.type === 'single' ? (
                                    <div className="flex flex-wrap gap-2">
                                        {cust.options.map((opt) => {
                                            const isSelected = selections[cust._id] === opt._id;
                                            return (
                                                <button
                                                    key={opt._id}
                                                    onClick={() => handleSingleSelect(cust._id, opt._id)}
                                                    className={`
                                                        px-4 py-2 rounded-xl text-sm font-medium transition-all border
                                                        ${isSelected 
                                                            ? 'bg-[#6F4E37] text-white border-[#6F4E37] shadow-md transform scale-105' 
                                                            : 'bg-white text-stone-600 border-stone-200 hover:border-[#6F4E37]/50'
                                                        }
                                                    `}
                                                >
                                                    {opt.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                                        {cust.options.map((opt) => {
                                             const isSelected = (selections[cust._id] as string[])?.includes(opt._id);
                                             return (
                                                <div 
                                                    key={opt._id} 
                                                    onClick={() => handleMultiSelect(cust._id, opt._id)}
                                                    className="flex items-center justify-between cursor-pointer group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`
                                                            w-5 h-5 rounded-md border flex items-center justify-center transition-colors
                                                            ${isSelected ? 'bg-[#6F4E37] border-[#6F4E37]' : 'border-stone-300 group-hover:border-[#6F4E37]'}
                                                        `}>
                                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                                        </div>
                                                        <span className="text-stone-700 text-sm font-medium">{opt.name}</span>
                                                    </div>
                                                    <span className="text-stone-500 text-sm">
                                                        {opt.price > 0 ? `+ $${opt.price.toFixed(2)}` : ''}
                                                    </span>
                                                </div>
                                             );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Qty Control (Optional for modal) */}
                         <div className="mb-6 flex items-center justify-between bg-white p-3 rounded-xl border border-stone-100">
                             <span className="text-sm font-semibold text-[#3E2723]">Quantity</span>
                             <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-base font-bold text-[#3E2723] w-4 text-center">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                             </div>
                         </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-stone-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                         <Button 
                            onClick={handleAddToCart}
                            className="w-full h-12 rounded-xl bg-[#6F4E37] hover:bg-[#5A3E2B] text-white text-lg font-bold shadow-lg flex items-center justify-between px-6"
                        >
                            <span>Add to Cart</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
