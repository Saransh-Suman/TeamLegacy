import React, { useState } from 'react';
import axios from 'axios';
import StrengthBadge from '../components/ui/StrengthBadge';

const CompetitorAnalysis = () => {
  const [topic, setTopic] = useState('');
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await axios.get(`/api/creator/competitor?topic=${encodeURIComponent(topic)}`);
      // Sort by rating descending
      const sorted = [...(response.data.competitors || [])].sort((a, b) => b.rating - a.rating).slice(0, 10);
      setCompetitors(sorted);
    } catch (error) {
      console.error('Error fetching competitors:', error);
      setCompetitors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Market Benchmarking</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Analyze your competition and identify strategic advantages in the EV space.</p>
        
        <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Search by topic (e.g. battery, bms)"
            className="flex-grow bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
          />
          <button
            type="submit"
            className="bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            ANALYZE
          </button>
        </form>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mb-4"></div>
          <p className="text-slate-500 font-bold animate-pulse">Scanning market leaders...</p>
        </div>
      ) : competitors.length > 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">#</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Course Title</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Platform</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 text-center">Price</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 text-center">Rating</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 text-center">Hours</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Market Strengths</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c, index) => (
                  <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-slate-400 font-bold">{index + 1}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 max-w-xs truncate">{c.title}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-600 px-2 py-1 bg-slate-100 rounded">
                        {c.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-black text-emerald-600">₹{c.price_inr}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-slate-700">
                        {c.rating}
                        <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-500 font-medium">{c.hours}h</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {c.strengths?.map((s, i) => (
                          <StrengthBadge key={i} strength={s} />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-bold text-lg">No competitors found for this topic.</p>
          <p className="text-slate-400 text-sm mt-1">Try a more general term like "battery" or "electric".</p>
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-slate-500 font-bold">Enter a topic above to see competitors</p>
        </div>
      )}
    </div>
  );
};

export default CompetitorAnalysis;
