import React from 'react';

const PriceRangeBar = ({ data }) => {
  const { creator_price, market_avg, market_min, market_max } = data;
  
  const range = market_max - market_min;
  const getPos = (val) => {
    const pos = ((val - market_min) / range) * 100;
    return Math.min(Math.max(pos, 0), 100); // Clamp between 0-100
  };

  const creatorPos = getPos(creator_price);
  const avgPos = getPos(market_avg);

  return (
    <div className="w-full py-12 px-4">
      <div className="relative h-4 bg-slate-100 rounded-full border border-slate-200">
        {/* Track labels */}
        <div className="absolute -top-8 left-0 text-xs font-bold text-slate-400">₹{market_min} (Min)</div>
        <div className="absolute -top-8 right-0 text-xs font-bold text-slate-400 text-right">₹{market_max} (Max)</div>

        {/* Market Avg Marker */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 h-8 w-1 border-r-2 border-dashed border-slate-400"
          style={{ left: `${avgPos}%` }}
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap font-bold">
            MARKET AVG: ₹{market_avg}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
        </div>

        {/* Creator Price Marker */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
          style={{ left: `${creatorPos}%` }}
        >
          {/* Marker Point */}
          <div className="w-6 h-6 bg-lime-400 border-4 border-white rounded-full shadow-lg -translate-x-1/2 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
          </div>
          
          {/* Label Below */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
            <div className="text-lime-600 font-black text-sm whitespace-nowrap">YOUR PRICE</div>
            <div className="text-slate-900 font-bold text-lg">₹{creator_price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeBar;
