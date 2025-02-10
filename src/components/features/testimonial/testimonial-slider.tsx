'use client';

import { type TestimonialType } from '@/types';
import { Container } from '@/components/ui/container';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import Placeholder from '@/assets/placeholder-512x512.png';
import Autoplay from 'embla-carousel-autoplay';
import { Heading, Lead, Subheading } from '@/components/ui/text';
import React from 'react';

interface TestimonialsProps {
  data: TestimonialType[];
}

const TestimonialItem = ({ name, position, body, image, stars }: TestimonialType) => {
  const renderStars = (stars = 0) => {
    const starsArray = Array.from({ length: 5 }, (_, i) => i + 1);

    return starsArray.map((item, index) => (
      <StarIcon
        key={index}
        aria-hidden="true"
        strokeWidth={1}
        className={`size-5 flex-none ${item <= stars ? 'fill-yellow-400' : ''}`}
      />
    ));
  };
  return (
    <figure className="mx-auto max-w-2xl">
      <p className="sr-only">5 out of 5 stars</p>
      <div className="flex gap-x-1 text-yellow-400">{renderStars(stars)}</div>
      <blockquote className="mt-10 tracking-tight text-white sm:text-2xl/9 lg:text-2xl">
        <PrismicRichText field={body} />
      </blockquote>
      <figcaption className="mt-10 flex items-center gap-x-6">
        {image?.url ? (
          <PrismicNextImage field={image} className={'size-12 rounded-full bg-gray-50'} />
        ) : (
          <Image
            src={Placeholder}
            alt={'Profile picture'}
            width={48}
            height={48}
            className={'size-12 rounded-full bg-gray-50'}
          />
        )}
        <div className="text-sm/6">
          <p className="text-sm/6 font-medium text-white">{name}</p>
          <p className="text-sm/6 font-medium">
            <span className="bg-gradient-to-r from-[#5686cd] from-[28%] via-[#56bfcd] via-[70%] to-[#76cbd6] bg-clip-text text-transparent">
              {position}
            </span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
};

export const TestimonialSlider = ({ data }: TestimonialsProps) => {
  return (
    <section>
      <div className="mx-2 my-24 rounded-4xl bg-gray-900 bg-[url(/dot-texture.svg)] pb-24 pt-20 lg:pt-20">
        <Container>
          <div className={'mb-16'}>
            <Subheading dark>Testimonial</Subheading>
            <Heading as="h3" dark className="mt-2 max-w-3xl">
              What they say
            </Heading>
            <Lead className="mt-6 max-w-3xl">
              We don’t just talk the talk, we walk the walk, always listening carefully to our patients’.
            </Lead>
          </div>
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            opts={{
              align: 'start',
              loop: true,
            }}>
            <CarouselContent>
              {data.length &&
                data.map((item, index) => (
                  <CarouselItem key={index} className="px-5 md:basis-1/2">
                    <TestimonialItem key={index} {...item} />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </Container>
      </div>
    </section>
  );
};

export default TestimonialSlider;
