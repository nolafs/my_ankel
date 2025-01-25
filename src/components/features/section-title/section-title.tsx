import { forwardRef } from 'react';
import cn from 'clsx';
import { PrismicRichText } from '@prismicio/react';
import { type RichTextField } from '@prismicio/client';

type TProps = {
  className?: string;
  title?: RichTextField | null | undefined;
  subtitle?: string | null | undefined;
  description?: RichTextField | null | undefined;
  align?: 'left' | 'right' | 'center';
  color?: 'A' | 'B' | 'C';
  titleSize?: 'default' | 'large';
  subtitleClass?: string;
  titleClass?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  descClass?: string;
};

export const SectionTitle = forwardRef<HTMLDivElement, TProps>(
  (
    {
      className,
      title,
      subtitle,
      description,
      align = 'center',
      color = 'A',
      titleSize,
      subtitleClass,
      titleClass,
      descClass,
      as: Comp = 'h2',
    },
    ref,
  ) => {
    return (
      <div className={cn('section-title relative z-10', align === 'center' && 'text-center', className)} ref={ref}>
        {subtitle && (
          <span
            className={cn(
              'relative mb-3 flex w-fit rounded-full px-3 py-1 text-sm font-bold uppercase leading-normal tracking-tight md:mb-5',
              color === 'A' && 'text-primary bg-secondary',
              color === 'B' && 'text-secondary',
              color === 'C' && 'bg-primary text-white',
              align === 'center' && 'mx-auto',
              subtitleClass,
            )}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}

        <Comp
          className={cn(
            'title child:text-primary child:font-normal m-0',
            color === 'A' && 'text-gray-900',
            color === 'B' && 'text-primary',
            titleSize === 'large' && 'text-3xl font-bold leading-tight md:text-4xl lg:text-5xl',
            titleClass,
          )}>
          <PrismicRichText field={title} />
        </Comp>

        {description && (
          <div
            className={cn(
              'mb-0 mt-[25px] font-medium leading-relaxed',
              descClass,
              color === 'A' && 'text-gray-500',
              color === 'B' && 'text-primary',
            )}>
            <PrismicRichText field={description} />
          </div>
        )}
      </div>
    );
  },
);

SectionTitle.displayName = 'SectionTitle';

export default SectionTitle;
