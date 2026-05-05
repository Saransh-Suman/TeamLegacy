import React from 'react';

const SuggestionCard = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
      <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
        {icon && <span className="text-xl">{icon}</span>}
        <h3 className="font-black text-slate-900 uppercase tracking-wider text-sm">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default SuggestionCard;
