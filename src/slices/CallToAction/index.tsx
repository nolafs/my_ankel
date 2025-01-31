import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { Bounded } from '@/components/ui/bounded';
import { CallToAction as CallToActionComponent } from '@/components/features/cta/callToAction';
import { CallToActionImage } from '@/components/features/cta/callToAction-Image';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/text';
import React from 'react';
import cn from 'clsx';
import { PrismicNextLink } from '@prismicio/next';
import ArrowLongRightIcon from '@heroicons/react/24/outline/ArrowLongRightIcon';

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  if (slice.variation === 'embedVideo') {
    return (
      <Container className="pt-24">
        <Heading as="h2" className="max-w-3xl">
          {slice.primary.heading}
        </Heading>
        <div
          className={cn(
            'mt-16 h-[36rem] sm:h-auto sm:w-[76rem]',
            'relative aspect-[var(--width)/var(--height)] [--radius:theme(borderRadius.xl)]',
          )}>
          <div className="absolute -inset-[var(--padding)] rounded-[calc(var(--radius)+var(--padding))] shadow-sm ring-1 ring-black/5 [--padding:theme(spacing.2)]" />
          <div className="h-full overflow-hidden rounded-[var(--radius)] shadow-2xl ring-1 ring-black/10">
            {slice.primary.video?.html && (
              <div
                dangerouslySetInnerHTML={{ __html: slice.primary.video.html }}
                className={'aspect-h-9 aspect-w-16 overflow-hidden rounded-[calc(var(--radius)+var(--padding))]'}></div>
            )}
          </div>
        </div>
        <div className={'mt-10'}>
          <div className="max-w-sm text-sm/6 text-gray-600">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <div className="mt-10">
            {slice.primary.links?.map((link, index) => (
              <PrismicNextLink
                field={link}
                key={index}
                className="inline-flex items-center gap-2 text-sm/6 font-medium text-pink-600">
                {link.text} <ArrowLongRightIcon className="size-5" />
              </PrismicNextLink>
            ))}
          </div>
        </div>
      </Container>
    );
  }

  if (slice.variation === 'image') {
    return (
      <div data-slice-type={slice.slice_type}>
        <CallToActionImage
          heading={slice.primary.heading}
          body={slice.primary.body}
          links={slice.primary.links}
          image={slice.primary.image}
        />
      </div>
    );
  }

  return (
    <Bounded as={'section'} yPadding={'sm'} data-slice-type={slice.slice_type}>
      <CallToActionComponent heading={slice.primary.heading} body={slice.primary.body} links={slice.primary.links} />
    </Bounded>
  );
};

export default CallToAction;
