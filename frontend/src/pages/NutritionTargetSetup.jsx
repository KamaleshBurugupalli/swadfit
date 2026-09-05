import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NutritionTargetSetup() {
  const navigate = useNavigate();
  const { user, updateTargets } = useAuth();

  const [goal, setGoal] = useState(user?.goal || 'Fat Loss & Lean Muscle');
  const [calories, setCalories] = useState(user?.targets?.calories || 1800);
  const [protein, setProtein] = useState(user?.targets?.protein || 140);
  const [carbs, setCarbs] = useState(user?.targets?.carbs || 160);
  const [fat, setFat] = useState(user?.targets?.fat || 50);
  const [fibre, setFibre] = useState(user?.targets?.fibre || 30);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTargets({ calories: Number(calories), protein: Number(protein), carbs: Number(carbs), fat: Number(fat), fibre: Number(fibre) });
    navigate('/onboarding/preferences');
  };

  const handleGoalSelect = (g) => {
    setGoal(g);
    if (g === 'Fat Loss') {
      setCalories(1600); setProtein(140); setCarbs(130); setFat(45); setFibre(30);
    } else if (g === 'Muscle Gain') {
      setCalories(2400); setProtein(175); setCarbs(260); setFat(65); setFibre(35);
    } else {
      setCalories(1900); setProtein(130); setCarbs(200); setFat(55); setFibre(30);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-8">
        
        {/* Step Header */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Step 1 of 4</span>
          <h1 className="font-display font-bold text-3xl text-on-surface">Set Your Daily Nutrition Targets</h1>
          <p className="text-xs text-outline">
            Swadfit uses these values to calculate your remaining macros and personalize Indian food recommendations.
          </p>
        </div>

        {/* Preset Goals Selector */}
        <div>
          <label className="text-xs font-bold text-outline block mb-2">Select Your Fitness Goal</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title: 'Fat Loss', desc: 'Calorie deficit + High Protein', icon: 'trending_down' },
              { title: 'Maintenance', desc: 'Balanced macros for stamina', icon: 'equalizer' },
              { title: 'Muscle Gain', desc: 'Calorie surplus + Extra Protein', icon: 'fitness_center' }
            ].map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => handleGoalSelect(item.title)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  goal.includes(item.title)
                    ? 'border-primary bg-primary-fixed/30 ring-2 ring-primary text-primary'
                    : 'border-surface-container bg-surface hover:bg-surface-container-low text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-2xl mb-1 block">{item.icon}</span>
                <div className="font-bold text-sm">{item.title}</div>
                <div className="text-[11px] text-outline mt-0.5">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Fine-Tune Sliders / Inputs */}
        <form onSubmit={handleSubmit} className="space-y-6 pt-4 border-t border-surface-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Calories */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-on-surface">Daily Calories</span>
                <span className="text-primary font-display text-base">{calories} kcal</span>
              </div>
              <input 
                type="range" 
                min="1200" 
                max="3500" 
                step="50" 
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            {/* Protein */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-on-surface">Daily Protein</span>
                <span className="text-tertiary font-display text-base">{protein} g</span>
              </div>
              <input 
                type="range" 
                min="60" 
                max="250" 
                step="5" 
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="w-full accent-tertiary cursor-pointer"
              />
            </div>

            {/* Carbs */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-on-surface">Daily Carbs</span>
                <span className="text-on-surface font-display text-base">{carbs} g</span>
              </div>
              <input 
                type="range" 
                min="80" 
                max="400" 
                step="10" 
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="w-full accent-on-surface cursor-pointer"
              />
            </div>

            {/* Fat */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-on-surface">Daily Fats</span>
                <span className="text-secondary font-display text-base">{fat} g</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="120" 
                step="5" 
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="w-full accent-secondary cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-on-surface">Daily Dietary Fibre</span>
              <span className="text-on-surface font-display text-base">{fibre} g</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="60" 
              step="5" 
              value={fibre}
              onChange={(e) => setFibre(e.target.value)}
              className="w-full accent-on-surface cursor-pointer"
            />
          </div>

          {/* Target Summary Pill */}
          <div className="bg-surface-container p-4 rounded-2xl flex items-center justify-between text-xs font-semibold text-on-surface">
            <span>Configured Targets:</span>
            <div className="flex gap-3">
              <span className="text-primary font-bold">{calories} kcal</span>
              <span className="text-tertiary font-bold">{protein}g Protein</span>
              <span>{carbs}g Carbs</span>
              <span className="text-secondary">{fat}g Fat</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Save Targets & Continue to Preferences</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
      </div>
    </div>
  );
}
