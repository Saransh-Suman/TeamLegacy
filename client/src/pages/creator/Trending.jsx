import React, { useState, useEffect } from 'react';
import { getTrending } from '../../lib/api.js';
import TrendChart from '../../components/TrendChart';

const TrendingPage = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrends = async () => {
      const data = await getTrending();
      setTrends(data);
      setLoading(false);
    };
    loadTrends();
  }, []);

  if (loading) return <div>Loading trends...</div>;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Trending EV Topics</h1>
        <p className="text-slate-500">Identify high-growth niches in the electric vehicle education market.</p>
      </header>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Topic Demand Score</h3>
        <TrendChart data={trends} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trends.map(trend => (
          <div key={trend.topic} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h4 className="text-xl font-bold text-slate-900 capitalize mb-4">{trend.topic}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Course Count</span>
                <span className="font-semibold text-slate-900">{trend.course_count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Avg Price</span>
                <span className="font-semibold text-emerald-600">₹{trend.avg_price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Demand Score</span>
                <span className="font-semibold text-blue-600">{trend.demand_score}</span>
              </div>
              <div className="pt-4 flex gap-2">
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">Min: ₹{trend.min_price}</span>
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">Max: ₹{trend.max_price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPage;
