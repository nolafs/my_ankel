import { type EmbedField, type ImageField, type KeyTextField } from '@prismicio/client';
import React from 'react';
import { PrismicNextImage } from '@prismicio/next';
import Image from 'next/image';
import placeholderImage from '@/assets/placeholder.jpg';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import cn from 'clsx';
import { Badge } from '@/components/ui/badge';
import VideoOverlay from '@/components/ui/video-overlay/video-overlay';
import type { PostCategoryDocument } from '../../../../prismicio-types';

export function SliderVideoCard({
  name,
  title,
  poster,
  video,
  slug,
  category,
}: {
  poster?: ImageField;
  name: KeyTextField | string;
  title: KeyTextField | string | null;
  video?: EmbedField;
  category?: PostCategoryDocument;
  slug?: string;
}) {
  return (
    <>
      {poster?.url ? (
        <PrismicNextImage
          field={poster}
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
      <div className={'absolute top-0 z-30 flex h-1/2 w-full flex-col items-center justify-center'}>
        {video && <VideoOverlay video={video} />}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-[calc(7/16*100%)] ring-1 ring-inset ring-gray-950/10 sm:from-25%"
      />

      <div className="relative p-10">
        <div>
          {category && 'data' in category && (
            <div className="relative mb-3">
              <Badge>{(category.data as { name: string }).name}</Badge>
            </div>
          )}
          <h3 className="relative text-xl/7 font-medium text-white">{name}</h3>
          <Link
            href={`/videos/${slug}`}
            className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'mt-4 w-full')}>
            View Video
          </Link>
        </div>

        <div className="mt-6 border-t border-white/20 pt-3">
          <p className="text-sm/6 font-medium">
            <span className="bg-gradient-to-r from-[#5686cd] from-[28%] via-[#56bfcd] via-[70%] to-[#76cbd6] bg-clip-text text-transparent">
              by {title}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default SliderVideoCard;
