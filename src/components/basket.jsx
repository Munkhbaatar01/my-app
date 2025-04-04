import React, { useContext } from 'react';
import { CartContext } from './cartContext';
import { ProductContext } from './ProductContext';
import Counter from './counter';
import ColorList from './colorList';

const Basket = () => {
  const { cart, removeFromCart, updateCartQuantity, updateCartColor } = useContext(CartContext);
  const { products } = useContext(ProductContext);

  const cartItems = Object.entries(cart || {}).map(([id, { quantity, color }]) => {
    const product = products.find((product) => product.id === parseInt(id));
    return product ? { ...product, quantity, color } : null;
  }).filter(item => item !== null);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Thank you for shopping with us!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h2 className="text-3xl font-extrabold text-yellow-500 mb-6">Shopping Basket</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your basket is empty.</p>
      ) : (
        <>
          <ul className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-4 mb-4">
                <img
                  src={ "https://th.bing.com/th/id/OIP.KfgFofCdHP0XV1ALqofQ2wHaEo?rs=1&pid=ImgDetMain"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded mb-4 sm:mb-0"
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <span className="text-lg font-bold">{item.name}</span>
                  <span className="text-gray-600">Quantity: {item.quantity}</span>
                  <span className="text-gray-600">Price: ${item.price * item.quantity}</span>
                  <ColorList
                    colors={item.image.split(',')}
                    updateColor={(color) => updateCartColor(item.id, color)}
                    color={item.color}
                  />
                  <div className="mt-2 sm:mt-0">
                    <Counter
                      stock={item.stock}
                      quantity={item.quantity}
                      updateQuantity={(newQuantity) => updateCartQuantity(item.id, newQuantity)}
                    />
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white p-2 rounded mt-4 sm:mt-0">
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mt-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Total Price: ${totalPrice}</h3>
            <button className="bg-green-500 text-white p-4 rounded" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;    