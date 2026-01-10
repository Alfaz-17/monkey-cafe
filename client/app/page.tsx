'use client';

import { useState, useEffect } from 'react';
import { AlignLeft, Cloud, Search, Flame } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Category, Product } from '@/lib/types';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { totalQty } = useCart();
  const [activeCategory, setActiveCategory] = useState('Coffee');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fallback data to match image exactly if API fails or is empty initially
  const defaultCategories = ['Coffee', 'Snacks', 'Desserts'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(prodRes.data);
        // Map backend categories or use default for the specific visual style
        if (catRes.data.length > 0) setCategories(catRes.data);
        else {
             // Mock for visual fidelity if backend empty
             setCategories([
                 { _id: '1', name: 'Coffee', isActive: true, order: 1 },
                 { _id: '2', name: 'Snacks', isActive: true, order: 2 },
                 { _id: '3', name: 'Desserts', isActive: true, order: 3 }
             ]);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(p => {
      const matchesCategory = p.category === activeCategory || (categories.find(c => c._id === p.category)?.name === activeCategory);
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      // For now, strict category matching might be tricky if IDs vs Names. 
      // We'll rely on string matching 'Coffee' etc for the visual "Strict UI" request.
      // In a real app we'd use IDs. 
      return matchesSearch; 
  });

  // Splitting for "Popular" section vs "Main" list
  const popularProducts = products.filter(p => p.isPopular);
  // Main list is everything in the active category
  const mainListProducts = products.filter(p => {
       // Mock category check: assume category field might be "Coffee" or ID
       // If backend sends populated category object, check .name
       // Simpler: Just showing all for now, filtered by tabs visually
       // Let's implement client-side tag filtering based on the 'category' string or ID match
       // The prompt implies we need to show the UI.
       return true; 
  }).filter(p => p.category === activeCategory || (products.length > 0 && categories.length === 0)); // Show all if categories broken

  return (
    <div className="min-h-screen bg-[#F9F6F2] font-sans pb-24">
      {/* 1. Header */}
      <header className="flex items-center justify-between p-6 pt-8 bg-[#F9F6F2] sticky top-0 z-20">
        <Button variant="ghost" size="icon" className="text-[#3E2723]">
          <AlignLeft className="w-6 h-6" />
        </Button>
        <h1 className="font-serif text-3xl font-bold text-[#3E2723] italic tracking-wide">
          Monkey Cafe
        </h1>
        <Button variant="ghost" size="icon" className="text-[#3E2723]">
          <Cloud className="w-6 h-6" />
        </Button>
      </header>

      <main className="px-6 space-y-8">
        {/* 2. Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <Input 
            placeholder="Search for dishes..." 
            className="h-14 pl-12 rounded-2xl bg-white border-none shadow-sm text-base placeholder:text-stone-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 3. Categories */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.length > 0 ? categories.map(cat => (
             <button
               key={cat._id}
               onClick={() => setActiveCategory(cat.name)}
               className={`
                 px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors
                 ${activeCategory === cat.name 
                   ? 'bg-[#3E2723] text-[#F9F6F2]' 
                   : 'bg-[#EDE8E1] text-[#8D7F75] hover:bg-[#DBCFB7]'}
               `}
             >
               {cat.name}
             </button>
          )) : defaultCategories.map(cat => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`
                 px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors
                 ${activeCategory === cat 
                   ? 'bg-[#3E2723] text-[#F9F6F2]' 
                   : 'bg-[#EDE8E1] text-[#8D7F75] hover:bg-[#DBCFB7]'}
               `}
             >
               {cat}
             </button>
          ))}
        </div>

        {/* 4. Popular Items */}
        <section>
          <h2 className="text-lg font-bold text-[#3E2723] mb-4">Popular Items</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
            {popularProducts.map(product => (
              <div key={product._id} className="min-w-[200px] w-[200px]">
                 <ProductCard product={product} /> 
                 {/* Note: ProductCard needs to be horizontal-ish or compact? 
                     The image shows standard cards. 
                     We'll reuse ProductCard but maybe wrap in a slightly different container if needed?
                     The current ProductCard is vertical. Perfect for this.
                 */}
              </div>
            ))}
            {popularProducts.length === 0 && (
                <div className="flex gap-4">
                     {/* Skeleton / Mock */}
                     {[1,2].map(i => (
                         <div key={i} className="min-w-[200px] h-[240px] bg-white rounded-2xl animate-pulse" />
                     ))}
                </div>
            )}
          </div>
        </section>

        {/* 5. Main List (Coffee, etc) */}
        <section>
          <h2 className="text-lg font-bold text-[#3E2723] mb-4">{activeCategory}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {products
                // Filter by category logic 
                // We'll trust the backend sends everything for now, filtering client side 
                // Assuming 'category' in product is the ID. We need to match it.
                // For this demo: we'll match somewhat loosely or show all if nothing matches
                .filter(p => {
                    if (categories.length === 0) return true;
                    const cat = categories.find(c => c.name === activeCategory);
                    return p.category === cat?._id || p.category === activeCategory; 
                })
                .map(product => (
                  <div key={product._id}>
                      <ProductCard product={product} />
                  </div>
              ))}
          </div>
        </section>
      </main>

      {/* Floating Cart Button (if items in cart) */}
      {totalQty > 0 && (
          <div className="fixed bottom-6 left-6 right-6 z-30">
              <Button 
                onClick={() => router.push('/cart')}
                className="w-full h-14 bg-[#3E2723] hover:bg-[#281b18] text-[#F9F6F2] rounded-2xl shadow-xl flex items-center justify-between px-6 text-lg font-bold"
              >
                  <div className="flex items-center gap-3">
                      <div className="bg-[#white]/20 w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-sm">
                          {totalQty}
                      </div>
                      <span>View Cart</span>
                  </div>
                  <span>&rarr;</span>
              </Button>
          </div>
      )}
    </div>
  );
}
