'use client';
import { Button } from '@/components/button';
import { useSearch } from './search-context';
import React from 'react';
import { SearchIcon } from 'lucide-react';

export const SearchButtonCta = () => {
  const { setSearchDialog } = useSearch();

  return (
    <Button variant="secondary" onClick={() => setSearchDialog(true)} className="flex space-x-2">
      <SearchIcon className="h-6 w-6" />
      <span>Search Resources</span>
      <span className={'rounded-full bg-gray-200/20 px-3 text-[12px] text-white'}>⌘k</span>
    </Button>
  );
};
