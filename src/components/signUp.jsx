import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpContext } from './signUpContext';

const SignUp = () => {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const { signUp } = useContext(SignUpContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignUp = () => {
    signUp(creds.email, creds.password)
      .then((user) => {
        console.log('Signed up user:', user);
        navigate('/login');
      })
      .catch((err) => {
        console.error('Sign-up error:', err);
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen flex  justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <label className="block text-gray-700 mb-2">Email:</label>
        <input
          type="text"
          value={creds.email}
          onChange={(e) => setCreds({ ...creds, email: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <label className="block text-gray-700 mb-2">Password:</label>
        <input
          type="password"
          value={creds.password}
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;