import { useState } from "react";

const AddProductPage = () => {
  // Retrieve user data from localStorage
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userData = user ? JSON.parse(user) : null;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [rating, setRating] = useState("");
  const [featured, setFeatured] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  //create post request to add product on localhost:8000/api/products
  const addProduct = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await fetch(
        "https://tech-market-uuch.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            desc: desc,
            img: img,
            price: Number(price),
            categories: categories,
            rating: Number(rating),
            featured: featured,
            inStock: true, // Assuming inStock is always true for new products
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      console.log("Product added:", data);
      setSuccessMessage("Product added successfully!");
      // Clear form fields
      setTitle("");
      setDesc("");
      setImg("");
      setPrice("");
      setCategories([]);
      setRating("");
      setFeatured(false);
    } catch {
      setErrorMessage("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {userData && (
        <div className="bg-green-100 text-green-800 p-4 rounded mt-14">
          <p>Welcome, {userData.username}!</p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center bg-gray-100 space-y-6 p-8">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        <form
          onSubmit={addProduct}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          {/* Form fields for adding a product */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setCategories([e.target.value])}
              value={categories[0] || ""}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="audio">Audio</option>
              <option value="gaming">Gaming</option>
              <option value="wearable">Wearable</option>
              <option value="speakers">Speakers</option>
              <option value="computers">Computers</option>
              <option value="cameras">Cameras</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured
            </label>
            <input
              type="checkbox"
              className="mr-2"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <span className="text-sm text-gray-600">Check if featured</span>
          </div>
          {successMessage && (
            <p className="text-green-600 mb-4">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProductPage;
