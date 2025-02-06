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
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/richtext';
import { GradientBackground } from '@/components/ui/gradient';
import React from 'react';
import SharePage from '@/components/features/share-page/share-page';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ImageFieldImage, LinkField, RichTextField } from '@prismicio/client';
import ArrowLongRightIcon from '@heroicons/react/24/outline/ArrowLongRightIcon';
import AuthorLink from '@/components/features/author/author-link';

type Props = {
  params: Promise<{ uid: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).uid;
  const client = createClient();
  const post = await client
    .getByUID('posts', id, {
      fetchLinks: ['post_category.name', 'post_category.uid', 'post_tags', 'author.name', 'author.uid'],
    })
    .catch(() => notFound());

  return post
    ? {
        title: post.data.title,
        openGraph: {
          title: post.data.meta_title ?? undefined,
          description:
            typeof post.data.meta_description === 'string'
              ? post.data.meta_description
              : (asText(post.data.meta_description ?? post.data.excerpt) ?? ''),
          images: [{ url: post.data.meta_image.url ?? post.data.feature_image.url ?? '' }],
        },
      }
    : {
        title: 'Blog Post',
      };
}

export default async function Page({ params }: Props) {
  const client = createClient();
  const id = (await params).uid;
  let author: {
    name?: string;
    description?: RichTextField;
    link?: LinkField;
    profile_image?: ImageFieldImage;
  } | null = null;
  const post = await client
    .getByUID('posts', id, {
      fetchLinks: [
        'post_category.name',
        'author.name',
        'author.description',
        'author.profile_image',
        'author.link',
        'post_category.uid',
        'post_tags.name',
      ],
    })
    .then(response => response.data)
    .catch(() => notFound());

  if (post.author && 'data' in post.author) {
    const authorData = post.author.data as {
      name: string;
      description: RichTextField;
      link: LinkField;
      profile_image: ImageFieldImage;
    };

    author = {
      name: authorData.name,
      description: authorData.description,
      link: authorData.link,
      profile_image: authorData.profile_image,
    };
  }

  return (
    <main className={'w-full'}>
      <Container className="mb-24 mt-24 md:mb-24 md:mt-40">
        <GradientBackground />
        <div className={'relative z-30'}>
          <Subheading className="mt-16">{dayjs(post.publishing_date).format('dddd, MMMM D, YYYY')}</Subheading>
          <Heading as="h1" className="mt-2 max-w-6xl">
            {post.title}
          </Heading>
        </div>
        <div className="mt-16 grid min-h-svh grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="sticky top-28 flex h-full max-h-[800px] flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            {post.category && (
              <div className="flex flex-col flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-500">Category:</span>
                <Link
                  key="test"
                  href={`/blog?category=${
                    post.category &&
                    'data' in post.category &&
                    (
                      post.category.data as {
                        uid: string;
                      }
                    ).uid
                  }`}
                  className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500">
                  {post.category && 'data' in post.category && (post.category.data as { name: string }).name}
                </Link>
              </div>
            )}
            {author && (
              <div className="flex flex-col flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-500">Author:</span>
                <span className={'text-gray-700'}>
                  <AuthorLink author={author} />
                </span>
              </div>
            )}

            {post.tags && (
              <div className="hidden flex-col flex-wrap gap-2 md:flex">
                <span className="text-sm font-medium text-gray-500">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((item, idx) => (
                    <Link
                      href={'/blog?tags=' + (item && 'tag' in item && (item.tag as { uid: string }).uid)}
                      key={'tags-' + idx}
                      className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium capitalize text-gray-500">
                      {item && 'tag' in item && (item.tag as { data: { name: string } }).data.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div>
              <div className="mb-2 text-sm font-medium text-gray-500">Share:</div>
              <SharePage slug={id} title={post.title} />
            </div>
          </div>
          <div className="text-gray-700">
            <div className="max-w-2xl xl:mx-auto">
              <PrismicNextImage
                field={post.feature_image}
                width={672}
                height={448}
                priority={true}
                className="mb-10 aspect-[3/2] w-full rounded-2xl object-cover shadow-xl"
                imgixParams={{ fm: 'webp', fit: 'crop', crop: ['focalpoint'], q: 70 }}
              />

              <div className={'prose md:prose-lg'}>{post.content && <PrismicRichText field={post.content} />}</div>
              <div className="mt-10">
                <Button variant="outline" href="/blog">
                  <ChevronLeftIcon className="size-4" />
                  Back to blog
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
