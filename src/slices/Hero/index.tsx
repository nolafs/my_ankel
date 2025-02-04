import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { Hero as HeroComponent } from '@/components/features/hero/hero';
import { Heading, Lead, Subheading } from '@/components/ui/text';
import React from 'react';
import { Container } from '@/components/ui/container';
import { HeroSearch } from '@/components/features/hero/hero-search';

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  if (slice.variation === 'heroSearch') {
    return (
      <HeroSearch
        heading={slice.primary.heading}
        subheading={slice.primary.subheading}
        image={slice.primary.image}
        links={slice.primary.links}
      />
    );
  }

  if (slice.variation === 'simple') {
    return (
      <Container>
        <Subheading className="mt-16">{slice.primary.label}</Subheading>
        <Heading as="h1" className="mt-2">
          {slice.primary.heading}
        </Heading>
        <Lead className="mt-6 max-w-3xl">{slice.primary.subheading}</Lead>
      </Container>
    );
  }

  return (
    <HeroComponent
      heading={slice.primary.heading}
      subheading={slice.primary.subheading}
      image={slice.primary.image}
      links={slice.primary.links}
    />
  );
};

export default Hero;
