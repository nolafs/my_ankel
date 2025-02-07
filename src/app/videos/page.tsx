import { Container } from '@/components/ui/container';
import { GradientBackground } from '@/components/ui/gradient';
import { Heading, Lead, Subheading } from '@/components/ui/text';
import type { Metadata, ResolvingMetadata } from 'next';
import { createClient } from '@/prismicio';
import { asText, filter } from '@prismicio/client';
import React from 'react';
import { FeaturedPosts } from './_components/postsFeatured';
import { Pagination } from '@/components/ui/pagination';
import { VideoCard } from '@/app/videos/_components/postCard';
import { ResolvedOpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { OGImage } from '@/types';
import Filter from '@/components/features/blog/postsFilter';

type Props = {
  params: Promise<{ uid: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

type Params = { uid: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const client = createClient();

  const posts = await client
    .getByType('video', {
      pageSize: 1,
      page: 0,
      filters: [filter.at('my.video.featured', true)],
      fetchLinks: ['author.name', 'author.profile_image', 'post_category.name'],
      orderings: [
        {
          field: 'my.video.publishing_date',
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

  if (page?.data?.poster) {
    image = `${page?.data.poster.url}?w=1200&h=630&fit=crop&fm=webp&q=80`;
  }

  return {
    title: 'My Ankle - Videos',
    description:
      asText(page?.data.description)! ??
      'Explore expert advice, treatment insights, and recovery tips through our curated video collection. Stay informed and take charge of your ankle health journey.',
    openGraph: {
      title: 'My Ankle - Videos',
      images: [
        {
          url: image ?? (parentOpenGraph?.images ? (parentOpenGraph.images[0] as OGImage).url : ''),
        },
      ],
    },
  };
}

async function VideoPosts({ page, category, tags }: { page: number; category?: string[]; tags?: string[] }) {
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
    .getByType('video', {
      pageSize: 9,
      page: 1,
      filters:
        categories.length || tagList.length
          ? [
              filter.any(
                'my.video.category',
                categories.map(cat => cat.id),
              ),
              filter.any(
                'my.video.tags.tag',
                tagList.map(tag => tag.id),
              ),
            ]
          : [],
      fetchLinks: [
        'post_category.name',
        'author.name',
        'author.description',
        'author.profile_image',
        'author.link',
        'post_category.uid',
        'post_tags.name',
        'post_tags',
      ],
      orderings: [
        {
          field: 'my.video.publishing_date',
          direction: 'desc',
        },
        {
          field: 'my.video.last_publication_date',
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
        <VideoCard video={post} key={post.uid} />
      ))}
    </div>
  );
}

export default async function VBlog({ searchParams }: Props) {
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
      {page === 1 && !categories && !tags && <FeaturedPosts />}
      <Container className="mt-16 pb-24">
        <Filter
          url={'videos'}
          hasRss={false}
          categorySelected={categories ? categories[0] : undefined}
          tagSelected={tags ? tags[0] : undefined}
        />
        <VideoPosts page={page} category={categories} tags={tags} />
        <Pagination slug={'videos'} contentType={'video'} page={page} category={categories} tags={tags} />
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
