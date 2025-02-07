import { PrismicRichText, type SliceComponentProps } from '@prismicio/react';
import { Bounded } from '@/components/ui/bounded';
import { SectionFaqs } from '@/components/features/section-faqs/section-faqs';
import { createClient } from '@/prismicio';
import { Heading, Subheading } from '@/components/ui/text';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Container } from '@/components/ui/container';
import { type Content } from '@prismicio/client';

/**
 * Props for `Faqs`.
 */
export type FaqsProps = SliceComponentProps<Content.FaqsSlice>;

/**
 * Component for "Faqs" Slices.
 */
const Faqs = async ({ slice }: FaqsProps) => {
  const client = createClient();
  const faqItems: Content.FaqDocument[] = [];

  if (!slice.primary.faqs.length) {
    console.log('No faqs found');
    return null;
  }

  for (const item of slice.primary.faqs) {
    if (item.faq && 'id' in item.faq) {
      if (item.faq.id) {
        const faq = await client
          .getByID(item.faq.id)
          .then(v => v)
          .catch(() => {
            console.log(`FAQ with id not found`);
          });
        if (faq) {
          faqItems.push(faq as Content.FaqDocument);
        }
      }
    }
  }

  if (faqItems.length === 0) {
    console.log('No faq items found');
  }

  if (slice.variation === 'grid') {
    return (
      <Bounded as={'section'} yPadding={'sm'} data-slice-type={slice.slice_type}>
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              <PrismicRichText field={slice.primary.heading} />
            </h2>
            <div className="mt-4 text-xl text-gray-600">
              <PrismicRichText field={slice.primary.body} />
            </div>
          </div>
          <div className="mt-20">
            <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
              {faqItems.map((faq, idx) => (
                <div key={`faq-${idx}`}>
                  <dt className="text-base/7 font-semibold text-gray-900">{faq.data.heading}</dt>
                  <dd className="mt-2 text-base/7 text-gray-600">
                    <PrismicRichText field={faq.data.body} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Bounded>
    );
  }

  if (slice.variation === 'columnCollapsible') {
    return (
      <Container className={'mb:mt-24 mb-24 mt-16'} data-slice-type={slice.slice_type}>
        {slice.primary.has_intro && (
          <>
            <Subheading className="text-center">{slice.primary.subtitle}</Subheading>
            <Heading as="div" className="mt-2 text-center">
              <PrismicRichText field={slice.primary.heading} />
            </Heading>
          </>
        )}
        <Accordion type="single" collapsible className={'px-0'}>
          {faqItems.map((faq, idx) => (
            <AccordionItem key={`faq-key-${idx}`} value={`faq-${idx}`}>
              <AccordionTrigger className={'text-left'}>{faq.data.heading}</AccordionTrigger>
              <AccordionContent>
                <div className={'md:prose-md prose prose-sm prose-neutral'}>
                  <PrismicRichText field={faq.data.body} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    );
  }

  if (slice.variation === 'column') {
    return (
      <Bounded as={'section'} yPadding={'md'}>
        {slice.primary.has_intro && (
          <>
            <Subheading className="text-center">{slice.primary.subtitle}</Subheading>
            <Heading as="div" className="mt-2 text-center">
              <PrismicRichText field={slice.primary.heading} />
            </Heading>
          </>
        )}
        <div className="mx-auto mt-16 max-w-xl space-y-12">
          {faqItems.map((faq, idx) => (
            <dl key={`faq-${idx}`}>
              <dt className="text-sm font-semibold">{faq.data.heading}</dt>
              <dd className="mt-4 text-sm/6 text-gray-600">
                <PrismicRichText field={faq.data.body} />
              </dd>
            </dl>
          ))}
        </div>
      </Bounded>
    );
  }

  return (
    <Bounded as={'section'} yPadding={'sm'} data-slice-type={slice.slice_type}>
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
