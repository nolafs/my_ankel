import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import ArrowLongRightIcon from '@heroicons/react/24/outline/ArrowLongRightIcon';
import { type Author } from '@/types';

interface AuthorLinkProps {
  author: Author;
}

export const AuthorLink = ({ author }: AuthorLinkProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger className={'underline'} asChild={true}>
        <PrismicLink field={author.link} className={'flex items-center gap-2 text-sm/6 font-medium text-gray-700'}>
          {author.profile_image && (
            <PrismicNextImage
              field={author.profile_image}
              width={50}
              height={50}
              className="size-7 rounded-full object-cover"
              imgixParams={{
                fm: 'webp',
                fit: 'crop',
                crop: ['faces'],
                ar: '1:1',
              }}
            />
          )}
          {author.name}
        </PrismicLink>
      </HoverCardTrigger>
      <HoverCardContent className={'z-30'}>
        <PrismicRichText field={author.description} />
        <PrismicLink
          field={author.link}
          className={'mt-3 inline-flex items-center gap-2 text-sm/6 font-medium text-accent'}>
          Go to profile <ArrowLongRightIcon className="size-5" />
        </PrismicLink>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AuthorLink;
