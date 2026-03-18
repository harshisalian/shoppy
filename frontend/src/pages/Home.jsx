import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/productService';
import ProductCard from '../components/ProductCard';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please ensure the backend is running.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700 shadow-sm">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Latest Products</h1>
      
      {products.length === 0 ? (
        <div className="text-center bg-white rounded-xl shadow-sm p-12">
          <p className="text-xl text-gray-600 font-medium">No products found.</p>
          <p className="text-gray-500 mt-2">Add some products from the admin panel to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
