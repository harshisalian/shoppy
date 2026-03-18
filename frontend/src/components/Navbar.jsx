import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, PackagePlus } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = React.useContext(CartContext);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            CRUD Shop
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="text-gray-600 hover:text-indigo-600 flex items-center gap-1 transition-colors">
              <PackagePlus size={20} />
              <span className="hidden sm:inline">Add Product</span>
            </Link>
            
            <Link to="/cart" className="text-gray-600 hover:text-indigo-600 flex items-center gap-1 transition-colors relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
