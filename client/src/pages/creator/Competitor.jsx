import React, { useState } from 'react';
import { getCompetitor, getCreatorSuggestions } from '../../lib/api.js';
import AISummary from '../../components/AISummary';

const CompetitorPage = () => {
  const [topic, setTopic] = useState('');
  const [competitors, setCompetitors] = useState([]);
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!topic) return;
    setLoading(true);
    const compData = await getCompetitor(topic);
    setCompetitors(compData);
    
    // For demo, get suggestions for the first competitor as if it were the creator's course
    if (compData.length > 0) {
      const suggestData = await getCreatorSuggestions(compData[0].id);
      setSuggestions(suggestData);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-12">
      <header className="max-w-xl">
        <h1 className="text-3xl font-bold text-slate-900">Competitor Analysis</h1>
        <p className="text-slate-500 mt-2">Enter a topic to see who else is teaching it and how you compare.</p>
        
        <form onSubmit={handleSearch} className="mt-6 flex gap-2">
          <input 
            type="text"
            placeholder="e.g. Battery Management"
            className="flex-1 rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button type="submit" className="bg-slate-900 text-white px-6 py-2 rounded-md font-medium hover:bg-slate-800">
            Analyze
          </button>
        </form>
      </header>

      {loading ? (
        <div>Analyzing market...</div>
      ) : competitors.length > 0 ? (
        <div className="space-y-12">
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Market Leaders in "{topic}"</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {competitors.map(c => (
                <div key={c.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-900">{c.title}</h4>
                    <span className="text-emerald-600 font-bold">₹{c.price_inr}</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-500">{c.platform} • ⭐ {c.rating}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.strengths?.map(s => (
                      <span key={s} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {suggestions && (
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">AI Strategic Suggestions</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Pricing Advice</h4>
                    <p className="text-slate-700">{suggestions.pricing_advice}</p>
                    <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                      <span className="text-sm text-emerald-800 font-medium">Recommended Price: </span>
                      <span className="text-lg font-bold text-emerald-600">₹{suggestions.recommended_price_inr}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Content Gaps</h4>
                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                      {suggestions.content_gaps.map((gap, i) => <li key={i}>{gap}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Improvement Roadmap</h4>
                  <div className="space-y-4">
                    {suggestions.improvement_tips.map((tip, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs">{i+1}</span>
                        <p className="text-slate-700 text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      ) : topic && (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500">No competitors found for this topic. Maybe it's a blue ocean? 🌊</p>
        </div>
      )}
    </div>
  );
};

export default CompetitorPage;
