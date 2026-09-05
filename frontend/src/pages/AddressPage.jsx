import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AddressPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedAddress, setSelectedAddress] = useState('Home');
  const [addressLine, setAddressLine] = useState(user?.address || 'Flat 402, Oakwood Heights, Hitec City, Hyderabad - 500081');
  const [landmark, setLandmark] = useState('Near Cyber Towers');
  const [pincode, setPincode] = useState('500081');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/checkout/payment');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-6">
        
        <div className="space-y-2">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Checkout Step 1</span>
          <h1 className="font-display font-bold text-3xl text-on-surface">Select Delivery Address</h1>
          <p className="text-xs text-outline">Where should our Swadfit delivery partner drop off your meals?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Address Label Pills */}
          <div>
            <label className="text-xs font-bold text-outline block mb-2">Address Type</label>
            <div className="flex items-center gap-3">
              {['Home', 'Work', 'Gym', 'Other'].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSelectedAddress(label)}
                  className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${
                    selectedAddress === label
                      ? 'border-primary bg-primary text-white shadow-sm'
                      : 'border-surface-container bg-surface text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-outline block mb-1">Full Street Address</label>
            <textarea
              rows={3}
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-outline block mb-1">Landmark (Optional)</label>
              <input 
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-outline block mb-1">Pincode (Hyderabad)</label>
              <input 
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Deliver to This Address & Pay</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </form>
      </div>
    </div>
  );
}
