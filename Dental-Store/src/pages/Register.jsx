import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = '/api/register.php';

export default function Register() {
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: '',
    ConfirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.Password !== formData.ConfirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      
      const res = await axios.post(API_URL, {
        Username: formData.Username,
        Email: formData.Email,
        Password: formData.Password
      });

      setMessage({ type: 'success', text: 'Registration successful! Redirecting to login...' });

      
      setFormData({ Username: '', Email: '', Password: '', ConfirmPassword: '' });

      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error("Registration error:", err);
      const errorMsg = err.response?.data?.message || 'Failed to register. Please ensure your PHP backend is running.';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4 pt-24">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-8 transform transition-all hover:scale-[1.01] duration-300">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 font-medium">
            Join DentalStore as a new user
          </p>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-semibold border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
            <input
              type="text"
              name="Username"
              required
              value={formData.Username}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder-gray-400 shadow-sm"
              placeholder="dentist_student99"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
            <input
              type="email"
              name="Email"
              required
              value={formData.Email}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder-gray-400 shadow-sm"
              placeholder="student@dentistry.edu"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
            <input
              type="password"
              name="Password"
              required
              value={formData.Password}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder-gray-400 shadow-sm"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
            <input
              type="password"
              name="ConfirmPassword"
              required
              value={formData.ConfirmPassword}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder-gray-400 shadow-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transform transition-all active:scale-95 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-600 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-blue-600 font-bold transition-colors">
            Sign In here
          </Link>
        </p>

      </div>
    </div>
  );
}
