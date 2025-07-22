import React, { useState } from "react";
import {
  ShoppingBag,
  Heart,
  Share2,
  ChevronRight,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { fetchProductById, fetchRelatedProducts } from "../data/apiProducts";
import type { Product } from "../types";
import { Button } from "../utils/Buttons";
import { Badge } from "../utils/Badge";
import ProductGrid from "../components/product/ProductGrid";
import { Link } from "../utils/Link";
import LoadingPage from "./LoadingPage";

interface ProductDetailPageProps {
  productId?: string;
}

const ProductDetailPage = ({ productId = "1" }: ProductDetailPageProps) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(0);

  const { addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  React.useEffect(() => {
    const fetchProductData = async () => {
      const fetchedProduct = await fetchProductById(productId);
      setProduct(fetchedProduct);

      if (fetchedProduct) {
        const fetchedRelatedProducts = await fetchRelatedProducts(
          fetchedProduct
        );
        setRelatedProducts(fetchedRelatedProducts);
      }
    };

    fetchProductData();
  }, [productId]);

  if (!product) {
    return <LoadingPage />;
  }

  const isProductInWishlist = isInWishlist(product._id);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleWishlistToggle = () => {
    if (isProductInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  // Mock image gallery (in a real app, product would have multiple images)
  const images = [
    product.img,
    "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <Link to="/products" className="text-gray-500 hover:text-gray-700">
          Products
        </Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <Link
          to={`/category/${
            Array.isArray(product.categories)
              ? product.categories.join("-").toLowerCase()
              : product.categories
          }`}
          className="text-gray-500 hover:text-gray-700"
        >
          {Array.isArray(product.categories)
            ? product.categories
                .map(
                  (cat: string) => cat.charAt(0).toUpperCase() + cat.slice(1)
                )
                .join(", ")
            : product.categories}
        </Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">{product.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden mb-4">
            <img
              src={images[activeImage]}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`rounded-md overflow-hidden border-2 ${
                  activeImage === index
                    ? "border-blue-500"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="mb-2">
            {product.featured && (
              <Badge variant="primary" className="mb-2">
                Featured
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="danger" className="mb-2 ml-2">
                Out of Stock
              </Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={
                    i < Math.floor(product.rating) ? "currentColor" : "none"
                  }
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating.toFixed(1)} rating
            </span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.price > 100 && (
              <span className="text-sm text-gray-500 ml-2">
                or ${(product.price / 4).toFixed(2)}/month with 0% APR
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product.desc}</p>

          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Check size={18} className="text-green-500 mr-2" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Check size={18} className="text-green-500 mr-2" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Check size={18} className="text-green-500 mr-2" />
              <span>1-year manufacturer warranty</span>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="border border-gray-300 rounded-l-md px-3 py-2 text-gray-600 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="border-t border-b border-gray-300 px-3 py-2 w-16 text-center focus:outline-none focus:ring-0"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border border-gray-300 rounded-r-md px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={<ShoppingBag size={20} />}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>

              <Button
                variant={isProductInWishlist ? "primary" : "outline"}
                size="lg"
                onClick={handleWishlistToggle}
                className={
                  isProductInWishlist ? "bg-red-600 hover:bg-red-700" : ""
                }
                icon={
                  <Heart
                    size={20}
                    className={isProductInWishlist ? "fill-white" : ""}
                  />
                }
              >
                {isProductInWishlist ? "Wishlisted" : "Add to Wishlist"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
              <Truck size={24} className="text-blue-600 mb-2" />
              <span className="text-sm font-medium">Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
              <RotateCcw size={24} className="text-blue-600 mb-2" />
              <span className="text-sm font-medium">Easy Returns</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
              <ShieldCheck size={24} className="text-blue-600 mb-2" />
              <span className="text-sm font-medium">Warranty</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">Share:</span>
              <button
                className="ml-2 text-gray-400 hover:text-blue-600"
                aria-label="Share on Facebook"
              >
                <Share2 size={18} />
              </button>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Category:</span>
              <Link
                to={`/category/${
                  Array.isArray(product.categories)
                    ? product.categories.join("-").toLowerCase()
                    : product.categories
                }`}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {Array.isArray(product.categories)
                  ? product.categories
                      .map(
                        (cat: string) =>
                          cat.charAt(0).toUpperCase() + cat.slice(1)
                      )
                      .join(", ")
                  : product.categories}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === "description"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === "specifications"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === "reviews"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Reviews
            </button>
          </nav>
        </div>

        <div className="py-6">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p>{product.desc}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <h3>Key Features</h3>
              <ul>
                <li>High-quality materials and craftsmanship</li>
                <li>Advanced technology for superior performance</li>
                <li>Energy-efficient and environmentally friendly</li>
                <li>Intuitive controls and user-friendly interface</li>
                <li>Compatible with all major systems and platforms</li>
              </ul>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="bg-white rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                      Brand
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      TechMarket
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Model
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      TM-{product._id}00
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Dimensions
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      10.2 x 7.5 x 3.1 inches
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Weight
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      1.2 pounds
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Color
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Black / White / Silver
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Warranty
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      1 Year Limited Warranty
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button variant="outline" size="sm">
                  Write a Review
                </Button>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-medium">
                        Amazing product, exceeded expectations!
                      </h4>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          June 12, 2023
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      John D.
                    </span>
                  </div>
                  <p className="text-gray-600">
                    I've been using this for a month now and I'm extremely
                    satisfied with the quality and performance. The battery life
                    is impressive and the design is sleek. Would definitely
                    recommend!
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-medium">Great value for the price</h4>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400 mr-2">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                          ))}
                          <Star size={16} />
                        </div>
                        <span className="text-sm text-gray-500">
                          May 28, 2023
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Sarah M.
                    </span>
                  </div>
                  <p className="text-gray-600">
                    This product offers excellent features at a competitive
                    price point. The only minor issue I've had is with the setup
                    process, which was a bit complicated. Otherwise, very happy
                    with my purchase.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Products
          </h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
