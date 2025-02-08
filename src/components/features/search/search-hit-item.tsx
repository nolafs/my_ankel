import React from 'react';
import Link from 'next/link';
import { Download, FileDown, Film, Newspaper, SquareArrowOutUpRight } from 'lucide-react';
import { Highlight, Snippet } from 'react-instantsearch';
import { type HitProps } from '@/types';
import { Badge } from '@/components/ui/badge';
import type { HitBaseItem } from '@/types/hit.type';
import Image from 'next/image';

export const SearchHitItem = ({ hit }: HitProps) => {
  const imageUrl: string | null = hit.image?.url as string | null;

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

  return (
    <div
      className={
        'group relative flex w-full flex-col items-start justify-between space-y-3 rounded-md p-2 hover:bg-gray-200/10 md:space-x-3 lg:flex-row'
      }>
      <div className={'relative'}>
        {imageUrl ? (
          <div className={'relative w-full md:w-[200px]'}>
            <div className={'absolute left-2 top-2 h-fit w-fit rounded-md bg-accent/60 p-2'}>
              {hit.type === 'video' && <Film className={'h-5 w-5 text-white'} />}
              {hit.type === 'article' && <Newspaper className={'h-5 w-5 text-white'} />}
              {hit.type === 'download' && <FileDown className={'h-5 w-5 text-white'} />}
            </div>

            <Image
              src={imageUrl}
              alt={hit.title}
              width={300}
              height={169}
              className={'aspect-[16/9] h-full w-full rounded-md object-cover object-center'}
            />
          </div>
        ) : (
          <div className={'h-fit w-fit rounded-md bg-accent/60 p-3'}>
            {hit.type === 'video' && <Film className={'h-7 w-7 text-white'} />}
            {hit.type === 'article' && <Newspaper className={'h-7 w-7 text-white'} />}
            {hit.type === 'download' && <FileDown className={'h-7 w-7 text-white'} />}
          </div>
        )}
      </div>
      <div className={'flex grow flex-col'}>
        <div className={'mb-3 flex origin-left scale-90 flex-wrap items-center gap-1'}>
          {hit?.category && <Badge className={'w-fit'}>{hit.category}</Badge>}
          <Badge className={'w-fit bg-accent capitalize'}>{hit.type}</Badge>
        </div>
        <div className={'flex gap-2'}>
          <div className={'flex flex-col'}>
            <Highlight
              hit={hit}
              attribute="title"
              className="mb-2 text-base font-medium text-gray-700 group-hover:text-accent"
            />
            <Snippet hit={hit} attribute="text" className={'text-gray-600'} />
          </div>
        </div>
      </div>
      <div>
        <Link href={getUrl(hit)}>
          <span className="absolute inset-0" />
          {hit.type !== 'download' ? (
            <SquareArrowOutUpRight className={'h-5 w-5 text-black group-hover:text-pink-600'} />
          ) : (
            <Download />
          )}
        </Link>
      </div>
    </div>
  );
};

export default SearchHitItem;
