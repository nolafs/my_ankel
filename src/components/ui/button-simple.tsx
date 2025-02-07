import cn from 'clsx';
import Label from './label/label';
import { type ButtonHTMLAttributes, forwardRef, type Ref } from 'react';

/* eslint-disable-next-line */
export interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | undefined | null;
  size?: 'sm' | 'md' | 'lg';
  hasIcon?: boolean;
  classNames?: string;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export const ButtonSimple = forwardRef(function (
  { label, size, hasIcon = false, classNames, ...props }: ButtonPrimaryProps,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <button ref={ref} {...props} className={cn('cursor-pointer font-medium', classNames)}>
      <Label size={size} hasIcon={hasIcon}>
        {label}
      </Label>
    </button>
  );
});

ButtonSimple.displayName = 'ButtonSimple';

export default ButtonSimple;
