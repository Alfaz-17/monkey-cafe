'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Trash2, Plus, Pencil, X, Save } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getImageUrl } from '@/lib/utils/resolveImage';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Category {
  _id: string;
  name: string;
  image?: string;
  isActive: boolean;
  order: number;
}

export default function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Add Mode State
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');

  // Edit Mode State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
        const { data } = await api.get('/categories');
        setCategories(data);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    }
  };

  const handleAdd = async () => {
    if (!newCategoryName.trim()) return;

    try {
      await api.post('/categories', { 
          name: newCategoryName, 
          image: newCategoryImage,
          order: categories.length + 1 
      });
      setNewCategoryName('');
      setNewCategoryImage('');
      fetchCategories();
    } catch (error) {
      console.error(error);
      alert('Failed to add category');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This will hide products in this category.')) return;
    try {
        await api.delete(`/categories/${id}`);
        fetchCategories();
    } catch (error) {
        console.error(error);
        alert('Failed to delete category');
    }
  };

  const startEdit = (cat: Category) => {
      setEditingId(cat._id);
      setEditName(cat.name);
      setEditImage(cat.image || '');
  };

  const cancelEdit = () => {
      setEditingId(null);
      setEditName('');
      setEditImage('');
  };

  const saveEdit = async (id: string) => {
      try {
          await api.put(`/categories/${id}`, {
              name: editName,
              image: editImage
          });
          setEditingId(null);
          fetchCategories();
      } catch (error) {
          console.error(error);
          alert('Failed to update category');
      }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-['Outfit']">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-2xl font-black text-[#3E2723]">Categories</h2>
            <p className="text-xs font-medium text-[#A68966] mt-1">Organize your menu into collections</p>
        </div>
      </div>

      {/* Add New Section */}
      <Card className="rounded-2xl border border-[#F0EDE8] shadow-sm">
        <div className="p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#A68966] mb-6">Create New Category</h3>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4 w-full">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#A68966] ml-1">Category Name</label>
                        <Input
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="e.g. Hot Drinks"
                            className="h-12 rounded-lg bg-[#FAF7F2] border-[#F0EDE8] text-sm font-bold"
                        />
                    </div>
                    <Button
                        onClick={handleAdd}
                        className="h-12 px-8 bg-[#6F4E37] text-white rounded-lg font-bold uppercase tracking-widest text-[10px]"
                        disabled={loading || !newCategoryName}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Create Category
                    </Button>
                </div>
                <div className="w-full lg:w-64 shrink-0">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#A68966] ml-1 mb-2 block">Cover Image</label>
                    <ImageUpload 
                        value={newCategoryImage} 
                        onChange={setNewCategoryImage}
                        label=""
                    />
                </div>
            </div>
        </div>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
            {categories.map((cat) => (
                <motion.div 
                    layout
                    key={cat._id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Card className="rounded-2xl border border-[#F0EDE8] shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white h-full flex flex-col">
                        <div className="h-40 relative bg-[#FAF7F2]">
                             {cat.image ? (
                                 <img src={getImageUrl(cat.image)} alt={cat.name} className="h-full w-full object-cover" />
                             ) : (
                                 <div className="h-full w-full flex items-center justify-center text-[#A68966]/20">
                                     <Plus className="w-8 h-8" />
                                 </div>
                             )}
                             <div className="absolute top-3 right-3">
                                 <Badge className={cn("px-2 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-wider border-none", 
                                     cat.isActive ? "bg-green-500 text-white" : "bg-gray-400 text-white"
                                 )}>
                                     {cat.isActive ? 'Active' : 'Hidden'}
                                 </Badge>
                             </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            {editingId === cat._id ? (
                                <div className="space-y-3">
                                    <Input 
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="h-10 rounded-lg text-sm font-bold"
                                    />
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={() => saveEdit(cat._id)} className="flex-1 bg-green-600 rounded-lg text-[10px]">Save</Button>
                                        <Button size="sm" variant="outline" onClick={cancelEdit} className="rounded-lg text-[10px]">Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-[#3E2723]">{cat.name}</h3>
                                        <p className="text-[10px] font-bold text-[#A68966] uppercase mt-1">Category</p>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <Button variant="outline" size="sm" onClick={() => startEdit(cat)} className="h-9 w-9 p-0 rounded-lg border-gray-100 text-[#6F4E37]"><Pencil className="w-3.5 h-3.5" /></Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(cat._id)} className="h-9 w-9 p-0 rounded-lg border-red-50 text-red-500 hover:bg-red-50 ml-auto"><Trash2 className="w-3.5 h-3.5" /></Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </Card>
                </motion.div>
            ))}
        </AnimatePresence>
        
        {categories.length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed border-[#F0EDE8] rounded-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-[#A68966]">No categories found</p>
            </div>
        )}
      </div>
    </div>
  );
}
