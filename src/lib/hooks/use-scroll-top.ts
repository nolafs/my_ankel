'use client';
import { useState, useEffect } from 'react';

export const useScrollTop = () => {
  const [stick, setStick] = useState(false);
  const onClickHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scrollHandler = () => {
      const scrollPos = window.pageYOffset;
      if (scrollPos > 300) {
        setStick(true);
      } else {
        setStick(false);
      }
    };

    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [stick]);

  return { stick, onClickHandler };
};

export default useScrollTop;
