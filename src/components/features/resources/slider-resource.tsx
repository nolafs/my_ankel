import React from 'react';
import { Repeatable, RichTextField, LinkField, KeyTextField } from '@prismicio/client';
import { SliderResources } from '@/components/features/Slider/slider-resources';

interface SliderProps {
  heading: KeyTextField | string;
  subheading: KeyTextField | string;
  listings: any[];
  body: RichTextField;
  links: Repeatable<LinkField>;
}

export const SliderResource = ({ heading, subheading, listings, body, links }: SliderProps) => {
  return (
    <SliderResources
      heading={heading}
      subheading={subheading}
      body={body}
      links={links}
      listings={listings}
      variation={'resource'}></SliderResources>
  );
};

export default SliderResource;
