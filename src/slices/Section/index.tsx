import { Content } from '@prismicio/client';
import { PrismicImage, PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { Container } from '@/components/ui/container';
import { Heading, Lead, Subheading } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import React from 'react';

/**
 * Props for `Section`.
 */
export type SectionProps = SliceComponentProps<Content.SectionSlice>;

/**
 * Component for "Section" Slices.
 */
const Section = ({ slice }: SectionProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Container className="mt-32">
        <Subheading>{slice.primary.subheading}</Subheading>
        <Heading as="h3" className="mt-2">
          {slice.primary.heading}
        </Heading>
        <Lead className="mt-6 max-w-3xl">{slice.primary.lead}</Lead>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="prose max-w-lg">
            <PrismicRichText field={slice.primary.body} />
          </div>
          {slice.primary.images && slice.primary.images.length > 0 && (
            <div className="max-lg:order-first max-lg:max-w-lg">
              <div className="aspect-3/2 overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                <PrismicImage
                  field={slice.primary.images[0]?.image}
                  className="block size-full object-cover"
                  width={610}
                  height={410}
                  imgixParams={{
                    fm: 'webp',
                    fit: 'crop',
                    crop: ['focalpoint'],
                    q: 70,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Section;
