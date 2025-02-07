import { createClient } from '@/prismicio';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { Link } from '@/components/ui/link';

import React from 'react';

export async function Categories({ selected, url = 'blog' }: { selected?: string; url?: string }) {
  const client = createClient();
  const categories = await client
    .getByType('post_category', {
      pageSize: 100,
      orderings: [
        {
          field: 'my.post_category.name',
          direction: 'asc',
        },
      ],
    })
    .then(response => response.results)
    .catch(() => []);

  if (categories.length === 0) {
    return;
  }

  return (
    <Menu>
      <MenuButton className="flex items-center justify-between gap-2 font-medium capitalize">
        {categories.find(item => item?.uid === selected)?.data.name ?? 'All categories'}
        <ChevronUpDownIcon className="size-4 fill-slate-900" />
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]">
        <MenuItem>
          <Link
            href={`/${url}`}
            data-selected={selected === undefined ? true : undefined}
            className="group grid grid-cols-[1rem,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5">
            <CheckIcon className="hidden size-4 group-data-[selected]:block" />
            <p className="col-start-2 text-sm/6">All categories</p>
          </Link>
        </MenuItem>
        {categories.map(category => (
          <MenuItem key={category.uid}>
            <Link
              href={`/${url}?category=${category.uid}`}
              data-selected={category.uid === selected ? true : undefined}
              className="group grid grid-cols-[16px,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5">
              <CheckIcon className="hidden size-4 group-data-[selected]:block" />
              <p className="col-start-2 text-sm/6">{category.data.name}</p>
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
