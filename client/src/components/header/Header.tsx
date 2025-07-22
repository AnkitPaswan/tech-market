import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Home,
  Headphones,
  Watch,
  Laptop,
  Camera,
  Home as HomeIcon,
  Radio,
  Gamepad,
  Phone,
  Info,
} from "lucide-react";
import { Link } from "../../utils/Link";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/useAuth";
import Searchbar from "../../utils/Searchbar";

const Header = () => {
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userData = user ? JSON.parse(user) : null;  

  const { totalItems, toggleCart } = useCart();
  const { isLoggedIn, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  //search api
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    { id: string; _id: string; title: string }[]
  >([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/products/search?q=${query}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [query]);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const categories = [
    { name: "Audio", icon: <Headphones size={18} /> },
    { name: "Wearables", icon: <Watch size={18} /> },
    { name: "Computers", icon: <Laptop size={18} /> },
    { name: "Cameras", icon: <Camera size={18} /> },
    { name: "Smart Home", icon: <HomeIcon size={18} /> },
    { name: "Speakers", icon: <Radio size={18} /> },
    { name: "Gaming", icon: <Gamepad size={18} /> },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        bg-white shadow-md py-2"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">
                TechMarket
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Products
            </Link>
            <div className="group relative">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
                Categories
              </button>
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md p-4 w-56 hidden group-hover:block">
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={`/category/${category.name
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-2 rounded-md transition-colors"
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/wishlist"
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>

            <div className="group relative">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
                <User size={20} />
              </button>
              <div className="absolute top-full mt-1 bg-white shadow-lg rounded-md p-2 w-32 hidden group-hover:block">
                <div className="grid grid-cols-1 gap-1">
                  {isLoggedIn ? (
                    <button
                      onClick={() => {
                        logout();
                        // Optionally redirect to home or login page here
                      }}
                      className="p-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer text-left"
                      aria-label="Logout"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
                      aria-label="Account"
                    >
                      Login
                      {/* <User size={20} /> */}
                    </Link>
                  )}

                  <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer text-left">
                    <Link to="/profile" className="flex items-center space-x-2">
                      Profile
                    </Link>
                  </button>
                  {userData !== null && userData.isAdmin && (
                    <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer text-left">
                      <Link
                        to="/addProduct"
                        className="flex items-center space-x-2"
                      >
                        Add Product
                      </Link>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={toggleCart}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <Searchbar
            query={query}
            setQuery={setQuery}
            results={results}
            setResults={setResults}
            toggleSearch={toggleSearch}
            searchOpen={false}
          />
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-md shadow-lg p-4">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link
                to="/products"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingBag size={18} />
                <span>All Products</span>
              </Link>
              <Link
                to="/about"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Info size={18} />
                <span>About</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone size={18} />
                <span>Contact Us</span>
              </Link>

              <div className="border-t border-gray-200 pt-2">
                <p className="text-sm font-medium text-gray-500 mb-2 px-2">
                  Categories
                </p>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/category/${category.name
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-2 rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
