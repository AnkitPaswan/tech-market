import { Button } from '../../utils/Buttons';
import { ShoppingBag, X, Minus, Plus, Trash2,ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from '../../utils/Link';
import { useAuth } from '../../context/useAuth';
const CartDrawer = () => {
    const { state, removeItem, updateQuantity, toggleCart, totalItems, subtotal } = useCart();
    const { isLoggedIn } = useAuth();
    //stripe pubkishable key = pk_test_51RnFIBSGauB7dz30t5rsuc7GHxQghhLlCZVKn4BAkntPT9rrtyqYInMzIf9y4hc133UTbHA6GqsYuMoqkcDdl9cq00vIprw91s

    if (!state.isOpen) return null;

    if (!isLoggedIn) {
      return (
        <>
          <div 
            className="fixed inset-0 bg-opacity-50 z-50"
            onClick={toggleCart}
          />
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">Your Cart</h2>
              </div>
              <button
                onClick={toggleCart}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 flex flex-col items-center justify-center">
              <p className="text-gray-500 text-center mt-10">
                Please <Link to="/login" className="text-blue-600 underline">login</Link> first to view your cart items.
              </p>
            </div>
          </div>
        </>
      );
    }
    
    const handleIncreaseQuantity = (productId: string, currentQuantity: number) => {
      updateQuantity(productId, currentQuantity + 1);
    };
    
    const handleDecreaseQuantity = (productId: string, currentQuantity: number) => {
      if (currentQuantity > 1) {
        updateQuantity(productId, currentQuantity - 1);
      } else {
        removeItem(productId);
      }
    };
    
    const handleRemoveItem = (productId: string) => {
      removeItem(productId);
    };
    
    return (
      <>
        <div 
          className="fixed inset-0 bg-opacity-50 z-50"
          onClick={toggleCart}
        />
        <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold">Your Cart ({totalItems})</h2>
            </div>
            <button
              onClick={toggleCart}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
                <Button 
                  variant="primary" 
                  icon={<ArrowRight size={16} />} 
                  iconPosition="right"
                  onClick={toggleCart}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="py-6 space-y-4">
                {state.items.map((item: any) => (
                  <div 
                    key={item.product._id as string} 
                    className="flex items-start py-4 border-b border-gray-100"
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.product.img as string}
                        alt={item.product.title as string}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            <Link to={`/product/${item.product._id as string}`} onClick={toggleCart}>
                              {item.product.title as string}
                            </Link>
                          </h3>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            ${(item.product.price as number * item.quantity as number).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                          {item.product.categories as string}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => handleDecreaseQuantity(item.product._id as string, item.quantity as number)}
                            className="p-1 text-gray-600 hover:text-blue-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 text-gray-900 text-sm">
                            {item.quantity as number}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.product._id as string, item.quantity as number)}
                            className="p-1 text-gray-600 hover:text-blue-600"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.product._id as string)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between text-sm">
                <p className="text-gray-500">Subtotal</p>
                <p className="font-medium text-gray-900">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-gray-500">Shipping</p>
                <p className="font-medium text-gray-900">Calculated at checkout</p>
              </div>
              <div className="flex justify-between text-base">
                <p className="font-medium text-gray-900">Total</p>
                <p className="font-bold text-gray-900">${subtotal.toFixed(2)}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={toggleCart}
                >
                  Continue Shopping
                </Button>
                <Link to={'/checkout'} onClick={toggleCart}>
                  <Button variant="primary" fullWidth>
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </>
    );
}

export default CartDrawer
