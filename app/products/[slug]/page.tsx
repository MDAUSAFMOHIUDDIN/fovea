import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same series or category
  const matchingSeries = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.series === product.series || p.category === product.category)
  ).slice(0, 3);

  const relatedProducts =
    matchingSeries.length >= 3
      ? matchingSeries
      : [
          ...matchingSeries,
          ...PRODUCTS.filter((p) => p.id !== product.id && !matchingSeries.some((m) => m.id === p.id)),
        ].slice(0, 3);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
