import React from 'react';
import { notFound } from 'next/navigation';
import { COLLECTIONS, PRODUCTS } from '@/lib/data';
import CollectionClientView from '@/components/collections/CollectionClientView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  // Filter products for this collection series or show curated match
  const collectionProducts = PRODUCTS.filter(
    (p) =>
      p.series.toLowerCase().includes(collection.title.toLowerCase().replace('the ', '').replace(' series', '')) ||
      collection.title.toLowerCase().includes(p.series.toLowerCase()) ||
      (collection.slug === 'sun-and-mineral-glass' && p.category === 'Sunglasses')
  );
  const displayProducts = collectionProducts.length > 0 ? collectionProducts : PRODUCTS.slice(0, 3);

  return (
    <CollectionClientView
      collection={collection}
      products={displayProducts}
    />
  );
}
