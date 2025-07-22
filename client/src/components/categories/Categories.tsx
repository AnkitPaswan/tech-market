import { ArrowRight } from "lucide-react";
import { Link } from "../../utils/Link";

const Categories = () => {
  return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer">
              <img 
                src="https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Audio" 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-semibold text-xl mb-1">Audio</h3>
                  <p className="text-sm text-gray-200 mb-2">Headphones, Speakers & more</p>
                  <Link 
                    to="/category/audio" 
                    className="inline-flex items-center text-sm text-blue-300 hover:text-blue-100"
                  >
                    <span>Shop now</span>
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer">
              <img 
                src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Wearables" 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-semibold text-xl mb-1">Wearables</h3>
                  <p className="text-sm text-gray-200 mb-2">Smartwatches & Fitness Trackers</p>
                  <Link 
                    to="/category/wearables" 
                    className="inline-flex items-center text-sm text-blue-300 hover:text-blue-100"
                  >
                    <span>Shop now</span>
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer">
              <img 
                src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Computers" 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-semibold text-xl mb-1">Computers</h3>
                  <p className="text-sm text-gray-200 mb-2">Laptops, Tablets & Accessories</p>
                  <Link 
                    to="/category/computers" 
                    className="inline-flex items-center text-sm text-blue-300 hover:text-blue-100"
                  >
                    <span>Shop now</span>
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer">
              <img 
                src="https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Gaming" 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-semibold text-xl mb-1">Gaming</h3>
                  <p className="text-sm text-gray-200 mb-2">Consoles, Controllers & Games</p>
                  <Link 
                    to="/category/gaming" 
                    className="inline-flex items-center text-sm text-blue-300 hover:text-blue-100"
                  >
                    <span>Shop now</span>
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
  )
}

export default Categories
