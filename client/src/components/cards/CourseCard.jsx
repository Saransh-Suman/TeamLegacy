import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { id, title, platform, price_inr, rating, hours, topic, level } = course;

  const platformColors = {
    udemy: 'bg-orange-100 text-orange-700 border-orange-200',
    coursera: 'bg-blue-100 text-blue-700 border-blue-200',
    youtube: 'bg-red-100 text-red-700 border-red-200',
    default: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const levelColors = {
    beginner: 'bg-emerald-100 text-emerald-700',
    intermediate: 'bg-amber-100 text-amber-700',
    advanced: 'bg-rose-100 text-rose-700'
  };

  const platformStyle = platformColors[platform.toLowerCase()] || platformColors.default;
  const levelStyle = levelColors[level.toLowerCase()] || 'bg-slate-100 text-slate-700';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${platformStyle}`}>
            {platform}
          </span>
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${levelStyle}`}>
            {level}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>

        <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold text-slate-700">{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{hours} hrs</span>
          </div>
        </div>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-2xl font-black text-slate-900">₹{price_inr}</span>
        </div>

        <div className="mt-auto">
          <span className="inline-block bg-slate-50 text-slate-500 text-xs px-2 py-1 rounded border border-slate-100">
            #{topic}
          </span>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
        <Link 
          to={`/pricing/${id}`}
          className="text-center text-xs font-bold py-2 px-3 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
        >
          Pricing Analysis
        </Link>
        <Link 
          to={`/suggestions/${id}`}
          className="text-center text-xs font-bold py-2 px-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
        >
          AI Suggestions
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
