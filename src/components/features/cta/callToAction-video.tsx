import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/text';
import cn from 'clsx';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';
import ArrowLongRightIcon from '@heroicons/react/24/outline/ArrowLongRightIcon';
import React from 'react';
import { type Repeatable, type RichTextField, type LinkField, type KeyTextField, type EmbedField } from '@prismicio/client';

interface CallToActionVideoProps {
  heading: KeyTextField | string;
  video: EmbedField;
  body: RichTextField;
  links: Repeatable<LinkField>;
}

export const CallToActionVideo = ({ heading, video, body, links }: CallToActionVideoProps) => {
  return (
    <Container className="pt-24">
      <Heading as="h2" className="max-w-3xl">
        {heading}
      </Heading>
      <div
        className={cn(
          'mt-16 h-[36rem] sm:h-auto sm:w-[76rem]',
          'relative aspect-[var(--width)/var(--height)] [--radius:theme(borderRadius.xl)]',
        )}>
        <div className="absolute -inset-[var(--padding)] rounded-[calc(var(--radius)+var(--padding))] shadow-sm ring-1 ring-black/5 [--padding:theme(spacing.2)]" />
        <div className="h-full overflow-hidden rounded-[var(--radius)] shadow-2xl ring-1 ring-black/10">
          {video?.html && (
            <div
              dangerouslySetInnerHTML={{ __html: video.html }}
              className={'aspect-h-9 aspect-w-16 overflow-hidden rounded-[calc(var(--radius)+var(--padding))]'}></div>
          )}
        </div>
      </div>
      <div className={'mt-10'}>
        <div className="max-w-sm text-sm/6 text-gray-600">
          <PrismicRichText field={body} />
        </div>
        <div className="mt-10">
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
    </Container>
  );
};
