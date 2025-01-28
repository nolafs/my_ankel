import React from 'react';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';
import { notFound } from 'next/navigation';
import { createClient } from '@/prismicio';

export default async function HomePage() {
  const client = createClient();
  const page = await client.getSingle('home').catch(() => notFound());

  return (
    <main className={'min-h-svh w-full overflow-hidden'}>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}
