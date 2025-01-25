import type { ReactNode } from 'react';
import {clsx as cn} from 'clsx'

type BoundedProps = {
  as?: 'div' | 'section' | 'header' | 'article';
  yPadding?: 'sm' | 'md' | 'base' | 'lg';
  collapsible?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Bounded({
  as: Comp = 'div',
  yPadding = 'base',
  collapsible = true,
  className,
  fullWidth = false,
  children,
}: BoundedProps) {
  return (
    <Comp
      data-collapsible={collapsible}
      className={cn(
        fullWidth ? '' : 'px-6 xl:px-0',
        yPadding === 'sm' && 'py-8 md:py-10',
        yPadding === 'md' && 'py-16 md:py-20',
        yPadding === 'base' && 'py-20 md:py-28',
        yPadding === 'lg' && 'py-32 md:py-48',
        className,
      )}>
      <div className={fullWidth ? '' : 'container mx-auto w-full'}>{children}</div>
    </Comp>
  );
}
