'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Trash2, Plus, Pencil, X, Save } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Categories</h2>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wide text-gray-500">Add New Category</h3>
        <div className="flex gap-4 items-start">
             <div className="flex-1 space-y-4">
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Category Name (e.g. Coffee)"
                    className="w-full border p-2 rounded"
                />
                 <button
                    onClick={handleAdd}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
                    disabled={loading || !newCategoryName}
                >
                    <Plus className="w-4 h-4 mr-1" /> Add Category
                </button>
             </div>
             <div className="w-full max-w-xs">
                 <ImageUpload 
                    value={newCategoryImage} 
                    onChange={setNewCategoryImage}
                    label="Category Image (Optional)"
                 />
             </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                   {editingId === cat._id ? (
                       <div className="w-20">
                           <ImageUpload value={editImage} onChange={setEditImage} label="" />
                       </div>
                   ) : (
                       cat.image ? (
                           <img src={cat.image} alt={cat.name} className="h-10 w-10 rounded-md object-cover border" />
                       ) : (
                           <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No Img</div>
                       )
                   )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {editingId === cat._id ? (
                        <input 
                            className="border p-1 rounded w-full" 
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                    ) : (
                        cat.name
                    )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cat.isActive ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingId === cat._id ? (
                      <div className="flex justify-end gap-2">
                          <button onClick={() => saveEdit(cat._id)} className="text-green-600 hover:text-green-900">
                              <Save className="w-5 h-5" />
                          </button>
                          <button onClick={cancelEdit} className="text-gray-600 hover:text-gray-900">
                              <X className="w-5 h-5" />
                          </button>
                      </div>
                  ) : (
                      <div className="flex justify-end gap-2">
                          <button onClick={() => startEdit(cat)} className="text-indigo-600 hover:text-indigo-900">
                              <Pencil className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDelete(cat._id)} className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-5 h-5" />
                          </button>
                      </div>
                  )}
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No categories found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
