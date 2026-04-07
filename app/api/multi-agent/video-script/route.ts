import { NextResponse } from 'next/server';

const VIDEO_SYSTEM_PROMPT = `You are a professional video script writer for Suphancasting, a precision metal casting factory in Thailand (since 1988). 
Generate engaging video scripts about metal casting processes. Include:
- A compelling hook (first 3 seconds)
- Main content with clear sections
- A call-to-action
Format as JSON with fields: title, hook, sections (array with heading and content), duration, cta`;

const TOPIC_SCRIPTS: Record<string, string> = {
  sand_casting: 'Generate a video script about the Sand Casting process at Suphancasting factory in Suphan Buri, Thailand.',
  investment_casting: 'Create a video script about Investment Casting for aerospace and automotive parts.',
  die_casting: 'Write a video script about Die Casting process for high-volume production.',
  factory_tour: 'Create an engaging factory tour script showcasing Suphancasting facilities.',
  test: 'Write a short test script.'
};

async function callGroq(model: string, messages: Array<{ role: string; content: string }>, max_tokens: number) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY not found');
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages, max_tokens }),
  });
  
  if (!response.ok) throw new Error(`Groq error: ${response.status}`);
  return response.json();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = body.topic || 'sand_casting';
    const model = body.model || 'llama-3.1-70b-versatile';
    const maxTokens = body.maxTokens || 1024;

    const prompt = TOPIC_SCRIPTS[topic] || TOPIC_SCRIPTS.sand_casting;

    const response = await callGroq(model, [
      { role: 'system', content: VIDEO_SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ], maxTokens);

    return NextResponse.json({
      success: true,
      script: response.choices?.[0]?.message?.content || 'No script generated',
      model: response.model,
    });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
