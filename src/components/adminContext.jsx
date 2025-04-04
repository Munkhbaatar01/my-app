import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const addProduct = (name, price, image, color, stock) => {
    return fetch('http://localhost:5002/products/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, image, color, stock }),
    })
      .then((res) => {
        console.log('Add product response status:', res.status); 
        if (!res.ok) throw new Error('Failed to add product');
        return res.json();
      })
      .then((data) => {
        console.log('Add product response data:', data); 
        if (data && data.data) {
          setProducts((prevProducts) => [...prevProducts, data.data]);
          return data.data;
        } else {
          throw new Error('Invalid product data format');
        }
      });
  };
  
  

  return (
    <AdminContext.Provider value={{ products, addProduct }}>
      {children}
    </AdminContext.Provider>
  );
};