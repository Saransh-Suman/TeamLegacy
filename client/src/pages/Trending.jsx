import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DemandBarChart from '../components/charts/DemandBarChart';

const TrendingPage = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('demand_score'); // 'demand_score' or 'avg_rating'

  useEffect(() => {
    const loadTrends = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/creator/trending');
        setTrends(response.data.topics || []);
      } catch (error) {
        console.error('Error loading trending data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTrends();
  }, []);

  const sortedTrends = [...trends].sort((a, b) => b[sortBy] - a[sortBy]);
  const maxDemand = Math.max(...trends.map(t => t.demand_score), 0);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/4"></div>
        <div className="h-[400px] bg-slate-100 rounded-xl"></div>
        <div className="space-y-4">
          <div className="h-12 bg-slate-200 rounded"></div>
          <div className="h-12 bg-slate-200 rounded"></div>
          <div className="h-12 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Market Trends</h1>
        <p className="text-slate-500 mt-1">Real-time demand analysis across EV education topics.</p>
      </header>

      {/* Section 1: Bar Chart */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-8">Topic Demand Score</h2>
        <DemandBarChart data={trends} />
      </section>

      {/* Section 2: Data Table */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900">Topic Comparison</h2>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setSortBy('demand_score')}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${
                sortBy === 'demand_score' 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Demand Score
            </button>
            <button
              onClick={() => setSortBy('avg_rating')}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${
                sortBy === 'avg_rating' 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Avg Rating
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Topic</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Courses</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Avg Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Avg Rating</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Demand Index</th>
              </tr>
            </thead>
            <tbody>
              {sortedTrends.map((trend, index) => (
                <tr 
                  key={trend.topic} 
                  className={`border-b border-slate-50 transition-colors hover:bg-slate-50/50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                  }`}
                >
                  <td className="px-6 py-4 font-bold text-slate-900 capitalize">{trend.topic}</td>
                  <td className="px-6 py-4 text-center text-slate-600 font-medium">{trend.course_count}</td>
                  <td className="px-6 py-4 text-center text-emerald-600 font-bold">₹{trend.avg_price}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-700">
                      {trend.avg_rating}
                      <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </td>
                  <td className="px-6 py-4 min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-slate-900 w-8">{trend.demand_score}</span>
                      <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-lime-400 rounded-full"
                          style={{ width: `${(trend.demand_score / maxDemand) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TrendingPage;
