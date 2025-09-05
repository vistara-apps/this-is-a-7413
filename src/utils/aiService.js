import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'your-openai-api-key-here',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export const generateContent = async (prompt, state = null) => {
  try {
    const systemPrompt = `You are a legal information assistant for the Pocket Protector app. Provide accurate, concise legal information about police interactions and constitutional rights. Always include disclaimers that this is not legal advice and users should consult with attorneys for specific situations.`;

    const userPrompt = state 
      ? `${prompt} Focus specifically on ${state} state laws and procedures.`
      : prompt;

    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 1000,
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content || 'Unable to generate content at this time.';
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to generate content. Please check your API configuration.');
  }
};