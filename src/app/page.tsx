import React from 'react';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';
import { notFound } from 'next/navigation';
import { createClient } from '@/prismicio';
import { BentoSection } from '@/components/features/resources/bentoList';
import { filter } from '@prismicio/client';

export default async function HomePage() {
  const client = createClient();
  const page = await client.getSingle('home').catch(() => notFound());

  let categories: any[] = [];
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
      pageSize: 5,
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

  return (
    <main className={'min-h-svh w-full overflow-hidden'}>
      <div className="bg-gradient-to-b from-white from-50% to-gray-100 pb-24">
        <SliceZone slices={page.data.slices} components={components} />

        {conditionsPosts.length && (
          <BentoSection
            heading="Understand Your Ankle Condition"
            subheading={'Ankle Conditions'}
            listings={conditionsPosts}
            dark={false}
          />
        )}
      </div>

      <div className={'pb-24'}>
        {treatmentPosts.length && (
          <BentoSection
            heading="Explore Treatment Options"
            subheading={'Ankle Treatments'}
            listings={treatmentPosts}
            dark={true}
          />
        )}
      </div>
    </main>
  );
}
