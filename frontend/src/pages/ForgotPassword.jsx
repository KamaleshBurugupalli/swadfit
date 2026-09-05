import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-secondary text-white flex items-center justify-center mx-auto shadow-md">
            <span className="material-symbols-outlined text-2xl">key</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-on-surface">Reset Your Password</h1>
          <p className="text-xs text-outline">Enter your registered email to receive reset link instructions</p>
        </div>

        {submitted ? (
          <div className="p-4 bg-tertiary-fixed/40 border border-tertiary-fixed text-on-tertiary-fixed rounded-2xl space-y-2 text-center">
            <span className="material-symbols-outlined text-3xl text-tertiary">check_circle</span>
            <h3 className="font-bold text-sm">Reset Link Sent!</h3>
            <p className="text-xs text-on-tertiary-fixed-variant">
              We have sent password recovery instructions to <strong>{email}</strong>.
            </p>
            <Link to="/login" className="inline-block mt-2 text-xs font-bold text-tertiary underline">
              Return to Login
            </Link>
          </div>
        ) : (
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

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors"
            >
              Send Password Reset Link
            </button>
          </form>
        )}

        <div className="text-center text-xs text-outline pt-2 border-t border-surface-container">
          Remember password?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
