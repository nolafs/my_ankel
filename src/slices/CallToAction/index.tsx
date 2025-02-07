import { type Content } from '@prismicio/client';
import { type SliceComponentProps } from '@prismicio/react';
import { Bounded } from '@/components/ui/bounded';
import { CallToAction as CallToActionComponent } from '@/components/features/cta/callToAction';
import { CallToActionImage } from '@/components/features/cta/callToAction-Image';

import React from 'react';
import { CallToActionVideo } from '@/components/features/cta/callToAction-video';

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  if (slice.variation === 'embedVideo') {
    return (
      <CallToActionVideo
        heading={slice.primary.heading}
        video={slice.primary.video}
        body={slice.primary.body}
        links={slice.primary.links}
      />
    );
  }

  if (slice.variation === 'image') {
    return (
      <div data-slice-type={slice.slice_type}>
        <CallToActionImage
          heading={slice.primary.heading}
          body={slice.primary.body}
          links={slice.primary.links}
          image={slice.primary.image}
        />
      </div>
    );
  }

  return (
    <Bounded as={'section'} yPadding={'sm'} data-slice-type={slice.slice_type}>
      <CallToActionComponent heading={slice.primary.heading} body={slice.primary.body} links={slice.primary.links} />
    </Bounded>
  );
};

export default CallToAction;
