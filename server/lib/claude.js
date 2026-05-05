/**
 * AI API Client
 * Wraps Hugging Face Inference API for mistralai/Mistral-7B-Instruct-v0.3.
 * Maintains askClaude signature for backward compatibility with existing services.
 */

import 'dotenv/config';

export async function askClaude(prompt, systemPrompt = '') {
  const apiKey = process.env.HF_API_KEY;

  if (!apiKey) {
    throw new Error('HF_API_KEY is missing');
  }

  let inputText;
  if (systemPrompt) {
    inputText = systemPrompt + '\n\n' + prompt;
  } else {
    inputText = prompt;
  }

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        inputs: inputText,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.3,
          return_full_text: false
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || response.statusText);
    }

    const data = await response.json();
    return data[0].generated_text;
  } catch (error) {
    throw new Error('HF API call failed: ' + error.message);
  }
}
