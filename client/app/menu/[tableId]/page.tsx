'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { Search, Menu, CloudRain, ShoppingBag, ChevronRight, ChefHat, CheckCircle2, ArrowLeft, Clock, User, Flame, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, Category } from '@/lib/types';
import { getImageUrl } from '@/lib/utils/resolveImage';
import ProductCard from '@/components/ProductCard';

export default function MenuPage() {
  const params = useParams();
  const tableIdParam = params.tableId as string;
  const { totalQty, totalPrice, setTableId } = useCart();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('Welcome');

  // Time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Brewing Morning ☕");
    else if (hour < 18) setGreeting("Sunlit Siesta 🌤️");
    else setGreeting("Evening Roast 🌙");
  }, []);

  useEffect(() => {
    if (tableIdParam) {
      setTableId(tableIdParam);
    }
  }, [tableIdParam, setTableId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(prodRes.data.filter((p: any) => p.isActive));
        setCategories(catRes.data.filter((c: any) => c.isActive));
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCategory = activeCategory === 'all';
    if (!matchesCategory) {
        const prodCatId = typeof p.category === 'string' ? p.category : (p.category as any)?._id;
        const activeCatObj = categories.find(c => c.name === activeCategory);
        matchesCategory = (prodCatId === activeCatObj?._id) || (activeCategory === (p.category as any)?.name);
    }
    return matchesSearch && matchesCategory;
  });

  const popularProducts = products.filter(p => p.isPopular);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF7F2]">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="relative"
        >
            <div className="w-16 h-16 bg-white rounded-[1.5rem] shadow-xl flex items-center justify-center">
                <span className="text-3xl">☕</span>
            </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#FAF7F2] font-['Outfit'] text-[#3E2723]">
      
      {/* Premium Header Aligned with Cart */}
 <header className="sticky top-0 bg-[#FAF7F2]/80 backdrop-blur-xl z-30 px-6 py-5 border-b border-[#E7DCCA]/40">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="flex flex-col cursor-pointer" onClick={() => router.push(`/menu/${tableIdParam}`)}>
        <h1 className="text-2xl font-black tracking-tighter leading-none font-serif italic text-[#3E2723]">
          MonkeyCafe
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1 bg-[#FDF1E6] px-1.5 py-0.5 rounded-lg border border-[#F0EDE8]">
            <span className="text-[8px] font-black text-[#6F4E37] uppercase tracking-widest">
              Step 1/2
            </span>
          </div>
          <span className="w-1 h-1 rounded-full bg-stone-300"></span>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68966]">
            Table {tableIdParam}
          </p>
        </div>
      </div>
    </div>
    <button 
      onClick={() => router.push('/cart')}
      className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#6F4E37] border border-[#F0EDE8] relative hover:shadow-md active:scale-[0.97] transition-all duration-200 group"
    >
      <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
      {totalQty > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#6F4E37] text-white text-[10px] font-black rounded-lg flex items-center justify-center shadow-lg border-2 border-white">
          {totalQty}
        </span>
      )}
    </button>
  </div>
