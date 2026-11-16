import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pt-24">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-white/40 rounded-3xl shadow-2xl p-8 transform transition-all hover:scale-[1.01] duration-300">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 font-medium">
            Sign in to your DentalStore account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder-gray-400 shadow-sm"
              placeholder="student@dentistry.edu"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">Forgot password?</a>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder-gray-400 shadow-sm"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transform transition-all active:scale-95 mt-4"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-600 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-indigo-600 font-bold transition-colors">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}
