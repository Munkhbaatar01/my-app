

import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CartProvider } from './components/cartContext';
import { ProductProvider } from './components/ProductContext';
import { LoginProvider } from './components/loginContext';
import { SignUpProvider } from './components/signUpContext';
import { AdminProvider } from './components/adminContext';
import { ProductListProvider } from './components/productListContext';

test('renders learn react link', () => {
  render(
    <CartProvider>
      <ProductProvider>
        <LoginProvider>
          <SignUpProvider>
            <AdminProvider>
              <ProductListProvider>
                <Router>
                  <App />
                </Router>
              </ProductListProvider>
            </AdminProvider>
          </SignUpProvider>
        </LoginProvider>
      </ProductProvider>
    </CartProvider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
