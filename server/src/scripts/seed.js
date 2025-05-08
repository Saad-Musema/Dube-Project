const mongoose = require('mongoose');
const Category = require('../model/catagory.mongo');
const Product = require('../model/product.mongo');

const categories = [
  {
    name: 'Organic Food',
    description: 'Fresh, organic, and locally sourced food products',
    image: '/categories/organic-food.jpg',
    slug: 'organic-food',
    isFeatured: true
  },
  {
    name: 'Eco-Friendly Home',
    description: 'Sustainable home and living products',
    image: '/categories/eco-home.jpg',
    slug: 'eco-friendly-home',
    isFeatured: true
  },
  {
    name: 'Natural Beauty',
    description: 'Organic and natural beauty products',
    image: '/categories/natural-beauty.jpg',
    slug: 'natural-beauty',
    isFeatured: true
  }
];

const products = [
  {
    name: 'Organic Quinoa',
    description: 'High-quality organic quinoa, perfect for healthy meals',
    price: 8.99,
    image: '/products/quinoa.jpg',
    stock: 100,
    isFeatured: true
  },
  {
    name: 'Bamboo Toothbrush',
    description: 'Eco-friendly bamboo toothbrush with charcoal bristles',
    price: 4.99,
    image: '/products/bamboo-toothbrush.jpg',
    stock: 200,
    isFeatured: true
  },
  {
    name: 'Organic Coconut Oil',
    description: 'Cold-pressed organic coconut oil for cooking and beauty',
    price: 12.99,
    image: '/products/coconut-oil.jpg',
    stock: 150,
    isFeatured: true
  }
];

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://admin:admin@dube-commerce-cluster.nixlpsb.mongodb.net/?appName=Dube-Commerce-Cluster');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);

    // Insert products with category references
    const productsWithCategories = products.map((product, index) => ({
      ...product,
      category: insertedCategories[index % insertedCategories.length]._id
    }));

    await Product.insertMany(productsWithCategories);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 