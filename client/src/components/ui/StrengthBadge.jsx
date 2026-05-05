import React from 'react';

const StrengthBadge = ({ strength }) => {
  const configs = {
    'High Rating': 'bg-amber-100 text-amber-800 border-amber-200',
    'Low Price': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Popular Platform': 'bg-blue-100 text-blue-800 border-blue-200',
    'Hidden Gem': 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const style = configs[strength] || 'bg-slate-100 text-slate-800 border-slate-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${style}`}>
      {strength === 'Hidden Gem' && <span className="mr-1 text-sm">✦</span>}
      {strength}
    </span>
  );
};

export default StrengthBadge;
