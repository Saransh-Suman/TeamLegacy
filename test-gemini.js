import { askClaude } from './server/lib/claude.js';
import { supabase } from './server/lib/supabase.js';
import { getCompetitors } from './server/services/creator/competitorService.js';

async function test() {
  try {
    const { data: course } = await supabase
      .from('creator_courses')
      .select('*')
      .eq('id', 'ee624765-2fdc-4e81-ba32-984d096381ad')
      .single();

    const competitors = await getCompetitors(course.topic);

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

    console.log('CALLING GEMINI...');
    const res = await askClaude(prompt, systemPrompt);
    console.log('RAW RESPONSE:', res);
    
    const cleaned = res.replace(/```json\n?|```/g, '').trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : cleaned);
    console.log('PARSED SUCCESSFULLY');
    console.log(parsed);
  } catch (err) {
    console.error('ERROR:', err.message);
    if (err.stack) console.error(err.stack);
  }
}

test();
