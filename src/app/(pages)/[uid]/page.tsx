import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { OGImage } from '@/types';
import { ResolvedOpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Container } from '@/components/ui/container';
import { GradientBackground } from '@/components/ui/gradient';
import React from 'react';

type Params = { uid: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const client = createClient();
  const { uid } = await params;
  const page = await client.getByUID('page', uid).catch(() => notFound());

  let image = null;
  const parentMeta = await parent;
  const parentOpenGraph: ResolvedOpenGraph | null = parentMeta.openGraph ?? null;

  if (image) {
    image = `${page.data.meta_image.url}?w=1200&h=630&fit=crop&fm=webp&q=80`;
  }

  return {
    title: page.data?.title ?? parentMeta.title,
    description: page.data.meta_description ?? parentMeta.description,
    openGraph: {
      title: page.data.meta_title ?? parentMeta.title ?? undefined,
      images: [
        {
          url: image ?? (parentOpenGraph?.images ? (parentOpenGraph.images[0] as OGImage).url : ''),
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const client = createClient();
  const { uid } = await params;
  const page = await client.getByUID('page', uid).catch(() => notFound());

  return (
    <main className={'w-full overflow-hidden'}>
      <GradientBackground />
      <Container className="mb-24 mt-24 md:mb-24 md:mt-40">
        <SliceZone slices={page.data.slices} components={components} />
      </Container>
    </main>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType('page');

  return pages.map(page => {
    return { uid: page.uid };
  });
}
