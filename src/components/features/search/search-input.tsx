'use client';
import 'instantsearch.css/themes/satellite-min.css';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Hits, SearchBox, Configure, Pagination, RefinementList, CurrentRefinements } from 'react-instantsearch';
import SearchHitItem from '@/components/features/search/search-hit-item';
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { Subheading } from '@/components/ui/text';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import cn from 'clsx';
import { useSearch } from '@/components/features/search/search-context';
import { FacetDropdown } from '@/lib/FacetDropdown';

export function SearchInput({ isSearchPage = true }: { isSearchPage: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { openSearchDialog, setSearchDialog } = useSearch();

  const closeOnChange = () => window.innerWidth > 375;

  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!,
  );

  return (
    <InstantSearchNext searchClient={searchClient} indexName="blog" routing={true}>
      <Configure
        advancedSyntax={true}
        queryType="prefixAll"
        removeStopWords={true}
        optionalWords={['a', 'the', 'for']}
        removeWordsIfNoResults="allOptional"
        typoTolerance="min"
        ignorePlurals={true}
        minWordSizefor1Typo={4}
        minWordSizefor2Typos={8}
        attributesToSnippet={['text:50']} // ✅ Truncate text
        snippetEllipsisText="…" // ✅ Add ellipsis when truncated
        hitsPerPage={isSearchPage ? 20 : 10} // Adjust as needed
      />
      <div className={cn('relative z-10 flex flex-col', isSearchPage ? 'w-full' : 'h-svh w-full py-20')}>
        <SearchBox
          placeholder="Search for resources"
          classNames={{
            root: 'relative w-full px-4 !py-3 rounded-full  glass1 text-base font-medium text-gray-950 shadow-md !ring-1 !ring-[#D15052]/15 after:absolute after:!inset-0 after:rounded-full after:!shadow-[inset_0_0_2px_1px_#ffffff4d]',
            form: 'relative inline-flex items-center !bg-transparent justify-center focus:!outline-none focus:!border-white before:!border-none rounded-full',
            input:
              'w-full rounded-full font-bold text-gray-900 !bg-transparent !shadow-none !border-none focus:!outline-none focus:!border-white outline-none focus:font-bold focus:bg-transparent placeholder-gray-400',
            submit: 'absolute z-40  right-2 text-gray-500 hover:text-gray-700',
            reset: 'absolute z-40  right-10 text-gray-500 hover:text-gray-700',
          }}
          onSubmit={async event => {
            console.log('Search query:', query);
            if (!isSearchPage) {
              event.preventDefault(); // ✅ Prevents default form submission
              router.push(`/search?q=${encodeURIComponent(query)}`);
              setSearchDialog(false);
            }
          }}
        />
        <div className={'mt-5 hidden gap-2 lg:flex'}>
          <CurrentRefinements
            classNames={{
              root: 'flex gap-2',
              item: 'flex !items-center !justify-center gap-2 px-2 py-1 !bg-gray-200 !rounded-full',
              label: 'font-medium text-gray-900 capitalize',
              category: 'font-medium text-gray-900',
              delete: 'font-medium text-gray-900',
            }}
          />
        </div>
        <Subheading as="div" className="mt-16 flex items-center justify-between md:mt-10 lg:mt-16">
          <h3>Search Results</h3>

          <div className={'relative z-20 flex flex-wrap gap-2'}>
            <FacetDropdown closeOnChange={closeOnChange} classNames={{ root: 'my-CategoryDropdown' }}>
              <RefinementList attribute="category" searchable={true} searchablePlaceholder="Search..." />
            </FacetDropdown>
            <FacetDropdown
              closeOnChange={closeOnChange}
              buttonText={'Media Type'}
              classNames={{ root: 'my-TypeDropdown' }}>
              <RefinementList attribute="type" searchable={true} searchablePlaceholder="Search..." />
            </FacetDropdown>
            <FacetDropdown closeOnChange={closeOnChange} buttonText={'Tags'} classNames={{ root: 'my-TagsDropdown' }}>
              <RefinementList attribute="tags.slug" searchable={true} searchablePlaceholder="Search..." />
            </FacetDropdown>
          </div>
        </Subheading>
        <hr className="mt-6 border-t border-gray-200" />
        <div className="mt-5">
          {isSearchPage ? (
            <Hits
              hitComponent={SearchHitItem}
              classNames={{
                list: '!bg-transparent',
                item: '!shadow-none border-b !bg-transparent border-gray-200',
              }}
            />
          ) : (
            <ScrollArea className="h-full max-h-[500px] w-full">
              <Hits
                hitComponent={SearchHitItem}
                classNames={{
                  list: '!bg-transparent',
                  item: '!shadow-none border-b !bg-transparent border-gray-200',
                }}
              />
            </ScrollArea>
          )}
        </div>
        {/* Pagination Controls */}
        <div className="mt-10 flex justify-center">
          <Pagination />
        </div>
      </div>
    </InstantSearchNext>
  );
}
