import { type Content } from '@prismicio/client';
import { type SliceComponentProps } from '@prismicio/react';
import { TestimonialSingle } from '@/components/features/testimonial/testimonial-single';
import { TestimonialSlider } from '@/components/features/testimonial/testimonial-slider';
import { type TestimonialType as TestimonialType } from '@/types';

/**
 * Props for `Testimonial`.
 */
export type TestimonialProps = SliceComponentProps<Content.TestimonialSlice>;

/**
 * Component for "Testimonial" Slices.
 */
const Testimonial = ({ slice }: TestimonialProps): JSX.Element => {
  if (slice.variation === 'testimonials') {
    const data = slice.primary.items as TestimonialType[];
    return <TestimonialSlider data={data} />;
  }

  if (slice.variation === 'default') {
    return (
      <div data-slice-type={slice.slice_type} className={'mt-36'}>
        <TestimonialSingle
          body={slice.primary.body}
          image={slice.primary.image}
          name={slice.primary.name}
          position={slice.primary.position}
        />
      </div>
    );
  }

  return <></>;
};

export default Testimonial;
