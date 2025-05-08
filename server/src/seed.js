const mongoose = require('mongoose');
const Category = require('./model/catagory.mongo');
const Product = require('./model/product.mongo');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Sample categories
const categories = [
  {
    name: 'Electronics',
    description: 'Latest electronic gadgets and devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
    slug: 'electronics',
    isFeatured: true
  },
  {
    name: 'Furniture',
    description: 'Modern and classic furniture pieces',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    slug: 'furniture',
    isFeatured: true
  },
  {
    name: 'Clothing',
    description: 'Trendy and comfortable clothing items',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    slug: 'clothing',
    isFeatured: false
  },
  {
    name: 'Home Decor',
    description: 'Beautiful home decoration items',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
    slug: 'home-decor',
    isFeatured: true
  }
];

// Sample products
const products = [
  // Electronics
  {
    name: 'Smartphone X',
    description: 'Latest smartphone with advanced features',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    stock: 50,
    isFeatured: true
  },
  {
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 1499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    stock: 30,
    isFeatured: true
  },
  // Furniture
  {
    name: 'Modern Sofa',
    description: 'Comfortable 3-seater sofa',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    stock: 15,
    isFeatured: true
  },
  {
    name: 'Dining Table',
    description: 'Elegant wooden dining table',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7',
    stock: 20,
    isFeatured: false
  },
  // Clothing
  {
    name: 'Summer Dress',
    description: 'Light and comfortable summer dress',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1',
    stock: 100,
    isFeatured: true
  },
  {
    name: 'Denim Jacket',
    description: 'Classic denim jacket',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531',
    stock: 75,
    isFeatured: false
  },
  // Home Decor
  {
    name: 'Wall Clock',
    description: 'Modern wall clock with minimalist design',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad',
    stock: 40,
    isFeatured: true
  },
  {
    name: 'Table Lamp',
    description: 'Elegant table lamp for your desk',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
    stock: 60,
    isFeatured: false
  }
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories created');

    // Create products with category references
    const productsWithCategories = products.map((product, index) => ({
      ...product,
      category: createdCategories[Math.floor(index / 2)]._id // Distribute products among categories
    }));

    await Product.insertMany(productsWithCategories);
    console.log('Products created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 