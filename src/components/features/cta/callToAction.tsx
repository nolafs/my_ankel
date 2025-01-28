import { Subheading } from '@/components/ui/text';
import { Cta } from '@/types';
import { PrismicRichText } from '@prismicio/react';

export function CallToAction({ label, heading, body, links }: Cta) {
  return (
    <div className="relative w-full pb-16 pt-20 text-center sm:py-24">
      <hgroup>
        <Subheading>{label}</Subheading>
        <p className="mx-auto mt-6 max-w-2xl text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">
          {heading}
        </p>
      </hgroup>
      <div className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500">
        <PrismicRichText field={body} />
      </div>
      <div className="mt-6"></div>
    </div>
  );
}
