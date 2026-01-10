'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Trash2, Plus, Star, Pencil, X, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/utils/resolveImage';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ImageUpload from '@/components/ui/ImageUpload';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: { _id: string; name: string };
  image?: string;
  isPopular: boolean;
  isActive: boolean;
  isVeg: boolean;
}

interface Category {
  _id: string;
  name: string;
}

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // New Product Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    isPopular: false,
    isActive: true,
    isVeg: true,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
        const { data } = await api.get('/products');
        setProducts(data);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
  };

  const fetchCategories = async () => {
      try {
          const { data } = await api.get('/categories');
          setCategories(data);
      } catch (error) {
          console.error('Failed to fetch categories:', error);
      }
  };

  const handleTogglePopular = async (id: string) => {
      try {
          await api.put(`/products/${id}/popular`);
          fetchProducts();
      } catch (error) {
          console.error(error);
          alert('Failed to update status');
      }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
        await api.delete(`/products/${id}`);
        fetchProducts();
    } catch (error) {
        console.error(error);
        alert('Failed to delete product');
    }
  };

  const handleEdit = (product: Product) => {
      setEditingId(product._id);
      setFormData({
          name: product.name,
          price: product.price.toString(),
          description: product.description,
          category: product.category?._id || '',
          image: product.image || '',
          isPopular: product.isPopular,
          isActive: product.isActive,
          isVeg: product.isVeg !== undefined ? product.isVeg : true,
      });
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ name: '', price: '', description: '', category: '', image: '', isPopular: false, isActive: true, isVeg: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          if (editingId) {
             await api.put(`/products/${editingId}`, {
                 ...formData,
                 price: Number(formData.price)
             });
          } else {
             await api.post('/products', {
                 ...formData,
                 price: Number(formData.price)
             });
          }
          handleCloseModal();
          fetchProducts();
      } catch (error) {
          console.error(error);
          alert('Failed to save product');
      }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-['Outfit']">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-2xl font-black text-[#3E2723]">Products</h2>
            <p className="text-xs font-medium text-[#A68966] mt-1">Add and manage your menu items</p>
        </div>
        <Button 
            onClick={() => {
                setEditingId(null);
                setFormData({ name: '', price: '', description: '', category: '', image: '', isPopular: false, isActive: true, isVeg: true });
                setIsModalOpen(true);
            }}
            className="w-full md:w-auto h-12 px-6 bg-[#6F4E37] text-white rounded-lg font-bold uppercase tracking-widest text-[10px]"
        >
          <Plus className="w-4 h-4 mr-2" /> New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode='popLayout'>
            {products.map((product) => (
              <motion.div 
                layout
                key={product._id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                  <Card className="rounded-2xl border border-[#F0EDE8] shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white h-full flex flex-col">
                      <div className="h-44 relative bg-[#FAF7F2]">
                          {product.image ? (
                              <img src={getImageUrl(product.image)} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                              <div className="h-full w-full flex items-center justify-center text-[#A68966]/20">
                                  <Coffee className="w-10 h-10" />
                              </div>
                          )}
                          
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                             <Badge variant="outline" className={cn("px-2 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-wider border-none", 
                                product.isActive ? "bg-white/90 text-[#6F4E37]" : "bg-red-500 text-white"
                             )}>
                                {product.isActive ? 'Active' : 'Hidden'}
                             </Badge>
                          </div>

                          <button 
                            onClick={(e) => { e.stopPropagation(); handleTogglePopular(product._id); }}
                            className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center shadow-sm"
                          >
                              <Star className={cn("w-4 h-4", product.isPopular ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
                          </button>
                          
                          <div className="absolute bottom-3 left-3">
                             <div className="bg-white/90 px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                                <span className="text-sm font-bold text-[#3E2723]">${product.price.toFixed(2)}</span>
                             </div>
                          </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                          <div className="flex-1">
                              <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest text-[#A68966] mb-2">
                                  {product.category?.name || 'Uncategorized'}
                              </Badge>
                              <h3 className="text-lg font-bold text-[#3E2723] leading-tight">{product.name}</h3>
                              <p className="text-[11px] text-[#A68966] mt-2 line-clamp-2 leading-relaxed font-medium">
                                  {product.description || 'No description.'}
                              </p>
                          </div>

                          <div className="flex gap-2 mt-4">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEdit(product)} 
                                className="flex-1 h-9 rounded-lg border-[#F0EDE8] text-[#6F4E37] font-bold uppercase text-[9px]"
                              >
                                  Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleDelete(product._id)} 
                                className="h-9 w-9 p-0 rounded-lg border-red-50 text-red-500 hover:bg-red-50"
                              >
                                  <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                          </div>
                      </div>
                  </Card>
              </motion.div>
            ))}
        </AnimatePresence>
        
        {products.length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed border-[#F0EDE8] rounded-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-[#A68966]">No products found</p>
            </div>
        )}
      </div>

      {/* Modern Modal Overlay */}
      <AnimatePresence>
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative z-50 w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                      <h3 className="text-lg font-bold tracking-tight">{editingId ? 'Edit Product' : 'New Product'}</h3>
                      <button onClick={handleCloseModal} className="text-stone-400 hover:text-stone-600 transition-colors">
                          <X className="w-5 h-5" />
                      </button>
                  </div>
                  
                  <div className="overflow-y-auto p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Product Name</label>
                          <Input 
                            required
                            placeholder="e.g. Iced Vanilla Latte"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Price ($)</label>
                            <Input 
                                required
                                type="number"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Category</label>
                            <select 
                                required
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                            >
                                <option value="">Select Category...</option>
                                {categories.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                          <label className="text-sm font-medium leading-none">Description</label>
                          <textarea 
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Describe the taste, ingredients, etc."
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                          />
                      </div>

                       <div className="space-y-3 pt-2">
                          <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-stone-50 transition-colors cursor-pointer">
                              <input 
                                type="checkbox"
                                className="h-4 w-4 rounded border-stone-300 text-blue-600 focus:ring-blue-600"
                                checked={formData.isPopular}
                                onChange={e => setFormData({...formData, isPopular: e.target.checked})}
                              />
                              <div className="space-y-0.5">
                                  <span className="text-sm font-medium text-stone-900 block">Mark as Popular</span>
                                  <span className="text-xs text-stone-500 block">Highlights this item on the menu.</span>
                              </div>
                          </label>
                          <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-stone-50 transition-colors cursor-pointer">
                              <input 
                                type="checkbox"
                                className="h-4 w-4 rounded border-stone-300 text-blue-600 focus:ring-blue-600"
                                checked={formData.isActive}
                                onChange={e => setFormData({...formData, isActive: e.target.checked})}
                              />
                              <div className="space-y-0.5">
                                  <span className="text-sm font-medium text-stone-900 block">Available (Active)</span>
                                  <span className="text-xs text-stone-500 block">Uncheck to hide from customer menu without deleting.</span>
                              </div>
                          </label>
                       </div>
                       
                       <div className="pt-2">
                           <label className="text-sm font-medium leading-none mb-3 block">Product Image</label>
                           <ImageUpload 
                                value={formData.image} 
                                onChange={(url) => setFormData({...formData, image: url})} 
                           />
                       </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-stone-100 mt-4">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={handleCloseModal}
                          >
                              Cancel
                          </Button>
                          <Button 
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 w-32"
                          >
                              {editingId ? 'Update' : 'Save Item'}
                          </Button>
                      </div>
                    </form>
                  </div>
              </motion.div>
          </div>
      )}
      </AnimatePresence>
    </div>
  );
}
