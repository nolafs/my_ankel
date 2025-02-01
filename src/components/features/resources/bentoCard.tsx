'use client';

import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Subheading } from '@/components/ui/text';
import { Link } from '@/components/ui/link';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import React from 'react';

export function BentoCard({
  dark = false,
  className = '',
  eyebrow,
  title,
  link,
  description,
  graphic,
  fade = [],
}: {
  dark?: boolean;
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic: React.ReactNode;
  link: string;
  fade?: ('top' | 'bottom')[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'group relative flex flex-col overflow-hidden rounded-lg',
        'bg-white shadow-sm ring-1 ring-black/5',
        'data-[dark]:bg-gray-800 data-[dark]:ring-white/15',
      )}>
      <div className="relative h-80 shrink-0">
        {graphic}
        {fade.includes('top') && (
          <div className="absolute inset-0 bg-gradient-to-b from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]" />
        )}
        {fade.includes('bottom') && (
          <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]" />
        )}
      </div>
      <div className="relative p-10">
        <Subheading as="h3" dark={dark}>
          {eyebrow}
        </Subheading>
        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white">
          <Link href={link}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </p>
        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400">{description}</p>
        {link && (
          <div className="mt-4">
            <div className="flex items-center gap-1 text-sm/5 font-medium !text-gray-400 group-hover:text-pink-600">
              Read more
              <ChevronRightIcon className="size-4 fill-gray-400" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
