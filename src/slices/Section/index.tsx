import { type Content, type ImageField, type LinkField, type RichTextField } from '@prismicio/client';
import { PrismicImage, PrismicRichText, type SliceComponentProps } from '@prismicio/react';
import { Container } from '@/components/ui/container';

import { Heading, Lead, Subheading } from '@/components/ui/text';
import cn from 'clsx';
import React from 'react';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { PrismicNextLink } from '@prismicio/next';
import { buttonVariants } from '@/components/ui/button';
import ButtonSliceVariation from '@/components/ui/button-slice-variation';
import Animate from '@/lib/animation';

/**
 * Props for `Section`.
 */
export type SectionProps = SliceComponentProps<Content.SectionSlice>;

function ListItem({
  heading,
  description,
  image,
  link,
  imageSize = '60',
  imageStyle = false,
}: {
  heading?: string;
  description: RichTextField;
  image: ImageField;
  imageSize?: string;
  imageStyle?: boolean;
  link?: LinkField;
}) {
  return (
    <li>
      {imageStyle ? (
        <div className={cn(`aspect-h-9 aspect-w-16 overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1`)}>
          <PrismicImage field={image} className="block size-full object-cover object-center" />
        </div>
      ) : (
        <div className={cn(`aspect-1 max-w-[${imageSize}px]`)}>
          <PrismicImage
            field={image}
            className="block size-full object-contain"
            width={Number(imageSize)}
            height={Number(imageSize)}
          />
        </div>
      )}

      <div className="mt-6 max-w-lg text-sm/6 text-gray-500">
        <h3 className={'mb-3 text-lg font-medium text-gray-900'}>{heading}</h3>
        <PrismicRichText field={description} />
      </div>
      {link && 'url' in link && (
        <PrismicNextLink field={link} className={cn(buttonVariants({ variant: 'default' }), 'mt-5')} />
      )}
    </li>
  );
}

/**
 * Component for "Section" Slices.
 */
