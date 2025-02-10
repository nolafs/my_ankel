'use client';
import 'instantsearch.css/themes/satellite-min.css';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import {
  Hits,
  SearchBox,
  Configure,
  Pagination,
  RefinementList,
  CurrentRefinements,
  PoweredBy,
  Stats,
} from 'react-instantsearch';
import SearchHitItem from '@/components/features/search/search-hit-item';
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { Subheading } from '@/components/ui/text';
import React, { FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import cn from 'clsx';
import { useSearch } from '@/components/features/search/search-context';
import { FacetDropdown } from '@/lib/FacetDropdown';
import { Container } from '@/components/ui/container';

export function SearchInput({ isSearchPage = true }: { isSearchPage: boolean }) {
  const router = useRouter();
  const { openSearchDialog, setSearchDialog } = useSearch();
  const searchParams = useSearchParams();

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
      <div
        className={cn(
          'relative z-10 flex flex-col',
          isSearchPage ? 'w-full' : 'h-full min-h-svh w-full justify-between',
        )}>
        <div
          className={
            !isSearchPage
              ? 'sticky top-0 z-20 shrink border-b border-gray-200 bg-white/60 pt-16 backdrop-blur-sm sm:pt-12 md:pt-24'
              : ''
          }>
          <Container>
            <SearchBox
              placeholder="Search resources"
              classNames={{
                root: 'relative w-full px-4 !py-2 md:!py-3 rounded-full  glass1 text-base font-medium text-gray-950 shadow-md !ring-1 !ring-[#48b2e0]/15 after:absolute after:!inset-0 after:rounded-full after:!shadow-[inset_0_0_2px_1px_#ffffff4d]',
                form: 'relative inline-flex items-center !bg-transparent justify-center focus:!outline-none focus:!border-white before:!border-none rounded-full',
                input:
                  'w-full rounded-full pl-10 font-bold text-gray-900 !bg-transparent !shadow-none !border-none focus:!outline-none focus:!border-white outline-none focus:font-bold focus:bg-transparent placeholder-gray-400',
                submit: 'absolute z-40  right-2 text-gray-500 hover:text-gray-700',
                reset: 'absolute z-40  right-10 text-gray-500 hover:text-gray-700',
              }}
              onSubmit={() => {
                if (!isSearchPage) {
                  console.log('Search submitted:', searchParams.getAll('blog[query]'));
                  const query = searchParams.getAll('blog[query]')?.join(' ');
                  router.push(`/search/?blog%5Bquery%5D=${query}`);

                  setSearchDialog(false);
                }
              }}
            />
            <div className={'mt-2 flex justify-between px-5'}>
              <div className={'text-[10px] text-gray-500'}>
                <Stats />
              </div>
              <div className={'origin-right scale-50'}>
                <PoweredBy />
              </div>
            </div>
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
            <Subheading
              as="div"
              className={cn('flex flex-wrap items-center justify-between gap-2', isSearchPage ? 'mt-16' : 'mt-5')}>
              <h3 className={'tracking-tight md:tracking-widest'}>Search Results</h3>

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
                <FacetDropdown
                  closeOnChange={closeOnChange}
                  buttonText={'Tags'}
                  classNames={{ root: 'my-TagsDropdown' }}>
                  <RefinementList attribute="tags.name" searchable={true} searchablePlaceholder="Search..." />
                </FacetDropdown>
              </div>
            </Subheading>
            <hr className={cn('border-t border-gray-200', isSearchPage ? 'mt-6' : 'mt-6 opacity-0')} />
          </Container>
        </div>
        <Container className={'!px-0 md:!px-6'}>
          <div className="mt-5 flex h-full grow flex-col justify-between">
            <Hits
              hitComponent={SearchHitItem}
              classNames={{
                list: '!bg-transparent',
                item: '!shadow-none border-b !bg-transparent border-gray-200',
              }}
            />
          </div>
          <div className="mb-10 mt-10 flex shrink justify-center">
            <Pagination
              classNames={{
                root: 'flex gap-2',
                item: '!flex h-10 w-10 items-center border-none justify-center rounded-full !bg-transparent font-medium text-gray-900',
                selectedItem:
                  'flex flex-col h-full item-center justify-center rounded-lg text-center text-sm/7 font-medium hover:bg-gray-100 shadow ring-1 ring-black/10 hover:bg-gray-50',
                pageItem: '!bg-transparent border-none flex items-center justify-center',
                link: '!border-none !bg-transparent !bg-none font-sans !shadow-none flex',
              }}
            />
          </div>
        </Container>
      </div>
    </InstantSearchNext>
  );
}
