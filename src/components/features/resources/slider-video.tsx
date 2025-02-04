import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/text';
import cn from 'clsx';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';
import ArrowLongRightIcon from '@heroicons/react/24/outline/ArrowLongRightIcon';
import React from 'react';
import { Repeatable, RichTextField, LinkField, KeyTextField, EmbedField } from '@prismicio/client';
import { SliderResources } from '@/components/features/Slider/slider-resources';
import { AuthorDocumentData } from '../../../../prismicio-types';
import SliderResourceCard from '../Slider/slider-resource-card';

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
