import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/components/ui/link';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { PrismicNextImage } from '@prismicio/next';
import { ImageFieldImage } from '@prismicio/client';
import React from 'react';
import { VideoDocument } from '../../../../prismicio-types';
import Image from 'next/image';
import placeholder from '@/assets/placeholder.jpg';
import { CirclePlayIcon } from 'lucide-react';
import { OverlaySheet, OverlaySheetContent, OverlaySheetTrigger } from '@/components/ui/overlay';
import VideoOverlay from '@/components/ui/video-overlay/video-overlay';

export const VideoCard = ({ video }: { video: VideoDocument }) => {
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
              className={'aspect-3/2 w-full rounded-2xl object-cover'}
            />
          ) : (
            <Image
              src={placeholder}
              alt={video.data.name ?? 'placeholder'}
              width={380}
              height={260}
              className={'aspect-3/2 w-full rounded-2xl object-cover'}
            />
          )}

          {video.data.category && 'data' in video.data.category && (
            <div className="absolute left-2 top-2">
              <Badge>{(video.data.category.data as { name: string }).name}</Badge>
            </div>
          )}
        </div>
        <div className={'absolute bottom-2 right-2'}>
          {video.data.video_url && video.data.video_url.html && <VideoOverlay video={video.data.video_url} />}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
          {dayjs(video.data.publishing_date).format('dddd, MMMM D, YYYY')}
        </div>

        <h2 className="mt-4 text-sm/5 font-medium">{video.data.name}</h2>
        <div className="mt-4">
          <Link href={`/videos/${video.uid}`} className="flex items-center gap-1 text-sm/5 font-medium">
            Details
            <ChevronRightIcon className="size-4 fill-gray-400" />
          </Link>
        </div>

        {video.data.author && 'data' in video.data.author && (
          <div className="mt-6 flex items-center gap-3">
            {video.data.author && (
              <PrismicNextImage
                alt=""
                width={64}
                height={64}
                field={(video.data.author.data as { profile_image: ImageFieldImage }).profile_image}
                className="aspect-square size-6 rounded-full object-cover"
              />
            )}

            <div className="text-sm/5 text-gray-700">
              {(video.data.author.data as { name: string }).name || 'My Ankle'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
