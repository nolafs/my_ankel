import { createClient } from '@/prismicio';
import { Button } from '@/components/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { Link } from '@/components/ui/link';
import { clsx } from 'clsx';
import React from 'react';

const postsPerPage = 5;

export async function Pagination({ page, category }: { page: number; category?: string }) {
  function url(page: number) {
    const params = new URLSearchParams();

    if (category) params.set('category', category);
    if (page > 1) params.set('page', page.toString());

    return params.size !== 0 ? `/resources?${params.toString()}` : '/resources';
  }

  const client = createClient();

  const totalPosts = await client
    .getByType('video', {
      pageSize: 10,
      page: 0,
      orderings: [
        {
          field: 'my.video.publishing_date',
          direction: 'desc',
        },
      ],
    })
    .then(response => {
      return response.total_pages;
    })
    .catch(() => 0);

  const hasPreviousPage = page - 1;
  const previousPageUrl = hasPreviousPage ? url(page - 1) : undefined;
  const hasNextPage = page * postsPerPage < totalPosts;
  const nextPageUrl = hasNextPage ? url(page + 1) : undefined;
  const pageCount = Math.ceil(totalPosts / postsPerPage);

  if (pageCount < 2) {
    return;
  }

  return (
    <div className="mt-6 flex items-center justify-between gap-2">
      <Button variant="outline" href={previousPageUrl} disabled={!previousPageUrl}>
        <ChevronLeftIcon className="size-4" />
        Previous
      </Button>
      <div className="flex gap-2 max-sm:hidden">
        {Array.from({ length: pageCount }, (_, i) => (
          <Link
            key={i + 1}
            href={url(i + 1)}
            data-active={i + 1 === page ? true : undefined}
            className={clsx(
              'size-7 rounded-lg text-center text-sm/7 font-medium',
              'data-[hover]:bg-gray-100',
              'data-[active]:shadow data-[active]:ring-1 data-[active]:ring-black/10',
              'data-[active]:data-[hover]:bg-gray-50',
            )}>
            {i + 1}
          </Link>
        ))}
      </div>
      <Button variant="outline" href={nextPageUrl} disabled={!nextPageUrl}>
        Next
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
}
