import React, { useState, useEffect } from 'react';
import { searchCourses } from '../../lib/api.js';
import PriceCompareCard from '../../components/PriceCompareCard';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ platform: '', max_price: 5000, level: '', topic: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadResults = async () => {
    setLoading(true);
    const data = await searchCourses({ q: query, ...filters });
    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    loadResults();
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadResults();
  };

  // const loadResults = async () => {
  //   setLoading(true);

  //   const data = await searchCourses({ q: query, ...filters });

  //   const filtered = data.filter((c) => {
  //     return (
  //       (!filters.platform || c.platform === filters.platform) &&
  //       (!filters.level || c.level === filters.level) &&
  //       (!filters.topic || c.category === filters.topic) &&
  //       c.price <= Number(filters.max_price) &&
  //       (!query || c.title.toLowerCase().includes(query.toLowerCase()))
  //     );
  //   });

  //   setResults(filtered);
  //   setLoading(false);
  // };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-4">Filters</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Platform</label>
              <select
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                value={filters.platform}
                onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
              >
                <option value="">All Platforms</option>
                <option value="udemy">Udemy</option>
                <option value="coursera">Coursera</option>
                <option value="internshala">Internshala</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Max Price: ₹{filters.max_price}</label>
              <input
                type="range" min="0" max="10000" step="100"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 mt-2"
                value={filters.max_price}
                onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Level</label>
              <select
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                value={filters.level}
                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Topic</label>
              <select
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                value={filters.topic}
                onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
              >
                <option value="">All Topics</option>
                <option value="battery">Battery/BMS</option>
                <option value="charging">Charging</option>
                <option value="motor">Motors</option>
                <option value="general">General EV</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search EV courses..."
            className="flex-1 rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-md font-medium hover:bg-emerald-700">
            Search
          </button>
        </form>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-pulse">
            {[1, 2, 4].map(i => <div key={i} className="bg-white h-48 rounded-lg shadow-sm border" />)}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {results.map(course => <PriceCompareCard key={course.id} course={course} />)}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed">
            <p className="text-slate-500">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
