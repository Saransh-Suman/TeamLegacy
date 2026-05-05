import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VerdictBadge from '../components/ui/VerdictBadge';
import PriceRangeBar from '../components/charts/PriceRangeBar';

const PricingAnalysis = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/creator/pricing-analysis/${id}`);
        setData(response.data.analysis);
      } catch (error) {
        console.error('Error fetching pricing analysis:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-12 py-12 animate-pulse">
        <div className="h-48 bg-slate-100 rounded-3xl w-full max-w-md mx-auto"></div>
        <div className="h-12 bg-slate-100 rounded-full w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-slate-100 rounded-2xl"></div>
          <div className="h-32 bg-slate-100 rounded-2xl"></div>
          <div className="h-32 bg-slate-100 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!data) return <div className="text-center py-20">No analysis data found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-8">
      {/* Top Section: Verdict */}
      <section className="flex justify-center">
        <VerdictBadge verdict={data.verdict} />
      </section>

      {/* Middle Section: Price Range Bar */}
      <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Market Positioning</h3>
        <PriceRangeBar data={data} />
      </section>

      {/* Bottom Section: Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">Your Price</p>
          <p className="text-4xl font-black text-slate-900">₹{data.creator_price}</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">Market Avg</p>
          <p className="text-4xl font-black text-slate-900">₹{data.market_avg}</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Percentile</p>
          
          <div className="relative w-24 h-24 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - data.percentile / 100)}
                className="text-emerald-500 transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-slate-900">
              {data.percentile}%
            </div>
          </div>
          
          <p className="text-sm font-bold text-slate-600">
            Pricier than {data.percentile}% of courses
          </p>
        </div>
      </section>
    </div>
  );
};

export default PricingAnalysis;
