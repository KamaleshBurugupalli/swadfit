import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pauseSubscriptionAPI } from '../services/api';

export default function PauseSubscription() {
  const navigate = useNavigate();
  const [pauseStartDate, setPauseStartDate] = useState('2026-09-06');
  const [resumeDate, setResumeDate] = useState('2026-09-13');
  const [loading, setLoading] = useState(false);

  const handlePause = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pauseSubscriptionAPI('SUB-77291', { pauseStartDate, resumeDate });
      navigate('/dashboard/subscription');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-2xl">pause</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-on-surface">Pause Meal Deliveries</h1>
          <p className="text-xs text-outline">
            Going out of town or on a trip? Pause your deliveries and carry forward your balance.
          </p>
        </div>

        <form onSubmit={handlePause} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-outline block mb-1">Pause Start Date</label>
            <input 
              type="date"
              value={pauseStartDate}
              onChange={(e) => setPauseStartDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-outline block mb-1">Auto-Resume Date</label>
            <input 
              type="date"
              value={resumeDate}
              onChange={(e) => setResumeDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-secondary hover:bg-secondary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors"
          >
            {loading ? 'Pausing...' : 'Confirm Pause'}
          </button>
        </form>
      </div>
    </div>
  );
}
