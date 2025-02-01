import { createClient } from '@/prismicio';
import { filter, ImageFieldImage } from '@prismicio/client';
import { Container } from '@/components/ui/container';
import { PrismicNextImage } from '@prismicio/next';
import dayjs from 'dayjs';
import { Link } from '@/components/ui/link';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PostsDescription } from '@/app/videos/_components/postsDescription';

export async function FeaturedPosts() {
  const client = createClient();
  const featuredPosts = await client
    .getByType('video', {
      pageSize: 1,
      page: 0,
      filters: [filter.at('my.video.featured', true)],
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

  return (
    <div className="mt-16 bg-gradient-to-t from-gray-100 pb-14">
      <Container>
        <h2 className="text-3xl font-medium tracking-tight">Featured</h2>
        <div className="mt-6 flex flex-col">
          {featuredPosts.map(post => (
            <div
              key={post.uid}
              className="relative flex flex-col rounded-3xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5">
              {post.data.video_url && post.data.video_url.html && (
                <div
                  dangerouslySetInnerHTML={{ __html: post.data.video_url.html }}
                  className={'aspect-h-9 aspect-w-16 overflow-hidden rounded-3xl'}></div>
              )}

              <div className="flex flex-1 flex-col p-8">
                <div className={'flex items-center justify-between'}>
                  <div className="text-sm/5 text-gray-700">
                    {dayjs(post.data.publishing_date).format('dddd, MMMM D, YYYY')}
                  </div>
                  {post.data.category && 'data' in post.data.category && (
                    <div className="mt-3">
                      <Badge>{(post.data.category.data as { name: string }).name}</Badge>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-base/7 font-medium">
                  <Link href={`/videos/${post.uid}`}>{post.data.name}</Link>
                </div>

                <div>
                  <PostsDescription description={post.data.description} />
                </div>

                <div className="mt-2 flex-1 text-sm/6 text-gray-500"></div>
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