</header>

      <div className="flex-1 overflow-hidden">
        <div className="p-6 space-y-8 max-h-full overflow-y-auto scrollbar-hide pb-40">
          {/* Dynamic Greeting */}
          <div className="space-y-1">
            <span className="text-[10px] font-black text-[#A68966] uppercase tracking-[0.3em] ml-1">{greeting}</span>
            <h2 className="text-4xl font-black leading-[0.85] tracking-tighter text-[#3E2723] font-serif uppercase">
              WHAT WOULD YOU <br /> LIKE TO TASTE?
            </h2>
          </div>

          {/* Search Box Overhaul */}
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A68966] group-focus-within:text-[#6F4E37] transition-colors" />
            <Input 
              placeholder="Search for coffee, burgers..." 
              className="h-16 pl-14 pr-6 bg-white rounded-[2rem] border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.03)] focus:bg-white focus:ring-2 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37]/20 transition-all text-sm font-bold placeholder:text-[#A68966]/60 placeholder:font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Native-App Style Categories (Story Mode) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-[11px] font-black text-[#6F4E37]/50 uppercase tracking-[0.3em]">Kitchen Segments</h3>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                <div 
                    onClick={() => setActiveCategory('all')}
                    className="flex flex-col items-center gap-2.5 flex-shrink-0 snap-start cursor-pointer group"
                >
                    <div className={`
                        w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-2xl transition-all duration-300
                        ${activeCategory === 'all' 
                        ? 'bg-[#6F4E37] text-white shadow-[0_10px_20px_rgba(111,78,55,0.25)] scale-110 ring-4 ring-[#FAF7F2] outline-2 outline-[#6F4E37]' 
                        : 'bg-white text-[#8D7F75] border border-[#F0EDE8] group-hover:border-[#D4A373]/50'}
                    `}>
                        🍽️
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${activeCategory === 'all' ? 'text-[#3E2723]' : 'text-[#A68966]'}`}>
                        All
                    </span>
                </div>
                {categories.map(cat => (
                <div
                    key={cat._id}
                    onClick={() => setActiveCategory(cat.name)}
                    className="flex flex-col items-center gap-2.5 flex-shrink-0 snap-start cursor-pointer group"
                >
                    <div className={`
                        w-16 h-16 rounded-[1.8rem] overflow-hidden transition-all duration-300 relative
                        ${activeCategory === cat.name 
                            ? 'shadow-[0_10px_20px_rgba(111,78,55,0.25)] scale-110 ring-4 ring-[#FAF7F2] outline-2 outline-[#6F4E37]' 
                            : 'border border-[#F0EDE8] opacity-70 group-hover:opacity-100'}
                    `}>
                        {cat.image ? (
                            <img src={getImageUrl(cat.image)} alt={cat.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        ) : (
                            <div className="w-full h-full bg-[#FAF7F2] flex items-center justify-center text-xl">☕</div>
                        )}
                        {activeCategory === cat.name && (
                            <div className="absolute inset-0 bg-[#6F4E37]/10 pointer-events-none" />
                        )}
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${activeCategory === cat.name ? 'text-[#3E2723]' : 'text-[#A68966]'}`}>
                        {cat.name}
                    </span>
                </div>
                ))}
            </div>
          </section>

          {/* High-End Popular Section */}
          {activeCategory === 'all' && popularProducts.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-black text-[#A68966] uppercase tracking-[0.2em] flex items-center gap-2">
                    MOST LOVED <Sparkles className="w-3 h-3 text-orange-400" />
                </h3>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide">
                {popularProducts.map(product => (
                  <div key={product._id} className="min-w-[190px] w-[190px]">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Main Menu Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-black text-[#A68966] uppercase tracking-[0.2em]">
                {activeCategory === 'all' ? 'FULL MENU' : activeCategory}
              </h3>
              <span className="text-[10px] font-black bg-[#E7DCCA] text-[#6F4E37] px-2 py-0.5 rounded-full uppercase">
                {filteredProducts.length} Items
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Premium Floating Cart Bar */}
      <AnimatePresence>
        {totalQty > 0 && (
          <motion.div
            key={`cart-bar-${totalQty}`}
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent z-40"
          >
            <div className="w-full">
                <Button 
                    onClick={() => router.push('/cart')}
                    className="w-full h-16 bg-[#6F4E37] text-white rounded-[2rem] shadow-[0_20px_50px_rgba(111,78,55,0.3)] flex items-center justify-between px-8 border-b-4 border-[#3E2723]/30 group transition-all hover:scale-[1.02] active:scale-95"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                            <span className="text-lg font-black text-white">{totalQty}</span>
                        </div>
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Your Tray</span>
                            <span className="text-lg font-black tracking-tight">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-black uppercase tracking-widest">NEXT</span>
                        <div className="bg-white/10 p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </div>
                </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
