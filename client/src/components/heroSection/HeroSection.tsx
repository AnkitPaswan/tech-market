import { Button } from "../../utils/Buttons"
import { ShoppingBag } from 'lucide-react';
import { Link } from "../../utils/Link";
const HeroSection = () => {
  return (
    <div className="flex flex-col min-h-screen">
       {/* Hero Section */}
       <section className="relative bg-gradient-to-r from-blue-500 to-indigo-700 text-white py-24 md:py-40">
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Technology that elevates your experience
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Discover the latest gadgets and technologies from brands you trust, at prices you'll love.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/products">
                <Button 
                  size="lg" 
                  variant="primary" 
                  className="bg-blue-700 text-blue-700 cursor-pointer hover:bg-blue-800"
                  icon={<ShoppingBag size={20} />}
                >
                  Shop Now
                </Button>
              </Link>
              <Link to="/deals">
                <Button 
                  size="lg" 
                  // variant="outline" 
                  className=" bg-transparent border text-white hover:bg-blue hover:border-none cursor-pointer"
                >
                  View Deals
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Latest technology" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="font-bold text-xl mb-1">New Arrivals</div>
                <div className="text-blue-100">Check out our latest products</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="hidden md:block absolute top-0 right-18 w-1/3 h-full bg-blue-900 opacity-20 transform skew-x-12"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-1/4 h-1/2 bg-indigo-700 opacity-20 transform -skew-x-12"></div>
      </section>
    </div>
  )
}

export default HeroSection
