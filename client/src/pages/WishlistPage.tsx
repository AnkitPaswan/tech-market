import { ShoppingBag, Heart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { fetchProductById } from '../data/apiProducts';
import type { Product } from '../types';
import React from 'react';
import { Button } from '../utils/Buttons';
import { Link } from '../utils/Link';

export function WishlistPage() {
  const { state, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  
  const [wishlistProducts, setWishlistProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchWishlistProducts = async () => {
      const products = await Promise.all(
        state.items.map(item => fetchProductById(item.productId))
      );
      setWishlistProducts(products.filter((product): product is Product => !!product));
    };

    fetchWishlistProducts();
  }, [state.items]);
  
  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };
  
  const handleAddToCart = async (productId: string) => {
    const product = await fetchProductById(productId);
    if (product) {
      addItem(product, 1);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="flex items-center mb-8">
        <Heart className="h-6 w-6 text-red-500 mr-2" />
        <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
      </div>
      
      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">
            Items added to your wishlist will be saved here for you to revisit anytime.
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              Explore Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wishlistProducts.map(product => product && (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-16 w-16 flex-shrink-0">
                        <img 
                          src={product.img} 
                          alt={product.title} 
                          className="h-16 w-16 object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4">
                        <Link 
                          to={`/product/${product._id}`}
                          className="text-sm font-medium text-gray-900 hover:text-blue-600"
                        >
                          {product.title}
                        </Link>
                        <div className="text-sm text-gray-500 capitalize">
                          {product.categories}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => handleRemoveFromWishlist(product._id)}
                        className="border-gray-300 text-gray-700 hover:text-red-600 hover:border-red-600"
                      >
                        Remove
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        icon={<ShoppingBag size={16} />}
                        onClick={() => handleAddToCart(product._id)}
                        disabled={!product.inStock}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}