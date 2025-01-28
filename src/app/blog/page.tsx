import { Button } from '@/components/button';
import { Container } from '@/components/ui/container';
import { GradientBackground } from '@/components/ui/gradient';
import { Link } from '@/components/ui/link';
import { Heading, Lead, Subheading } from '@/components/ui/text';

type Props = {
  params: Promise<{ uid: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpDownIcon, RssIcon } from '@heroicons/react/16/solid';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/prismicio';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { ImageFieldImage } from '@prismicio/client';
import React from 'react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stay informed with product updates, company news, and insights on how to sell smarter at your company.',
};

const postsPerPage = 5;

async function FeaturedPosts() {
  const client = createClient();
  const featuredPosts = await client
    .getByType('posts', {
      pageSize: 3,
      page: 0,
      //filters: ['my.posts.featured', '==', 'true'],
      fetchLinks: ['author.name', 'author.profile_image', 'post_category.name'],
      orderings: [
        {
          field: 'my.posts.published_date',
          direction: 'desc',
        },
      ],
    })
    .then(response => {
      return response.results;
    });

  if (featuredPosts.length === 0) {
    return;
  }

  return (
    <div className="mt-16 bg-gradient-to-t from-gray-100 pb-14">
      <Container>
        <h2 className="text-2xl font-medium tracking-tight">Featured</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featuredPosts.map(post => (
            <div
              key={post.uid}
              className="relative flex flex-col rounded-3xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5">
              {post.data.feature_image && (
                <PrismicNextImage
                  field={post.data.feature_image}
                  width={896}
                  height={400}
                  priority={true}
                  className={'overflow-hidden rounded-t-3xl'}
                  imgixParams={{ fm: 'webp', fit: 'crop', crop: ['focalpoint'], width: 1140, height: 600, q: 70 }}
                />
              )}
              <div className="flex flex-1 flex-col p-8">
                <div className="text-sm/5 text-gray-700">
                  {dayjs(post.data.publishing_date).format('dddd, MMMM D, YYYY')}
                </div>
                <div className="mt-2 text-base/7 font-medium">
                  <Link href={`/blog/${post.uid}`}>
                    <span className="absolute inset-0" />
                    {post.data.title}
                  </Link>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  <PrismicRichText field={post.data.excerpt} />
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
      </Container>
    </div>
  );
}

async function Categories({ selected }: { selected?: string }) {
  const client = createClient();
  const categories = await client
    .getByType('post_category')
    .then(response => response.results)
    .catch(() => []);

  if (categories.length === 0) {
    return;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 font-medium">
          {categories.find(item => item?.uid === selected)?.data.name ?? 'All categories'}
          <ChevronUpDownIcon className="size-4 fill-slate-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]">
          <MenuItem>
            <Link
              href="/blog"
              data-selected={selected === undefined ? true : undefined}
              className="group grid grid-cols-[1rem,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5">
              <CheckIcon className="hidden size-4 group-data-[selected]:block" />
              <p className="col-start-2 text-sm/6">All categories</p>
            </Link>
          </MenuItem>
          {categories.map(category => (
            <MenuItem key={category.uid}>
              <Link
                href={`/blog?category=${category.uid}`}
                data-selected={category.uid === selected ? true : undefined}
                className="group grid grid-cols-[16px,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5">
                <CheckIcon className="hidden size-4 group-data-[selected]:block" />
                <p className="col-start-2 text-sm/6">{category.data.name}</p>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      <Button variant="outline" href="/blog/feed.xml" className="gap-1">
        <RssIcon className="size-4" />
        RSS Feed
      </Button>
    </div>
  );
}

async function Posts({ page, category }: { page: number; category?: string }) {
  const client = createClient();
  const posts = await client
    .getByType('posts', {
      pageSize: 10,
      page: 0,
      fetchLinks: ['author.name', 'author.profile_image', 'post_category.name'],
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

  console.log('POST', posts);

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
            <p className="mt-3 text-sm/6 text-gray-500">
              <PrismicRichText field={post.data.excerpt} />
            </p>
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

async function Pagination({ page, category }: { page: number; category?: string }) {
  function url(page: number) {
    const params = new URLSearchParams();

    if (category) params.set('category', category);
    if (page > 1) params.set('page', page.toString());

    return params.size !== 0 ? `/resources?${params.toString()}` : '/resources';
  }

  const client = createClient();

  const totalPosts = await client
    .getByType('posts', {
      pageSize: 10,
      page: 0,
      orderings: [
        {
          field: 'my.posts.published_date',
          direction: 'desc',
        },
      ],
    })
    .then(response => {
      return response.total_pages;
    })
    .catch(() => 0);

  const hasPreviousPage = page - 1;
  const previousPageUrl = hasPreviousPage ? url(page - 1) : undefined;
  const hasNextPage = page * postsPerPage < totalPosts;
  const nextPageUrl = hasNextPage ? url(page + 1) : undefined;
  const pageCount = Math.ceil(totalPosts / postsPerPage);

  if (pageCount < 2) {
    return;
  }

  return (
    <div className="mt-6 flex items-center justify-between gap-2">
      <Button variant="outline" href={previousPageUrl} disabled={!previousPageUrl}>
        <ChevronLeftIcon className="size-4" />
        Previous
      </Button>
      <div className="flex gap-2 max-sm:hidden">
        {Array.from({ length: pageCount }, (_, i) => (
          <Link
            key={i + 1}
            href={url(i + 1)}
            data-active={i + 1 === page ? true : undefined}
            className={clsx(
              'size-7 rounded-lg text-center text-sm/7 font-medium',
              'data-[hover]:bg-gray-100',
              'data-[active]:shadow data-[active]:ring-1 data-[active]:ring-black/10',
              'data-[active]:data-[hover]:bg-gray-50',
            )}>
            {i + 1}
          </Link>
        ))}
      </div>
      <Button variant="outline" href={nextPageUrl} disabled={!nextPageUrl}>
        Next
        <ChevronRightIcon className="size-4" />
      </Button>
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
