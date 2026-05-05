/**
 * API Wrapper Utility
 * Fetches data from the backend or falls back to mock data.
 */

import mockData from '../../../shared/mockData.json';

const fetchWithFallback = async (url, mockKey) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  } catch (error) {
    console.warn(`Falling back to mock data for ${url}:`, error.message);
    return mockData[mockKey] || {};
  }
};

export const searchCourses = async (params) => {
  const query = new URLSearchParams(params).toString();
  return fetchWithFallback(`/api/courses/search?${query}`, 'courses');
};

export const compareCourses = async (ids) => {
  return fetchWithFallback(`/api/courses/compare?ids=${ids.join(',')}`, 'courses');
};

export const getCourseSummary = async (id) => {
  try {
    const response = await fetch(`/api/courses/${id}/summary`);
    if (!response.ok) throw new Error('AI summary failed');
    return await response.json();
  } catch (error) {
    return {
      outcomes: ["Understand battery chemistry", "Master BMS design"],
      study_plan: "Week 1: Fundamentals. Week 2: Advanced topics.",
      verdict: "A solid choice for beginners.",
      estimated_completion_weeks: 4,
      ai_generated: true
    };
  }
};

export const getTrending = async () => {
  return fetchWithFallback('/api/creator/trending', 'trending_topics');
};

export const getCompetitor = async (topic) => {
  return fetchWithFallback(`/api/creator/competitor?topic=${topic}`, 'competitors');
};

export const getCreatorSuggestions = async (id) => {
  try {
    const response = await fetch(`/api/creator/${id}/suggestions`);
    if (!response.ok) throw new Error('Creator suggestions failed');
    return await response.json();
  } catch (error) {
    return {
      pricing_advice: "Your price is slightly high compared to Udemy competitors.",
      content_gaps: ["Add more hands-on labs", "Include case studies"],
      improvement_tips: ["Improve video quality", "Update course materials"],
      recommended_price_inr: 899
    };
  }
};
