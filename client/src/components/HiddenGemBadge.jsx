import React from 'react';

const HiddenGemBadge = ({ hidden_gem }) => {
  if (!hidden_gem) return null;
  
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
      Hidden Gem 💎
    </span>
  );
};

export default HiddenGemBadge;
