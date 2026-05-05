/**
 * Main App Component
 * Handles routing and layout.
 */

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ConsumerDashboard from './pages/consumer/Dashboard';
import SearchPage from './pages/consumer/Search';
import CourseDetail from './pages/consumer/CourseDetail';
import CreatorDashboard from './pages/creator/Dashboard';
import TrendingPage from './pages/creator/Trending';
import CompetitorPage from './pages/creator/Competitor';

function App() {
  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-emerald-600">EV Tracker</Link>
              <div className="ml-10 flex space-x-4">
                <Link to="/" className="text-slate-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium">Consumer</Link>
                <Link to="/creator" className="text-slate-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium">Creator</Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link to="/search" className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700">Search Courses</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<ConsumerDashboard />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/creator" element={<CreatorDashboard />} />
          <Route path="/creator/trending" element={<TrendingPage />} />
          <Route path="/creator/competitor" element={<CompetitorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
