import { NextResponse } from 'next/server';
import { callGroq } from '@/lib/ai/groq';

const IMAGE_SYSTEM_PROMPT = `You are a professional image prompt generator for Suphancasting, a precision metal casting factory in Thailand (since 1988).
Generate detailed prompts for AI image generators (Midjourney, DALL-E, Stable Diffusion) about metal casting.
Include:
- Subject description
- Style (photorealistic, industrial photography)
- Lighting details
- Composition notes
Format as JSON with fields: prompt, negativePrompt, style, aspectRatio, keywords`;

const IMAGE_TOPICS = {
  casting_process: 'Generate an image prompt showing the metal casting process - molten metal being poured into a mold.',
  finished_parts: 'Create a prompt for high-quality finished metal casting parts with precise details.',
  factory_equipment: 'Generate a prompt for industrial foundry equipment - furnaces, cranes, and casting machinery.',
  quality_inspection: 'Create a prompt showing quality control inspection of metal castings in a modern lab setting.'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = body.topic || 'casting_process';
    const model = body.model || 'llama-3.1-70b-versatile';
    const maxTokens = body.maxTokens || 1024;

    const prompt = IMAGE_TOPICS[topic as keyof typeof IMAGE_TOPICS] || IMAGE_TOPICS.casting_process;

    const response = await callGroq({
      model,
      messages: [
        { role: 'system', content: IMAGE_SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
    });

    const prompt_text = response.choices[0]?.message?.content || 'No prompt generated';

    return NextResponse.json({
      success: true,
      prompt: prompt_text,
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
