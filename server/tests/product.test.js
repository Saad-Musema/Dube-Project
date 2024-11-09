const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('Product API', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should get all products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a product by type', async () => {
    const res = await request(app).get('/products/electronics');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should return 404 for a non-existent product type', async () => {
    const res = await request(app).get('/products/nonexistent');
    expect(res.statusCode).toEqual(404);
  });
});