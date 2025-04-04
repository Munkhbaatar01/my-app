import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './cartContext';
import { ProductContext } from './ProductContext';
import ColorList from './colorList';
import Counter from './counter';
import Filter from './filter';
import { Link } from 'react-router-dom';

const Products = () => {
  const { addToCart, updateCartColor, updateCartQuantity } = useContext(CartContext);
  const { products, loading, error } = useContext(ProductContext);
  const [filters, setFilters] = useState({ color: '', priceRange: [0, 1000] });

  useEffect(() => {
    console.log("Fetched products:", products);
  }, [products]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  const filteredProducts = products.filter(product => {
    const matchesColor = filters.color ? product.image?.includes(filters.color) : true;
    const matchesPrice =
      Array.isArray(filters.priceRange) &&
      filters.priceRange.length === 2 &&
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
  
    return matchesColor && matchesPrice;
  });
  

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 className="text-red-500">Error: {error}</h2>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="flex gap-4 mb-4">
        <Link to='/productList'>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow">Product Lists</button>
        </Link>
        <Link to='/basket'>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow">Basket</button>
        </Link>
      </div>
      <Filter onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {filteredProducts.map((product) => (
          <Product 
            key={product.id || Math.random()} 
            product={product} 
            addToCart={addToCart} 
            updateCartColor={updateCartColor} 
            updateCartQuantity={updateCartQuantity} 
          />
        ))}
      </div>
    </div>
  );
};

const Product = ({ product, addToCart, updateCartColor, updateCartQuantity }) => {
  const [selectedColor, setSelectedColor] = useState(
    Array.isArray(product.image) ? product.image[0] : "defaultColor"
  );
  const [quantity, setQuantity] = useState(product.quantity || 1);

  const colors = Array.isArray(product.image)
    ? product.image
    : typeof product.image === "string"
    ? product.image.split(",") 
    : [];

  const handleAddToCart = () => {
    addToCart({ ...product, color: selectedColor, quantity });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (updateCartColor) updateCartColor(product.id, color);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    if (updateCartQuantity) updateCartQuantity(product.id, newQuantity);
  };

  return (
    <div className="border border-gray-300 p-6 m-6 w-full rounded-2xl text-center bg-white shadow-lg space-y-6">
      <Link to={`/ProductDetail/${product.id}`}> 
        <img
          src={product.color}
          alt={product.name}
          className="w-full h-52 object-cover rounded-xl shadow-sm"
        />
      </Link>
      <h2 className="text-2xl font-semibold">{product.name}</h2>
      <h2 className="text-lg text-gray-700">Price: <span className="font-bold text-gray-900">${product.price}</span></h2>
      <div className="flex flex-col items-center space-y-4">
        <ColorList colors={colors} updateColor={handleColorChange} color={selectedColor} />
        <Counter stock={product.stock} quantity={quantity} updateQuantity={handleQuantityChange} />
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-md transition-all duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Products;