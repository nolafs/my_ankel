import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { TestimonialSingle } from '@/components/features/testimonial/testimonial-single';

/**
 * Props for `Testimonial`.
 */
export type TestimonialProps = SliceComponentProps<Content.TestimonialSlice>;

/**
 * Component for "Testimonial" Slices.
 */
const Testimonial = ({ slice }: TestimonialProps): JSX.Element => {
  return (
    <div data-slice-type={slice.slice_type}>
      <TestimonialSingle
        body={slice.primary.body}
        image={slice.primary.image}
        name={slice.primary.name}
        position={slice.primary.position}
      />
    </div>
  );
};

export default Testimonial;
