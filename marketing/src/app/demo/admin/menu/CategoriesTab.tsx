'use client';

import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { getImageUrl } from '@/lib/utils/resolveImage';

export default function CategoriesTab() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    order: '',
    image: '',
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  const handleEdit = (category: any) => {
    setEditingId(category._id);
    setFormData({
      name: category.name,
      order: category.order,
      image: category.image || '',
      isActive: category.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, formData);
      } else {
        await api.post('/categories', formData);
      }
      fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save');
    } finally {
        setSaving(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      name: '',
      order: '',
      image: '',
      isActive: true,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    
    setUploading(true);
    try {
      const { data } = await api.post('/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFormData({...formData, image: data.url});
    } catch (error) {
      console.error('Upload failed');
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#3E2723]">Categories</h2>
          <p className="text-xs text-[#A68966] mt-1">Manage menu categories</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="h-10 sm:h-12 px-4 sm:px-6 bg-[#6F4E37] text-white rounded-lg font-bold text-xs"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      {/* Compact Table */}
      <div className="bg-white rounded-lg border border-[#F0EDE8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FAF7F2] border-b border-[#F0EDE8]">
              <tr>
                <th className="px-3 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-bold uppercase text-[#6F4E37]">Category</th>
                <th className="px-3 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-bold uppercase text-[#6F4E37]">Order</th>
                <th className="px-3 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-bold uppercase text-[#6F4E37] hidden sm:table-cell">Status</th>
                <th className="px-3 sm:px-4 py-3 text-right text-[10px] sm:text-xs font-bold uppercase text-[#6F4E37]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE8]">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category._id} className="hover:bg-[#FAF7F2]/30 transition-colors">
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-[#FAF7F2] flex-shrink-0">
                          {category.image ? (
                            <img src={getImageUrl(category.image)} alt={category.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              📁
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-[#3E2723] truncate">{category.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-md bg-[#E7DCCA] text-[#6F4E37]">
                        #{category.order}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${category.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        <span className="text-xs font-medium text-[#A68966]">
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-1.5 sm:p-2 rounded-lg hover:bg-[#F0EDE8] text-[#6F4E37] transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center">
                    <p className="text-xs font-bold uppercase text-[#A68966]">No categories found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40" onClick={handleCloseModal}></div>
          <div className="relative z-50 w-full max-w-lg bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-bold">{editingId ? 'Edit Category' : 'New Category'}</h3>
              <button onClick={handleCloseModal}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input 
                placeholder="Category Name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required 
              />
              <Input 
                type="number" 
                placeholder="Display Order" 
                value={formData.order} 
                onChange={(e) => setFormData({...formData, order: e.target.value})} 
                required 
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Category Image</label>
                <div 
                  className="relative border-2 border-dashed border-[#E7DCCA] rounded-lg p-6 hover:border-[#6F4E37] transition-colors cursor-pointer bg-[#FAF7F2]/30"
                  onClick={() => document.getElementById('category-image-upload')?.click()}
                >
                  <input 
                    id="category-image-upload"
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  {formData.image ? (
                    <div className="space-y-2">
                      <img src={getImageUrl(formData.image)} alt="Preview" className="w-full h-40 object-cover rounded-lg" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
                      <p className="text-xs text-center text-[#A68966]">Click to change image</p>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 mx-auto mb-3 text-[#A68966]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-[#3E2723] mb-1">Click to upload</p>
                      <p className="text-xs text-[#A68966]">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                      <span className="text-sm font-medium text-[#6F4E37] flex items-center gap-2">
                        <Loader2 className="animate-spin w-4 h-4" /> Uploading...
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.isActive} 
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})} 
                />
                <span className="text-sm">Active</span>
              </label>
              <Button type="submit" className="w-full bg-[#6F4E37] text-white" disabled={saving || uploading}>
                {saving ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                    </>
                ) : (
                    editingId ? 'Update Category' : 'Create Category'
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
