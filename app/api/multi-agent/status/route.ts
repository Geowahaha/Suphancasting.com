import { NextResponse } from 'next/server';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

async function callGroq(req: { model?: string; messages: Array<{ role: string; content: string }>; max_tokens?: number }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY not found');
  }
  
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: req.model || 'llama-3.1-70b-versatile',
      messages: req.messages,
      max_tokens: req.max_tokens || 1024,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${response.status} - ${error}`);
  }

  return response.json();
}

export async function GET() {
  try {
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
