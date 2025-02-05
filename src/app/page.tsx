import React from 'react';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';
import { notFound } from 'next/navigation';
import { createClient } from '@/prismicio';
import { BentoSection } from '@/components/features/resources/bentoList';
import { filter } from '@prismicio/client';
import { SliderResource } from '@/components/features/resources/slider-resource';
import SliderVideo from '@/components/features/resources/slider-video';

import Animate from '@/lib/animation';

export default async function HomePage() {
  const client = createClient();
  const page = await client.getSingle('home').catch(() => notFound());

  const resentPosts = await client
    .getByType('posts', {
      pageSize: 5,
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

  const videoPosts = await client
    .getByType('video', {
      pageSize: 6,
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

  const downloadPosts = await client
    .getByType('download', {
      pageSize: 6,
      page: 0,
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

  return (
    <main className={'min-h-svh w-full overflow-hidden'}>
      {/* SliceZone 1 */}
      {page.data.slices2 && <SliceZone slices={page.data.slices2} components={components} />}

      <div className="bg-gradient-to-b from-white from-50% to-gray-100 pb-24">
        {videoPosts.length && (
          <Animate>
            <SliderVideo
              subheading={'Videos'}
              heading={page.data.latest_video_heading}
              listings={videoPosts}
              body={page.data.latest_video_body}
              links={page.data.latest_video_links}
            />{' '}
          </Animate>
        )}

        {resentPosts.length && (
          <Animate>
            <BentoSection
              heading={page.data.latest_articles_heading}
              subheading={'Resent Articles'}
              body={page.data.latest_articles_body}
              links={page.data.latest_articles_links}
              listings={resentPosts}
              dark={false}
            />
          </Animate>
        )}
      </div>

      <Animate>
        <SliderResource
          subheading={'Downloads'}
          heading={page.data.latest_download_heading}
          listings={downloadPosts}
          body={page.data.latest_download_body}
          links={page.data.latest_download_links}
        />
      </Animate>

      {/* SliceZone 2 */}
      {page.data.slices && <SliceZone slices={page.data.slices} components={components} />}
    </main>
  );
}