const Section = ({ slice }: SectionProps): JSX.Element => {
  if (slice.variation === 'sectionList' || slice.variation === 'sectionListImage') {
    let imageSize = '100';

    if (slice.variation === 'sectionListImage') {
      imageSize = 'auto';
    }

    return (
      <Container className="mt-16 md:mt-24 lg:mt-32">
        <Subheading>{slice.primary.subheading}</Subheading>
        <Heading as="h3" className="mt-2">
          {slice.primary.heading}
        </Heading>
        <Lead className="mt-6 max-w-3xl">{slice.primary.lead}</Lead>
        <Subheading as="h3" className="mt-16 md:mt-20 lg:mt-24">
          {slice.primary.list_title}
        </Subheading>
        <hr className="mt-6 border-t border-gray-200" />
        {slice.primary.list && slice.primary.list.length > 0 && (
          <ul role="list" className="mx-auto mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {slice.primary.list.map((item, idx) => (
              <ListItem
                key={'list-' + slice.id + idx}
                heading={item.heading!}
                description={item.body}
                image={item.icon}
                imageStyle={slice.variation !== 'sectionList'}
                imageSize={imageSize}
                link={item.link}
              />
            ))}
          </ul>
        )}
      </Container>
    );
  }

  if (slice.variation === 'sectionNumbers') {
    return (
      <Container>
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-lg">
            <h2 className="text-2xl font-medium tracking-tight">{slice.primary.heading}</h2>
            <div className="prose mt-6 text-sm/6 text-gray-600">
              <PrismicRichText field={slice.primary.body} />
            </div>
          </div>
          <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
              {slice.primary.images &&
                slice.primary.images.length > 0 &&
                slice.primary.images.map((image, idx) => (
                  <div
                    key={'images_' + idx}
                    className={cn(
                      'aspect-1 overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10',
                      idx % 2 === 0 ? 'outline-black/10' : '-mt-8 outline-black/10 lg:-mt-32',
                    )}>
                    <PrismicImage
                      field={image.image}
                      className="block size-full object-cover"
                      width={560}
                      height={560}
                      imgixParams={{
                        fm: 'webp',
                        //fit: 'crop',
                        //crop: ['focalpoint'],
                        q: 70,
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
          {slice.primary.numbers && slice.primary.numbers.length > 0 && (
            <div className="max-lg:mt-16 lg:col-span-1">
              <Subheading>The Numbers</Subheading>
              <hr className="mt-6 border-t border-gray-200" />
              <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {slice.primary.numbers.map((number, idx) => (
                  <div
                    key={'numbers_' + idx}
                    className={cn(
                      'flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4',
                      number.class_names,
                    )}>
                    <dt className="text-sm/6 text-gray-600">{number.heading}</dt>
                    <dd className="order-first text-6xl font-medium tracking-tight">
                      {number.prefix}
                      <AnimatedNumber start={number.start ?? 0} end={number.end ?? 0} decimals={number.decimals ?? 0} />
                      {number.suffix}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </section>
      </Container>
    );
  }

  if (slice.variation === 'sectionEmbed') {
    return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
        <Container className="mt-32">
          <Subheading>{slice.primary.subheading}</Subheading>
          <Heading as="h3" className="mt-2">
            {slice.primary.heading}
          </Heading>
          <Lead className="mt-6 max-w-3xl">{slice.primary.lead}</Lead>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="prose max-w-lg text-sm/6 text-gray-600">
              <PrismicRichText field={slice.primary.body} />
            </div>
            {slice.primary.video && (
              <div className="max-lg:order-first max-lg:max-w-lg">
                <div className="relative overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                  <div
                    dangerouslySetInnerHTML={{ __html: slice.primary.video?.html ?? '' }}
                    className={'aspect-h-9 aspect-w-16'}></div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    );
  }

  if (slice.variation === 'default') {
    const section = () => {
      return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
          <Container className="mt-16 md:mt-24 lg:mt-32">
            <Subheading>{slice.primary.subheading}</Subheading>
            <Heading as="h3" className="mt-2">
              {slice.primary.heading}
            </Heading>
            <Lead className="mt-6 max-w-3xl">{slice.primary.lead}</Lead>
            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className={'flex flex-col'}>
                <div className="prose prose-sm max-w-lg text-gray-600 md:prose-base lg:prose-lg">
                  <PrismicRichText field={slice.primary.body} />
                </div>
                <div className="mt-10 flex flex-col flex-wrap gap-3 md:flex-row">
                  {slice.primary.links?.map(link => (
                    <ButtonSliceVariation
                      key={
                        link.text
                          ? link?.text.toLowerCase().replace(/ /g, '-')
                          : Math.random().toString(36).substring(2, 15)
                      }
                      link={link}
                    />
                  ))}
                </div>
              </div>
              {slice.primary.images &&
                slice.primary.images.length > 0 &&
                (slice.primary.images.length === 1 ? (
                  <div className="max-lg:order-first max-lg:max-w-lg">
                    <div className="aspect-3/2 overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                      <PrismicImage
                        field={slice.primary.images[0]?.image}
                        className="block size-full object-cover"
                        width={610}
                        height={410}
                        imgixParams={{
                          fm: 'webp',
                          fit: 'crop',
                          crop: ['focalpoint'],
                          q: 70,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  slice.primary.images.map((image, idx) => (
                    <div
                      key={'images_' + idx}
                      className={cn(
                        'aspect-1 overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10',
                        idx % 2 === 0 ? 'outline-black/10' : '-mt-8 outline-black/10 lg:-mt-32',
                      )}>
                      <PrismicImage
                        field={image.image}
                        className="block size-full object-cover"
                        width={560}
                        height={560}
                        imgixParams={{
                          fm: 'webp',
                          //fit: 'crop',
                          //crop: ['focalpoint'],
                          q: 70,
                        }}
                      />
                    </div>
                  ))
                ))}
            </div>
          </Container>
        </section>
      );
    };

    if (slice.primary.animation) {
      return <Animate>{section()}</Animate>;
    } else {
      return section();
    }
  }

  return <></>;
};

export default Section;
