import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wqhnngaygjeclqujtrkc.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data: blog, error: blogError } = await supabase
      .from('ai_content')
      .select('*')
      .eq('type', 'blog-post')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const { data: image, error: imageError } = await supabase
      .from('ai_content')
      .select('*')
      .eq('type', 'image-prompt')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const { data: video, error: videoError } = await supabase
      .from('ai_content')
      .select('*')
      .eq('type', 'video-script')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (blogError && imageError && videoError) {
      console.error('All queries failed:', { blogError, imageError, videoError });
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch content'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      latest: {
        blogPost: blog || null,
        imagePrompt: image || null,
        videoScript: video || null
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
