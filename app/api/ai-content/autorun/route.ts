import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wqhnngaygjeclqujtrkc.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const GROQ_API_KEY = process.env.Groq_API_Key || process.env.GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const AGENTS = {
  'blog-post': {
    systemPrompt: 'You are a professional content writer for Suphancasting, a precision metal casting factory in Thailand (since 1988). Write SEO-optimized blog posts about metal casting topics. Format with markdown headings.',
    topics: ['sand_casting', 'investment_casting', 'die_casting', 'quality_control'],
    defaultTopic: 'sand_casting'
  },
  'image-prompt': {
    systemPrompt: 'You are an image prompt generator for Suphancasting metal casting factory. Generate detailed, cinematic prompts for AI image generators about metal casting. Include lighting, composition, and style details.',
    topics: ['casting_process', 'finished_parts', 'factory_equipment', 'quality_inspection'],
    defaultTopic: 'casting_process'
  },
  'video-script': {
    systemPrompt: 'You are a professional video script writer for Suphancasting, a precision metal casting factory in Thailand. Generate engaging video scripts about casting processes.',
    topics: ['sand_casting', 'investment_casting', 'die_casting', 'factory_tour'],
    defaultTopic: 'sand_casting'
  }
};

interface RunResult {
  agent: string;
  success: boolean;
  content?: string;
  error?: string;
  topic?: string;
  savedId?: string;
}

async function callGroq(model: string, systemPrompt: string, userPrompt: string, maxTokens = 2048) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: maxTokens
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq error ${response.status}: ${error}`);
  }

  return response.json();
}

async function saveToSupabase(type: string, topic: string, content: string, model: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('ai_content')
    .insert([{
      type,
      topic,
      content,
      model,
      published: true
    }])
    .select('id')
    .single();

  if (error) {
    console.error('Supabase save error:', error);
    return null;
  }

  return data?.id || null;
}

function getRandomTopic(topics: string[]): string {
  return topics[Math.floor(Math.random() * topics.length)];
}

async function runAgent(agentType: string, agentConfig: typeof AGENTS[keyof typeof AGENTS]): Promise<RunResult> {
  const topic = getRandomTopic(agentConfig.topics);
  const model = 'llama-3.3-70b-versatile';
  const userPrompt = `Generate content about ${topic.replace(/_/g, ' ')}.`;

  try {
    console.log(`Running ${agentType} agent with topic: ${topic}`);
    
    const groqResponse = await callGroq(model, agentConfig.systemPrompt, userPrompt, 2048);
    
    if (!groqResponse.choices || !groqResponse.choices[0]) {
      throw new Error('No response from Groq');
    }

    const content = groqResponse.choices[0].message.content;
    
    const savedId = await saveToSupabase(agentType, topic, content, model);

    return {
      agent: agentType,
      success: true,
      content: content.substring(0, 200) + '...',
      topic,
      savedId
    };
  } catch (error) {
    return {
      agent: agentType,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      topic
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() || {};
    const { agents = ['blog-post', 'image-prompt', 'video-script'] } = body;

    if (!GROQ_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'GROQ_API_KEY not configured'
      }, { status: 500 });
    }

    const results: RunResult[] = [];
    const timestamp = new Date().toISOString();

    console.log(`Starting auto-run at ${timestamp} for agents: ${agents.join(', ')}`);

    for (const agentType of agents) {
      const agentConfig = AGENTS[agentType as keyof typeof AGENTS];
      
      if (!agentConfig) {
        results.push({
          agent: agentType,
          success: false,
          error: `Unknown agent type: ${agentType}`
        });
        continue;
      }

      const result = await runAgent(agentType, agentConfig);
      results.push(result);

      // Small delay between agents to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    return NextResponse.json({
      success: true,
      timestamp,
      summary: {
        total: results.length,
        successful: successCount,
        failed: failCount
      },
      results
    });
  } catch (error) {
    console.error('Auto-run error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  console.log('Auto-run endpoint called');
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  console.log('Secret:', secret ? 'provided' : 'not provided');

  // Simple security check
  if (secret !== 'suphan-ai-auto-run-2026') {
    return NextResponse.json({
      success: false,
      error: 'Unauthorized - check secret key'
    }, { status: 401 });
  }

  console.log('Starting auto-run...');
  
  // Trigger auto-run via POST
  return POST(request);
}
