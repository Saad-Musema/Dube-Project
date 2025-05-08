const express = require('express');
const Catagory = require('../model/catagory.mongo');

const catagoryRouter = express.Router();

// Get all categories or featured categories
catagoryRouter.get('/', async (req, res) => {
  try {
    const query = req.query.featured === 'true' ? { isFeatured: true } : {};
    const categories = await Catagory.find(query);
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get category by slug
catagoryRouter.get('/:slug', async (req, res) => {
  try {
    const category = await Catagory.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// Create new category
catagoryRouter.post('/', async (req, res) => {
  try {
    const category = new Catagory(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({ error: 'Failed to create category' });
  }
});

module.exports = catagoryRouter;