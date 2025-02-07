import { type LinkField } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import ArrowLongRightIcon from '@heroicons/react/24/outline/ArrowLongRightIcon';
import cn from 'clsx';
import { buttonVariants } from '@/components/ui/button';
import React from 'react';

export const ButtonSliceVariation = ({ link }: { link: LinkField }) => {
  // create key from link name

  if (!link.text) {
    return null;
  }

  return (
    <>
      {link.variant === 'Link' && (
        <PrismicNextLink field={link} className="inline-flex items-center gap-2 text-sm/6 font-medium text-accent">
          {link.text} <ArrowLongRightIcon className="size-5" />
        </PrismicNextLink>
      )}

      {link.variant === 'Accent' && (
        <PrismicNextLink
          field={link}
          className={cn(buttonVariants({ variant: 'default', size: 'lg' }), '!bg-accent text-white hover:!bg-black')}>
          {link.text}
        </PrismicNextLink>
      )}

      {link.variant === 'Primary' && (
        <PrismicNextLink field={link} className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}>
          {link.text}
        </PrismicNextLink>
      )}

      {link.variant === 'Secondary' && (
        <PrismicNextLink field={link} className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}>
          {link.text}
        </PrismicNextLink>
      )}
    </>
  );
};

export default ButtonSliceVariation;
