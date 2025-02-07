import { type ImageField, type KeyTextField, type LinkToMediaField } from '@prismicio/client';
import React from 'react';
import { PrismicNextImage } from '@prismicio/next';
import Image from 'next/image';
import placeholderImage from '@/assets/placeholder.jpg';
import { PrismicLink } from '@prismicio/react';
import { Button } from '@/components/ui/button';

export function SliderResourceCard({
  name,
  title,
  img,
  file,
}: {
  img?: ImageField;
  name: KeyTextField | string;
  title: KeyTextField | string | null;
  file?: LinkToMediaField;
}) {
  return (
    <>
      {img?.url ? (
        <PrismicNextImage
          field={img}
          fallbackAlt={name ? '' : undefined}
          className="aspect-square absolute inset-x-0 top-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={placeholderImage}
          alt={name! ?? 'placeholder'}
          className="aspect-square absolute inset-x-0 top-0 h-full w-full object-cover"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-[calc(7/16*100%)] ring-1 ring-inset ring-gray-950/10 sm:from-25%"
      />

      <figure className="relative p-10">
        <div>
          <PrismicLink field={file} download={name} target={'_blank'}>
            <span className="absolute inset-0" />
            <h3 className="relative text-xl/7 font-medium text-white">{name}</h3>
          </PrismicLink>
          <Button size={'sm'} variant={'secondary'} className="mt-4 w-full">
            Download
          </Button>
        </div>

        <figcaption className="mt-6 border-t border-white/20 pt-3">
          <p className="text-sm/6 font-medium text-white">Type: PDF</p>
          <p className="text-sm/6 font-medium">
            <span className="bg-gradient-to-r from-[#5686cd] from-[28%] via-[#56bfcd] via-[70%] to-[#76cbd6] bg-clip-text text-transparent">
              by {title}
            </span>
          </p>
        </figcaption>
      </figure>
    </>
  );
}

export default SliderResourceCard;
