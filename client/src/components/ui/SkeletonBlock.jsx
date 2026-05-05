import React from 'react';

const SkeletonBlock = ({ height = 'h-32', width = 'w-full', className = '' }) => {
  return (
    <div className={`animate-pulse bg-slate-200 rounded-3xl ${height} ${width} ${className}`}></div>
  );
};

export default SkeletonBlock;
