import React, { createContext, useState } from 'react';

export const SignUpContext = createContext();

export const SignUpProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUp = (email, password) => {
    return fetch('http://localhost:5002/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        console.log('Sign-up response status:', res.status); 
        if (!res.ok) throw new Error('Failed to sign up');
        return res.json();
      })
      .then((data) => {
        console.log('Sign-up response data:', data); 
        if (data && data.data) {
          setUser(data.data);
          return data.data;
        } else {
          throw new Error('Invalid sign-up data format');
        }
      });
  };

  return (
    <SignUpContext.Provider value={{ user, signUp }}>
      {children}

    </SignUpContext.Provider>
  );
};