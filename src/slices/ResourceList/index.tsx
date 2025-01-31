import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `ResourceList`.
 */
export type ResourceListProps = SliceComponentProps<Content.ResourceListSlice>;

/**
 * Component for "ResourceList" Slices.
 */
const ResourceList = ({ slice }: ResourceListProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for resource_list (variation: {slice.variation}) Slices
    </section>
  );
};

export default ResourceList;
