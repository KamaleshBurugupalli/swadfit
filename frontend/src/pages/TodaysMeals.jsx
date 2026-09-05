import React from 'react';
import { Link } from 'react-router-dom';

export default function TodaysMeals() {
  const todaysList = [
    { id: 1, type: 'Lunch', name: 'Tandoori Chicken Breast Bowl', time: '12:30 PM', status: 'Out for Delivery', protein: 48, calories: 480, carbs: 42, fat: 10 },
    { id: 2, type: 'Dinner', name: 'High Protein Paneer Bhurji Meal', time: '08:00 PM', status: 'Scheduled', protein: 32, calories: 460, carbs: 38, fat: 18 }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Daily Dispatch</span>
        <h1 className="font-display font-bold text-3xl text-on-surface">Today's Meals</h1>
        <p className="text-xs text-outline">All meals scheduled for delivery to your Hyderabad address today.</p>
      </div>

      <div className="space-y-4">
        {todaysList.map((meal) => (
          <div key={meal.id} className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl shadow-soft space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container pb-3">
              <div>
                <span className="bg-primary-fixed text-on-primary-fixed text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {meal.type} • {meal.time} Slot
                </span>
                <h3 className="font-display font-bold text-xl text-on-surface mt-1">{meal.name}</h3>
              </div>
              <span className="bg-secondary-fixed text-on-secondary-fixed text-xs font-bold px-3 py-1 rounded-full self-start">
                Status: {meal.status}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs bg-surface-container-low p-3 rounded-2xl">
              <div><span className="text-outline block text-[10px]">Calories</span><span className="font-bold text-primary">{meal.calories} kcal</span></div>
              <div><span className="text-outline block text-[10px]">Protein</span><span className="font-bold text-tertiary">{meal.protein}g</span></div>
              <div><span className="text-outline block text-[10px]">Carbs</span><span className="font-bold">{meal.carbs}g</span></div>
              <div><span className="text-outline block text-[10px]">Fat</span><span className="font-bold text-secondary">{meal.fat}g</span></div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Link to={`/dashboard/change-meal/ORD-89412`} className="py-2 px-4 bg-surface-container-high text-xs font-bold text-on-surface rounded-full">
                Change Meal
              </Link>
              <Link to="/dashboard/track-delivery/ORD-89412" className="py-2 px-4 bg-primary text-xs font-bold text-white rounded-full shadow-sm">
                Track Delivery
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
