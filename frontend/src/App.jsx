import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AdminForm from './pages/AdminForm';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminForm />} />
              <Route path="/admin/:id" element={<AdminForm />} />
            </Routes>
          </main>
          <footer className="bg-white shadow-inner py-6 text-center text-gray-500">
            &copy; {new Date().getFullYear()} CRUD Shop. All rights reserved.
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
