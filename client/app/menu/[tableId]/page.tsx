'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Search, Clock } from 'lucide-react';
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
    <div className="min-h-screen bg-stone-50 pb-32 font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* 1. Dynamic Hero Header */}
      <header className="pt-8 pb-4 px-6 bg-white">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-start"
          >
              <div>
                  <p className="text-orange-600 font-bold text-sm tracking-wide uppercase mb-1">Table {tableIdParam}</p>
                  <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">{greeting}</h1>
                  <p className="text-stone-500 text-sm mt-1">Ready to order something delicious?</p>
              </div>
              <div className="bg-stone-100 p-2 rounded-full">
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-white border border-stone-200">
                     <img src="https://ui-avatars.com/api/?name=Monkey+Cafe&background=f97316&color=fff" alt="Logo" />
                  </div>
              </div>
          </motion.div>

          {/* Search Bar Placeholder (Visual only for now) */}
          <div className="mt-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-stone-400" />
              </div>
              <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-stone-100 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all" 
                  placeholder="Seach for 'Latte'..." 
                  disabled
              />
          </div>
      </header>

      {/* 2. Sticky Category Navigation */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100 py-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
         <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-2 px-6">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                        selectedCategory === 'all' 
                        ? 'bg-stone-900 text-white shadow-lg scale-105' 
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                    }`}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat._id}
                        onClick={() => setSelectedCategory(cat._id)}
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                            selectedCategory === cat._id 
                            ? 'bg-stone-900 text-white shadow-lg scale-105' 
                            : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
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
          <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-stone-900">Popular Now 🔥</h2>
            </div>
            <ScrollArea className="w-full whitespace-nowrap -mx-5 px-5">
                <div className="flex space-x-4 pb-8 pt-2 pl-1">
                {popularProducts.map((product, index) => (
                    <motion.div 
                        key={product._id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-[220px] shrink-0"
                    >
                        <div 
                            className="group relative bg-white rounded-[2rem] p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] border border-stone-100 hover:shadow-xl transition-all duration-300 cursor-pointer h-[280px] flex flex-col"
                            onClick={() => handleAddToCart(product)}
                        >
                            <div className="aspect-square rounded-[1.5rem] bg-stone-100 mb-4 overflow-hidden relative shadow-inner">
                                {product.image && (
                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                )}
                            </div>
                            <div className="mt-auto">
                                <h3 className="font-bold text-stone-900 text-lg truncate">{product.name}</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-bold text-lg text-orange-600">${product.price.toFixed(2)}</span>
                                    <div className="h-8 w-8 rounded-full bg-stone-900 flex items-center justify-center text-white shadow-md group-hover:bg-orange-600 transition-colors">
                                        <div className="text-xl font-light pb-1">+</div>
                                    </div>
                                </div>
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
          
          <div className="space-y-4">
            <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
               <ProductCard key={product._id} product={product} onAdd={() => handleAddToCart(product)} />
            ))}
            </AnimatePresence>
            
            {filteredProducts.length === 0 && (
                <div className="py-20 text-center">
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
