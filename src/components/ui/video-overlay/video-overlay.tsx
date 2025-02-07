'use client';
import React, { useState } from 'react';
import { OverlaySheet, OverlaySheetContent, OverlaySheetTrigger } from '@/components/ui/overlay';
import { CirclePlayIcon } from 'lucide-react';
import { asText, type EmbedField } from '@prismicio/client';
import { type VideoDocumentData } from '../../../../prismicio-types';
import PostAside from '@/components/features/blog/postAside';
import { trimString } from '@/lib/trimString';
import VideoInfo from '@/components/ui/video-overlay/video-info';

interface VideoOverlayProps {
  video: EmbedField;
  post?: VideoDocumentData;
  uid?: string;
  url?: string;
}

export const VideoOverlay = ({ video, post, uid, url = 'video' }: VideoOverlayProps) => {
  const [open, setOpen] = useState(false);
  let description: string | null = null;

  if (post?.description) {
    description = trimString(asText(post.description), 160);
  }

  const onNavigate = () => {
    setOpen(false);
  };

  return (
    <OverlaySheet open={open} onOpenChange={() => setOpen(!open)}>
      <OverlaySheetTrigger asChild={true}>
        <button>
          <span className={'sr-only'}>Watch {post?.name}</span>
          <CirclePlayIcon
            strokeWidth={1}
            fill={'#FFFFFF4d'}
            aria-label={'Play Video'}
            className={
              'transform-all z-50 h-20 w-20 cursor-pointer text-white/90 transition-all hover:scale-110 hover:text-[#32c0ec] hover:opacity-100'
            }
          />
        </button>
      </OverlaySheetTrigger>
      <OverlaySheetContent>
        {video && video.html && (
          <div
            className={
              'w-screen max-w-7xl bg-white/30 p-5 md:rounded-4xl md:border-transparent md:bg-white/5 md:shadow-md md:ring-1 md:ring-[#8fde5d]/15 md:after:absolute md:after:inset-0 md:after:rounded-4xl md:after:shadow-[inset_0_0_2px_1px_#ffffff4d]'
            }>
            <div className={'relative z-10'}>
              {post && (
                <div className={'mb-5 flex flex-wrap items-start justify-between gap-5'}>
                  <div>
                    <h2 className={'text-base font-bold text-gray-800 md:text-xl lg:text-2xl'}>{post.name}</h2>
                  </div>
                  <div className={'hidden lg:block'}>
                    <VideoInfo description={description} uid={uid} />
                  </div>
                </div>
              )}
              <div
                dangerouslySetInnerHTML={{ __html: video.html }}
                className={
                  'g:rounded-3xl aspect-h-9 aspect-w-16 w-full overflow-hidden rounded-xl md:rounded-2xl'
                }></div>
              <div>
                {post && (
                  <PostAside
                    uid={uid}
                    post={post}
                    url={url}
                    onNavigate={onNavigate}
                    classNames={'w-full justify-between mt-5'}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </OverlaySheetContent>
    </OverlaySheet>
  );
};

export default VideoOverlay;
