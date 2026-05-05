/**
 * Creator AI Service
 */

import { askClaude } from '../../lib/claude.js';

export async function getCreatorSuggestions(course, competitors) {
  const systemPrompt = 'You are a strategic business consultant for online course creators. Return only valid JSON.';
  const prompt = `
    Analyze the following course and its competitors to provide strategic advice:
    
    Target Course:
    Title: ${course.title}
    Price: ₹${course.price_inr}
    Rating: ${course.rating}/5
    
    Competitors:
    ${competitors.map(c => `- ${c.title} (Price: ₹${c.price_inr}, Rating: ${c.rating})`).join('\n')}
    
    Return a JSON object with these fields:
    - pricing_advice (string)
    - content_gaps (array of strings)
    - improvement_tips (array of strings)
    - recommended_price_inr (number)
  `;

  const response = await askClaude(prompt, systemPrompt);
  
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : response);
  } catch (error) {
    console.error('Failed to parse Claude response:', response);
    throw new Error('Failed to generate creator suggestions');
  }
}
