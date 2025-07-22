import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories, fetchSearchResults } from '../data/apiProducts';
import { Filter } from 'lucide-react';
import type { Product } from '../types';
import { Button } from '../utils/Buttons';
import ProductGrid from '../components/product/ProductGrid';

const ProductsPage =()=> {
  const [filters, setFilters] = useState({
    category: window.location.pathname.startsWith('/category/') 
      ? window.location.pathname.split('/').pop() || ''
      : '',
    minPrice: '',
    maxPrice: '',
    onlyInStock: false
  });
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFilters({
      ...filters,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Update category filter when URL changes
    const handleLocationChange = () => {
      if (window.location.pathname.startsWith('/category/')) {
        const category = window.location.pathname.split('/').pop() || '';
        setFilters(prev => ({ ...prev, category }));
      }
    };

    window.addEventListener('navigation', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('navigation', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  
  useEffect(() => {
    // Fetch products and categories on mount
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        const cats = await fetchCategories();
        setAllProducts(products);
        setCategories(cats);
        setVisibleProducts(products);
      } catch (error) {
        console.error('Failed to fetch products or categories', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSearch = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }
      try {
        const results = await fetchSearchResults(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Failed to fetch search results', error);
      }
    };
    fetchSearch();
  }, [searchQuery]);

  const applyFilters = () => {
    let filtered = searchQuery.trim() !== '' ? [...searchResults] : [...allProducts];
    
    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(p => p.categories.includes(filters.category));
    }
    
    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(filters.maxPrice));
    }
    
    // Filter by stock
    if (filters.onlyInStock) {
      filtered = filtered.filter(p => p.inStock);
    }
    
    setVisibleProducts(filtered);
  };
  
  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      onlyInStock: false
    });
    setVisibleProducts(allProducts);
    setSearchQuery('');
    setSearchResults([]);
  };
  
  useEffect(() => {
    applyFilters();
  }, [filters, allProducts, searchResults]);
  
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          {filters.category 
            ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Products`
            : 'All Products'
          }
        </h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-xs mb-4 md:mb-0 md:mr-4"
        />
        <Button 
          variant="outline" 
          size="sm" 
          icon={<Filter size={16} />}
          onClick={toggleFilters}
          className="md:hidden"
        >
          {filtersOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-medium text-lg mb-4">Filters</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Availability</h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="onlyInStock"
                    checked={filters.onlyInStock}
                    onChange={handleFilterChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">In Stock Only</span>
                </label>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={clearFilters}
                  className="mb-2"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Filters */}
        {filtersOpen && (
          <div className="md:hidden mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-medium text-lg mb-4">Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Availability</h3>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="onlyInStock"
                      checked={filters.onlyInStock}
                      onChange={handleFilterChange}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">In Stock Only</span>
                  </label>
                </div>
                
                <div className="pt-4 flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="flex-1"
                  >
                    Clear
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={toggleFilters}
                    className="flex-1"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid products={visibleProducts} />
        </div>
      </div>
    </div>
  );
}


export default ProductsPage;