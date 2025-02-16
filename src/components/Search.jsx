import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce"; // Import use-debounce

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Track search input
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce the search term
  const [products, setProducts] = useState([]); // Store fetched products
  const [loading, setLoading] = useState(false); // Track loading state
  const [page, setPage] = useState(1); // Track the current page for pagination
  const [hasMore, setHasMore] = useState(true); // Check if there are more products to load
  const loader = useRef(null); // Reference to the scroll loader

  // Fetch products when the debounced search term or page changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      setPage(1); // Reset to page 1 on new search term
      setProducts([]); // Clear current products
      setHasMore(true); // Reset 'hasMore'
      fetchProducts(debouncedSearchTerm, 1); // Fetch from page 1
    }
  }, [debouncedSearchTerm]);

  // Fetch more products when the page changes
  useEffect(() => {
    if (page > 1 && hasMore) {
      fetchProducts(debouncedSearchTerm, page); // Fetch products for the next page
    }
  }, [page, debouncedSearchTerm, hasMore]);

  // Infinite scroll functionality using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prevPage) => prevPage + 1); // Load next page when bottom is reached
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect(); // Clean up observer on unmount
  }, [loading, hasMore]);

  // Fetch products from the API
  const fetchProducts = async (query, pageNum) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${query}&page=${pageNum}&limit=10`
      );

      const fetchedProducts = response.data.products;
      setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);

      if (fetchedProducts.length < 10) {
        setHasMore(false); // No more products to load
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container max-w-5xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 shadow-md mb-6"
      />

      {/* Render results only if there's a search term */}
      {debouncedSearchTerm && (
        <>
          {loading && <div className="loading-text text-center mt-4">Loading...</div>}

          <div className="results-container mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="product-card bg-white shadow-md rounded-lg p-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="product-title text-lg font-semibold">{product.title}</h3>
                  <p className="product-description text-gray-600 text-sm">{product.description}</p>
                </div>
              ))
            ) : (
              <p className="no-results text-center text-gray-600">
                {loading ? "Searching..." : "No products found"}
              </p>
            )}
          </div>

          {loading && <div className="loading-more text-center mt-4">Fetching more...</div>}

          {/* Scroll loader for infinite scroll */}
          <div ref={loader} className="text-center mt-4">
            {loading && !hasMore && <div>No more products to load</div>}
          </div>
        </>
      )}

      {/* Show message if input is empty */}
      {!debouncedSearchTerm && (
        <p className="text-center text-gray-600 mt-4">Please enter a search term</p>
      )}
    </div>
  );
};

export default Search;
