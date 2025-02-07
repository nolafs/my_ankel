'use client';

import { Link } from '@/components/ui/link';
import { CheckIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { type PostTagsDocument } from '../../../../prismicio-types';

export const PostTagLink = ({
  tag,
  url = 'blog',
  selected,
}: {
  tag: PostTagsDocument;
  url?: string;
  selected?: string;
}) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const currentUrl = new URL(window.location.href);
  const categoryQuery = currentUrl.searchParams.get('category');

  const newUrl = categoryQuery ? `/${url}?category=${categoryQuery}&tags=` : `/${url}?tags=`;

  return (
    <Link
      href={`${newUrl}${tag.uid}`}
      data-selected={tag.uid === selected ? true : undefined}
      className="group grid grid-cols-[16px,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5">
      <CheckIcon className="hidden size-4 group-data-[selected]:block" />
      <p className="col-start-2 text-sm/6 capitalize">{tag.data.name}</p>
    </Link>
  );
};
