import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Glasses,
  Check,
} from 'lucide-react';
import { JOURNAL_ARTICLES, JournalArticle } from '@/lib/journal-data';
import { PRODUCTS, Product } from '@/lib/data';
import ArticleDetailClient from './ArticleDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found | FOVEA Journal',
    };
  }

  return {
    title: `${article.title} | FOVEA Journal`,
    description: article.subtitle || article.excerpt,
    openGraph: {
      title: `${article.title} — FOVEA Optical Journal`,
      description: article.excerpt,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Related articles (matching same category or other recent articles)
  const relatedArticles = JOURNAL_ARTICLES.filter(
    (a) => a.id !== article.id && (a.category === article.category || true)
  ).slice(0, 3);

  // Related product frames mentioned in the monograph
  const relatedFrames: Product[] = (article.relatedFrameIds || [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => !!p);

  return (
    <ArticleDetailClient
      article={article}
      relatedArticles={relatedArticles}
      relatedFrames={relatedFrames}
    />
  );
}
