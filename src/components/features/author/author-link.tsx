import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import ArrowLongRightIcon from '@heroicons/react/24/outline/ArrowLongRightIcon';
import { Author } from '@/types';

interface AuthorLinkProps {
  author: Author;
}

export const AuthorLink = ({ author }: AuthorLinkProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger className={'underline'}>
        <div className={'flex items-center gap-2'}>
          {author.profile_image && (
            <PrismicNextImage
              field={author.profile_image}
              width={32}
              height={32}
              className="size-4 rounded-full object-cover"
            />
          )}
          {author.name}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className={'z-30'}>
        <PrismicRichText field={author.description} />
        <PrismicLink
          field={author.link}
          className={'mt-3 inline-flex items-center gap-2 text-sm/6 font-medium text-pink-600'}>
          Go to profile <ArrowLongRightIcon className="size-5" />
        </PrismicLink>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AuthorLink;
