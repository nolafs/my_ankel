import { Container } from '@/components/ui/container';
import { Gradient } from '@/components/ui/gradient';
import { type ImageField, type KeyTextField, type LinkField } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import ButtonSliceVariation from '@/components/ui/button-slice-variation';
import React from 'react';

export interface HeroProps {
  heading: KeyTextField | string;
  subheading: KeyTextField | string;
  links?: LinkField[];
  image?: ImageField;
}

export function Hero({ heading, subheading, links, image }: HeroProps) {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      {image && (
        <div className="absolute inset-2 bottom-0 z-0 overflow-hidden rounded-4xl">
          <div
            className={'flex w-full flex-col items-center justify-start sm:items-center md:items-center lg:items-end'}>
            <PrismicNextImage
              loading={'lazy'}
              field={image}
              className="block h-auto w-full object-contain sm:w-full lg:w-1/2"
            />
          </div>
        </div>
      )}
      <Container className="z-2 relative">
        <div className="pb-24 pt-32 sm:pb-32 sm:pt-32 md:pb-48 md:pt-52">
          <h1 className="font-display text-balance text-5xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            {heading}
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">{subheading}</p>
          <div className="mt-12 flex flex-col gap-x-3 gap-y-4 sm:flex-row">
            {links?.map(link => (
              <ButtonSliceVariation
                key={
                  link.text ? link?.text.toLowerCase().replace(/ /g, '-') : Math.random().toString(36).substring(2, 15)
                }
                link={link}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
