'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PrismicRichText } from '@prismicio/react';
import React from 'react';
import { type RichTextField } from '@prismicio/client';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';

interface PostsDescriptionProps {
  description: RichTextField | undefined;
}

export const PostsDescription = ({ description }: PostsDescriptionProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={'mt-3'}>
      <CollapsibleTrigger asChild>
        <div className={'border-t-b-gray-300 flex items-center justify-between rounded-lg bg-gray-50 px-2 py-3'}>
          <h3 className={'text-base font-medium'}>Description</h3>
          <ChevronsUpDown className="h-4 w-4" />
          <span className="sr-only">Toggle</span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className={'prose py-3'}>
        <PrismicRichText field={description} />
      </CollapsibleContent>
    </Collapsible>
  );
};
