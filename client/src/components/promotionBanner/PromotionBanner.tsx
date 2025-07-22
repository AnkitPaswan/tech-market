
const PromotionBanner = () => {
  return (

      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Subscribe to Our Newsletter</h2>
              <p className="text-gray-300">Get the latest updates, deals and exclusive offers directly to your inbox.</p>
            </div>
            <div className="w-full md:w-1/3">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-l-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-r-md transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}

export default PromotionBanner
