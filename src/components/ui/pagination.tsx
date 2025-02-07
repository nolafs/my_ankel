import { createClient } from '@/prismicio';
import { Button } from '@/components/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { Link } from '@/components/ui/link';
import { clsx } from 'clsx';
import React from 'react';
import { filter } from '@prismicio/client';

type PaginationData = {
  page: number;
  resultsPerPage: number;
  totalPosts: number;
  totalPages: number;
};

export async function Pagination({
  contentType,
  slug,
  page,
  category,
  tags,
}: {
  contentType: 'posts' | 'video' | 'download';
  slug: string;
  page: number;
  category?: string[];
  tags?: string[];
}) {
  function url(page: number) {
    const params = new URLSearchParams();

    if (page > 1) params.set('page', page.toString());

    return params.size !== 0 ? `/${slug}?${params.toString()}` : `/${slug}`;
  }

  const client = createClient();

  let categories: any[] = [];
  let tagList: any[] = [];

  if (category) {
    categories = await client.getAllByUIDs('post_category', [...category]);
  }

  if (tags) {
    tagList = await client.getAllByUIDs('post_tags', [...tags]);
  }

  const data: PaginationData = await client
    .getByType(contentType, {
      pageSize: 10,
      page: 0,
      filters:
        categories.length || tagList.length
          ? [
              filter.any(
                `my.${contentType}.category`,
                categories.map(cat => cat.id),
              ),
              filter.any(
                `my.${contentType}.tags.tag`,
                tagList.map(tag => tag.id),
              ),
            ]
          : [],
      orderings: [
        {
          field: `my.${contentType}.publishing_date`,
          direction: 'desc',
        },
      ],
    })
    .then(response => {
      console.log('response', response);
      return {
        page: response.page,
        resultsPerPage: response.results_per_page,
        totalPosts: response.total_results_size,
        totalPages: response.total_pages,
      };
    })
    .catch(() => {
      return {
        page: 0,
        resultsPerPage: 0,
        totalPosts: 0,
        totalPages: 0,
      };
    });

  console.log('data', data);

  const hasPreviousPage = data.page - 1;
  const previousPageUrl = hasPreviousPage ? url(data.page - 1) : undefined;
  const hasNextPage = page * data.resultsPerPage < data.totalPosts;
  const nextPageUrl = hasNextPage ? url(page + 1) : undefined;
  const pageCount = data.totalPages;

  if (pageCount < 2) {
    return;
  }

  return (
    <div className="mt-6 flex items-center justify-between gap-2">
      <Button variant="outline" href={previousPageUrl} disabled={data.page === 0}>
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

      <Button variant="outline" href={nextPageUrl} disabled={page === data.totalPages}>
        Next
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
}
