import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'API key not found' }, { status: 500 });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'user', content: 'Reply with "OK"' }],
        max_tokens: 10,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ 
        success: false, 
        error: `Groq API error: ${response.status}`,
        details: errorData 
      }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ 
      success: true, 
      status: 'connected',
      model: data.model,
      response: data.choices?.[0]?.message?.content
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
