import React from 'react';
import { Link } from 'react-router-dom';

const CreatorDashboard = () => {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Course Creator Insights
        </h1>
        <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
          Analyze market trends, monitor competitors, and optimize your course pricing with AI-driven suggestions.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Link to="/creator/trending" className="group bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-emerald-500 transition-colors">
          <div className="text-3xl mb-4">📈</div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600">Market Trends</h3>
          <p className="mt-2 text-slate-500">Discover which EV topics are in high demand and see average pricing across platforms.</p>
        </Link>

        <Link to="/creator/competitor" className="group bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-emerald-500 transition-colors">
          <div className="text-3xl mb-4">⚔️</div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600">Competitor Analysis</h3>
          <p className="mt-2 text-slate-500">Compare your courses against the market leaders and get AI suggestions for improvement.</p>
        </Link>
      </div>

      <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-emerald-400 font-bold text-xl mb-2">01. Scrape</div>
            <p className="text-slate-400">Our bots crawl Udemy, Coursera, and Internshala every 6 hours for the latest EV courses.</p>
          </div>
          <div>
            <div className="text-emerald-400 font-bold text-xl mb-2">02. Analyze</div>
            <p className="text-slate-400">We process the data to identify "Hidden Gems" and high-demand topics for creators.</p>
          </div>
          <div>
            <div className="text-emerald-400 font-bold text-xl mb-203. Optimize">03. Optimize</div>
            <p className="text-slate-400">Claude AI provides personalized pricing advice and identifies content gaps in your niche.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatorDashboard;
