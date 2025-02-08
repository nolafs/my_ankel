import { ComponentProps, forwardRef, PropsWithChildren, ReactNode } from 'react';
import cn from 'clsx';

export type PanelProps = ComponentProps<'div'> &
  PropsWithChildren<{
    header?: string | ReactNode;
    footer?: string | ReactNode;
    classNames?: Partial<PanelClassNames>;
  }>;

export type PanelClassNames = {
  root: string;
  header: string;
  body: string;
  footer: string;
};

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ children, header, footer, className, classNames = {}, ...props }, ref) => {
    return (
      <div {...props} className={cn('ais-Panel font-sans', classNames.root, className)} ref={ref}>
        {header && <div className={cn('ais-Panel-header', classNames.header)}>{header}</div>}
        <div className={cn('ais-Panel-body', classNames.body)}>{children}</div>
        {footer && <div className={cn('ais-Panel-footer', classNames.footer)}>{footer}</div>}
      </div>
    );
  },
);

Panel.displayName = 'Panel';

export default Panel;
