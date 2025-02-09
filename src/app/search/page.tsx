import { createClient } from '@/prismicio';
import React from 'react';
import { GradientBackground } from '@/components/ui/gradient';
import { type OGImage } from '@/types';

import type { Metadata, ResolvingMetadata } from 'next';
import { type ResolvedOpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Heading, Lead, Subheading } from '@/components/ui/text';
import { Container } from '@/components/ui/container';
import { SearchInput } from '@/components/features/search/search-input';

type Params = { uid: string };

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<Params> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMeta = await parent;
  const parentOpenGraph: ResolvedOpenGraph | null = parentMeta.openGraph ?? null;

  return {
    title: 'My Ankle - Search',
    description: 'Search for more information',
    openGraph: {
      title: 'My Ankle - Search',
      images: [
        {
          url: parentOpenGraph?.images ? (parentOpenGraph.images[0] as OGImage).url : '',
        },
      ],
    },
  };
}

export default async function Page() {
  return (
    <main className={'w-full overflow-hidden'}>
      <GradientBackground />
      <Container className="mt-24 md:mt-36">
        <Subheading className="mt-16">Search</Subheading>
        <Heading as="h1" className="mt-2">
          Search Ankle Health our Resources
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Explore expert advice, treatment insights, and recovery tips through our curated articles, video and other
          resources. Stay informed and take charge of your ankle health journey.
        </Lead>
      </Container>
      <div className="mb-24 mt-10 md:mb-24 md:mt-16">
        <SearchInput isSearchPage={true} />
      </div>
    </main>
  );
}
