import SocialLink from './social-link';
import cn from 'clsx';

import { type SocialLinkItemType } from '@/types';

/* eslint-disable-next-line */
export interface SocialListProps {
  items?: SocialLinkItemType[];
  className?: string;
  icons?: boolean;
  variantButton?: number;
  variantList?: number;
}

const VARIANTS_BUTTON = [
  'w-[26px] h-[26px]',
  'h-[32px] w-[32px] !text-white !hover:text-white/80',
  '',
  '!text-white !hover:text-white/80',
];

const VARIANTS_LIST = [
  'flex space-x-6 justify-center items-center md:justify-end md:items-end',
  'flex flex-row space-x-10',
  'flex gap-4',
];

export function SocialList({ items, className, icons = true, variantButton = 0, variantList = 0 }: SocialListProps) {
  if (!items?.length) return null;
  return (
    <ul className={cn(className ? className : VARIANTS_LIST[variantList])}>
      {items.map((item, id) => {
        return (
          item?.url && (
            <li key={id} className={'flex'}>
              <SocialLink item={item} icons={icons} className={VARIANTS_BUTTON[variantButton]} />
            </li>
          )
        );
      })}
    </ul>
  );
}

export default SocialList;
