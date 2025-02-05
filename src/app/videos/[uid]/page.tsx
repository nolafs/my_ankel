import { Button } from '@/components/button';
import { Container } from '@/components/ui/container';
import { Link } from '@/components/ui/link';
import { Heading, Subheading } from '@/components/ui/text';
import { createClient } from '@/prismicio';

import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { PrismicNextImage } from '@prismicio/next';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/richtext';
import React from 'react';
import { GradientBackground } from '@/components/ui/gradient';

type Props = {
  params: Promise<{ uid: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).uid;
  const client = createClient();
  const post = await client
    .getByUID('video', id, {
      fetchLinks: ['post_category.name', 'post_category.uid'],
    })
    .catch(() => notFound());

  return post
    ? {
        title: post.data.name,
        openGraph: {
          title: post.data.meta_title ?? undefined,
          description:
            typeof post.data.meta_description === 'string'
              ? post.data.meta_description
              : (asText(post.data.meta_description ?? post.data.description) ?? ''),
          images: [{ url: post.data.meta_image.url ?? post.data.poster.url ?? '' }],
        },
      }
    : {
        title: 'Video log',
      };
}

export default async function Page({ params }: Props) {
  const client = createClient();
  const id = (await params).uid;
  const post = await client
    .getByUID('video', id, {
      fetchLinks: ['post_category.name', 'author.name'],
    })
    .then(response => response.data)
    .catch(() => notFound());

  return (
    <main className={'w-full overflow-hidden'}>
      <Container className="mb-24 mt-24 md:mb-24 md:mt-40">
        <GradientBackground />
        <Subheading className="mt-16">{dayjs(post.publishing_date).format('dddd, MMMM D, YYYY')}</Subheading>
        <Heading as="h1" className="mt-2">
          {post.name}
        </Heading>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            {post.category && (
              <div className="flex flex-wrap gap-2">
                <Link
                  key="test"
                  href={`/blog?category=test`}
                  className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500">
                  {post.category && 'data' in post.category && (post.category.data as { name: string }).name}
                </Link>
              </div>
            )}
          </div>
          <div className="text-gray-700">
            <div className="max-w-2xl xl:mx-auto">
              {post.video_url && post.video_url.html && (
                <div
                  dangerouslySetInnerHTML={{ __html: post.video_url.html }}
                  className={'aspect-h-9 aspect-w-16 overflow-hidden rounded-3xl'}></div>
              )}

              <div className={'prose mt-10 md:prose-lg lg:prose-xl'}>
                {post.description && <PrismicRichText field={post.description} />}
              </div>
              <div className="mt-10">
                <Button variant="outline" href="/videos">
                  <ChevronLeftIcon className="size-4" />
                  Back to Vblog
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType('posts');

  return pages.map(page => {
    return { uid: page.uid };
  });
}
