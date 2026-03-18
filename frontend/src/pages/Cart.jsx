import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalCartPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Browse our products and find something you love!</p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all gap-2"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Shopping Cart</h1>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 group transition-colors">
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" /> 
          Continue Shopping
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-8">
        <ul className="divide-y divide-gray-100">
          {cart.map((item) => (
            <li key={item._id} className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50 transition-colors">
              <Link to={`/product/${item._id}`} className="shrink-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl border border-gray-100 shadow-sm"
                />
              </Link>
              
              <div className="flex-grow flex flex-col justify-between self-stretch">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                      <Link to={`/product/${item._id}`} className="hover:text-indigo-600 transition-colors">{item.name}</Link>
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{item.category}</p>
                  </div>
                  <p className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg bg-gray-50">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent rounded-l-md transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-r-md transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm font-semibold"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="bg-gray-50 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 border-t border-gray-200">
          <button 
            onClick={clearCart}
            className="text-gray-500 hover:text-red-600 text-sm font-semibold transition-colors underline decoration-dotted underline-offset-4"
          >
            Empty Cart
          </button>
          
          <div className="text-right w-full sm:w-auto">
            <p className="text-gray-500 mb-1">Subtotal</p>
            <p className="text-4xl font-extrabold text-gray-900 mb-6">${totalCartPrice.toFixed(2)}</p>
            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all cursor-not-allowed opacity-80" onClick={() => alert("Checkout flow is not implemented in this baseline.")}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
