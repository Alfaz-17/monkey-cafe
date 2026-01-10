'use client';

import { useState, useEffect } from 'react';
import { Coffee, Pencil, Trash2, Plus, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import api from '@/lib/api';
import { getImageUrl } from '@/lib/utils/resolveImage';

export default function ProductsTab() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    isVeg: true,
    isActive: true,
    isPopular: false,
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
      console.error('Failed to fetch products');
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      category: typeof product.category === 'object' ? product.category._id : product.category,
      description: product.description || '',
      image: product.image || '',
      isVeg: product.isVeg,
      isActive: product.isActive,
      isPopular: product.isPopular,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, formData);
      } else {
        await api.post('/products', formData);
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      image: '',
      isVeg: true,
      isActive: true,
      isPopular: false,
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
          <h2 className="text-lg sm:text-xl font-bold text-[#3E2723]">Products</h2>
          <p className="text-xs text-[#A68966] mt-1">Manage menu items</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="h-10 sm:h-12 px-4 sm:px-6 bg-[#6F4E37] text-white rounded-lg font-bold text-xs"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      {/* Compact Table */}
      <div className="bg-white rounded-lg border border-[#F0EDE8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FAF7F2] border-b border-[#F0EDE8]">
              <tr>
                <th className="px-3 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-bold uppercase text-[#6F4E37]">Product</th>
                <th className="px-3 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-bold uppercase text-[#6F4E37] hidden sm:table-cell">Category</th>
                <th className="px-3 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-bold uppercase text-[#6F4E37]">Price</th>
                <th className="px-3 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-bold uppercase text-[#6F4E37] hidden md:table-cell">Status</th>
                <th className="px-3 sm:px-4 py-3 text-right text-[10px] sm:text-xs font-bold uppercase text-[#6F4E37]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE8]">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-[#FAF7F2]/30 transition-colors">
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-[#FAF7F2] flex-shrink-0">
                          {product.image ? (
                            <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#A68966]/30">
                              <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-[#3E2723] truncate">{product.name}</p>
                          <p className="text-[10px] sm:text-xs text-[#A68966] truncate">{product.isVeg ? '🌱' : '🍖'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 hidden sm:table-cell">
                      <span className="inline-flex px-2 py-1 text-[10px] font-medium rounded-md bg-[#E7DCCA] text-[#6F4E37]">
                        {categories.find(c => c._id === product.category)?.name || 'N/A'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <span className="text-xs sm:text-sm font-bold text-[#3E2723]">₹{product.price.toFixed(2)}</span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${product.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        {product.isPopular && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-1.5 sm:p-2 rounded-lg hover:bg-[#F0EDE8] text-[#6F4E37] transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
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
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <p className="text-xs font-bold uppercase text-[#A68966]">No products found</p>
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
              <h3 className="text-lg font-bold">{editingId ? 'Edit Product' : 'New Product'}</h3>
              <button onClick={handleCloseModal}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" step="0.01" placeholder="Price (₹)" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                <select className="flex h-9 w-full rounded-md border px-3" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
              </div>
              <Textarea 
                placeholder="Product Description" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                required 
                className="min-h-[100px]"
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Image</label>
                <div 
                  className="relative border-2 border-dashed border-[#E7DCCA] rounded-lg p-6 hover:border-[#6F4E37] transition-colors cursor-pointer bg-[#FAF7F2]/30"
                  onClick={() => document.getElementById('product-image-upload')?.click()}
                >
                  <input 
                    id="product-image-upload"
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  {formData.image ? (
                    <div className="space-y-2">
                      <img src={getImageUrl(formData.image)} alt="Preview" className="w-full h-48 object-cover rounded-lg" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
                      <p className="text-xs text-center text-[#A68966]">Click to change image</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
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
                      <span className="text-sm font-medium text-[#6F4E37]">Uploading...</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isVeg} onChange={(e) => setFormData({...formData, isVeg: e.target.checked})} />
                  <span className="text-sm">Vegetarian</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} />
                  <span className="text-sm">Active</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isPopular} onChange={(e) => setFormData({...formData, isPopular: e.target.checked})} />
                  <span className="text-sm">Popular</span>
                </label>
              </div>
              <Button type="submit" className="w-full bg-[#6F4E37] text-white">
                {editingId ? 'Update' : 'Create'} Product
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
