import React from 'react';
import Link from 'next/link';
import { Download, FileDown, Film, Newspaper, SquareArrowOutUpRight } from 'lucide-react';
import { Highlight, Snippet } from 'react-instantsearch';
import { type HitProps } from '@/types';
import { Badge } from '@/components/ui/badge';
import type { HitBaseItem } from '@/types/hit.type';
import Image from 'next/image';
import { useSearch } from '@/components/features/search/search-context';
import { DownloadLink } from '@/components/ui/downloadLink';

export const SearchHitItem = ({ hit }: HitProps) => {
  const { openSearchDialog, setSearchDialog } = useSearch();
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
        'group relative flex w-full flex-col items-start justify-between space-y-3 rounded-md px-2 py-2 hover:bg-gray-200/5 md:space-x-3 lg:flex-row'
      }>
      <div className={'relative'}>
        {imageUrl ? (
          <div className={'relative w-full md:w-[200px]'}>
            <div className={'relative h-fit w-fit rounded-md bg-accent/60 p-2 md:absolute md:left-2 md:top-2'}>
              {hit.type === 'video' && <Film className={'h-5 w-5 text-white'} />}
              {hit.type === 'article' && <Newspaper className={'h-5 w-5 text-white'} />}
              {hit.type === 'download' && <FileDown className={'h-5 w-5 text-white'} />}
            </div>

            <Image
              src={imageUrl}
              alt={hit.title}
              width={300}
              height={169}
              className={'hidden aspect-[16/9] h-full w-full rounded-md object-cover object-center sm:hidden md:block'}
            />
          </div>
        ) : (
          <div className={'h-fit w-fit rounded-md bg-accent/60 p-2 md:p-3'}>
            {hit.type === 'video' && <Film className={'h-5 w-5 text-white sm:h-5 sm:w-5 md:h-7 md:w-7'} />}
            {hit.type === 'article' && <Newspaper className={'h-5 w-5 text-white md:h-7 md:w-7'} />}
            {hit.type === 'download' && <FileDown className={'h-5 w-5 text-white md:h-7 md:w-7'} />}
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
        {hit.type !== 'download' ? (
          <Link href={getUrl(hit)} className={''} onClick={() => hit.type !== 'download' && setSearchDialog(false)}>
            <span className="absolute inset-0" />
            <SquareArrowOutUpRight className={'h-5 w-5 text-black group-hover:text-pink-600'} />
          </Link>
        ) : (
          <DownloadLink href={getUrl(hit)}>
            <Download className={'h-5 w-5 text-black group-hover:text-pink-600'} />
          </DownloadLink>
        )}
      </div>
    </div>
  );
};

export default SearchHitItem;
