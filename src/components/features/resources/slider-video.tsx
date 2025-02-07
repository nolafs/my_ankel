import React from 'react';
import { type Repeatable, type RichTextField, type LinkField, type KeyTextField } from '@prismicio/client';
import { SliderResources } from '@/components/features/Slider/slider-resources';
import type { VideoDocument } from '../../../../prismicio-types';

interface SliderVideoProps {
  heading: KeyTextField | string;
  subheading: KeyTextField | string;
  listings: VideoDocument[];
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
