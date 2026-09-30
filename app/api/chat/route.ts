import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { FOVEA_CHATBOT_INSTRUCTIONS } from '@/lib/chatbot-knowledge';

export const runtime = 'nodejs';

type IncomingMessage = {
  role: 'user' | 'assistant';
  text: string;
};

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const client = forwardedFor?.split(',')[0]?.trim() || 'anonymous';
  const now = Date.now();
  const existing = rateLimit.get(client);

  if (!existing || now > existing.resetAt) {
    rateLimit.set(client, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  existing.count += 1;
  return existing.count > 20;
}

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json(
        { error: 'Too many messages. Please wait a moment and try again.' },
        { status: 429 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured.');
      return NextResponse.json(
        { error: 'The assistant is temporarily unavailable. Please use WhatsApp for immediate help.' },
        { status: 503 },
      );
    }

    const body = (await request.json()) as { messages?: IncomingMessage[] };
    const messages = Array.isArray(body.messages)
      ? body.messages
          .filter(
            (message): message is IncomingMessage =>
              (message?.role === 'user' || message?.role === 'assistant') &&
              typeof message.text === 'string' &&
              message.text.trim().length > 0,
          )
          .slice(-10)
          .map((message) => ({ ...message, text: message.text.trim().slice(0, 1_500) }))
      : [];

    if (!messages.length || messages[messages.length - 1].role !== 'user') {
      return NextResponse.json({ error: 'Please enter a message.' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const configuredModel = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
    const candidateModels = Array.from(new Set([configuredModel, 'gemini-3.8-flash', 'gemini-3.1-flash-lite']));

    let answer = '';
    let lastError: unknown;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: messages.map((message) => ({
            role: message.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: message.text }],
          })),
          config: {
            systemInstruction: FOVEA_CHATBOT_INSTRUCTIONS,
            temperature: 0.25,
            maxOutputTokens: 700,
          },
        });

        const text = response.text?.trim();
        if (text) {
          answer = text;
          break;
        }
      } catch (err) {
        console.warn(`Model ${model} failed, trying next candidate:`, err);
        lastError = err;
      }
    }

    if (!answer) {
      throw lastError || new Error('Gemini returned an empty response.');
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Fovea chatbot error:', error);
    return NextResponse.json(
      { error: 'I could not answer just now. Please try again or contact Fovea on WhatsApp.' },
      { status: 500 },
    );
  }
}

