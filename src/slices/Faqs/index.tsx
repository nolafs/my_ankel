import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { Bounded } from '@components/Bounded';
import { SectionFaqs } from '@rocket-house-productions/features';
import { createClient } from '@/prismicio';
import { AllDocumentTypes } from '../../../prismicio-types';

/**
 * Props for `Faqs`.
 */
export type FaqsProps = SliceComponentProps<Content.FaqsSlice>;

/**
 * Component for "Faqs" Slices.
 */
const Faqs = async ({ slice }: FaqsProps) => {
  const client = createClient();
  const faqItems: AllDocumentTypes[] = [];

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
