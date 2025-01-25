import SectionTitle from '../section-title/section-title';
import { KeyTextField, RichTextField } from '@prismicio/client';
import FaqItem from './faq-item';

interface SectionFagsProps {
  data: {
    headings: RichTextField | null | undefined;
    text?: KeyTextField | null | undefined;
    body: RichTextField | null | undefined;
    faqs: any[];
  };

  color?: 'A' | 'B' | 'C';
}

export function SectionFaqs({ data: { headings, text, body, faqs }, color = 'C' }: SectionFagsProps) {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <SectionTitle
          title={headings}
          subtitle={text}
          description={body}
          align={'left'}
          titleSize={'large'}
          color={color}
        />
      </div>
      <div className="mt-10 lg:col-span-7 lg:mt-0">
        <dl className="space-y-5">
          {faqs.map((faq, idx) => (
            <FaqItem key={`${faq.id}-${idx}`} heading={faq.data.heading} body={faq.data.body} />
          ))}
        </dl>
      </div>
    </div>
  );
}

export default SectionFaqs;
