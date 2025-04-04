import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5002/products/prodet/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        console.log("Fetched product details:", data);
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details");
      }
    };

    fetchProductDetails();
  }, [id]);

  if (error) return <h2 className="text-red-500">{error}</h2>;
  if (!product) return <h2 className="text-center text-xl mt-10">Loading...</h2>;

  const handleCheckout = () => {
    alert("Thank you for shopping with us!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-x-6">
        
          <div className="flex-shrink-0">
            <img
              src={product.color}
              alt={product.name}
              className="w-80 h-80 md:w-96 md:h-96 rounded-xl shadow-md object-cover"
            />
          </div>

          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-900">{product.name}</h2>
            <h3 className="text-2xl font-bold text-green-600">Price: ${product.price}</h3>

            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">Available Colors:</h3>
              <div className="flex space-x-2">
                {Array.isArray(product.image) ? (
                  product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border border-gray-400"
                      style={{ backgroundColor: color }}
                    />
                  ))
                ) : (
                  <div
                    className="w-8 h-8 rounded-full border border-gray-400"
                    style={{ backgroundColor: product.image }}
                  />
                )}
              </div>
            </div>

            <h3 className={`text-lg font-medium ${product.stock > 0 ? "text-gray-800" : "text-red-500"}`}>
              Stock: {product.stock > 0 ? product.stock : "Out of stock"}
            </h3>
            <button
              className={`w-full md:w-48 p-4 rounded-lg text-lg font-semibold text-white transition 
                ${product.stock > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
              onClick={handleCheckout}
              disabled={product.stock === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;