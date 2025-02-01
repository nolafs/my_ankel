'use client';

import 'instantsearch.css/themes/satellite-min.css';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Highlight, Hits } from 'react-instantsearch';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import { FileDown, Film, Newspaper, SearchIcon, SquareArrowOutUpRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { OverlaySheet, OverlaySheetContent, OverlaySheetTrigger } from '@/components/ui/overlay';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useSearch } from './search-context';

type HitProps = {
  hit: AlgoliaHit<{
    author: string;
    category: string;
    image: Record<string, unknown>;
    objectID: string;
    slug: string;
    tags: string[];
    text: string;
    title: string;
    type: string;
    __position: number;
    _highlightResult: {
      title: Record<string, unknown>;
      text: Record<string, unknown>;
    };
  }>;
};

function Hit({ hit }: HitProps) {
  console.log(hit);

  return (
    <Link href={'/blog/' + hit.slug} className={'flex w-full items-center justify-between space-x-2'}>
      <div className={'rounded-md bg-gray-900/30 p-1.5'}>
        {hit.type === 'video' && <Film className={'h-5 w-5 text-white'} />}
        {hit.type === 'article' && <Newspaper className={'h-5 w-5 text-white'} />}
        {hit.type === 'download' && <FileDown className={'h-5 w-5 text-white'} />}
      </div>
      <div className={'flex grow flex-col'}>
        <div className={'flex w-auto rounded-full text-[8px]'}>{hit.category}</div>
        <Highlight hit={hit} attribute="title" className="text-xs font-medium" />
      </div>
      <div>
        <SquareArrowOutUpRight className={'h-5 w-5 text-black'} />
      </div>
    </Link>
  );
}

function SearchInput() {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!,
  );

  return (
    <div className={'w-full max-w-3xl rounded-md bg-white p-4 ring-1 ring-black/5'}>
      <InstantSearch searchClient={searchClient} indexName="blog">
        <div className="relative z-50 flex flex-col">
          <SearchBox placeholder="Search for resources" className={'w-full rounded-md'} />
          <ScrollArea className="h-full max-h-[500px] min-h-[200px] w-full rounded-b-md border-x border-b border-black/5 p-4">
            <Hits hitComponent={Hit} />
          </ScrollArea>
        </div>
      </InstantSearch>
    </div>
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

      <OverlaySheetContent className={'flex w-full flex-col items-center justify-center'}>
        <SearchInput />
      </OverlaySheetContent>
    </OverlaySheet>
  );
}
