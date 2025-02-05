import React from 'react';
import { OverlaySheet, OverlaySheetContent, OverlaySheetTrigger } from '@/components/ui/overlay';
import { CirclePlayIcon } from 'lucide-react';
import { EmbedField } from '@prismicio/client';

interface VideoOverlayProps {
  video: EmbedField;
}

export const VideoOverlay = ({ video }: VideoOverlayProps) => {
  return (
    <OverlaySheet>
      <OverlaySheetTrigger asChild={true}>
        <CirclePlayIcon
          className={
            'transfom- mt-20 h-20 w-20 cursor-pointer text-white opacity-75 transition-all hover:scale-110 hover:text-pink-600 hover:opacity-100'
          }
        />
      </OverlaySheetTrigger>
      <OverlaySheetContent>
        {video && video.html && (
          <div className={'w-screen max-w-7xl p-2'}>
            <div
              dangerouslySetInnerHTML={{ __html: video.html }}
              className={'g:rounded-3xl aspect-h-9 aspect-w-16 w-full overflow-hidden rounded-xl md:rounded-2xl'}></div>
          </div>
        )}
      </OverlaySheetContent>
    </OverlaySheet>
  );
};

export default VideoOverlay;
