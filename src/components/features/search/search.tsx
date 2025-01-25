"use client";

import 'instantsearch.css/themes/satellite-min.css';
import {liteClient as algoliasearch} from 'algoliasearch/lite';
import {InstantSearch, SearchBox, Highlight, Hits} from "react-instantsearch";
import {Hit as AlgoliaHit} from 'instantsearch.js';
import {
  Sheet,
  SheetContent,
  SheetTrigger } from '@/components/ui/sheet';
import {SearchIcon} from 'lucide-react';
import {ScrollArea} from '@/components/ui/scroll-area';
import Link from 'next/link';

type HitProps = {
  hit: AlgoliaHit<{
    title: string;
    slug: string;
  }>;
};


function Hit({hit}: HitProps) {
  return (
      <Link href={'/blog/'+hit.slug} >
        <Highlight hit={hit} attribute="title" className="Hit-label"/>
      </Link>
  );
}




function SearchInput() {
  const searchClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!
  );

  return (
      <InstantSearch searchClient={searchClient} indexName="blog">
        <div className="flex flex-col relative z-50">
          <h2 className={'text-6xl font-bold mb-5'}>Search</h2>
          <SearchBox placeholder="Search for resources" />
          <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
            <Hits hitComponent={Hit} />
          </ScrollArea>
        </div>
      </InstantSearch>
  );
}


export function Search() {

  return (
      <Sheet>
        <SheetTrigger>
          <SearchIcon className="w-6 h-6"/>
        </SheetTrigger>
        <SheetContent side={'bottom'}  className={'w-screen h-svh bg-white/0'}>
         <div className={'flex flex-col w-screen h-svh justify-center items-center'}>
           <SearchInput/>
         </div>
        </SheetContent>
      </Sheet>
  )
}
