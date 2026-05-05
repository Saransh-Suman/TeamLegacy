import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { searchCourses, getCourseSummary } from '../../lib/api.js';
import AISummary from '../../components/AISummary';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      const courses = await searchCourses({});
      const found = courses.find(c => String(c.id) === id);
      setCourse(found);
      
      // Mock history data
      setHistory([
        { date: '2024-01-01', price: found?.price_inr + 200 },
        { date: '2024-02-01', price: found?.price_inr + 100 },
        { date: '2024-03-01', price: found?.price_inr },
        { date: '2024-04-01', price: found?.price_inr - 50 },
        { date: '2024-05-01', price: found?.price_inr },
      ]);
      setLoading(false);
    };
    loadCourse();
  }, [id]);

  if (loading) return <div className="animate-pulse space-y-8">...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 uppercase tracking-wide">
              {course.platform}
            </span>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">{course.title}</h1>
            <div className="mt-4 flex items-center space-x-4 text-sm text-slate-500">
              <span>⭐ {course.rating} Rating</span>
              <span>⏱️ {course.hours} Hours</span>
              <span className="capitalize">📊 {course.level}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-emerald-600">₹{course.price_inr}</div>
            {course.original_price_inr > course.price_inr && (
              <div className="text-slate-400 line-through">₹{course.original_price_inr}</div>
            )}
            <div className="mt-4">
              <a href={course.url} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 text-white px-6 py-2 rounded-md font-medium hover:bg-emerald-700">
                View on {course.platform}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Price History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" hide />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">AI Course Analysis</h3>
          <AISummary courseId={id} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
