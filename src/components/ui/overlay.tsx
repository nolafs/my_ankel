'use client';

import * as React from 'react';
import * as OverlayPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { cn } from '@/lib/utils';

const OverlaySheet = OverlayPrimitive.Root;

const OverlaySheetTrigger = OverlayPrimitive.Trigger;

const OverlaySheetPortal = OverlayPrimitive.Portal;

const OverlaySheetClose = OverlayPrimitive.Close;

const OverlaySheetOverlay = React.forwardRef<
  React.ElementRef<typeof OverlayPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof OverlayPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <OverlayPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-white/40 backdrop-blur-lg', className)}
    {...props}
  />
));
OverlaySheetOverlay.displayName = OverlayPrimitive.Overlay.displayName;

const OverlaySheetContent = React.forwardRef<
  React.ElementRef<typeof OverlayPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof OverlayPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <OverlaySheetPortal>
    <OverlaySheetOverlay />
    <OverlayPrimitive.Content
      ref={ref}
      className={cn('fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform', className)}
      {...props}>
      <OverlayPrimitive.Title asChild>
        <VisuallyHidden>Overlay Title</VisuallyHidden>
      </OverlayPrimitive.Title>
      {children}
    </OverlayPrimitive.Content>
    <OverlayPrimitive.Close className="fixed right-4 top-4 z-50 rounded-full bg-black p-2 text-white shadow-md">
      <X className="h-8 w-8" />
      <span className="sr-only">Close</span>
    </OverlayPrimitive.Close>
  </OverlaySheetPortal>
));
OverlaySheetContent.displayName = OverlayPrimitive.Content.displayName;

export {
  OverlaySheet,
  OverlaySheetPortal,
  OverlaySheetOverlay,
  OverlaySheetClose,
  OverlaySheetTrigger,
  OverlaySheetContent,
};
