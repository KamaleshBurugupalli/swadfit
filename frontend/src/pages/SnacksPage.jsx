import React, { useState, useEffect } from 'react';
import { fetchFoods } from '../services/api';
import { useMacroCart } from '../context/MacroCartContext';
import FoodCard from '../components/FoodCard';

export default function SnacksPage() {
  const { addToCart } = useMacroCart();
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    fetchFoods({ category: 'snacks' }).then(res => res.data?.data && setSnacks(res.data.data));
  }, []);

  return (
    <div className="py-8 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest block">Healthy Guilt-Free Munching</span>
        <h1 className="font-display font-bold text-3xl text-on-surface">Protein Snacks & Shakes</h1>
        <p className="text-xs text-outline">Whey cold brew, roasted chana mix, and clean Indian fitness snacks.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {snacks.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onAdd={(f) => addToCart(f)}
            onCustomize={(f) => addToCart(f)}
          />
        ))}
      </div>
    </div>
  );
}
