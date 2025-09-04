import React, { useState } from 'react';
import axios from 'axios';
// We no longer need useNavigate for this solution, but you can keep it if used elsewhere.
// import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  // const navigate = useNavigate(); // Not needed for the redirect anymore

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const backendURL = 'http://localhost:5000';
      const response = await axios.post(`${backendURL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data;
        const { name, email,role , hasCompletedOnboarding} = user;

        localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify({ name, email, role, hasCompletedOnboarding }));

  if (!hasCompletedOnboarding) {
    // user hasn’t filled form → redirect to role-based registration
    if (role === 'freelancer') {
      window.location.href = '/freelancer-profile';
    } else if (role === 'company') {
      window.location.href = '/company-register';
    } else if (role === 'institute') {
      window.location.href = '/institute-register';
    }
  } else {
    // user already completed onboarding → dashboard
    window.location.href = '/dashboard';
  }
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(`Login failed: ${error.response.data.message}`);
      } else {
        setMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };
 

  // ... rest of your JSX is correct ...
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Login</h2>
        {message && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;