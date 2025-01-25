'use client';
import { type KeyTextField, type RichTextField } from '@prismicio/client';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { PrismicRichText } from '@prismicio/react';
import { CircleArrowDownIcon, CircleArrowUpIcon } from 'lucide-react';

interface FaqItemProps {
  heading: KeyTextField | null | undefined;
  body: RichTextField | null | undefined;
}

export function FaqItem({ heading, body }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <dt>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="lg" className={'w-full whitespace-normal p-2 md:p-3'}>
            <div className="flex w-full items-center justify-between text-left">
              <span>
                <span className="sr-only">Toggle</span>
                <span className="font-semibold leading-7">{heading}</span>
              </span>
              <span className={'text-right'}>
                {isOpen ? <CircleArrowUpIcon size={24} /> : <CircleArrowDownIcon size={24} />}
              </span>
            </div>
          </Button>
        </CollapsibleTrigger>
      </dt>

      <CollapsibleContent>
        <dd className="mt-5 px-8">
          <PrismicRichText field={body} />
        </dd>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default FaqItem;
