import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  
  return NextResponse.json({ 
    success: true, 
    apiKeyFound: !!apiKey,
    apiKeyLength: apiKey ? apiKey.length : 0,
    message: 'Video script route working'
  });
}
