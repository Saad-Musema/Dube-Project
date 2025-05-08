const API_BASE_URL = 'http://localhost:9000';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  isFeatured: boolean;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  isFeatured: boolean;
}

export async function fetchProducts(featured = false) {
  try {
    const response = await fetch(`${API_BASE_URL}/products${featured ? '?featured=true' : ''}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchFeaturedProducts(featured= true){
    try{
        const response = await fetch(`${API_BASE_URL}/products${featured ? '?featured=true' : ''}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return await response.json();
    }catch(error){
        console.error('Error fetching featured products:', error);
        throw error;
    }
}

export async function fetchCategories(featured = false) {
  try {
    const response = await fetch(`${API_BASE_URL}/category${featured ? '?featured=true' : ''}`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function fetchFeaturedCategories(featured = true) {
    try {
      const response = await fetch(`${API_BASE_URL}/category${featured ? '?featured=true' : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

export async function fetchProductById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function fetchCategoryBySlug(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/category/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
}