import React, { useState, useEffect } from 'react';
import { fetchFoods } from '../services/api';
import { useMacroCart } from '../context/MacroCartContext';
import FoodCard from '../components/FoodCard';
import MealCustomizerModal from '../components/MealCustomizerModal';

export default function SingleMealOrdering() {
  const { addToCart } = useMacroCart();
  const [foods, setFoods] = useState([]);
  const [selectedCustomFood, setSelectedCustomFood] = useState(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  useEffect(() => {
    fetchFoods().then(res => res.data?.data && setFoods(res.data.data));
  }, []);

  return (
    <div className="py-8 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">On-Demand Express Delivery</span>
        <h1 className="font-display font-bold text-3xl text-on-surface">Single Meal Ordering</h1>
        <p className="text-xs text-outline">Order individual high-protein Indian meals delivered in under 45 minutes in Hyderabad.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onAdd={(f) => addToCart(f)}
            onCustomize={(f) => { setSelectedCustomFood(f); setIsCustomModalOpen(true); }}
          />
        ))}
      </div>

      <MealCustomizerModal
        food={selectedCustomFood}
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSave={(c, list) => addToCart(c, list)}
      />
    </div>
  );
}
