'use client';
import { Button } from '@/components/button';
import { useSearch } from './search-context';
import React from 'react';
import { SearchIcon } from 'lucide-react';
import { ReactTyped } from 'react-typed';

interface SearchButtonCtaProps {
  searchCta?: string[];
}

export const SearchButtonCta = ({
  searchCta = ['Search our resources', 'Here you can find anything'],
}: SearchButtonCtaProps) => {
  const { setSearchDialog } = useSearch();

  return (
    <Button
      variant="secondary"
      onClick={() => setSearchDialog(prevOpen => !prevOpen)}
      className="flex w-full justify-between space-x-2 !py-6">
      <SearchIcon className="h-6 w-6 shrink" />
      <span className={'grow overflow-hidden text-left text-sm lg:text-xl'}>
        <ReactTyped strings={searchCta} typeSpeed={40} loop />
      </span>
      <div className={'hidden shrink lg:flex'}>
        <span className={'rounded-full bg-gray-500/20 px-3 text-base text-white'}>⌘k</span>
      </div>
    </Button>
  );
};
