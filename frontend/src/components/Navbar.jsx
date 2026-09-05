import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMacroCart } from '../context/MacroCartContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems, consumed, targets } = useMacroCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Meals', path: '/explore-meals' },
    { name: 'Build Meal', path: '/build-meals' },
    { name: 'Plans', path: '/subscriptions/plans' },
    { name: 'Macro Tracker', path: '/macro-tracker' },
    { name: 'Recommendations', path: '/recommendations' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-surface-container transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-black text-primary">
            <span className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-2xl">local_fire_department</span>
            </span>
            <span className="tracking-tight text-on-surface">
              SWAD<span className="text-primary">FIT</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-surface-container-low px-3 py-1.5 rounded-full border border-surface-container">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    active 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-on-surface hover:text-primary hover:bg-surface-container-high'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Quick Macro Pill */}
            <Link to="/macro-tracker" className="hidden sm:flex items-center gap-2 bg-tertiary-fixed/30 border border-tertiary-fixed-dim/40 px-3 py-1.5 rounded-full text-xs font-bold text-on-tertiary-fixed hover:bg-tertiary-fixed/60 transition-colors">
              <span className="material-symbols-outlined text-sm text-tertiary">monitoring</span>
              <span>{consumed.protein}g / {targets.protein}g Protein</span>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2.5 rounded-full bg-surface-container hover:bg-primary-fixed transition-colors text-on-surface">
              <span className="material-symbols-outlined text-xl">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Dashboard & Logout Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard" className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined text-base">dashboard</span>
                  <span className="hidden md:inline">{user?.name || 'Dashboard'}</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    window.location.href = '/';
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-full bg-surface-container-high hover:bg-error/10 hover:text-error text-on-surface text-xs font-bold border border-surface-container transition-colors"
                  title="Sign Out"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded-full bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-container transition-colors">
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high"
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-surface-container px-4 pt-2 pb-6 space-y-2 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-2xl text-sm font-semibold ${
                location.pathname === link.path
                  ? 'bg-primary text-white'
                  : 'text-on-surface hover:bg-surface-container-low'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-surface-container flex flex-col gap-2">
            <Link
              to="/macro-tracker"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-2xl bg-tertiary-fixed/30 text-tertiary text-sm font-bold flex items-center justify-between"
            >
              <span>Daily Macro Goal</span>
              <span>{consumed.protein}g / {targets.protein}g Protein</span>
            </Link>

            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  window.location.href = '/';
                }}
                className="w-full text-left px-4 py-2.5 rounded-2xl bg-surface-container-high hover:bg-error/10 text-on-surface hover:text-error text-sm font-bold flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                <span>Sign Out / Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-2.5 rounded-2xl bg-primary text-white text-sm font-bold"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
