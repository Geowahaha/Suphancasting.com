import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    test: 'hello from status route',
    groqKey: !!process.env.GROQ_API_KEY 
  });
}
