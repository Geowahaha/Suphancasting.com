import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ success: false, error: 'GROQ_API_KEY not set' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'user', content: 'Say "Groq is working!" in one word.' }],
        max_tokens: 20
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ success: false, error: `Groq error ${response.status}`, details: error }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      message: data.choices?.[0]?.message?.content || 'No response',
      model: data.model
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
