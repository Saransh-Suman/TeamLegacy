/**
 * AI API Client
 * Wraps Google Gemini API (gemini-1.5-flash).
 * Maintains askClaude signature for backward compatibility with existing services.
 */

import 'dotenv/config';

export async function askClaude(prompt, systemPrompt = '') {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing');
  }

  const fullPrompt = systemPrompt ? systemPrompt + '\n\n' + prompt : prompt;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: fullPrompt }] }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 8192
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || response.statusText);
    }

    const data = await response.json();
    console.log('DEBUG DATA:', JSON.stringify(data, null, 2));
    
    if (data.candidates?.[0]?.finishReason && data.candidates[0].finishReason !== 'STOP') {
      console.warn('WARNING: Gemini finished with reason:', data.candidates[0].finishReason);
    }

    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    throw new Error('Gemini API call failed: ' + err.message);
  }
}
