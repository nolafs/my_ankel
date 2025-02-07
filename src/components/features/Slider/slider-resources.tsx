'use client';

import { Container } from '@/components/ui/container';
import { Heading, Subheading } from '@/components/ui/text';

import { clsx } from 'clsx';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import React, { useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import { type KeyTextField, type LinkField, type Repeatable, type RichTextField } from '@prismicio/client';
import { PrismicRichText } from 'node_modules/@prismicio/react/dist/PrismicRichText';
import {
  type AuthorDocumentData,
  type VideoDocument,
  type DownloadDocument,
  type PostCategoryDocument,
} from '../../../../prismicio-types';
import SliderCard from './slider-card';
import ButtonSliceVariation from '@/components/ui/button-slice-variation';
import { Button } from '@/components/ui/button';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface SliderResourcesProps {
  heading: KeyTextField | string | null;
  subheading: KeyTextField | string;
  body: RichTextField;
  links: Repeatable<LinkField>;
  listings: VideoDocument[] | DownloadDocument[];
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
    <section className="overflow-hidden">
      <Container className={'pt-16 md:pt-24 lg:pt-32'}>
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
            img={
              ('feature_image' in item.data && item.data.feature_image) ||
              ('poster' in item.data && item.data.poster) ||
              undefined
            }
            file={('file' in item.data && item?.data?.file) || undefined}
            video={'video_url' in item.data ? item.data.video_url || undefined : undefined}
            slug={item.uid}
            category={item.data.category as unknown as PostCategoryDocument}
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
              {links?.map(link => (
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
          <div className="hidden sm:flex sm:gap-2">
            {listings.map((item, idx) => (
              <TooltipProvider key={`${String(item.data.name).replace(' ', '-')}-${idx}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => scrollTo(idx)}
                      size={'icon'}
                      data-active={activeIndex === idx ? true : undefined}
                      aria-label={`Scroll to from ${item.data.name}`}
                      className={clsx(
                        'size-2.5 rounded-full border border-transparent bg-gray-300 transition',
                        'data-[active]:bg-gray-400 data-[hover]:bg-gray-400',
                        'forced-colors:data-[active]:bg-[Highlight] forced-colors:data-[focus]:outline-offset-4',
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.data.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
