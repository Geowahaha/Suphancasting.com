import { NextResponse } from 'next/server';

interface ContentItem {
  id: string;
  type: 'blog-post' | 'image-prompt' | 'video-script';
  topic: string;
  content: string;
  model: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

const contentStore = new Map<string, ContentItem>();
const contentByType = new Map<string, ContentItem[]>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, topic, content, model, metadata } = body;

    if (!type || !content) {
      return NextResponse.json({ success: false, error: 'Missing type or content' }, { status: 400 });
    }

    const id = `${type}-${Date.now()}`;
    const item: ContentItem = {
      id,
      type,
      topic: topic || 'general',
      content,
      model: model || 'llama-3.3-70b-versatile',
      createdAt: new Date().toISOString(),
      metadata
    };

    contentStore.set(id, item);

    if (!contentByType.has(type)) {
      contentByType.set(type, []);
    }
    const typeList = contentByType.get(type)!;
    typeList.unshift(item);
    if (typeList.length > 50) typeList.pop();

    return NextResponse.json({
      success: true,
      id,
      message: `${type} saved successfully`,
      createdAt: item.createdAt
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Use POST to save content',
    usage: {
      method: 'POST',
      body: {
        type: 'blog-post | image-prompt | video-script',
        topic: 'topic-name',
        content: 'the generated content',
        model: 'model-name'
      }
    }
  });
}
