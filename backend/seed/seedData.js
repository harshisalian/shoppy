const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Product = require('../models/productModel');

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation.',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
  },
  {
    name: 'Mechanical Keyboard',
    price: 149.99,
    description: 'RGB mechanical keyboard with cherry MX switches.',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80'
  },
  {
    name: 'Coffee Mug',
    price: 14.99,
    description: 'Ceramic coffee mug, microwave safe.',
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80'
  }
];

const importData = async () => {
  try {
    await connectDB();
    
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
