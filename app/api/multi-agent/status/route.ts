import { NextResponse } from 'next/server';
import { callGroq } from '@/lib/ai/groq';

export async function GET() {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'GROQ_API_KEY not found in environment'
      }, { status: 500 });
    }

    const response = await callGroq({
      model: 'llama-3.1-70b-versatile',
      messages: [{ role: 'user', content: 'Reply with exactly: "OK"' }],
      max_tokens: 10,
    });

    return NextResponse.json({
      success: true,
      status: 'connected',
      model: response.model,
      usage: response.usage,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      success: false,
      status: 'error',
      error: message,
    }, { status: 500 });
  }
}
