import React from 'react';

const VerdictBadge = ({ verdict }) => {
  const configs = {
    overpriced: {
      color: 'bg-red-50 border-red-200 text-red-700',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      ),
      text: 'Your course is overpriced'
    },
    underpriced: {
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
      text: 'Your course is underpriced'
    },
    competitive: {
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      ),
      text: 'Your pricing is competitive'
    }
  };

  const current = configs[verdict] || configs.competitive;

  return (
    <div className={`flex flex-col items-center justify-center p-8 rounded-3xl border-2 ${current.color} max-w-md mx-auto shadow-sm`}>
      <div className="mb-4 bg-white p-3 rounded-full shadow-sm">
        {current.icon}
      </div>
      <h2 className="text-2xl font-black text-center tracking-tight">
        {current.text.toUpperCase()}
      </h2>
    </div>
  );
};

export default VerdictBadge;
