import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SuggestionCard from '../components/ui/SuggestionCard';

const AISuggestions = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [suggestionsRes, priceRes] = await Promise.all([
        axios.get(`/api/creator/${id}/suggestions`),
        axios.get(`/api/creator/pricing-analysis/${id}`).catch(() => ({ data: null }))
      ]);

      setData(suggestionsRes.data);
      setPriceData(priceRes.data);
    } catch (err) {
      console.error('Error loading AI suggestions:', err);
      setError('Could not load suggestions. Try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 py-12">
        <div className="text-center space-y-4 animate-pulse">
          <div className="bg-lime-100 h-8 w-64 mx-auto rounded-full flex items-center justify-center">
            <span className="text-lime-700 font-bold text-sm">Claude is analysing your course...</span>
          </div>
          <div className="h-16 bg-slate-100 rounded-3xl w-full max-w-md mx-auto"></div>
        </div>
        <div className="h-64 bg-slate-100 rounded-3xl w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80 bg-slate-100 rounded-3xl"></div>
          <div className="h-80 bg-slate-100 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="bg-red-50 text-red-700 p-6 rounded-3xl border border-red-100 mb-6">
          {error}
        </div>
        <button 
          onClick={fetchData}
          className="bg-slate-900 text-white font-bold px-8 py-3 rounded-2xl hover:bg-slate-800 transition-all"
        >
          RETRY
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-8">
      {/* 1. Recommended Price */}
      <section className="text-center space-y-2">
        <div className="inline-block bg-lime-400 text-black font-black px-4 py-1 rounded-full text-xs uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(163,230,53,0.4)]">
          AI STRATEGY ACTIVE
        </div>
        <h1 className="text-7xl font-black text-lime-500 tracking-tighter">
          ₹{data.recommended_price_inr?.toLocaleString()}
        </h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">AI Recommended Price</p>
        {priceData && (
          <p className="text-slate-500 font-medium">
            vs your current <span className="font-bold text-slate-700">₹{priceData.creator_price?.toLocaleString()}</span>
          </p>
        )}
      </section>

      {/* 2. Pricing Advice */}
      <SuggestionCard title="Pricing Advice" icon="💡">
        <p className="text-xl text-slate-700 leading-relaxed font-medium italic">
          "{data.pricing_advice}"
        </p>
      </SuggestionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 3. Content Gaps */}
        <SuggestionCard title="Content Gaps to Fill" icon="🚩">
          <div className="space-y-3">
            {data.content_gaps?.map((gap, i) => (
              <div key={i} className="flex items-center gap-4 bg-red-50/50 p-4 rounded-2xl border border-red-100/50">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-black">
                  ✕
                </span>
                <span className="text-slate-700 font-bold">{gap}</span>
              </div>
            ))}
          </div>
        </SuggestionCard>

        {/* 4. Improvement Tips */}
        <SuggestionCard title="Improvement Tips" icon="🚀">
          <div className="space-y-3">
            {data.improvement_tips?.map((tip, i) => (
              <div key={i} className="flex items-center gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black">
                  {i + 1}
                </span>
                <span className="text-slate-700 font-bold">{tip}</span>
                <span className="ml-auto text-emerald-400">→</span>
              </div>
            ))}
          </div>
        </SuggestionCard>
      </div>
    </div>
  );
};

export default AISuggestions;
