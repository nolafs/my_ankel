import { type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HeaderBlock`.
 */
export type HeaderBlockProps = SliceComponentProps<Content.HeaderBlockSlice>;

/**
 * Component for "HeaderBlock" Slices.
 */
const HeaderBlock = ({ slice }: HeaderBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for header_block (variation: {slice.variation})
      Slices
    </section>
  );
};

export default HeaderBlock;
