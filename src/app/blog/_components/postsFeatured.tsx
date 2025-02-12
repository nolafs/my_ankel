import { createClient } from '@/prismicio';
import { filter } from '@prismicio/client';
import type { ImageFieldImage } from '@prismicio/client';
import { Container } from '@/components/ui/container';
import { PrismicNextImage } from '@prismicio/next';
import dayjs from 'dayjs';
import { Link } from '@/components/ui/link';
import { PrismicRichText } from '@prismicio/react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BLOGJSONLD } from '@/types/schema';

export async function FeaturedPosts() {
  const client = createClient();
  const featuredPosts = await client
    .getByType('posts', {
      pageSize: 3,
      page: 0,
      filters: [filter.at('my.posts.featured', true)],
      fetchLinks: ['author.name', 'author.profile_image', 'post_category.name'],
      orderings: [
        {
          field: 'my.posts.publishing_date',
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

  const JSONLD = BLOGJSONLD(featuredPosts);

  return (
    <div className="mt-24 bg-gradient-to-t from-gray-100 pb-14">
      <Container>
        <h2 className="text-3xl font-medium tracking-tight">Featured</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featuredPosts.map(post => (
            <div
              key={post.uid}
              className="relative flex flex-col rounded-3xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5">
              {post.data.category && 'data' in post.data.category && (
                <div className="m absolute ml-3 mt-3">
                  <Badge>{(post.data.category.data as { name: string }).name}</Badge>
                </div>
              )}

              {post.data.feature_image && (
                <PrismicNextImage
                  field={post.data.feature_image}
                  width={390}
                  height={260}
                  priority={true}
                  className={'aspect-3/2 min-h-[260px] w-full rounded-2xl object-cover'}
                  imgixParams={{ fm: 'webp', fit: 'crop', crop: ['focalpoint'], width: 390, height: 260, q: 70 }}
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
        {/* Add JSON-LD to your page */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      </Container>
    </div>
  );
}
