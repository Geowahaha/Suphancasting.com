import { NextResponse } from 'next/server';
import { callGroq } from '@/lib/ai/groq';

const VIDEO_SYSTEM_PROMPT = `You are a professional video script writer for Suphancasting, a precision metal casting factory in Thailand (since 1988). 
Generate engaging video scripts about metal casting processes. Include:
- A compelling hook (first 3 seconds)
- Main content with clear sections
- A call-to-action
Format as JSON with fields: title, hook, sections (array with heading and content), duration, cta`;

const TOPIC_SCRIPTS = {
  sand_casting: 'Generate a video script about the Sand Casting process at Suphancasting factory in Suphan Buri, Thailand. Include the step-by-step process from pattern making to finished casting.',
  investment_casting: 'Create a video script about Investment Casting (Lost Wax Casting) for aerospace and automotive parts. Highlight precision and quality control.',
  die_casting: 'Write a video script about Die Casting process for high-volume production. Show efficiency and consistency.',
  factory_tour: 'Create an engaging factory tour script showcasing Suphancasting facilities, equipment, and team expertise.',
  test: 'Write a short test script to verify AI connectivity.'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = body.topic || 'sand_casting';
    const model = body.model || 'llama-3.1-70b-versatile';
    const maxTokens = body.maxTokens || 1024;

    const prompt = TOPIC_SCRIPTS[topic as keyof typeof TOPIC_SCRIPTS] || TOPIC_SCRIPTS.sand_casting;

    const response = await callGroq({
      model,
      messages: [
        { role: 'system', content: VIDEO_SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
    });

    const script = response.choices[0]?.message?.content || 'No script generated';

    return NextResponse.json({
      success: true,
      script,
      model: response.model,
      usage: response.usage,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      success: false,
      error: message,
    }, { status: 500 });
  }
}
