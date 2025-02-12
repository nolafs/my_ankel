import { Button } from '@/components/button';
import { Container } from '@/components/ui/container';
import { Heading, Subheading } from '@/components/ui/text';
import { createClient } from '@/prismicio';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/richtext';
import React from 'react';
import { GradientBackground } from '@/components/ui/gradient';
import { trimString } from '@/lib/trimString';
import PostAside from '@/components/features/blog/postAside';
import { type ImageFieldImage, type LinkField, type RichTextField } from '@prismicio/client';
import { type Author } from '@/types';

type Props = {
  params: Promise<{ uid: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).uid;
  const client = createClient();
  const post = await client
    .getByUID('video', id, {
      fetchLinks: [
        'post_category.name',
        'post_category.uid',
        'author.name',
        'author.description',
        'author.profile_image',
        'author.link',
        'post_category.uid',
        'post_tags.name',
      ],
    })
    .catch(() => notFound());

  let description = asText(post.data.description);

  if (post.data.description) {
    description = trimString(asText(post.data.description), 160);
  }

  let tags = post.data.tags.map(item => {
    const tag = item && 'tag' in item && (item.tag as { data: { name: string } }).data?.name;
    return tag ?? '';
  });

  if (post.data.keywords) {
    const postKeywords: string[] = post.data.keywords.map(item => {
      const keyword = item;
      return keyword.word! ?? '';
    });
    if (postKeywords.length) {
      tags = [...tags, ...postKeywords];
    }
  }

  let author = null;

  if (post.data.author && 'data' in post.data.author) {
    const authorData = post.data.author.data as {
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

  return post
    ? {
        title: post.data.name,
        authors: [{ name: author?.name ?? '' }],
        description:
          typeof post.data.meta_description === 'string'
            ? post.data.meta_description
            : (post.data.meta_description ?? description ?? ''),
        alternates: {
          canonical: `/videos/${id}`,
        },
        creator: author?.name,
        publisher: author?.name,
        keywords: tags.filter(tag => tag !== false).length ? tags.filter(tag => tag !== false) : null,
        openGraph: {
          title: post.data.meta_title ?? undefined,
          description:
            typeof post.data.meta_description === 'string'
              ? post.data.meta_description
              : (post.data.meta_description ?? description ?? ''),
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
  let author: Author | null = null;
  const post = await client
    .getByUID('video', id, {
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
    <main className={'w-full overflow-hidden'}>
      <GradientBackground />
      <Container className="relative z-10 mb-24 mt-24 md:mb-24 md:mt-40">
        <Subheading className="mt-16">{dayjs(post.publishing_date).format('dddd, MMMM D, YYYY')}</Subheading>
        <Heading as="h1" className="mt-2">
          {post.name}
        </Heading>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <PostAside
            as={'aside'}
            uid={id}
            post={post}
            author={author!}
            classNames={'hidden lg:flex h-full max-h-[800px] lg:sticky lg:top-28 lg:flex-col lg:items-start'}
          />
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
                  Back to all Videos
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
