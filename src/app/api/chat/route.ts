import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Keep your responses concise and friendly."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150,
    });

    const aiResponse = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    const response = {
      message: aiResponse,
      sentTime: new Date().toLocaleTimeString(),
      sender: "Bot",
      direction: "incoming" as const,
      position: "last" as const,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
