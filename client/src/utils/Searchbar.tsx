import { Link } from "./Link";
import { X } from "lucide-react";

type Props = {
  searchOpen: boolean;
  query: string;
  setQuery: (query: string) => void;
  toggleSearch: () => void;
  results: { id: string; _id: string; title: string }[];
  setResults: (results: { id: string; _id: string; title: string }[]) => void;
};

const Searchbar = ({ query, setQuery, results, toggleSearch }: Props) => {
  const searchOpen = true; // Assuming this is controlled by a parent component
  return (
    <>
      {searchOpen && (
        <div className="mt-4 relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            autoFocus
          />
          <button
            onClick={toggleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
          <div>
            {query && results.length > 0 && (
              <div className="absolute left-0 right-0 bg-white shadow-lg rounded-md mt-2 p-4">
                <ul className="space-y-2">
                  {results.map((result) => (
                    <li key={result._id} className="text-gray-700">
                      <Link
                        to={`/product/${result._id}`}
                        className="hover:text-blue-600"
                        //set query empty
                        onClick={() => {
                          setQuery("");
                          toggleSearch();
                        }}
                      >
                        {result.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Searchbar;
