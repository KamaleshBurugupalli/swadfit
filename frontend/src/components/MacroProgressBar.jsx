import React from 'react';

export default function MacroProgressBar({ label, consumed, target, unit = 'g', showDetails = true }) {
  const percentage = Math.round((consumed / (target || 1)) * 100);

  // Color selection: Green (<=90%), Amber (91-100%), Red (>100%)
  let barColorClass = 'bg-tertiary'; // Forest Green
  let badgeColorClass = 'bg-tertiary-fixed text-on-tertiary-fixed';

  if (percentage > 100) {
    barColorClass = 'bg-error'; // Red
    badgeColorClass = 'bg-error-container text-on-error-container';
  } else if (percentage >= 90) {
    barColorClass = 'bg-secondary-container'; // Amber / Turmeric Gold
    badgeColorClass = 'bg-secondary-fixed text-on-secondary-fixed';
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-xs mb-1">
        <span className="font-semibold text-on-surface flex items-center gap-1">
          {label}
        </span>
        <span className="font-medium text-outline">
          <strong className="text-on-surface font-bold">{consumed}</strong> / {target} {unit} ({percentage}%)
        </span>
      </div>
      
      <div className="w-full bg-surface-variant rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ${barColorClass}`}
          style={{ width: `${Math.min(100, percentage)}%` }}
        />
      </div>

      {percentage > 100 && (
        <div className="mt-1 flex items-center text-[10px] text-error font-medium gap-1">
          <span className="material-symbols-outlined text-xs">warning</span>
          <span>+{consumed - target}{unit} over daily goal</span>
        </div>
      )}
    </div>
  );
}
