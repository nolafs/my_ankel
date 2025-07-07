import { Button } from '@/components/button';
import { Container } from '@/components/ui/container';
import { Heading, Subheading } from '@/components/ui/text';
import { createClient } from '@/prismicio';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/richtext';
import { GradientBackground } from '@/components/ui/gradient';
import React from 'react';
import { type ImageFieldImage, type LinkField, type RichTextField } from '@prismicio/client';
import { type Author } from '@/types';
import PostAside from '@/components/features/blog/postAside';
import { WithContext, Article } from 'schema-dts';
import { ContentRelationshipField } from '@prismicio/types';
import { AuthorDocument, AuthorDocumentData } from '../../../../prismicio-types';

type Props = {
  params: Promise<{ uid: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).uid;
  const client = createClient();
  const post = await client
    .getByUID('posts', id, {
      fetchLinks: [
        'post_category.name',
        'post_category.uid',
        'post_tags',
        'post_tags.name',
        'author.name',
        'author.description',
        'author.profile_image',
        'author.link',
        'author',
      ],
    })
    .catch(() => notFound());

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

  let description =
    typeof post.data.meta_description === 'string'
      ? post.data.meta_description
      : (asText(post.data.meta_description ?? post.data.excerpt).toString() ?? '');

  if (description.length > 160) {
    description = description.substring(0, 160) + '...';
  }

  return {
    title: post.data.title,
    description: description,
    authors: [{ name: author?.name ?? '' }],
    alternates: {
      canonical: `/blog/${id}`,
    },
    creator: author?.name,
    publisher: author?.name,
    keywords: tags.filter(tag => tag !== false).length ? tags.filter(tag => tag !== false) : null,
    openGraph: {
      title: post.data.meta_title ?? undefined,
      description: description,
      images: [{ url: post.data.meta_image.url ?? post.data.feature_image.url ?? '' }],
    },
  };
}

export default async function Page({ params }: Props) {
  const client = createClient();
  const id = (await params).uid;
  let author: Author | null = null;
  const post = await client
    .getByUID('posts', id, {
      fetchLinks: [
        'post_category.name',
        'author.name',
        'author.description',
        'author.footer',
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
      footer: RichTextField;
    };

    author = {
      name: authorData.name,
      description: authorData.description,
      link: authorData.link,
      profile_image: authorData.profile_image,
      footer: authorData.footer,
    };
  }

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_BASE_UR}/blog/${id}` || '', // Ensure this links to the actual article URL
    },
    headline: post.title ?? '',
    image: post.feature_image?.url ? [post.feature_image.url] : [], // Make image an array
    author: {
      '@type': 'Person',
      name: author?.name,
      url: author?.profile_image?.url ?? '', // Use a valid author profile URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyAnkle.co.uk', // Replace with your site name
      logo: {
        '@type': 'ImageObject',
        url: 'https://myankle.co.uk/share-img.png', // Add your actual logo URL
      },
    },
    description: asText(post.excerpt) || '',
    datePublished: post.publishing_date ?? '',
    dateModified: post.publishing_date ?? '',
  };
  return (
    <main className={'w-full'}>
      <div className={'absolute top-0 h-full w-full overflow-x-hidden'}>
        <GradientBackground />
      </div>
      <Container className="mb-16 mt-24 md:mb-24 md:mt-40">
        <div className={'relative z-30'}>
          <Subheading className="mt-16">{dayjs(post.publishing_date).format('dddd, MMMM D, YYYY')}</Subheading>
          <Heading as="h1" className="mt-2 max-w-6xl">
            {post.title}
          </Heading>
        </div>
        <div className="mt-10 grid min-h-svh grid-cols-1 gap-8 pb-24 sm:mt-10 md:mt-16 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <PostAside
            as={'aside'}
            uid={id}
            post={post}
            author={author!}
            classNames={'hidden lg:flex h-full max-h-[800px] lg:sticky lg:top-28 lg:flex-col lg:items-start'}
          />

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

              <div className={'prose md:prose-lg'}>
                {post.content && <PrismicRichText field={post.content} />}

                {post.author_footer && author && (
                  <div className="mt-10">{author.footer && <PrismicRichText field={author.footer} />}</div>
                )}

                {post.further_readings.length !== 0 && (
                  <div className="mt-10">
                    If you liked this article please consider reading:
                    <ul className={'mt-2 flex list-disc flex-col gap-2'}>
                      {post.further_readings.map((item, index) => (
                        <PrismicNextLink
                          key={(item?.text ? item?.text.replace(/[^a-z0-9]+/gi, '-') : 'further_read') + index}
                          field={item}
                          className="text-blue-600 hover:underline"
                        />
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <PostAside
                as="aside"
                uid={id}
                post={post}
                author={author!}
                classNames={'lg:hidden border-y mt-10 border-gray-600 py-5'}
              />

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
      {/* Add JSON-LD to your page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
