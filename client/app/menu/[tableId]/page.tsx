'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Search, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: { _id: string; name: string } | null;
  image?: string;
  isPopular: boolean;
  isActive: boolean;
}

interface Category {
  _id: string;
  name: string;
}

export default function MenuPage() {
  const params = useParams();
  const tableIdParam = params.tableId as string;
  const { addToCart, totalQty, totalPrice, setTableId } = useCart();
  
  useEffect(() => {
    if (tableIdParam) {
        setTableId(tableIdParam);
    }
  }, [tableIdParam, setTableId]);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('Welcome');

  // Time-based greeting
  useEffect(() => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good Morning ☀️");
      else if (hour < 18) setGreeting("Good Afternoon 🌤️");
      else setGreeting("Good Evening 🌙");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(productsRes.data.filter((p: Product) => p.isActive));
        setCategories(categoriesRes.data.filter((c: any) => c.isActive));
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.image
    });
    // Optional: Add haptic feedback here if using Web APIs
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category && p.category._id === selectedCategory);

  const popularProducts = products.filter(p => p.isPopular);

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center bg-stone-50">
            <div className="flex flex-col items-center gap-4">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-8 w-8 border-2 border-orange-500 border-t-transparent rounded-full"
                />
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-32 font-sans selection:bg-[#D4A373] selection:text-white">
      
      {/* 1. Dynamic Hero Header */}
      {/* 1. Dynamic Hero Header */}
      <header className="pt-6 pb-2 px-5 bg-[#FAF7F2] relative overflow-hidden">
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center relative z-10 mb-6"
          >
              <div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="bg-[#1F2937] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">Table {tableIdParam}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-[#1F2937] leading-tight font-serif mt-2">Monkey Cafe</h1>
                  <p className="text-[#6B7280] text-sm font-medium">{greeting}</p>
              </div>
              <div className="bg-white p-1 rounded-full shadow-sm border border-[#E5E7EB]">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-[#F5EFE6]">
                     <img src="https://ui-avatars.com/api/?name=Monkey+Cafe&background=6F4E37&color=fff" alt="Logo" className="h-full w-full object-cover" />
                  </div>
              </div>
          </motion.div>

          {/* Search Bar - Seamless */}
          <div className="relative z-10 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#6F4E37] transition-colors" />
              </div>
              <input 
                  type="text" 
                  className="block w-full pl-11 pr-4 py-3.5 border-none rounded-xl bg-white text-[#1F2937] placeholder-[#9CA3AF] shadow-sm ring-1 ring-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/20 transition-all font-medium text-[15px]" 
                  placeholder="Search for coffee, cakes..." 
                  disabled
              />
          </div>
      </header>

      {/* 2. Sticky Category Navigation */}
      {/* 2. Sticky Category Navigation */}
      <div className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-xl border-b border-[#E5E7EB] pt-2 pb-3">
         <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-3 px-5">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all duration-300 border ${
                        selectedCategory === 'all' 
                        ? 'bg-[#6F4E37] text-white border-[#6F4E37] shadow-md' 
                        : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F5EFE6]'
                    }`}
                >
                    All Items
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat._id}
                        onClick={() => setSelectedCategory(cat._id)}
                        className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all duration-300 border ${
                            selectedCategory === cat._id 
                            ? 'bg-[#6F4E37] text-white border-[#6F4E37] shadow-md' 
                            : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F5EFE6]'
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      <main className="px-5 py-6 space-y-8">
        
        {/* 3. Popular Items (Horizontal Scroll) */}
        {selectedCategory === 'all' && popularProducts.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-[20px] font-semibold text-[#1F2937] flex items-center gap-2">
                        Bestsellers <Star className="fill-[#F59E0B] text-[#F59E0B] h-5 w-5" />
                    </h2>
                    <p className="text-[14px] text-[#6B7280] mt-0.5">Most ordered in this cafe</p>
                </div>
            </div>
            <ScrollArea className="w-full whitespace-nowrap -mx-5 px-5">
                <div className="flex space-x-3 pb-4 snap-x snap-mandatory">
                {popularProducts.map((product, index) => (
                    <motion.div 
                        key={product._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-[160px] shrink-0 snap-start"
                    >
                        <div 
                            className="group relative bg-white rounded-2xl p-3 shadow-sm border border-stone-100/60 active:scale-95 transition-transform duration-200 cursor-pointer h-full flex flex-col"
                            onClick={() => handleAddToCart(product)}
                        >
                            <div className="aspect-[4/3] rounded-xl bg-stone-100 mb-3 overflow-hidden relative">
                                {product.image ? (
                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-stone-50 text-[10px] text-stone-400">No Img</div>
                                )}
                                <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-stone-900 shadow-sm">
                                    ${product.price}
                                </div>
                            </div>
                            <div className="mt-auto">
                                <h3 className="font-bold text-stone-900 text-sm truncate leading-tight">{product.name}</h3>
                                <p className="text-[10px] text-stone-500 truncate mt-0.5">{product.category?.name || 'Item'}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
          </section>
        )}

        {/* 4. Main Menu Grid (Vertical) */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-stone-900">
                {selectedCategory === 'all' ? 'Our Menu' : categories.find(c => c._id === selectedCategory)?.name}
            </h2>
            <div className="h-px bg-stone-200 flex-1"></div>
          </div>
          
          {/* Grid Layout for Cards (Mobile: 2 cols, Tablet: 3 cols) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-32">
            <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
                <div key={product._id} className="h-full">
                    <ProductCard product={product} />
                </div>
            ))}
            </AnimatePresence>
            
            {filteredProducts.length === 0 && (
                <div className="col-span-full py-20 text-center">
                    <p className="text-stone-400 font-medium">No items found.</p>
                </div>
            )}
          </div>
        </section>
      </main>

      {/* 5. 'Island' Floating Cart */}
      <AnimatePresence>
      {totalQty > 0 && (
        <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-5 right-5 z-50"
        >
            <Link href="/cart">
                <Button className="w-full h-16 rounded-[1.5rem] bg-stone-900 hover:bg-stone-800 text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] flex justify-between items-center px-6 transition-transform active:scale-95 border border-stone-800/50 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        <div className="bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-sm">
                            {totalQty}
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-stone-400 font-medium uppercase tracking-wider">Total</span>
                            <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-base bg-white/10 px-4 py-2 rounded-xl">
                        View Cart <ShoppingBag className="h-4 w-4" />
                    </div>
                </Button>
            </Link>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
