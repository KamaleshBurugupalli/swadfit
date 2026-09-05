import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMacroCart } from '../context/MacroCartContext';
import { fetchDashboardData, fetchSubscription, fetchOrders } from '../services/api';
import OrderStatusTracker from '../components/OrderStatusTracker';
import MacroProgressBar from '../components/MacroProgressBar';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { consumed, targets } = useMacroCart();
  const [dashboardData, setDashboardData] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData().then(res => res.data?.data && setDashboardData(res.data.data));
    fetchSubscription().then(res => res.data?.data && setSubscription(res.data.data));
    fetchOrders().then(res => res.data?.data && setOrders(res.data.data));
  }, []);

  const activeOrder = orders[0];

  return (
    <div className="py-6 space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-surface-container-low border border-surface-container p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft">
        <div className="space-y-1">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Customer Dashboard</span>
          <h1 className="font-display font-bold text-3xl text-on-surface">Welcome back, {user?.name || 'Karan'}! 👋</h1>
          <p className="text-xs text-outline">Here is your daily macro breakdown & meal dispatch status.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/build-meals"
            className="py-3 px-5 bg-primary hover:bg-primary-container text-white font-display font-bold text-xs rounded-full shadow-md transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">restaurant</span>
            Build Today's Meals
          </Link>
          <Link
            to="/dashboard/profile"
            className="py-3 px-5 bg-surface-container-high hover:bg-surface-container text-on-surface font-display font-bold text-xs rounded-full border border-surface-container transition-colors"
          >
            Profile
          </Link>
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="py-3 px-4 bg-surface-container-high hover:bg-error/10 hover:text-error text-on-surface font-display font-bold text-xs rounded-full border border-surface-container transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Live Order Tracker & Macro Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Live Order Tracker & Today's Meals */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Order Tracker */}
          {activeOrder && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-xl text-on-surface">Active Delivery</h3>
                <Link to={`/dashboard/track-delivery/${activeOrder.id}`} className="text-xs font-bold text-primary hover:underline">
                  View Live Map
                </Link>
              </div>
              <OrderStatusTracker status={activeOrder.status} />
            </div>
          )}

          {/* Today's Meals List */}
          <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-surface-container pb-3">
              <h3 className="font-display font-bold text-xl text-on-surface">Today's Scheduled Meals</h3>
              <Link to="/dashboard/todays-meals" className="text-xs font-bold text-primary hover:underline">
                View Full Today Plan
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { type: 'Lunch', name: 'Tandoori Chicken Breast Bowl', time: '12:30 PM', status: 'Out for Delivery', protein: 48, calories: 480 },
                { type: 'Dinner', name: 'High Protein Paneer Bhurji Meal', time: '08:00 PM', status: 'Scheduled', protein: 32, calories: 460 }
              ].map((meal, idx) => (
                <div key={idx} className="bg-surface-container-low p-4 rounded-2xl flex items-center justify-between border border-surface-container">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center">
                      {meal.type[0]}
                    </span>
                    <div>
                      <div className="text-xs text-outline font-semibold">{meal.type} • {meal.time}</div>
                      <div className="font-bold text-sm text-on-surface">{meal.name}</div>
                      <div className="text-[11px] text-tertiary font-bold">{meal.protein}g Protein • {meal.calories} kcal</div>
                    </div>
                  </div>

                  <Link
                    to={`/dashboard/change-meal/ORD-89412`}
                    className="py-1.5 px-3 bg-white hover:bg-surface-container text-on-surface text-xs font-bold rounded-full border border-surface-container"
                  >
                    Change Meal
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Daily Macro Progress & Active Subscription Summary */}
        <div className="space-y-6">
          
          {/* Daily Macros Card */}
          <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl shadow-soft space-y-4">
            <h3 className="font-display font-bold text-lg text-on-surface border-b border-surface-container pb-3">
              Daily Macro Progress
            </h3>

            <div className="space-y-4">
              <MacroProgressBar label="Calories" consumed={consumed.calories} target={targets.calories} unit="kcal" />
              <MacroProgressBar label="Protein" consumed={consumed.protein} target={targets.protein} unit="g" />
              <MacroProgressBar label="Carbohydrates" consumed={consumed.carbs} target={targets.carbs} unit="g" />
              <MacroProgressBar label="Healthy Fats" consumed={consumed.fat} target={targets.fat} unit="g" />
              <MacroProgressBar label="Dietary Fibre" consumed={consumed.fibre} target={targets.fibre} unit="g" />
            </div>

            <Link
              to="/macro-tracker"
              className="block text-center text-xs font-bold text-primary hover:underline pt-2"
            >
              Open Full Macro Analytics →
            </Link>
          </div>

          {/* Active Subscription Summary */}
          {subscription && (
            <div className="bg-tertiary-fixed/20 border border-tertiary-fixed-dim/40 p-6 rounded-3xl space-y-4 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="bg-tertiary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {subscription.status} Subscription
                </span>
                <Link to="/dashboard/subscription" className="text-xs font-bold text-tertiary hover:underline">
                  Manage Plan
                </Link>
              </div>

              <div>
                <h4 className="font-display font-bold text-lg text-on-tertiary-fixed">{subscription.plan_name}</h4>
                <p className="text-xs text-on-tertiary-fixed-variant">{subscription.delivery_slot}</p>
              </div>

              <div className="bg-white p-3 rounded-2xl text-xs space-y-1 border border-tertiary-fixed-dim/30">
                <div className="flex justify-between text-outline">
                  <span>Days Completed:</span>
                  <span className="font-bold text-on-surface">{subscription.used_days} / {subscription.total_days} Days</span>
                </div>
                <div className="flex justify-between text-outline">
                  <span>Remaining Days:</span>
                  <span className="font-bold text-tertiary">{subscription.remaining_days} Days</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
