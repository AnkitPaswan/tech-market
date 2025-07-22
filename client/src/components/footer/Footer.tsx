
import { Facebook, Twitter, Instagram, Youtube as YouTube, Mail, Phone, MapPin, CreditCard, Truck, ShieldCheck, HelpCircle } from 'lucide-react';
import { Link } from '../../utils/Link';
import { useCart } from '../../context/CartContext';
export function Footer() {
  const year = new Date().getFullYear();
    const { toggleCart } = useCart();
  

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/deals" className="text-gray-300 hover:text-white transition-colors">Deals</Link></li>
              <li><Link to="/category/audio" className="text-gray-300 hover:text-white transition-colors">Audio</Link></li>
              <li><Link to="/category/wearables" className="text-gray-300 hover:text-white transition-colors">Wearables</Link></li>
              <li><Link to="/category/computers" className="text-gray-300 hover:text-white transition-colors">Computers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li><Link to="/account" className="text-gray-300 hover:text-white transition-colors">My Account</Link></li>
              <li><button onClick={toggleCart} className="text-gray-300 hover:text-white transition-colors cursor-pointer">Carts</button></li>
              <li><Link to="/wishlist" className="text-gray-300 hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-blue-400" />
                <span className="text-gray-300">123 Tech Street, Digital City</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400" />
                <a href="mailto:info@techmarket.com" className="text-gray-300 hover:text-white transition-colors">info@techmarket.com</a>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-md font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                  <YouTube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <CreditCard size={24} className="text-blue-400" />
              <div>
                <h4 className="font-medium">Secure Payment</h4>
                <p className="text-xs text-gray-400">All major cards accepted</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Truck size={24} className="text-blue-400" />
              <div>
                <h4 className="font-medium">Fast Shipping</h4>
                <p className="text-xs text-gray-400">2-3 business days</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <ShieldCheck size={24} className="text-blue-400" />
              <div>
                <h4 className="font-medium">Warranty</h4>
                <p className="text-xs text-gray-400">1-year minimum warranty</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <HelpCircle size={24} className="text-blue-400" />
              <div>
                <h4 className="font-medium">24/7 Support</h4>
                <p className="text-xs text-gray-400">Always here to help</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-6 text-center text-gray-400 text-sm">
          <p>© {year} TechMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}