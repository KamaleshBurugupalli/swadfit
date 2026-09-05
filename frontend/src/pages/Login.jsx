import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('karan@swadfit.in');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-md">
            <span className="material-symbols-outlined text-2xl">lock</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-on-surface">Welcome Back to SWADFIT</h1>
          <p className="text-xs text-outline">Log in to manage your daily macro meals & subscriptions</p>
        </div>

        {error && (
          <div className="p-3 bg-error-container text-on-error-container rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-outline block mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface focus:outline-none focus:border-primary"
              placeholder="karan@domain.com"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-outline">Password</label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface focus:outline-none focus:border-primary"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-xs text-outline pt-2 border-t border-surface-container">
          Don't have a SWADFIT account?{' '}
          <Link to="/signup" className="text-primary font-bold hover:underline">
            Sign Up Free
          </Link>
        </div>
      </div>
    </div>
  );
}
