import React from 'react';
import Link from 'next/link';
import { FileDown, Film, Newspaper, SquareArrowOutUpRight } from 'lucide-react';
import { Highlight } from 'react-instantsearch';
import { HitProps } from '@/types';
import { HitBaseItem } from '@/types/hit.type';

const Item = (hit: HitBaseItem) => {};

export const SearchHitItem = ({ hit }: HitProps) => {
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
};

export default SearchHitItem;
