const express = require('express');
const Product = require('../model/product.mongo');
const Category = require('../model/catagory.mongo');
const productRouter = express.Router();

// GET /products?featured=true&page=1&limit=10
productRouter.get('/', async (req, res) => {
  try {
    const { featured, page = 1, limit = 10 } = req.query;
    const query = featured === 'true' ? { isFeatured: true } : {};

    const products = await Product.find(query)
      .populate('category', 'name') // only get category name
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET products by category
productRouter.get('/category/:categoryId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const products = await Product.find({ category: req.params.categoryId })
      .populate('category', 'name')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET product by ID
productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .lean();

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST create product
productRouter.post('/', async (req, res) => {
  try {
    const { type, ...rest } = req.body;

    if (!type) {
      return res.status(400).json({ error: 'Product type (category name) is required.' });
    }

    const category = await Category.findOne({ name: type });
    if (!category) {
      return res.status(400).json({ error: 'Category not found!' });
    }

    const newProduct = new Product({
      ...rest,
      category: category._id
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: 'Failed to create product' });
  }
});


module.exports = productRouter;
