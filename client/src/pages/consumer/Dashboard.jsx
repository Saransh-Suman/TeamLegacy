import React, { useState, useEffect } from 'react';
import { searchCourses } from '../../lib/api.js';
import PriceCompareCard from '../../components/PriceCompareCard';

const ConsumerDashboard = () => {
  const [stats, setStats] = useState({ total: 0, avgPrice: 0, platforms: 0 });
  const [gems, setGems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const courses = await searchCourses({});
      const total = courses.length;
      const avgPrice = courses.reduce((acc, c) => acc + c.price_inr, 0) / total;
      const platforms = new Set(courses.map(c => c.platform)).size;
      
      setStats({ total, avgPrice: Math.round(avgPrice), platforms });
      setGems(courses.filter(c => c.hidden_gem).slice(0, 3));
    };
    loadData();
  }, []);

  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Track EV Course Prices & Save
        </h1>
        <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
          We monitor Udemy, Coursera, and Internshala to find you the best deals on Electric Vehicle education.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          { label: 'Courses Tracked', value: stats.total },
          { label: 'Average Price', value: `₹${stats.avgPrice}` },
          { label: 'Platforms', value: stats.platforms },
        ].map((stat) => (
          <div key={stat.label} className="bg-white overflow-hidden shadow rounded-lg border border-slate-100">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-slate-500 truncate">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-semibold text-emerald-600">{stat.value}</dd>
            </div>
          </div>
        ))}
      </div>

      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Hidden Gems 💎</h2>
          <p className="text-sm text-slate-500">High rating, low price courses we found for you.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gems.map(course => (
            <PriceCompareCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ConsumerDashboard;
