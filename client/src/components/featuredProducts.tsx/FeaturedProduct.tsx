import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchFeaturedProducts } from '../../data/apiProducts';
import type { Product } from '../../types';
import ProductGrid from '../product/ProductGrid';
import { Link } from '../../utils/Link';

const FeaturedProduct = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetchFeaturedProducts().then((products) => setFeaturedProducts(products));
      }, []);

  return (
    <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
        <Link 
          to="/products" 
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          <span>View all</span>
          <ArrowRight size={18} className="ml-1" />
        </Link>
      </div>
      
      <ProductGrid products={featuredProducts} />
    </div>
  </section>
  )
}

export default FeaturedProduct
