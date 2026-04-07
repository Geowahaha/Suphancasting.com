import { NextResponse } from 'next/server';
import { callGroq } from '@/lib/ai/groq';

const BLOG_SYSTEM_PROMPT = `You are a professional content writer for Suphancasting, a precision metal casting factory in Thailand (since 1988).
Write SEO-optimized blog posts about metal casting topics. Include:
- SEO title and meta description
- Introduction with keywords
- Main sections with headings (H2, H3)
- Conclusion with call-to-action
Format as JSON with fields: title, metaDescription, intro, sections (array with heading and content), conclusion, keywords`;

const BLOG_TOPICS = {
  sand_casting: 'Write a comprehensive guide about Sand Casting process, techniques, advantages, and applications for industrial buyers.',
  investment_casting: 'Create a blog post about the benefits of Investment Casting for high-precision parts in aerospace, medical, and automotive industries.',
  die_casting: 'Write about Die Casting applications, materials, and why Thailand is becoming a hub for die casting manufacturing.',
  quality_control: 'Create content about quality control and inspection processes in metal casting, including X-ray, ultrasonic testing, and CMM inspection.'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = body.topic || 'sand_casting';
    const model = body.model || 'llama-3.1-70b-versatile';
    const maxTokens = body.maxTokens || 2048;

    const prompt = BLOG_TOPICS[topic as keyof typeof BLOG_TOPICS] || BLOG_TOPICS.sand_casting;

    const response = await callGroq({
      model,
      messages: [
        { role: 'system', content: BLOG_SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
    });

    const content = response.choices[0]?.message?.content || 'No content generated';

    return NextResponse.json({
      success: true,
      content,
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
