import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CourseCard from '../components/cards/CourseCard';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/creator/courses/dev-user-1');
        setCourses(response.data.courses || []);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
        // For development/demo purposes, we can fallback to empty array or mock if needed
        // setCourses([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900">Your Courses</h1>
            <span className="bg-emerald-100 text-emerald-700 text-sm font-bold px-3 py-1 rounded-full">
              {courses.length} {courses.length === 1 ? 'course' : 'courses'}
            </span>
          </div>
          <p className="text-slate-500 mt-1">Manage and optimize your EV course portfolio.</p>
        </div>
        <Link 
          to="/creator/register"
          className="bg-lime-400 hover:bg-lime-500 text-black font-bold px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md text-center"
        >
          + Register New Course
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
          {error}
        </div>
      )}

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="max-w-md mx-auto">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No courses yet</h2>
            <p className="text-slate-500 mb-8">
              You haven't registered any courses for tracking yet. 
              Start by listing your first course to get pricing insights.
            </p>
            <Link 
              to="/creator/register"
              className="inline-block bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Register Your First Course
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
