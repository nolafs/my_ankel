import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Heading, Subheading } from '@/components/text'
import { createClient } from '@/prismicio'

import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { PrismicNextImage } from '@prismicio/next'
import dayjs from 'dayjs'
import type {Metadata} from 'next'
import { notFound } from 'next/navigation'
import {PrismicRichText} from '@prismicio/react';



type Props = {
  params: Promise<{ uid: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata(
    {params}: Props,
): Promise<Metadata> {

  const id = (await params).uid
  const client = createClient();
  const post = await client.getByUID('posts', id, {
    fetchLinks: ['post_category.name', 'post_category.uid'],
  }).catch(() => notFound());

  return post ? { title: post.data.title } : {}
}


export default async function Page({params}: Props) {
  const client = createClient();
  const id = (await params).uid;
  const post = await client.getByUID('posts', id, {
    fetchLinks: ['post_category.name', 'author.name'],
  }).then(response => response.data).catch(() => notFound());

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Subheading className="mt-16">
          {dayjs(post.publishing_date).format('dddd, MMMM D, YYYY')}
        </Subheading>
        <Heading as="h1" className="mt-2">
          {post.title}
        </Heading>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">

            { (post.category) && (
              <div className="flex flex-wrap gap-2">

                  <Link
                    key='test'
                    href={`/blog?category=test`}
                    className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                  >
                  test
                  </Link>

              </div>
            )}
          </div>
          <div className="text-gray-700">
            <div className="max-w-2xl xl:mx-auto">

              <PrismicNextImage
                  field={post.feature_image}
                  width={896}
                  height={400}
                  priority={true}
                  className="mb-10 aspect-[3/2] w-full rounded-2xl object-cover shadow-xl"
                  imgixParams={{fm: 'webp', fit: 'crop', crop: ['focalpoint'], width: 2016, height: 1344, q: 70}} />

              <div className={'prose md:prose-lg lg:prose-xl'}>{post.content && <PrismicRichText field={post.content}/>}</div>
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
    </main>
  )
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType('posts');

  return pages.map(page => {
    return {uid: page.uid};
  });
}
