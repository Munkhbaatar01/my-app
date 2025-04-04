import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching products from API...");
    fetch("http://localhost:5002/products/get") // <-- API хаягаа шалгаарай
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          throw new Error("Invalid product data format");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};
