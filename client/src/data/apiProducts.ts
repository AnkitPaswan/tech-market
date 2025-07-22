import type { Product } from '../types';

const API_URL = 'http://localhost:8000/api/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data;
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  const response = await fetch(`${API_URL}/find/${id}`);
  if (!response.ok) {
    return undefined;
  }
  const data = await response.json();
  return data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const products = await fetchProducts();
  const categories = [...new Set(products.map(product => String(product.categories)))];
  return categories;
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  const products = await fetchProducts();
  return products.filter(product => product.featured);
};

export const fetchRelatedProducts = async (product: Product, limit: number = 4): Promise<Product[]> => {
  const products = await fetchProducts();
  return products
    .filter(p => p.categories === product.categories && p._id !== product._id)
    .slice(0, limit);
};

export const fetchSearchResults = async (query: string): Promise<Product[]> => {
  if (!query) {
    return [];
  }
  const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }
  const data = await response.json();
  return data;
};
