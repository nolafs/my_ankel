import { Container } from '@/components/ui/container';
import { GradientBackground } from '@/components/ui/gradient';
import { Link } from '@/components/ui/link';
import { Heading, Lead, Subheading } from '@/components/ui/text';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { createClient } from '@/prismicio';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { filter, ImageFieldImage } from '@prismicio/client';
import React from 'react';
import { FeaturedPosts } from './_components/postsFeatured';
import { Categories } from './_components/postsCategories';
import { Pagination } from './_components/postsPagination';
import { Badge } from '@/components/ui/badge';

type Props = {
  params: Promise<{ uid: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stay informed',
};

async function Posts({ page, category }: { page: number; category?: string[] }) {
  const client = createClient();
  let categories: any[] = [];
  console.log('category', category);

  if (category) {
    categories = await client.getAllByUIDs('post_category', [...category]);
    console.log('categories', categories);
  }

  const posts = await client
    .getByType('video', {
      pageSize: 10,
      page: 1,
      filters: categories.length
        ? [
            filter.any(
              'my.video.category',
              categories.map(cat => cat.id),
            ),
          ]
        : [],
      fetchLinks: ['author.name', 'author.profile_image', 'post_category.name', 'post_category.uid'],
      orderings: [
        {
          field: 'my.video.published_date',
          direction: 'desc',
        },
      ],
    })
    .then(response => {
      return response.results;
    })
    .catch(() => []);

  if (posts.length === 0) {
    return <p className="mt-6 text-gray-500">No posts found.</p>;
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
      {posts.map(post => (
        <div
          key={post.uid}
          className="relative flex flex-col rounded-3xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5">
          {post.data.video_url && post.data.video_url.html && (
            <div
              dangerouslySetInnerHTML={{ __html: post.data.video_url.html }}
              className={'aspect-h-9 aspect-w-16 overflow-hidden rounded-3xl'}></div>
          )}

          <div className="flex flex-1 flex-col p-8">
            <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
              {dayjs(post.data.publishing_date).format('dddd, MMMM D, YYYY')}
            </div>

            {post.data.category && 'data' in post.data.category && (
              <div className="mt-3">
                <Badge>{(post.data.category.data as { name: string }).name}</Badge>
              </div>
            )}

            <h2 className="text-sm/5 font-medium">{post.data.name}</h2>
            <div className="mt-4">
              <Link href={`/videos/${post.uid}`} className="flex items-center gap-1 text-sm/5 font-medium">
                <span className="absolute inset-0" />
                Read more
                <ChevronRightIcon className="size-4 fill-gray-400" />
              </Link>
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
        </div>
      ))}
    </div>
  );
}

export default async function VBlog({ searchParams }: Props) {
  const params = await searchParams;

  const page = params.page && typeof params.page === 'string' && parseInt(params.page) > 1 ? parseInt(params.page) : 1;

  //
  let categories = typeof params.category === 'string' ? params.category.split(',') : undefined;

  if (categories?.length === 0) {
    categories = undefined;
  }

  return (
    <main className={'min-h-svh w-full overflow-hidden'}>
      <GradientBackground />
      <Container className="mt-24 md:mt-36">
        <Subheading className="mt-16">Videos</Subheading>
        <Heading as="h1" className="mt-2">
          Ankle Health Video Library
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Explore expert advice, treatment insights, and recovery tips through our curated video collection. Stay
          informed and take charge of your ankle health journey.
        </Lead>
      </Container>
      {page === 1 && !categories && <FeaturedPosts />}
      <Container className="mt-16 pb-24">
        <Categories selected={categories ? categories[0] : undefined} />
        <Posts page={page} category={categories} />
        <Pagination page={page} category={categories ? categories[0] : undefined} />
      </Container>
    </main>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType('video');

  return pages.map(page => {
    return { uid: page.uid };
  });
}
