import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PrismicRichText, SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { Heading } from '@/components/ui/text';
import { Container } from '@/components/ui/container';
import { GradientBackground } from '@/components/ui/gradient';
import React from 'react';

type Params = { uid: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const client = createClient();
  const { uid } = await params;
  const page = await client.getByUID('legal', uid).catch(() => notFound());

  return {
    title: page.data?.title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? page.data?.title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? '' }],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const client = createClient();
  const { uid } = await params;
  const page = await client.getByUID('legal', uid).catch(() => notFound());

  return (
    <main className={'min-h-svh w-full overflow-hidden'}>
      <GradientBackground />
      <Container className="mt-24 md:mt-36">
        <article>
          {/* Header */}
          <Heading as="h1">{page.data.title}</Heading>
          {/* Content */}
          <section className="mt-16">
            <div className={'md:prose-md prose prose-sm prose-neutral mx-auto mb-20 lg:prose-xl'}>
              <PrismicRichText field={page.data.body} />
            </div>
          </section>
        </article>
        <SliceZone slices={page.data.slices} components={components} />
      </Container>
    </main>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType('legal');

  return pages.map(page => {
    return { uid: page.uid };
  });
}
