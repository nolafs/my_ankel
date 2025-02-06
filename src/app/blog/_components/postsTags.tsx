import { createClient } from '@/prismicio';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, RssIcon } from '@heroicons/react/16/solid';
import { Link } from '@/components/ui/link';
import { Button } from '@/components/button';
import React from 'react';

export async function Tags({ selected }: { selected?: string }) {
  const client = createClient();
  const tags = await client
    .getByType('post_tags')
    .then(response => response.results)
    .catch(() => []);

  if (tags.length === 0) {
    return;
  }

  return (
    <Menu>
      <MenuButton className="flex items-center justify-between gap-2 font-medium">
        {tags.find(item => item?.uid === selected)?.data.name ?? 'All Tags'}
        <ChevronUpDownIcon className="size-4 fill-slate-900" />
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]">
        <MenuItem>
          <Link
            href="/blog"
            data-selected={selected === undefined ? true : undefined}
            className="group grid grid-cols-[1rem,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5">
            <CheckIcon className="hidden size-4 group-data-[selected]:block" />
            <p className="col-start-2 text-sm/6">All Tags</p>
          </Link>
        </MenuItem>
        {tags.map(tag => (
          <MenuItem key={tag.uid}>
            <Link
              href={`/blog?tags=${tag.uid}`}
              data-selected={tag.uid === selected ? true : undefined}
              className="group grid grid-cols-[16px,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5">
              <CheckIcon className="hidden size-4 group-data-[selected]:block" />
              <p className="col-start-2 text-sm/6 capitalize">{tag.data.name}</p>
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
