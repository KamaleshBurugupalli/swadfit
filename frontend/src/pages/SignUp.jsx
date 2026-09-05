import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password, phone);
    navigate('/onboarding/targets');
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-tertiary text-white flex items-center justify-center mx-auto shadow-md">
            <span className="material-symbols-outlined text-2xl">person_add</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-on-surface">Create SWADFIT Account</h1>
          <p className="text-xs text-outline">Start your macro-driven meal journey in Hyderabad</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-outline block mb-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface focus:outline-none focus:border-primary"
              placeholder="Karan Sharma"
              required
            />
          </div>

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
            <label className="text-xs font-bold text-outline block mb-1">Phone Number (WhatsApp Delivery Updates)</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface focus:outline-none focus:border-primary"
              placeholder="+91 98765 43210"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-outline block mb-1">Password</label>
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
            className="w-full py-3.5 px-4 bg-tertiary hover:bg-tertiary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors"
          >
            Create Account & Continue
          </button>
        </form>

        <div className="text-center text-xs text-outline pt-2 border-t border-surface-container">
          Already registered?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
