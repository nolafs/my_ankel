'use client';
import { Button } from '@/components/button';
import { useSearch } from './search-context';
import React from 'react';
import { SearchIcon } from 'lucide-react';

export const SearchButtonCta = () => {
  const { setSearchDialog } = useSearch();

  return (
    <Button
      variant="secondary"
      onClick={() => setSearchDialog(prevOpen => !prevOpen)}
      className="flex w-full justify-between space-x-2 !py-6">
      <SearchIcon className="h-6 w-6 shrink" />
      <span className={'grow text-left text-xl'}>Search Resources</span>
      <div className={'shrink'}>
        <span className={'rounded-full bg-gray-500/20 px-3 text-base text-white'}>⌘k</span>
      </div>
    </Button>
  );
};
