import React from 'react';
import { RssIcon } from '@heroicons/react/16/solid';
import { Button } from '@/components/button';
import { Tags } from './postsTags';
import { Categories } from './postsCategories';

interface PostsFilterProps {
  categorySelected?: string;
  tagSelected?: string;
  hasRss?: boolean;
  url?: string;
}

export const Filter = ({ tagSelected, categorySelected, url = 'blog', hasRss = true }: PostsFilterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className={'flex flex-wrap items-center gap-5'}>
        <Categories selected={categorySelected} url={url} />
        <Tags selected={tagSelected} url={url} />
      </div>
      {hasRss && (
        <Button variant="outline" href="/feed.xml" className="gap-1">
          <RssIcon className="size-4" />
          RSS Feed
        </Button>
      )}
    </div>
  );
};

export default Filter;
