'use client';

import { SearchIcon } from 'lucide-react';

import { OverlaySheet, OverlaySheetContent, OverlaySheetTrigger } from '@/components/ui/overlay';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useSearch } from './search-context';
import { SearchInput } from './search-input';

export function Search() {
  const { openSearchDialog, setSearchDialog } = useSearch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setSearchDialog(open => !open);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setSearchDialog]);

  return (
    <OverlaySheet open={openSearchDialog} onOpenChange={open => setSearchDialog(open)}>
      <OverlaySheetTrigger asChild={true}>
        <div className={'flex items-center space-x-1'} aria-label={'Search Site'}>
          <Button variant={'ghost'} size={'icon'}>
            <span className={'sr-only'}>Search Site</span>
            <SearchIcon className="h-8 w-8" />
          </Button>
          <span className={'rounded-full bg-gray-200/20 px-2 text-[9px] text-gray-600'}>⌘k</span>
        </div>
      </OverlaySheetTrigger>
      <OverlaySheetContent className={'flex w-full flex-col items-center justify-center'}>
        <div className={'relative isolate'}>
          <SearchInput isSearchPage={false} />
        </div>
      </OverlaySheetContent>
    </OverlaySheet>
  );
}
