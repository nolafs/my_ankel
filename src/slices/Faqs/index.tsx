import { type Content } from '@prismicio/client';
import { type SliceComponentProps } from '@prismicio/react';
import { Bounded } from '@/components/ui/bounded';
import { SectionFaqs } from '@/components/features/section-faqs/section-faqs';
import { createClient } from '@/prismicio';
import { type AllDocumentTypes } from '../../../prismicio-types';


/**
 * Props for `Faqs`.
 */
export type FaqsProps = SliceComponentProps<Content.FaqsSlice>;

/**
 * Component for "Faqs" Slices.
 */
const Faqs = async ({ slice }: FaqsProps) => {
  const client = createClient();
  const faqItems: any[] = [];

  if (!slice.primary.faqs.length) {
    console.log('No faqs found');
    return null;
  }

  for (const item of slice.primary.faqs) {
    if (item.faq) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const faq = await client.getByID(item.faq?.id);
      faqItems.push(faq);
    }
  }

  if (faqItems.length === 0) {
    console.log('No faq items found');
  }

  return (
    <Bounded as={'section'} yPadding={'sm'}>
      <SectionFaqs
        data={{
          headings: slice.primary.heading,
          text: slice.primary.subtitle,
          body: slice.primary.body,
          faqs: faqItems,
        }}
      />
    </Bounded>
  );
};

export default Faqs;
