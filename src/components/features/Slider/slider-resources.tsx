'use client';

import { Container } from '@/components/ui/container';
import { Heading, Subheading } from '@/components/ui/text';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import React, { useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import { KeyTextField, LinkField, Repeatable, RichTextField } from '@prismicio/client';
import { PrismicRichText } from 'node_modules/@prismicio/react/dist/PrismicRichText';
import { PrismicNextLink } from '@prismicio/next';
import { AuthorDocumentData } from '../../../../prismicio-types';
import SliderCard from './slider-card';

export interface SliderResourcesProps {
  heading: KeyTextField | string | null;
  subheading: KeyTextField | string;
  body: RichTextField;
  links: Repeatable<LinkField>;
  listings: any[];
  variation?: 'resource' | 'video';
}

export function SliderResources({
  subheading,
  heading,
  body,
  links,
  listings,
  variation = 'resource',
}: SliderResourcesProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollX } = useScroll({ container: scrollRef });
  const [setReferenceWindowRef, bounds] = useMeasure();
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollX, 'change', x => {
    if (scrollRef.current?.children[0]) {
      setActiveIndex(Math.floor(x / scrollRef.current.children[0].clientWidth));
    }
  });

  function scrollTo(index: number) {
    const gap = 32;
    const width = (scrollRef.current!.children[0] as HTMLElement).offsetWidth;
    scrollRef.current!.scrollTo({ left: (width + gap) * index });
  }

  return (
    <div className="overflow-hidden">
      <Container>
        <div ref={setReferenceWindowRef}>
          <Subheading>{subheading}</Subheading>
          <Heading as="h3" className="mt-2">
            {heading}
          </Heading>
        </div>
      </Container>
      <div
        ref={scrollRef}
        className={clsx([
          'mt-16 flex gap-8 px-[var(--scroll-padding)]',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
          '[--scroll-padding:max(theme(spacing.6),calc((100vw-theme(maxWidth.2xl))/2))] lg:[--scroll-padding:max(theme(spacing.8),calc((100vw-theme(maxWidth.7xl))/2))]',
        ])}>
        {listings.map((item, resourcelIndex) => (
          <SliderCard
            key={resourcelIndex}
            name={item.data.name}
            title={
              item.data?.author && 'data' in item.data.author
                ? ((item.data.author?.data as AuthorDocumentData).name ?? 'My Ankle')
                : 'My Ankle'
            }
            img={item.data.feature_image || item.data.poster}
            file={item?.data?.file || null}
            video={item?.data.video_url || null}
            slug={item.uid}
            category={item.data.category}
            bounds={bounds}
            scrollX={scrollX}
            variation={variation}
            onClick={() => scrollTo(resourcelIndex)}></SliderCard>
        ))}
        <div className="w-[42rem] shrink-0 sm:w-[54rem]" />
      </div>
      <Container className="mt-16">
        <div className="flex justify-between">
          <div>
            <div className="max-w-sm text-sm/6 text-gray-600">
              <PrismicRichText field={body} />
            </div>
            <div className="mt-2">
              {links?.map((link, index) => (
                <PrismicNextLink
                  field={link}
                  key={index}
                  className="inline-flex items-center gap-2 text-sm/6 font-medium text-pink-600">
                  {link.text} <ArrowLongRightIcon className="size-5" />
                </PrismicNextLink>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
