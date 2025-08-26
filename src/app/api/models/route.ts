import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const models = await openai.models.list();
    
    // Filter to show only chat completion models
    const chatModels = models.data.filter(model => 
      model.id.includes('gpt') || 
      model.id.includes('claude') ||
      model.id.includes('gemini')
    );

    return NextResponse.json({
      models: chatModels.map(model => ({
        id: model.id,
        created: model.created,
        owned_by: model.owned_by
      }))
    });
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}
