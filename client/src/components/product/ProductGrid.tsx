import React from 'react';
import { LayoutGrid, AlignLeft, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../../utils/Buttons';
import type { Product, SortOption, ViewMode } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid');
  const [sortBy, setSortBy] = React.useState<SortOption>('price-low');
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };
  
  const sortProducts = (products: Product[]): Product[] => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  };
  
  const sortedProducts = sortProducts(products);
  
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md mr-2 cursor-pointer ${
              viewMode === 'grid' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid size={20} />
          </button>
          
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md cursor-pointer ${
              viewMode === 'list' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="List view"
          >
            <AlignLeft size={20} />
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFilters}
            icon={<SlidersHorizontal size={16} />}
            className="sm:mb-0"
          >
            Filters
          </Button>
          
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {filtersOpen && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filters</h3>
            <button 
              onClick={toggleFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Price Range</h4>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm"
                />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Rating</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">
                      {rating}+ Stars
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Availability</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">In Stock</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Out of Stock</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button size="sm" variant="outline" className="mr-2">
              Reset
            </Button>
            <Button size="sm" variant="primary">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} layout="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} layout="list" />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGrid;