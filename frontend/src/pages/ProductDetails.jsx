import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, deleteProduct } from '../api/productService';
import { CartContext } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, Loader2, Edit, Trash2 } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product not found.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        navigate('/');
      } catch (err) {
        alert('Failed to delete product.');
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-indigo-600" size={48} /></div>;
  if (error) return <div className="text-red-500 text-center text-lg font-medium py-12 bg-white rounded-xl shadow-sm">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 group transition-colors">
        <ArrowLeft size={18} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </Link>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="max-h-[400px] w-full object-contain rounded-lg drop-shadow-md"
          />
        </div>
        
        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="mb-3">
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full">
              {product.category}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
          <p className="text-4xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          
          <div className="prose prose-sm sm:prose-base text-gray-600 mb-8 flex-grow">
            <p className="leading-relaxed">{product.description}</p>
          </div>
          
          <div className="mt-auto space-y-4 pt-6 border-t border-gray-100">
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all flex justify-center items-center gap-2 transform active:scale-[0.98]"
            >
              <ShoppingCart size={22} className="stroke-[2.5]" />
              Add to Cart
            </button>
            
            <div className="flex gap-4">
              <Link to={`/admin/${product._id}`} className="flex-1 bg-white border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-700 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all flex justify-center items-center gap-2">
                <Edit size={18} /> Edit
              </Link>
              <button 
                onClick={handleDelete}
                className="flex-1 bg-white border-2 border-red-100 hover:border-red-300 hover:bg-red-50 text-red-600 font-bold py-3 px-4 rounded-xl transition-all flex justify-center items-center gap-2"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
