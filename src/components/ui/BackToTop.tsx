'use client';
import cn from 'clsx';

import useScrollTop from '@/lib/hooks/use-scroll-top';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
  const { stick, onClickHandler } = useScrollTop();

  return (
    <button
      aria-label="Scroll to top"
      type="button"
      className={cn(
        stick ? '-translate-y-0 opacity-100' : 'translate-y-[100px] opacity-0',
        'shadow-3xl text-h3 group fixed bottom-10 right-3 z-40 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primary p-0 text-center text-white shadow-black/30 transition duration-500 lg:bottom-[100px] lg:right-10 lg:h-16 lg:w-16',
      )}
      onClick={onClickHandler}>
      <i
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white transition duration-300',
          'group-hover:-translate-y-20',
        )}>
        <ArrowUp size="32" color="#FFFFFF" />
      </i>
      <i
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-20 text-white transition duration-300',
          'group-hover:-translate-y-1/2',
        )}>
        <ArrowUp size="32" color="#FFFFFF" />
      </i>
    </button>
  );
};

export default BackToTop;
