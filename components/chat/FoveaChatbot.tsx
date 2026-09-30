'use client';

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bot, ExternalLink, MessageCircle, RotateCcw, Send, Sparkles, X } from 'lucide-react';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  text: "Welcome to Fovea. I can help you discover frames, compare materials and sizes, understand Home Trial, or answer ordering and care questions. What are you looking for today?",
};

const QUICK_QUESTIONS = [
  'Help me choose a frame',
  'How does Home Trial work?',
  'Which lenses are available?',
  'Returns and warranty',
];

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function MessageText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+|\/products\/[a-z0-9-]+)/gi);

  return (
    <>
      {parts.map((part, index) => {
        const cleanPart = part.replace(/[.,;:!?]+$/, '');
        const trailing = part.slice(cleanPart.length);

        if (/^https?:\/\//i.test(cleanPart)) {
          return (
            <span key={`${part}-${index}`}>
              <a
                href={cleanPart}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                Open link <ExternalLink className="inline h-3 w-3" />
              </a>
              {trailing}
            </span>
          );
        }

        if (/^\/products\//i.test(cleanPart)) {
          return (
            <span key={`${part}-${index}`}>
              <Link href={cleanPart} className="font-semibold underline underline-offset-2">
                View product <ExternalLink className="inline h-3 w-3" />
              </Link>
              {trailing}
            </span>
          );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}

export default function FoveaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const askQuestion = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { id: newId(), role: 'user', text: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.id !== 'welcome')
            .map(({ role, text }) => ({ role, text })),
        }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !data.answer) throw new Error(data.error || 'Unable to get an answer.');

      setMessages((current) => [
        ...current,
        { id: newId(), role: 'assistant', text: data.answer as string },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Please try again.';
      setMessages((current) => [
        ...current,
        {
          id: newId(),
          role: 'assistant',
          text: `${message} You can also reach our WhatsApp concierge at https://wa.me/919700956245.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void askQuestion(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void askQuestion(input);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-[80] lg:bottom-6 lg:right-6">
      {isOpen && (
        <section
          role="dialog"
          aria-label="Fovea shopping assistant"
          className="mb-3 flex h-[min(650px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-[26px] border border-[#D8D3C8] bg-[#FAF9F6] shadow-[0_24px_80px_rgba(12,22,44,0.24)]"
        >
          <header className="flex items-center justify-between bg-[#0C162C] px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0D5C63]">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-serif text-xl leading-none">Fovea Assistant</h2>
                <p className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/65">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> AI optical concierge
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages([WELCOME_MESSAGE])}
                className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Start a new conversation"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Close assistant"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-3 text-[13px] leading-relaxed ${
                    message.role === 'user'
                      ? 'rounded-br-sm bg-[#0D5C63] text-white'
                      : 'rounded-bl-sm border border-[#E4E0D7] bg-white text-[#243047] shadow-sm'
                  }`}
                >
                  <MessageText text={message.text} />
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void askQuestion(question)}
                    className="rounded-xl border border-[#D8D3C8] bg-white px-3 py-2.5 text-left text-[11px] font-medium leading-snug text-[#0C162C] transition hover:border-[#0D5C63] hover:bg-[#EEF6F5]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-[#E4E0D7] bg-white px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0D5C63]"
                      style={{ animationDelay: `${dot * 130}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[#E4E0D7] bg-white p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-[#D8D3C8] bg-[#FAF9F6] p-2 focus-within:border-[#0D5C63]">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, 1_500))}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask about frames, lenses or Home Trial…"
                className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-[#0C162C] outline-none placeholder:text-[#6B7280]"
                aria-label="Message Fovea Assistant"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0D5C63] text-white transition hover:bg-[#094A50] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[9px] leading-tight text-[#7A7F89]">
              AI answers may be imperfect. Verify prescriptions and final order details with Fovea.
            </p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="group ml-auto flex h-14 items-center gap-2 rounded-full bg-[#0C162C] px-4 text-white shadow-[0_12px_35px_rgba(12,22,44,0.3)] transition hover:-translate-y-0.5 hover:bg-[#0D5C63]"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close Fovea Assistant' : 'Open Fovea Assistant'}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="hidden text-xs font-semibold tracking-wide sm:inline">
          {isOpen ? 'Close' : 'Ask Fovea'}
        </span>
        {!isOpen && <Bot className="h-4 w-4 text-[#C5A880] transition group-hover:text-white" />}
      </button>
    </div>
  );
}

