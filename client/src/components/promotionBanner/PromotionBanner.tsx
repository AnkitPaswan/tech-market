const PromotionBanner = () => {
  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-300">
              Get the latest updates, deals and exclusive offers directly to
              your inbox.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <form className="flex flex-col md:flex-row items-center justify-between">
              <input
                type="email"
                placeholder="Enter your email address"
                // className ="flex-1 px-4 py-3 rounded-l-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                className="w-full md:w -1/2 p-2 px-4 py-3 mb-4 md:mb-0 bg-white text-gray-900 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-md sm:rounded-r-md sm:rounded-l-none transition-colors  text-white py-2 px-4 rounded-lg cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;
