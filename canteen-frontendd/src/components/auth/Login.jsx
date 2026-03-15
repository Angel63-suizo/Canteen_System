import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authService } from '../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

      const data = await authService.login({ email, password });
      localStorage.setItem('token', data.token);

      console.log("Login Success:", data);

      if (data && data.user) {
        const role = data.user.role.toLowerCase();
        if (role === 'admin') navigate('/admin');
        else if (role === 'cashier') navigate('/pos');
        else if (role === 'customer') navigate('/customer');
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert('Login failed: Please check your credentials and connection.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M11 7.21V16H13V7.21C14.65 7.46 16.03 8.71 16.37 10.35H18.4C18.01 7.58 15.71 5.43 12.9 5.23V5H11.1V5.23C8.29 5.43 5.99 7.58 5.6 10.35H7.63C7.97 8.71 9.35 7.46 11 7.21Z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Canteen Management</h1>
          <p className="text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;