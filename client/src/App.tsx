import { useEffect, useState } from "react";
import { Footer } from "./components/footer/Footer";
import Header from "./components/header/Header";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import HomePage from "./pages/HomePage";
import CartDrawer from "./components/cart/CartDrawer";
import { WishlistPage } from "./pages/WishlistPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import CheckoutPage from "./pages/CheckoutPage";
import AddProductPage from "./pages/AddProductPage";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  useEffect(() => {
    const handleLocationChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.path) {
        setCurrentPath(customEvent.detail.path);
      } else {
        setCurrentPath(window.location.pathname);
      }
    };

    // Listen for both popstate and custom navigation events
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('navigation', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigation', handleLocationChange);
    };
  }, []);
  
  const renderContent = () => {
    // Extract product ID from URL for product detail page
    if (currentPath.startsWith('/product/')) {
      const productId = currentPath.split('/').pop();
      return <ProductDetailPage productId={productId} />;
    }
    
    // Match routes to components
      switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/products':
        return <ProductsPage />;
      case '/wishlist':
        return <WishlistPage />;
        case '/register':
        return <RegisterPage />;
        case '/login':
        return <LoginPage />;
        case '/profile':
        return <ProfilePage />;
        case '/contact':
        return <ContactPage />;
        case '/about':
        return <AboutPage />;
        case '/successpage':
        return <SuccessPage />;
        case '/cancelpage':
        return <CancelPage />;
        case '/addProduct':
        return <AddProductPage />;
        case '/checkout':
        return <CheckoutPage />;
      default:
        if (currentPath.startsWith('/category/')) {
          return <ProductsPage />;
        }
        return <HomePage />;
    }
  };
  


  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow">
              {renderContent()}
            </main>
            <Footer />
            <CartDrawer />
          </div>
        </WishlistProvider>
      </CartProvider>
      <ToastContainer />
    </AuthProvider>
    
  );
}

export default App;
