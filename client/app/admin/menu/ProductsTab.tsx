'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Trash2, Plus, Star, Pencil } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: { _id: string; name: string };
  image?: string;
  isPopular: boolean;
  isActive: boolean;
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
      });
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ name: '', price: '', description: '', category: '', image: '', isPopular: false, isActive: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          if (editingId) {
             // Update existing
             await api.put(`/products/${editingId}`, {
                 ...formData,
                 price: Number(formData.price)
             });
          } else {
             // Create new
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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Products</h2>
        <button 
            onClick={() => {
                setEditingId(null);
                setFormData({ name: '', price: '', description: '', category: '', image: '', isPopular: false });
                setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Popular</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                   {product.image ? (
                       <img src={product.image} alt={product.name} className="h-10 w-10 rounded-md object-cover border" />
                   ) : (
                       <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No Img</div>
                   )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category?.name || 'Uncategorized'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button onClick={() => handleTogglePopular(product._id)}>
                        <Star className={`w-5 h-5 mx-auto ${product.isPopular ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                     <Pencil className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
             {products.length === 0 && (
                <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No products found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input 
                            required
                            className="w-full border rounded p-2" 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input 
                                required
                                type="number"
                                className="w-full border rounded p-2" 
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: e.target.value})}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select 
                                required
                                className="w-full border rounded p-2"
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                            >
                                <option value="">Select...</option>
                                {categories.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea 
                            className="w-full border rounded p-2" 
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                          />
                      </div>
                       <div className="flex gap-6">
                          <label className="flex items-center space-x-2">
                              <input 
                                type="checkbox"
                                checked={formData.isPopular}
                                onChange={e => setFormData({...formData, isPopular: e.target.checked})}
                              />
                              <span className="text-sm font-medium text-gray-700">Mark as Popular</span>
                          </label>
                          <label className="flex items-center space-x-2">
                              <input 
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={e => setFormData({...formData, isActive: e.target.checked})}
                              />
                              <span className="text-sm font-medium text-gray-700">Available (Active)</span>
                          </label>
                       </div>
                       
                       <div className="mt-4">
                           <ImageUpload 
                                value={formData.image} 
                                onChange={(url) => setFormData({...formData, image: url})} 
                           />
                       </div>

                      <div className="flex justify-end gap-2 mt-6">
                          <button 
                            type="button" 
                            onClick={handleCloseModal}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                          >
                              Cancel
                          </button>
                          <button 
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                              {editingId ? 'Update Product' : 'Save Product'}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
}
