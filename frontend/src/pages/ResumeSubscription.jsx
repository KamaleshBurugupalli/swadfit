import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeSubscriptionAPI } from '../services/api';

export default function ResumeSubscription() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResume = async () => {
    setLoading(true);
    try {
      await resumeSubscriptionAPI('SUB-77291');
      navigate('/dashboard/subscription');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-2xl">play_arrow</span>
        </div>
        
        <div>
          <h1 className="font-display font-bold text-2xl text-on-surface">Resume Subscription</h1>
          <p className="text-xs text-outline mt-1">Ready to restart your hot meal deliveries in Hyderabad?</p>
        </div>

        <button
          onClick={handleResume}
          disabled={loading}
          className="w-full py-3.5 px-4 bg-tertiary hover:bg-tertiary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors"
        >
          {loading ? 'Resuming...' : 'Confirm Resume Now'}
        </button>
      </div>
    </div>
  );
}
