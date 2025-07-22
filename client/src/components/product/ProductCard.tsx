
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';
import { Button } from '../../utils/Buttons';
import { Badge } from '../../utils/Badge';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Link } from '../../utils/Link';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

const ProductCard =({ product, layout = 'grid' }: ProductCardProps)=> {
  const { addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product._id);
  
  const handleAddToCart = () => {
    addItem(product, 1);
  };
  
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  if (layout === 'list') {
    return (
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative md:w-1/3">
          <Link to={`/product/${product._id}`}>
            <img 
              src={product.img} 
              alt={product.title} 
              className="w-full h-60 md:h-full object-cover"
            />
          </Link>
          {product.featured && (
            <div className="absolute top-2 left-2">
              <Badge variant="primary">Featured</Badge>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute top-2 right-2">
              <Badge variant="danger">Out of Stock</Badge>
            </div>
          )}
        </div>
        
        <div className="p-6 md:w-2/3 flex flex-col">
          <div className="flex-1">
            <Link to={`/product/${product._id}`}>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
                {product.title}
              </h3>
            </Link>
            
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    className="w-4 h-4" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-sm">{product.rating.toFixed(1)}</span>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-3">{product.desc}</p>
            
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="primary" 
            //   onClick={handleAddToCart}
              icon={<ShoppingBag size={16} />}
              disabled={!product.inStock}
            >
              Add to Cart
            </Button>
            
            <Button
              variant="outline"
              onClick={handleWishlistToggle}
              aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Grid layout (default)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.img} 
            alt={product.title} 
            className="w-full h-56 object-cover"
          />
        </Link>
        
        {product.featured && (
          <div className="absolute top-2 left-2">
            <Badge variant="primary">Featured</Badge>
          </div>
        )}
        
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
          <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"} />
        </button>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-medium mb-1 text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                className="w-3 h-3" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            ))}
          </div>
          <span className="text-gray-600 text-xs">{product.rating.toFixed(1)}</span>
        </div>
        
        <div className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.desc}
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {!product.inStock && (
              <Badge variant="danger">Out of Stock</Badge>
            )}
          </div>
          
          <Button className="cursor-pointer"
            variant="primary" 
            fullWidth 
            onClick={handleAddToCart} 
            disabled={!product.inStock}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;