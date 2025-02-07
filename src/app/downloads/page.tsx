import { Container } from '@/components/ui/container';
import { GradientBackground } from '@/components/ui/gradient';
import { Heading, Lead, Subheading } from '@/components/ui/text';
import dayjs from 'dayjs';
import type { Metadata, ResolvingMetadata } from 'next';
import { createClient } from '@/prismicio';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { asText, filter, ImageFieldImage } from '@prismicio/client';
import React from 'react';
import { FeaturedPosts } from './_components/postsFeatured';
import { Badge } from '@/components/ui/badge';
import { FolderDownIcon } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import { DownloadLink } from '@/app/downloads/_components/downloadLink';
import { CustomLinkToMediaField, OGImage } from '@/types';
import { ResolvedOpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import Filter from '@/components/features/blog/postsFilter';

type Params = { uid: string };

type Props = {
  params: Promise<{ uid: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(
  { params }: { params: Promise<Params> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const client = createClient();

  const posts = await client
    .getByType('download', {
      pageSize: 1,
      page: 0,
      filters: [filter.at('my.download.featured', true)],
      fetchLinks: ['author.name', 'author.profile_image', 'post_category.name'],
      orderings: [
        {
          field: 'my.download.publishing_date',
          direction: 'desc',
        },
      ],
    })
    .then(response => {
      return response.results;
    });

  const page = posts[0];
  let image = null;

  const parentMeta = await parent;
  const parentOpenGraph: ResolvedOpenGraph | null = parentMeta.openGraph ?? null;

  if (page?.data?.feature_image) {
    image = `${page?.data.feature_image.url}?w=1200&h=630&fit=crop&fm=webp&q=80`;
  }

  return {
    title: 'My Ankle - Downloads',
    description:
      asText(page?.data.description)! ??
      'Download expert-written guides and brochures on ankle conditions, treatments, and recovery. Get the latest information in easy-to-read PDFs, available anytime you need them.',
    openGraph: {
      title: 'My Ankle - Downloads',
      images: [
        {
          url: image ?? (parentOpenGraph?.images ? (parentOpenGraph.images[0] as OGImage).url : ''),
        },
      ],
    },
  };
}

async function Posts({ page, category, tags }: { page: number; category?: string[]; tags?: string[] }) {
  const client = createClient();
  let categories: any[] = [];
  let tagList: any[] = [];
  if (category) {
    categories = await client.getAllByUIDs('post_category', [...category]);
  }

  if (tags) {
    tagList = await client.getAllByUIDs('post_tags', [...tags]);
  }

  const posts = await client
    .getByType('download', {
      pageSize: 10,
      page: 1,
      filters:
        categories.length || tagList.length
          ? [
              filter.any(
                'my.download.category',
                categories.map(cat => cat.id),
              ),
              filter.any(
                'my.download.tags.tag',
                tagList.map(tag => tag.id),
              ),
            ]
          : [],
      fetchLinks: [
        'author.name',
        'author.profile_image',
        'author.description',
        'author.link',
        'post_category.name',
        'post_category.uid',
        'post_tags',
      ],
      orderings: [
        {
          field: 'my.download.published_date',
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
    <div className="mt-6">
      {posts.map(post => (
        <div
          key={post.uid}
          className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3">
          <div>
            <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
              {dayjs(post.data.publishing_date).format('dddd, MMMM D, YYYY')}
            </div>

            {post.data.category && 'data' in post.data.category && (
              <div className="mt-3">
                <Badge>{(post.data.category.data as { name: string }).name}</Badge>
              </div>
            )}

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
            <h2 className="text-sm/5 font-medium">{post.data.name}</h2>
            <div className="mt-3 text-sm/6 text-gray-500">
              <PrismicRichText field={post.data.description} />
            </div>

            <div className="mt-4">
              <DownloadLink
                className={'flex items-center gap-1 text-sm/5 font-medium'}
                href={(post.data.file as CustomLinkToMediaField)?.url}>
                <FolderDownIcon className={'h-6 w-6'} />
                {post.data.file.text}
              </DownloadLink>
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

  //
  let categories = typeof params.category === 'string' ? params.category.split(',') : undefined;
  let tags = typeof params.tags === 'string' ? params.tags.split(',') : undefined;

  if (categories?.length === 0) {
    categories = undefined;
  }

  if (tags?.length === 0) {
    tags = undefined;
  }
  return (
    <main className={'min-h-svh w-full overflow-hidden'}>
      <GradientBackground />
      <Container className="mt-36 md:mt-36">
        <Subheading className="mt-16">Downloads</Subheading>
        <Heading as="h1" className="mt-2">
          Free Guides & Resources
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Download expert-written guides and brochures on ankle conditions, treatments, and recovery. Get the latest
          information in easy-to-read PDFs, available anytime you need them.
        </Lead>
      </Container>
      {page === 1 && !categories && !tags && <FeaturedPosts />}
      <Container className="mt-24 pb-24">
        <Filter
          url={'downloads'}
          hasRss={false}
          categorySelected={categories ? categories[0] : undefined}
          tagSelected={tags ? tags[0] : undefined}
        />
        <Posts page={page} category={categories} tags={tags} />
        <Pagination slug={'downloads'} contentType={'download'} page={page} category={categories} tags={tags} />
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
