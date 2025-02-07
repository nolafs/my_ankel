import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/components/ui/link';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { PrismicNextImage } from '@prismicio/next';
import { asText } from '@prismicio/client';
import React from 'react';
import { type VideoDocument } from '../../../../prismicio-types';
import Image from 'next/image';
import placeholder from '@/assets/placeholder.jpg';
import VideoOverlay from '@/components/ui/video-overlay/video-overlay';
import AuthorLink from '@/components/features/author/author-link';
import { type Author } from '@/types';

import { trimString } from '@/lib/trimString';

export const VideoCard = ({ video }: { video: VideoDocument }) => {
  const description = asText(video.data.description);
  const maxLength = 100;

  const trimmedDescription = trimString(description, maxLength);

  return (
    <div
      key={video.uid}
      className="relative flex flex-col rounded-3xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5">
      <div className={'relative'}>
        <div className={'relative'}>
          {video.data.poster.url ? (
            <PrismicNextImage
              field={video.data.poster}
              alt=""
              width={380}
              height={214}
              className={'aspect-[16/9] h-full w-full rounded-2xl object-cover'}
              imgixParams={{ fit: 'crop', crop: ['faces'], ar: '16:9' }}
            />
          ) : (
            <Image
              src={placeholder}
              alt={video.data.name ?? 'placeholder'}
              width={380}
              height={214}
              className={'aspect-[16/9] h-full w-full rounded-2xl object-cover'}
            />
          )}

          {video.data.category && 'data' in video.data.category && (
            <div className="absolute left-2 top-2">
              <Badge>{(video.data.category.data as { name: string }).name}</Badge>
            </div>
          )}
          <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'}>
            {video.data && (
              <VideoOverlay video={video.data.video_url} post={video?.data} uid={video?.uid} url={'videos'} />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <div className={'grow'}>
          <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
            {dayjs(video.data.publishing_date ?? video.last_publication_date).format('dddd, MMMM D, YYYY')}
          </div>

          <h2 className="mt-4 text-sm/5 font-medium">{video.data.name}</h2>
          <div className="mt-3 text-sm/6 text-gray-500">{trimmedDescription}</div>
        </div>
        <div className={'shrink'}>
          <div className="mt-4">
            <Link href={`/videos/${video.uid}`} className="flex items-center gap-1 text-sm/5 font-medium">
              Details
              <ChevronRightIcon className="size-4 fill-gray-400" />
            </Link>
          </div>

          {video.data.author && 'data' in video.data.author && (
            <div className="mt-6 flex shrink items-center gap-3">
              <AuthorLink author={video.data.author.data as Author} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
