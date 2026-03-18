import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, createProduct, updateProduct } from '../api/productService';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: ''
  });
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          const data = await getProductById(id);
          setFormData({
            ...data,
            price: data.price.toString()
          });
          setLoading(false);
        } catch (err) {
          setError('Failed to load product details');
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      const payload = { ...formData, price: parseFloat(formData.price) };
      
      if (isEditing) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please check your inputs.');
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-indigo-600" size={48} /></div>;

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 group transition-colors">
        <ArrowLeft size={18} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-indigo-600 p-6 sm:p-8 text-white">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="mt-2 text-indigo-100 text-sm sm:text-base">
            {isEditing ? 'Update the details of the existing product below.' : 'Fill out the form below to add a new product to your store.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700 shadow-sm">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm outline-none bg-gray-50 hover:bg-white focus:bg-white"
                placeholder="e.g. Wireless Headphones"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm outline-none bg-gray-50 hover:bg-white focus:bg-white"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm outline-none bg-gray-50 hover:bg-white focus:bg-white"
                  placeholder="e.g. Electronics"
                />
              </div>
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                required
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm outline-none bg-gray-50 hover:bg-white focus:bg-white"
                placeholder="https://example.com/image.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-3 relative h-32 w-32 rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm outline-none bg-gray-50 hover:bg-white focus:bg-white resize-none"
                placeholder="Briefly describe the product..."
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
            <Link 
              to="/"
              className="py-3 px-6 text-gray-700 font-bold bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all shadow-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 py-3 px-8 text-white font-bold bg-indigo-600 border border-transparent rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              {isEditing ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
