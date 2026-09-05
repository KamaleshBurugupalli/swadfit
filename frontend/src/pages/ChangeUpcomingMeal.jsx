import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFoods } from '../services/api';

export default function ChangeUpcomingMeal() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchFoods().then(res => res.data?.data && setFoods(res.data.data));
  }, []);

  const handleConfirmSwap = () => {
    if (!selectedFoodId) return;
    setSuccess(true);
    setTimeout(() => {
      navigate('/dashboard/upcoming-meals');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Meal Swap</span>
        <h1 className="font-display font-bold text-3xl text-on-surface">Change Scheduled Meal</h1>
        <p className="text-xs text-outline">Select a replacement dish for your upcoming delivery slot.</p>
      </div>

      {success && (
        <div className="p-4 bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs rounded-2xl flex items-center gap-2">
          <span className="material-symbols-outlined">check_circle</span>
          <span>Upcoming meal updated successfully! Redirecting to schedule...</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <div 
            key={food.id}
            onClick={() => setSelectedFoodId(food.id)}
            className={`bg-surface-container-lowest border p-4 rounded-3xl cursor-pointer transition-all ${
              selectedFoodId === food.id
                ? 'border-primary ring-2 ring-primary bg-primary-fixed/20 shadow-md'
                : 'border-surface-container hover:border-outline'
            }`}
          >
            <img src={food.image_url} alt={food.name} className="w-full h-36 rounded-2xl object-cover mb-3" />
            <h4 className="font-bold text-sm text-on-surface line-clamp-1">{food.name}</h4>
            <div className="text-xs text-tertiary font-bold mt-1">
              {food.protein}g Protein • {food.calories} kcal
            </div>
            <div className="text-[11px] text-outline mt-0.5 font-semibold">₹{food.price}</div>
          </div>
        ))}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={handleConfirmSwap}
          disabled={!selectedFoodId}
          className="py-3.5 px-8 bg-primary hover:bg-primary-container disabled:opacity-50 text-white font-display font-bold text-sm rounded-full shadow-md transition-colors"
        >
          Confirm Meal Swap
        </button>
      </div>
    </div>
  );
}
