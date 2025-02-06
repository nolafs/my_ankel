import React from 'react';
import { Repeatable, RichTextField, LinkField, KeyTextField } from '@prismicio/client';
import { SliderResources } from '@/components/features/Slider/slider-resources';

interface SliderVideoProps {
  heading: KeyTextField | string;
  subheading: KeyTextField | string;
  listings: any[];
  body: RichTextField;
  links: Repeatable<LinkField>;
}

export const SliderVideo = ({ heading, subheading, listings, body, links }: SliderVideoProps) => {
  return (
    <SliderResources
      heading={heading}
      subheading={subheading}
      body={body}
      links={links}
      listings={listings}
      variation={'video'}></SliderResources>
  );
};

export default SliderVideo;
