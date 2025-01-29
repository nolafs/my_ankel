import { createClient } from '@/prismicio';
import { Heading, Lead, Subheading } from '@/components/ui/text';
import React from 'react';
import { GradientBackground } from '@/components/ui/gradient';
import { LinkPrismicType, OGImage, SocialLinkItemType } from '@/types';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { ResolvedOpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { LucideMailOpen, PhoneCallIcon, Share2Icon } from 'lucide-react';
import SocialList from '@/components/features/social-list/social-list';
import { PrismicImage, SliceZone } from '@prismicio/react';
import { components } from '@/slices';
import ContactForm from '@/components/features/contact-form/contact-form';
import { Container } from '@/components/ui/container';

type Params = { uid: string };

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('contact').catch(() => notFound());

  let image = null;
  const parentMeta = await parent;
  const parentOpenGraph: ResolvedOpenGraph | null = parentMeta.openGraph ?? null;

  if (image) {
    image = `${page.data.meta_image.url}?w=1200&h=630&fit=crop&fm=webp&q=80`;
  }

  return {
    title: 'Contact',
    description: page.data.meta_description ?? parentMeta.description ?? 'Contact us for more information',
    openGraph: {
      title: page.data.meta_title ?? parentMeta.title ?? undefined,
      images: [
        {
          url: image ?? (parentOpenGraph?.images ? (parentOpenGraph.images[0] as OGImage).url : ''),
        },
      ],
    },
  };
}

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('contact').catch(() => notFound());
  const settings = await client.getSingle('settings');

  const social: SocialLinkItemType[] | undefined = settings.data?.social_media?.map(item => ({
    type: item.type,
    name: item.name,
    url: item.url as LinkPrismicType,
  }));

  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <main className={'w-full overflow-hidden'}>
      <Container className="mb-24 mt-24 md:mb-24 md:mt-40">
        <GradientBackground />
        {/* Header */}
        <Subheading className="mt-16">{page.data.subtitle}</Subheading>
        <Heading as="h1" className="mt-2">
          {page.data.heading}
        </Heading>
        <Lead className="mt-6 max-w-3xl">{page.data.lead}</Lead>
        {/* Contact page */}
        <div className="mx-2 my-24 rounded-4xl bg-gray-900 bg-[url(/dot-texture.svg)] pb-24 pt-72 lg:pt-36">
          <div className={'grid grid-cols-1 justify-items-center gap-5 md:grid-cols-3'}>
            {page.data.email_address && (
              <div className={'text-center'}>
                {/* Email */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white">
                  <i>
                    <LucideMailOpen width={24} height={24} />
                  </i>
                </div>
                <div className="mb-3 mt-5 text-xl font-bold text-white md:text-3xl">Email</div>
                <div className="text-gray-500">
                  <a href={`mailto:${page.data.email_address}`}>{page.data.email_address}</a>
                </div>
              </div>
            )}
            {page.data.phone_number && (
              <div className={'text-center'}>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white">
                  <i>
                    <PhoneCallIcon width={24} height={24} />
                  </i>
                </div>
                <div className="mb-3 mt-5 text-xl font-bold text-white md:text-3xl">Telephone</div>
                <div className="text-gray-500">
                  <a href={`tel:${page.data.phone_number}`}>{page.data.phone_number}</a>
                </div>
              </div>
            )}
            {social && (
              <div className={'text-center'}>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white">
                  <i>
                    <Share2Icon width={24} height={24} />
                  </i>
                </div>
                <div className="mb-3 mt-5 text-xl font-bold text-white md:text-3xl">Social</div>
                <div className="text-gray-500">
                  <SocialList items={social} icons={true} variantList={0} variantButton={2} />
                </div>
              </div>
            )}
          </div>
        </div>

        <Subheading>{page.data.subtitle}</Subheading>
        <Heading as="h1" className="mt-2">
          {page.data.form_heading}
        </Heading>

        <Lead className="mt-6 max-w-3xl">{page.data.form_body}</Lead>
        <div className="mb-24 mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className={'max-lg:max-w-lg'}>
            <div className="aspect-3/2 overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <PrismicImage
                field={page.data.form_image}
                className="block size-full object-cover"
                width={610}
                height={410}
                imgixParams={{
                  fm: 'webp',
                  q: 70,
                }}
              />
            </div>
          </div>
          <div className={'max-w-lg'}>
            <ContactForm items={settings.data.contact_form_enquiries} />
          </div>
        </div>
      </Container>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}
