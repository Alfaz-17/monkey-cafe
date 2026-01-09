'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Trash2, Plus, Pencil, X, Save } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    const { data } = await api.get('/categories');
    setCategories(data);
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold tracking-tight">Categories</h2>
            <p className="text-sm text-muted-foreground">Organize your menu structure.</p>
        </div>
      </div>

      <Card className="p-6 border-stone-200">
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wide text-stone-500">Add New Category</h3>
        <div className="flex flex-col md:flex-row gap-6 items-start">
             <div className="flex-1 space-y-4 w-full">
                <div className="flex gap-4">
                    <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Category Name (e.g. Coffee)"
                        className="flex-1 h-12 text-base"
                    />
                     <Button
                        onClick={handleAdd}
                        className="bg-green-600 hover:bg-green-700 h-12 px-6"
                        disabled={loading || !newCategoryName}
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add 
                    </Button>
                </div>
             </div>
             <div className="w-full md:w-auto max-w-xs shrink-0">
                 <ImageUpload 
                    value={newCategoryImage} 
                    onChange={setNewCategoryImage}
                    label="Category Image (Optional)"
                 />
             </div>
        </div>
      </Card>

      <Card className="overflow-hidden border-stone-200 shadow-sm">
        <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-20">Image</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {categories.map((cat) => (
              <tr key={cat._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle">
                   {editingId === cat._id ? (
                       <div className="w-16">
                           <ImageUpload value={editImage} onChange={setEditImage} label="" />
                       </div>
                   ) : (
                       cat.image ? (
                           <div className="h-10 w-10 rounded-md overflow-hidden bg-stone-100 border border-stone-200">
                               <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                           </div>
                       ) : (
                           <div className="h-10 w-10 rounded-md bg-stone-100 flex items-center justify-center text-stone-400 text-[10px] font-medium border border-stone-200">No IMG</div>
                       )
                   )}
                </td>
                <td className="p-4 align-middle font-medium text-base">
                    {editingId === cat._id ? (
                        <Input 
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="bg-white"
                        />
                    ) : (
                        cat.name
                    )}
                </td>
                <td className="p-4 align-middle">
                  {cat.isActive ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Inactive</Badge>
                  )}
                </td>
                <td className="p-4 align-middle text-right">
                  {editingId === cat._id ? (
                      <div className="flex justify-end gap-2">
                          <Button size="icon" onClick={() => saveEdit(cat._id)} className="bg-green-600 hover:bg-green-700 h-8 w-8">
                              <Save className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="outline" onClick={cancelEdit} className="h-8 w-8">
                              <X className="w-4 h-4" />
                          </Button>
                      </div>
                  ) : (
                      <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => startEdit(cat)} className="h-8 w-8 text-stone-500 hover:text-indigo-600">
                              <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(cat._id)} className="h-8 w-8 text-stone-500 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                          </Button>
                      </div>
                  )}
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
                <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">No categories found. Start by creating one!</td>
                </tr>
            )}
          </tbody>
        </table>
        </div>
      </Card>
    </div>
  );
}
