import React, { useState } from 'react';
import axios from 'axios';
import LevelPieChart from '../components/charts/LevelPieChart';

const TargetMarket = () => {
  const [topic, setTopic] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await axios.get(`/api/creator/target-market?topic=${encodeURIComponent(topic)}`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching market insights:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Target Market Insights</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Understand your audience demographics and preferred platforms.</p>
        
        <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Explore a topic (e.g. bms, motor design)"
            className="flex-grow bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
          />
          <button
            type="submit"
            className="bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            EXPLORE
          </button>
        </form>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mb-4"></div>
          <p className="text-slate-500 font-bold animate-pulse">Analyzing audience data...</p>
        </div>
      ) : data ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Section 1: Pie Chart */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Audience Levels</h3>
              <LevelPieChart data={data.level_breakdown} dominantLevel={data.dominant_level} />
            </div>

            {/* Section 2: Avg Price by Level */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Avg Price by Level</h3>
              <div className="space-y-4">
                {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                  <div 
                    key={lvl}
                    className={`p-4 rounded-2xl flex justify-between items-center transition-all ${
                      data.dominant_level === lvl 
                        ? 'bg-emerald-50 border-2 border-emerald-500 shadow-sm' 
                        : 'bg-slate-50 border border-slate-100'
                    }`}
                  >
                    <span className={`font-bold capitalize ${data.dominant_level === lvl ? 'text-emerald-700' : 'text-slate-600'}`}>
                      {lvl} {data.dominant_level === lvl && <span className="ml-2 text-[10px] bg-emerald-200 px-2 py-0.5 rounded-full uppercase">Dominant</span>}
                    </span>
                    <span className="text-xl font-black text-slate-900">₹{data.avg_price_by_level[lvl]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Top Platforms */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Preferred Platforms</h3>
              <div className="flex flex-wrap gap-4">
                {data.top_platforms.map((platform, index) => (
                  <div 
                    key={platform}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-sm border border-slate-100 ${
                      index < 2 ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                      index < 2 ? 'bg-white/20' : 'bg-slate-200'
                    }`}>
                      #{index + 1}
                    </span>
                    <span className="font-bold text-lg uppercase tracking-tight">{platform}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Insight Callout */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 border-l-8 border-l-lime-400">
              <div className="flex items-start gap-4">
                <div className="bg-lime-100 p-3 rounded-2xl">
                  <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-2">Market Strategic Insight</h4>
                  <p className="text-xl text-slate-600 italic leading-relaxed">
                    "{data.insight}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-bold text-lg">No audience data found for this topic.</p>
          <p className="text-slate-400 text-sm mt-1">Try another keyword to uncover insights.</p>
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-slate-500 font-bold">Pick a topic to explore its audience</p>
        </div>
      )}
    </div>
  );
};

export default TargetMarket;
