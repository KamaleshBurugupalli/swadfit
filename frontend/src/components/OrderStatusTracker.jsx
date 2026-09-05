import React from 'react';

export default function OrderStatusTracker({ status = 'Out for Delivery' }) {
  const steps = ['Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
  const currentIndex = steps.indexOf(status) > -1 ? steps.indexOf(status) : 2;

  return (
    <div className="w-full bg-surface-container-lowest border border-surface-container p-6 rounded-3xl shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs text-outline font-semibold uppercase tracking-wider block">Live Delivery Status</span>
          <h3 className="font-display text-xl font-bold text-on-surface">{status}</h3>
        </div>
        <span className="bg-secondary-fixed text-on-secondary-fixed font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span> ETA: ~25 Mins
        </span>
      </div>

      {/* Progress Steps */}
      <div className="relative flex items-center justify-between">
        {/* Track Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface-variant -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-500 z-0"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, idx) => {
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                isDone 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-surface-container text-outline'
              } ${isCurrent ? 'ring-4 ring-primary-fixed' : ''}`}>
                {idx + 1}
              </div>
              <span className={`text-[11px] font-semibold mt-2 ${isDone ? 'text-on-surface' : 'text-outline'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
