'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Trash2, Plus, Star, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/utils/resolveImage';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ImageUpload from '@/components/ui/ImageUpload';
import { AnimatePresence, motion } from 'framer-motion';

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
    const { data } = await api.get('/products');
    setProducts(data);
  };

  const fetchCategories = async () => {
      const { data } = await api.get('/categories');
      setCategories(data);
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold tracking-tight">Products</h2>
            <p className="text-sm text-muted-foreground">Manage your cafe menu items.</p>
        </div>
        <Button 
            onClick={() => {
                setEditingId(null);
                setFormData({ name: '', price: '', description: '', category: '', image: '', isPopular: false, isActive: true, isVeg: true });
                setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <Card className="overflow-hidden border-stone-200 shadow-sm">
        <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Image</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
              <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">Popular</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {products.map((product) => (
              <tr key={product._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle">
                   {product.image ? (
                       <div className="h-10 w-10 rounded-md overflow-hidden bg-stone-100 border border-stone-200">
                           <img src={getImageUrl(product.image)} alt={product.name} className="h-full w-full object-cover" />
                       </div>
                   ) : (
                       <div className="h-10 w-10 rounded-md bg-stone-100 flex items-center justify-center text-stone-400 text-[10px] font-medium border border-stone-200">No IMG</div>
                   )}
                </td>
                <td className="p-4 align-middle font-medium">
                    {product.name}
                    {!product.isActive && <span className="ml-2 text-xs text-red-500 font-normal">(Inactive)</span>}
                </td>
                <td className="p-4 align-middle text-muted-foreground">
                    <Badge variant="secondary" className="font-normal bg-stone-100 text-stone-600 hover:bg-stone-200">
                        {product.category?.name || 'Uncategorized'}
                    </Badge>
                </td>
                <td className="p-4 align-middle font-medium">
                    ${product.price.toFixed(2)}
                </td>
                <td className="p-4 align-middle text-center">
                    <button onClick={() => handleTogglePopular(product._id)} className="focus:outline-none transition-transform active:scale-90">
                        <Star className={`w-5 h-5 mx-auto transition-colors ${product.isPopular ? 'text-yellow-400 fill-yellow-400' : 'text-stone-300 hover:text-yellow-400'}`} />
                    </button>
                </td>
                <td className="p-4 align-middle text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(product)} className="h-8 w-8 text-stone-500 hover:text-indigo-600">
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product._id)} className="h-8 w-8 text-stone-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
             {products.length === 0 && (
                <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">No products found. Add your first item!</td>
                </tr>
            )}
          </tbody>
        </table>
        </div>
      </Card>

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
