import { createClient } from '@/prismicio';
import { Heading, Lead, Subheading } from '@/components/ui/text';
import React from 'react';
import { GradientBackground } from '@/components/ui/gradient';
import { type LinkPrismicType, type OGImage, type SocialLinkItemType } from '@/types';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { type ResolvedOpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { LucideMailOpen, PhoneCallIcon, Share2Icon } from 'lucide-react';
import SocialList from '@/components/features/social-list/social-list';
import { PrismicImage, SliceZone } from '@prismicio/react';
import { components } from '@/slices';
import ContactForm, { ContactEnquiryItem } from '@/components/features/contact-form/contact-form';
import { Container } from '@/components/ui/container';
import { type ContactDocument, type SettingsDocument } from '../../../prismicio-types';
import { CONTACTJSONLD } from '@/types/schema';

type Params = { uid: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('contact').catch(() => notFound());

  let image = null;
  const parentMeta = await parent;
  const parentOpenGraph: ResolvedOpenGraph | null = parentMeta.openGraph ?? null;

  if (image) {
    image = `${page.data.meta_image.url}?w=1200&h=630&fit=crop&fm=webp&q=80`;
  }

  return {
    title: page.data.meta_title ?? 'My Ankle - Contact us',
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

const ContactDetailBlock = ({ page, social }: { page: ContactDocument; social: SocialLinkItemType[] | undefined }) => {
  return (
    <div className="mx-2 my-24 rounded-4xl bg-gray-900 bg-[url(/dot-texture.svg)] pb-16 pt-16">
      <Container>
        <div className={'grid grid-cols-1 justify-items-center gap-5 md:grid-cols-3'}>
          {page.data.email_address && (
            <div className={'text-center'}>
              {/* Email */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white">
                <i>
                  <LucideMailOpen width={24} height={24} />
                </i>
              </div>
              <div className="mb-3 mt-5 text-xl font-bold text-accent md:text-2xl">Email</div>
              <div className="text-2xl text-white md:text-3xl">
                <a href={`mailto:${page.data.email_address}`}>{page.data.email_address}</a>
              </div>
            </div>
          )}
          {page.data.phone_number && (
            <div className={'text-center'}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white">
                <i>
                  <PhoneCallIcon width={24} height={24} />
                </i>
              </div>
              <div className="mb-3 mt-5 text-xl font-bold text-accent md:text-2xl">Telephone</div>
              <div className="text-2xl text-white md:text-3xl">
                <a href={`tel:${page.data.phone_number}`}>{page.data.phone_number}</a>
              </div>
            </div>
          )}
          {social && (
            <div className={'text-center'}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white">
                <i>
                  <Share2Icon width={24} height={24} />
                </i>
              </div>
              <div className="mb-3 mt-5 text-xl font-bold text-accent md:text-2xl">Social</div>
              <div className="text-white md:text-3xl">
                <SocialList items={social} icons={true} variantList={0} variantButton={1} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

const ContactFormBlock = ({ page, settings }: { page: ContactDocument; settings: SettingsDocument }) => {
  return (
    <Container>
      <Subheading>{page.data.subtitle}</Subheading>
      <Heading as="h1" className="mt-2">
        {page.data.form_heading}
      </Heading>

      <Lead className="mt-6 max-w-3xl">{page.data.form_body}</Lead>
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
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
          <ContactForm items={settings.data.contact_form_enquiries as ContactEnquiryItem[]} />
        </div>
      </div>
    </Container>
  );
};

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('contact').catch(() => notFound());
  const settings = await client.getSingle('settings');

  const social: SocialLinkItemType[] | undefined = settings.data?.social_media?.map(item => ({
    type: item.type,
    name: item.name,
    url: item.url as LinkPrismicType,
  }));

  return (
    <main className={'w-full overflow-hidden'}>
      <GradientBackground />
      <div className="mb-24 mt-24 md:mb-24 md:mt-40">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
      {/* Contact page */}
      <div className="mb-16 md:mb-24">
        <ContactDetailBlock page={page} social={social} />
        <ContactFormBlock page={page} settings={settings} />
      </div>

      <SliceZone slices={page.data.slices2} components={components} />

      {/* Add JSON-LD to your page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACTJSONLD) }} />
    </main>
  );
}
