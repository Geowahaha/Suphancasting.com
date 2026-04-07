import { NextResponse } from 'next/server';
import { getGroqModel, callGroq } from '@/lib/ai/groq';

export async function GET() {
  try {
    const model = getGroqModel();
    
    const response = await callGroq({
      model,
      messages: [
        { role: 'user', content: 'Reply with exactly: "OK"' }
      ],
      max_tokens: 10,
    });

    return NextResponse.json({
      success: true,
      status: 'connected',
      model,
      usage: response.usage,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Groq API Error:', message);
    return NextResponse.json({
      success: false,
      status: 'error',
      error: message,
      envCheck: {
        GROQ_API_KEY: !!process.env.GROQ_API_KEY,
        Groq_api_key: !!(process.env as Record<string, unknown>).Groq_api_key,
      }
    }, { status: 500 });
  }
}
