import React from 'react';
import CourseForm from '../components/forms/CourseForm';

const RegisterCourse = () => {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col lg:flex-row items-center justify-center gap-12 py-12">
      {/* Left Column: Headline and Info */}
      <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
          List Your <span className="text-emerald-600">Course</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-xl">
          Join our elite network of EV educators. In a rapidly evolving market, 
          pricing intelligence is your competitive edge. Reach the right students 
          at the right price and dominate the EV learning landscape.
        </p>
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          <div className="bg-slate-100 px-4 py-2 rounded-full text-sm font-medium text-slate-600">
            ✓ Real-time Benchmarking
          </div>
          <div className="bg-slate-100 px-4 py-2 rounded-full text-sm font-medium text-slate-600">
            ✓ Audience Insights
          </div>
          <div className="bg-slate-100 px-4 py-2 rounded-full text-sm font-medium text-slate-600">
            ✓ Revenue Optimization
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="lg:w-1/2 w-full max-w-2xl">
        <CourseForm />
      </div>
    </div>
  );
};

export default RegisterCourse;
