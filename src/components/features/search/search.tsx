'use client';

import 'instantsearch.css/themes/satellite-min.css';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Highlight, Hits } from 'react-instantsearch';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import { SearchIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { OverlaySheet, OverlaySheetContent, OverlaySheetTrigger } from '@/components/ui/overlay';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useSearch } from './search-context';

type HitProps = {
  hit: AlgoliaHit<{
    title: string;
    slug: string;
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <Link href={'/blog/' + hit.slug}>
      <Highlight hit={hit} attribute="title" className="Hit-label" />
    </Link>
  );
}

function SearchInput() {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!,
  );

  return (
    <InstantSearch searchClient={searchClient} indexName="blog">
      <div className="relative z-50 flex flex-col">
        <h2 className={'mb-5 text-6xl font-bold'}>Search</h2>
        <SearchBox placeholder="Search for resources" />
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
          <Hits hitComponent={Hit} />
        </ScrollArea>
      </div>
    </InstantSearch>
  );
}

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

      <OverlaySheetContent>
        <div className={'flex flex-col items-center justify-center'}>
          <SearchInput />
        </div>
      </OverlaySheetContent>
    </OverlaySheet>
  );
}
