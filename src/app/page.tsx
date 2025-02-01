import React from 'react';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';
import { notFound } from 'next/navigation';
import { createClient } from '@/prismicio';
import { BentoSection } from '@/components/features/resources/bentoList';
import { EmbedField, filter } from '@prismicio/client';
import { CallToActionVideo } from '@/components/features/cta/callToAction-video';

export default async function HomePage() {
  const client = createClient();
  const page = await client.getSingle('home').catch(() => notFound());

  let categories: any[] = [];
  let videoEmbed: EmbedField | null = null;
  categories = await client.getAllByUIDs('post_category', ['ankle-conditions', 'ankle-treatments']);

  const conditionsPosts = await client
    .getByType('posts', {
      pageSize: 5,
      page: 0,
      filters: [filter.at('my.posts.featured', true), filter.any('my.posts.category', [categories[0].id])],
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

  const treatmentPosts = await client
    .getByType('posts', {
      pageSize: 4,
      page: 0,
      filters: [filter.at('my.posts.featured', true), filter.any('my.posts.category', [categories[1].id])],
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

  if (videoPosts.length > 0 && videoPosts[0]?.data.video_url) {
    videoEmbed = videoPosts[0].data.video_url;
  }

  return (
    <main className={'min-h-svh w-full overflow-hidden pb-24'}>
      <div className="bg-gradient-to-b from-white from-50% to-gray-100 pb-24">
        {/* SliceZone 1 */}
        {page.data.slices2 && <SliceZone slices={page.data.slices2} components={components} />}

        {videoEmbed && (
          <CallToActionVideo
            heading={page.data.latest_video_heading}
            video={videoEmbed}
            body={page.data.latest_video_body}
            links={page.data.latest_video_links}
          />
        )}

        {conditionsPosts.length && (
          <BentoSection
            heading={page.data.latest_conditions_heading}
            subheading={'Ankle Conditions'}
            body={page.data.latest_conditions_body}
            links={page.data.latest_conditions_links}
            listings={conditionsPosts}
            dark={false}
          />
        )}
      </div>

      <div>
        {treatmentPosts.length && (
          <BentoSection
            heading={page.data.latest_treatments_heading}
            subheading={'Ankle Treatments'}
            body={page.data.latest_treatments_body}
            links={page.data.latest_treatments_links}
            listings={treatmentPosts}
            dark={true}
          />
        )}
      </div>

      {/* SliceZone 2 */}
      {page.data.slices && <SliceZone slices={page.data.slices} components={components} />}
    </main>
  );
}
