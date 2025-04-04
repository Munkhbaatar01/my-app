import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    return fetch('http://localhost:5002/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to login');
        return res.json();
      })
      .then((data) => {
        console.log('Login response data:', data);
        if (data && data.data) {
          setUser(data.data);
          return data.data;
        } else {
          throw new Error('Invalid login data format');
        }
      });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <LoginContext.Provider value={{ user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};