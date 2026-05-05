import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = () => {
  const [formData, setFormData] = useState({
    course_url: '',
    platform: 'udemy',
    title: '',
    price_inr: '',
    rating: '',
    hours: '',
    topic: '',
    level: 'beginner'
  });

  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price_inr' || name === 'rating' || name === 'hours' 
        ? (value === '' ? '' : Number(value)) 
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await axios.post('/api/creator/register', {
        creator_id: 'dev-user-1',
        ...formData
      });

      if (response.data.success) {
        setStatus({ 
          type: 'success', 
          message: `Successfully registered: ${response.data.course.title}` 
        });
        // Reset form
        setFormData({
          course_url: '',
          platform: 'udemy',
          title: '',
          price_inr: '',
          rating: '',
          hours: '',
          topic: '',
          level: 'beginner'
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error: Course URL might already be registered.';
      setStatus({ 
        type: 'error', 
        message: errorMsg
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-1";

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto border border-slate-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        {status.type === 'success' && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg mb-4">
            {status.message}
          </div>
        )}

        {status.type === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {status.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelClasses}>Course URL</label>
            <input
              type="text"
              name="course_url"
              value={formData.course_url}
              onChange={handleChange}
              placeholder="https://..."
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Platform</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="udemy">Udemy</option>
              <option value="coursera">Coursera</option>
              <option value="youtube">YouTube</option>
              <option value="teachable">Teachable</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClasses}>Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Mastering EV Battery Tech"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Price (INR)</label>
            <input
              type="number"
              name="price_inr"
              value={formData.price_inr}
              onChange={handleChange}
              placeholder="e.g. 499"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Rating (0-5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.5"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Duration (Hours)</label>
            <input
              type="number"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              placeholder="12.5"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Topic</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="e.g. Battery Management"
              className={inputClasses}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-4 rounded-xl mt-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(163,230,53,0.6)] disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'LIST YOUR COURSE'}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
