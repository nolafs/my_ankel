import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PrismicRichText, SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import {Heading, Lead} from '@/components/ui/text';
import {Container} from '@/components/ui/container';


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
  const {uid} = await params;
  const page = await client.getByUID('legal', uid).catch(() => notFound());

  return (
     <Container>
       <article>
         {/* Header */}
         <Heading as="h1">{page.data.title}</Heading>

         {/* Content */}
         <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
           <div className={'prose prose-sm md:prose-md lg:prose-xl prose-neutral mx-auto mb-20'}>
             <PrismicRichText field={page.data.body}/>
           </div>
         </section>
       </article>
       <SliceZone slices={page.data.slices} components={components}/>
     </Container>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType('legal');

  return pages.map(page => {
    return { uid: page.uid };
  });
}
