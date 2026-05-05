import 'dotenv/config';

async function test(modelName) {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log(`Testing ${modelName}...`);
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: "hi" }] }] })
      }
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log(modelName, 'FAILED:', errorData.error?.message || response.statusText);
    } else {
      const data = await response.json();
      console.log(modelName, 'SUCCESS:', data.candidates[0].content.parts[0].text);
    }
  } catch (err) {
    console.error(modelName, 'ERROR:', err);
  }
}

async function run() {
  await test('gemini-3.1-flash-lite-preview');
}
run();
