import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateProfile, updateTargets } = useAuth();
  const [name, setName] = useState(user?.name || 'Karan Sharma');
  const [email, setEmail] = useState(user?.email || 'karan@swadfit.in');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [address, setAddress] = useState(user?.address || 'Flat 402, Oakwood Heights, Hitec City, Hyderabad - 500081');
  const [calories, setCalories] = useState(user?.targets?.calories || 1800);
  const [protein, setProtein] = useState(user?.targets?.protein || 140);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name, email, phone, address });
    updateTargets({ calories: Number(calories), protein: Number(protein) });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <div className="space-y-1">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Account Settings</span>
        <h1 className="font-display font-bold text-3xl text-on-surface">Customer Profile</h1>
        <p className="text-xs text-outline">Manage personal details, default address, and target nutrition.</p>
      </div>

      {saved && (
        <div className="p-4 bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs rounded-2xl flex items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined">check_circle</span>
          <span>Profile changes saved successfully to Supabase!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-outline block mb-1">Full Name</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-outline block mb-1">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-outline block mb-1">Phone Number</label>
            <input 
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-outline block mb-1">Daily Calorie Target</label>
            <input 
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface font-bold text-primary"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-outline block mb-1">Default Hyderabad Delivery Address</label>
          <textarea
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface"
          />
        </div>

        <div className="pt-4 border-t border-surface-container flex justify-end">
          <button
            type="submit"
            className="py-3.5 px-8 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors"
          >
            Save Profile Updates
          </button>
        </div>
      </form>
    </div>
  );
}
