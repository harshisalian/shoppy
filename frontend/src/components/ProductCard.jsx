import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <Link to={`/product/${product._id}`} className="block h-48 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product._id}`}>
            <h3 className="text-lg font-bold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-1">{product.name}</h3>
          </Link>
          <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded ml-2 whitespace-nowrap">
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
