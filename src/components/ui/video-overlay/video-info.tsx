'use client';
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/button';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';
import ArrowLongRightIcon from '@heroicons/react/24/outline/ArrowLongRightIcon';

interface VideoInfoProps {
  description?: string | null;
  uid?: string;
}

export const VideoInfo = ({ description, uid }: VideoInfoProps) => {
  const [open, setOpen] = React.useState(false);

  if (!uid) {
    return null;
  }

  if (!description) {
    return null;
  }

  return (
    description && (
      <HoverCard open={open} onOpenChange={() => setOpen(!open)}>
        <HoverCardTrigger asChild={true}>
          <Button variant={'outline'} className={'w-auto'}>
            <InfoIcon className={'mr-2 size-5'} />
            Info
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>{description}</div>
          <Link
            href={'/videos/' + uid}
            className={'mt-3 inline-flex items-center gap-2 text-sm/6 font-medium text-accent'}>
            Go to video <ArrowLongRightIcon className="size-5" />
          </Link>
        </HoverCardContent>
      </HoverCard>
    )
  );
};

export default VideoInfo;
