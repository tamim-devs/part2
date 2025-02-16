import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const InfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10); // Load 10 items initially
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    fetchProducts(limit);
  }, [limit]);

  const fetchProducts = async (limit) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${limit}`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLimit((prevLimit) => prevLimit + 10); // Load 10 more items
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Infinite Scroll</h1>
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
        {products.map((product) => (
          <div key={product.id} className="py-2 border-b last:border-none">
            <p className="text-lg">{product.title}</p>
          </div>
        ))}
      </div>

      <div ref={loader} className="text-center mt-4">
        {loading && <p className="text-blue-500">Loading more products...</p>}
      </div>
    </div>
  );
};

export default InfiniteScroll;
