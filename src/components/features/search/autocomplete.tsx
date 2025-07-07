'use client';
import '@algolia/autocomplete-theme-classic';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { autocomplete, getAlgoliaResults, type AutocompleteApi } from '@algolia/autocomplete-js';
import { type BaseItem } from '@algolia/autocomplete-core';
import { createRoot, type Root } from 'react-dom/client';
import React, { useEffect, useRef, type ReactNode, createElement, Fragment } from 'react';
import { useSearch } from '@/components/features/search/search-context';
import type { HitBaseItem } from '@/types/hit.type';
import Link from 'next/link';
import { FileDown, Film, Newspaper, SquareArrowOutUpRight } from 'lucide-react';

const AutocompleteItem = ({ item }: { item: HitBaseItem }) => {
  const getUrl = (item: HitBaseItem) => {
    if (item.type === 'video') {
      return '/videos/' + item.slug;
    }
    if (item.type === 'article') {
      return '/blog/' + item.slug;
    }
    if (item.type === 'download') {
      return '/downloads/' + item.slug;
    }
    return '';
  };

  const trimmedText = item.text.length > 100 ? item.text.substring(0, 200) + '...' : item.text;

  return (
    <div className={'items-top group relative flex w-full justify-between space-x-2 p-2'}>
      <div>
        <div className={'rounded-md bg-gray-900/30 p-1.5 group-hover:bg-pink-600'}>
          {item.type === 'video' && <Film className={'h-5 w-5 text-white'} />}
          {item.type === 'article' && <Newspaper className={'h-5 w-5 text-white'} />}
          {item.type === 'download' && <FileDown className={'h-5 w-5 text-white'} />}
        </div>
      </div>
      <div className={'flex grow flex-col'}>
        <div className={'flex w-auto rounded-full text-[8px]'}>{item.category}</div>
        {item.title}
        <p className={'mt-2 text-sm/5 text-gray-600'}>{trimmedText}</p>
      </div>
      <div>
        <Link href={getUrl(item)} legacyBehavior>
          <span className="absolute inset-0" />
          <SquareArrowOutUpRight className={'h-5 w-5 text-black group-hover:text-pink-600'} />
        </Link>
      </div>
    </div>
  );
};

export const AutoComplete = () => {
  const searchRef = useRef(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const { openSearchDialog, setSearchDialog } = useSearch();
  const autoCompleteInstanceRef = useRef<null | AutocompleteApi<BaseItem>>(null);

  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!,
  );

  useEffect(() => {
    console.log('AutoComplete mounted', openSearchDialog);
    if (autoCompleteInstanceRef.current) {
      autoCompleteInstanceRef.current.setIsOpen(true);
    }
  }, [openSearchDialog]);

  useEffect(() => {
    if (!searchRef.current) return;

    if (autoCompleteInstanceRef.current) {
      console.log('Autocomplete instance already initialized');
      return;
    }

    console.log('Initializing autocomplete');

    autoCompleteInstanceRef.current = autocomplete({
      container: searchRef.current,
      detachedMediaQuery: '', // Ensure it's detached on mobile
      openOnFocus: true, // Ensures it opens when clicked
      renderer: {
        createElement,
        Fragment,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        render: () => {},
      },
      render({ children }: { children: ReactNode }, root: HTMLElement) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      getSources({ query }) {
        return [
          {
            sourceId: 'hits',
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'blog',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    query,
                    params: { hitsPerPage: 8 },
                  },
                ],
              });
            },
            templates: {
              item({ item }) {
                return <AutocompleteItem item={item as HitBaseItem} />;
              },
            },
          },
        ];
      },
    });
  }, [searchClient]);

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
    <div>
      <div ref={searchRef} id="autocomplete" style={{ display: 'none' }}></div>
    </div>
  );
};
