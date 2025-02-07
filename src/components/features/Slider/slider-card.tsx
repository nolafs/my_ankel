import { type EmbedField, type ImageField, type KeyTextField, type LinkToMediaField } from '@prismicio/client';
import type { RectReadOnly } from 'react-use-measure';
import { type HTMLMotionProps, motion, type MotionValue, useMotionValueEvent, useSpring } from 'framer-motion';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { PostCategoryDocument } from '../../../../prismicio-types';
// dynamic import
const SliderResourceCard = dynamic(() => import('@/components/features/Slider/slider-resource-card'));
const SliderVideoCard = dynamic(() => import('@/components/features/Slider/slider-video-card'));

export function SliderCard({
  name,
  title,
  category,
  img,
  file,
  video,
  slug,
  bounds,
  scrollX,
  variation,
  ...props
}: {
  img?: ImageField;
  name: KeyTextField | string;
  title: KeyTextField | string | null;
  category?: PostCategoryDocument;
  file?: LinkToMediaField;
  video?: EmbedField;
  slug?: string;
  bounds: RectReadOnly;
  variation: 'resource' | 'video';
  scrollX: MotionValue<number>;
} & HTMLMotionProps<'div'>) {
  const ref = useRef<HTMLDivElement | null>(null);

  const computeOpacity = useCallback(() => {
    const element = ref.current;
    if (!element || bounds.width === 0) return 1;

    const rect = element.getBoundingClientRect();

    if (rect.left < bounds.left) {
      const diff = bounds.left - rect.left;
      const percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    } else if (rect.right > bounds.right) {
      const diff = rect.right - bounds.right;
      const percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    } else {
      return 1;
    }
  }, [ref, bounds.width, bounds.left, bounds.right]);

  const opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  });

  useLayoutEffect(() => {
    opacity.set(computeOpacity());
  }, [computeOpacity, opacity]);

  useMotionValueEvent(scrollX, 'change', () => {
    opacity.set(computeOpacity());
  });

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      {...props}
      className="relative flex aspect-[9/16] w-72 shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-end overflow-hidden rounded-3xl sm:aspect-[3/4] sm:w-96">
      {variation === 'resource' && <SliderResourceCard img={img} name={name} title={title} file={file} />}
      {variation === 'video' && (
        <SliderVideoCard poster={img} category={category} slug={slug} name={name} title={title} video={video} />
      )}
    </motion.div>
  );
}

export default SliderCard;
