'use client';

import { Container } from '@/components/ui/container';
import { Heading, Subheading } from '@/components/ui/text';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';
import {
  type MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import useMeasure, { type RectReadOnly } from 'react-use-measure';
import {
  asText,
  ImageField,
  KeyTextField,
  LinkField,
  LinkToMediaField,
  Repeatable,
  RichTextField,
} from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import { AuthorDocumentData, DownloadDocument } from '../../../../prismicio-types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import placeholderImage from '@/assets/placeholder.jpg';

function SliderResourceCard({
  name,
  title,
  img,
  file,
  bounds,
  scrollX,
  ...props
}: {
  img: ImageField;
  name: KeyTextField | string;
  title: KeyTextField | string | null;
  file: LinkToMediaField;
  bounds: RectReadOnly;
  scrollX: MotionValue<number>;
} & HTMLMotionProps<'div'>) {
  const ref = useRef<HTMLDivElement | null>(null);

  const computeOpacity = useCallback(() => {
    const element = ref.current;
    if (!element || bounds.width === 0) return 1;

    const rect = element.getBoundingClientRect();

    if (rect.left < bounds.left) {
      const diff = bounds.left - rect.left;
      const percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    } else if (rect.right > bounds.right) {
      const diff = rect.right - bounds.right;
      const percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    } else {
      return 1;
    }
  }, [ref, bounds.width, bounds.left, bounds.right]);

  const opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  });

  useLayoutEffect(() => {
    opacity.set(computeOpacity());
  }, [computeOpacity, opacity]);

  useMotionValueEvent(scrollX, 'change', () => {
    opacity.set(computeOpacity());
  });

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      {...props}
      className="relative flex aspect-[9/16] w-72 shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-end overflow-hidden rounded-3xl sm:aspect-[3/4] sm:w-96">
      {img.url ? (
        <PrismicNextImage field={img} className="aspect-square absolute inset-x-0 top-0 h-full w-full object-cover" />
      ) : (
        <Image
          src={placeholderImage}
          alt={name! ?? 'placeholder'}
          className="aspect-square absolute inset-x-0 top-0 h-full w-full object-cover"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-[calc(7/16*100%)] ring-1 ring-inset ring-gray-950/10 sm:from-25%"
      />

      <figure className="relative p-10">
        <div>
          <PrismicLink field={file} download={name} target={'_blank'}>
            <span className="absolute inset-0" />
            <h3 className="relative text-xl/7 font-medium text-white">{name}</h3>
          </PrismicLink>
          <Button size={'sm'} variant={'secondary'} className="mt-4 w-full">
            Download
          </Button>
        </div>

        <figcaption className="mt-6 border-t border-white/20 pt-3">
          <p className="text-sm/6 font-medium text-white">Type: PDF</p>
          <p className="text-sm/6 font-medium">
            <span className="bg-gradient-to-r from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] bg-clip-text text-transparent">
              by {title}
            </span>
          </p>
        </figcaption>
      </figure>
    </motion.div>
  );
}

export interface SliderResourcesProps {
  heading: KeyTextField | string | null;
  subheading: KeyTextField | string;
  body: RichTextField;
  links: Repeatable<LinkField>;
  listings: DownloadDocument[];
}

export function SliderResources({ subheading, heading, body, links, listings }: SliderResourcesProps) {
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
    <div className="overflow-hidden pb-32">
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
          <SliderResourceCard
            key={resourcelIndex}
            name={item.data.name}
            title={
              item.data?.author && 'data' in item.data.author
                ? ((item.data.author?.data as AuthorDocumentData).name ?? 'My Ankle')
                : 'My Ankle'
            }
            img={item.data.feature_image}
            file={item.data.file}
            bounds={bounds}
            scrollX={scrollX}
            onClick={() => scrollTo(resourcelIndex)}></SliderResourceCard>
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
