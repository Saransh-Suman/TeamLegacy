import React from 'react';
import { useNavigate } from 'react-router-dom';
import HiddenGemBadge from './HiddenGemBadge';

const PriceCompareCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/course/${course.id}`)}
      className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide
            ${course.platform === 'udemy' ? 'bg-purple-100 text-purple-800' : 
              course.platform === 'coursera' ? 'bg-blue-100 text-blue-800' : 
              'bg-orange-100 text-orange-800'}`}
          >
            {course.platform}
          </span>
          <HiddenGemBadge hidden_gem={course.hidden_gem} />
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-600 transition-colors h-14">
          {course.title}
        </h3>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-900">₹{course.price_inr}</span>
            {course.original_price_inr > course.price_inr && (
              <span className="text-sm text-slate-400 line-through">₹{course.original_price_inr}</span>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-slate-900">⭐ {course.rating}</div>
            <div className="text-xs text-slate-500">{course.hours} hours</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCompareCard;
