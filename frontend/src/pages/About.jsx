import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-10">
      
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Modern Vedic Culinary Tech</span>
        <h1 className="font-display font-black text-4xl text-on-surface">About SWADFIT</h1>
        <p className="text-sm text-outline">
          Reinventing Indian fitness food by bridging scientific macro precision with rich, authentic regional flavors.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-4">
        <h2 className="font-display font-bold text-2xl text-on-surface">Hit Your Macros. Eat Your Cravings.</h2>
        <p className="text-xs text-outline leading-relaxed">
          For years, gym-goers and health-conscious professionals in India were forced to choose between bland boiled chicken/salads or high-oil restaurant curries. Swadfit was built in Hyderabad to eliminate this compromise. Every single meal is cooked in zero refined oil, weighed for precise protein and macro counts, and packed hot for daily delivery.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-low p-6 rounded-3xl space-y-2">
          <span className="material-symbols-outlined text-primary text-3xl">scale</span>
          <h3 className="font-bold text-base text-on-surface">Macro Accuracy</h3>
          <p className="text-xs text-outline">Weighed ingredients with lab-calculated protein, carb, fat, and fibre values.</p>
        </div>

        <div className="bg-surface-container-low p-6 rounded-3xl space-y-2">
          <span className="material-symbols-outlined text-tertiary text-3xl">soup_kitchen</span>
          <h3 className="font-bold text-base text-on-surface">Fresh Kitchen Prep</h3>
          <p className="text-xs text-outline">State-of-the-art cloud kitchens operating in Hitec City & Gachibowli.</p>
        </div>

        <div className="bg-surface-container-low p-6 rounded-3xl space-y-2">
          <span className="material-symbols-outlined text-secondary text-3xl">schedule</span>
          <h3 className="font-bold text-base text-on-surface">Hot Slot Dispatch</h3>
          <p className="text-xs text-outline">Delivered right before your lunch, pre-workout, or dinner time window.</p>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link to="/explore-meals" className="py-3.5 px-8 bg-primary text-white font-bold text-xs rounded-full shadow-md">
          Explore Our Menu
        </Link>
      </div>
    </div>
  );
}
