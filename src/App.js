import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Basket from './components/basket';
import Products from './components/product';
import Login from './components/login';
import SignUp from './components/signUp';
import AddProduct from './components/addProduct';
import Footer from './components/footer';
import { CartProvider } from './components/cartContext';
import { ProductProvider } from './components/ProductContext';
import { LoginProvider, LoginContext } from './components/loginContext';
import { SignUpProvider } from './components/signUpContext';
import { AdminProvider } from './components/adminContext';
import { ProductListProvider } from './components/productListContext';
import ProductList from './components/productList';
import ProductDetail from './components/productDetail';
import './output.css';
import './input.css';

function NoMatch() {
  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold text-red-500">404: Page Not Found</h2>
      <p className="text-gray-600 mt-2">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-500 mt-4 inline-block hover:underline">Go back home</Link>
    </div>
  );
}

function Stats() {
  const { user } = useContext(LoginContext);

  if (!user || !user.email) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user.email === 'admin@gmail.com';
  
  if (isAdmin) {
    return <Navigate to="/add-product" replace />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
        <h1 className="text-2xl font-bold text-gray-800">Hello, My Shop</h1>
        <p className="mt-4 text-gray-600">
          <span className="font-semibold">Account:</span> {user.email}
        </p>
        <p className="mt-2 text-lg font-semibold text-green-500">
          
        </p>
      </div>
    </div>
  );
}

function AppLayout() {
  const { user, logout } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Monhoo</Link>
        <div className="flex space-x-4">
          <Link className="text-white hover:bg-gray-600 transition duration-300 rounded-lg px-4 py-2" to="/">Home</Link>
          <Link className="text-white hover:bg-gray-600 transition duration-300 rounded-lg px-4 py-2" to="/contact">Contact</Link>
          <Link className="text-white hover:bg-gray-600 transition duration-300 rounded-lg px-4 py-2" to="/about">About</Link>
          <Link className="text-white hover:bg-gray-600 transition duration-300 rounded-lg px-4 py-2" to="/products">Products</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/stats" className="text-white">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <img
                src="https://th.bing.com/th/id/R.47cecf6ce91d73af7900067efeaacb63?rik=%2btKMy%2fBRVLblKA&pid=ImgRaw&r=0.png"
                alt="user"
                className="w-8 h-8 rounded-full border border-white"
              />
            </Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <LoginProvider>
          <SignUpProvider>
            <AdminProvider>
              <ProductListProvider>
                <Router>
                  <AppLayout />
                </Router>
              </ProductListProvider>
            </AdminProvider>
          </SignUpProvider>
        </LoginProvider>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;