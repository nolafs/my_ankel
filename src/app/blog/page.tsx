import { Container } from '@/components/ui/container';
import { GradientBackground } from '@/components/ui/gradient';
import { Link } from '@/components/ui/link';
import { Heading, Lead, Subheading } from '@/components/ui/text';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/prismicio';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { filter, ImageFieldImage } from '@prismicio/client';
import React from 'react';
import { FeaturedPosts } from './_components/postsFeatured';
import { Categories } from './_components/postsCategories';
import { Pagination } from './_components/postsPagination';

type Props = {
  params: Promise<{ uid: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stay informed',
};

async function Posts({ page, category }: { page: number; category?: string }) {
  const client = createClient();
  const posts = await client
    .getByType('posts', {
      pageSize: 10,
      page: 0,
      filters: category ? [filter.at('my.posts.post_category.category', category)] : [],
      fetchLinks: ['author.name', 'author.profile_image', 'post_category.name', 'post_category.uid'],
      orderings: [
        {
          field: 'my.posts.published_date',
          direction: 'desc',
        },
      ],
    })
    .then(response => {
      return response.results;
    })
    .catch(() => []);

  if (posts.length === 0 && (page > 1 || category)) {
    notFound();
  }

  if (posts.length === 0) {
    return <p className="mt-6 text-gray-500">No posts found.</p>;
  }

  return (
    <div className="mt-6">
      {posts.map(post => (
        <div
          key={post.uid}
          className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3">
          <div>
            <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
              {dayjs(post.data.publishing_date).format('dddd, MMMM D, YYYY')}
            </div>
            {post.data.author && 'data' in post.data.author && (
              <div className="mt-6 flex items-center gap-3">
                {post.data.author && (
                  <PrismicNextImage
                    alt=""
                    width={64}
                    height={64}
                    field={(post.data.author.data as { profile_image: ImageFieldImage }).profile_image}
                    className="aspect-square size-6 rounded-full object-cover"
                  />
                )}
                <div className="text-sm/5 text-gray-700">
                  {(post.data.author.data as { name: string }).name || 'My Ankle'}
                </div>
              </div>
            )}
          </div>
          <div className="sm:col-span-2 sm:max-w-2xl">
            <h2 className="text-sm/5 font-medium">{post.data.title}</h2>
            <div className="mt-3 text-sm/6 text-gray-500">
              <PrismicRichText field={post.data.excerpt} />
            </div>
            <div className="mt-4">
              <Link href={`/blog/${post.uid}`} className="flex items-center gap-1 text-sm/5 font-medium">
                <span className="absolute inset-0" />
                Read more
                <ChevronRightIcon className="size-4 fill-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Blog({ searchParams }: Props) {
  const params = await searchParams;

  const page = params.page && typeof params.page === 'string' && parseInt(params.page) > 1 ? parseInt(params.page) : 1;

  const category = typeof params.category === 'string' ? params.category : undefined;

  return (
    <main className={'min-h-svh w-full overflow-hidden'}>
      <GradientBackground />
      <Container className="mt-24 md:mt-36">
        <Subheading className="mt-16">Blog</Subheading>
        <Heading as="h1" className="mt-2">
          What’s happening at My Ankle.
        </Heading>
        <Lead className="mt-6 max-w-3xl">Looking for resources on ankle pain? You&apos;re in the right place.</Lead>
      </Container>
      {page === 1 && !category && <FeaturedPosts />}
      <Container className="mt-16 pb-24">
        <Categories selected={category} />
        <Posts page={page} category={category} />
        <Pagination page={page} category={category} />
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
