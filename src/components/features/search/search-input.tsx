'use client';
import 'instantsearch.css/themes/satellite-min.css';

import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch';
import { ScrollArea } from '@/components/ui/scroll-area';
import SearchHitItem from '@/components/features/search/search-hit-item';

export function SearchInput() {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!,
  );

  return (
    <div className={'lg:min-w-3xl w-full max-w-3xl rounded-md bg-white p-4 ring-1 ring-black/5'}>
      <InstantSearch searchClient={searchClient} indexName="blog">
        <div className="relative z-50 flex flex-col">
          <SearchBox placeholder="Search for resources" className={'w-full rounded-md'} />
          <ScrollArea className="h-full max-h-[500px] min-h-[200px] w-full rounded-b-md border-x border-b border-black/5 p-4">
            <Hits hitComponent={SearchHitItem} />
          </ScrollArea>
        </div>
      </InstantSearch>
    </div>
  );
}
