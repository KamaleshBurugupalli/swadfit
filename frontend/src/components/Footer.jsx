import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface pt-16 pb-8 border-t border-surface-container mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 font-display text-2xl font-black text-white">
              <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">local_fire_department</span>
              </span>
              <span>SWAD<span className="text-primary-fixed-dim">FIT</span></span>
            </Link>
            <p className="text-sm text-slate-300 max-w-sm">
              Personalized Indian fitness food platform. Hit your precise macro targets while eating delicious, authentic Indian recipes.
            </p>
            <div className="flex items-center gap-3 pt-2 text-primary-fixed-dim font-bold text-xs">
              <span className="material-symbols-outlined text-base">location_on</span>
              <span>Serving Hyderabad (Hitec City, Gachibowli, Jubilee Hills & Madhapur)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link to="/explore-meals" className="hover:text-primary-fixed-dim">Explore Meals</Link></li>
              <li><Link to="/build-meals" className="hover:text-primary-fixed-dim">Build Meal Plan</Link></li>
              <li><Link to="/subscriptions/plans" className="hover:text-primary-fixed-dim">Subscription Plans</Link></li>
              <li><Link to="/macro-tracker" className="hover:text-primary-fixed-dim">Macro Tracker</Link></li>
              <li><Link to="/recommendations" className="hover:text-primary-fixed-dim">Smart Recommendations</Link></li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Customer</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link to="/dashboard" className="hover:text-primary-fixed-dim">Customer Dashboard</Link></li>
              <li><Link to="/dashboard/todays-meals" className="hover:text-primary-fixed-dim">Today's Meals</Link></li>
              <li><Link to="/dashboard/upcoming-meals" className="hover:text-primary-fixed-dim">Upcoming Deliveries</Link></li>
              <li><Link to="/dashboard/subscription" className="hover:text-primary-fixed-dim">Manage Subscription</Link></li>
              <li><Link to="/dashboard/order-history" className="hover:text-primary-fixed-dim">Order History</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link to="/about" className="hover:text-primary-fixed-dim">About SWADFIT</Link></li>
              <li><Link to="/contact" className="hover:text-primary-fixed-dim">Contact Support</Link></li>
              <li><Link to="/faq" className="hover:text-primary-fixed-dim">Frequently Asked Questions</Link></li>
              <li><Link to="/terms" className="hover:text-primary-fixed-dim">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary-fixed-dim">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} SWADFIT Foods Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Made for Fitness Lovers in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
