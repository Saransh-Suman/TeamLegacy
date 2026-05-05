/**
 * User AI Service
 */

import { askClaude } from '../../lib/claude.js';

export async function summarizeCourse(course) {
  const systemPrompt = 'You are an expert educational consultant. Return only valid JSON.';
  const prompt = `
    Summarize the following course for a potential student:
    Title: ${course.title}
    Platform: ${course.platform}
    Price: ₹${course.price_inr}
    Rating: ${course.rating}/5
    Hours: ${course.hours}
    
    Return a JSON object with these fields:
    - outcomes (array of strings)
    - study_plan (string, 2-3 sentences)
    - verdict (string, 1 sentence)
    - estimated_completion_weeks (number)
  `;

  const response = await askClaude(prompt, systemPrompt);
  
  try {
    // Basic JSON extraction if Claude adds prose
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : response);
  } catch (error) {
    console.error('Failed to parse Claude response:', response);
    throw new Error('Failed to generate course summary');
  }
}
