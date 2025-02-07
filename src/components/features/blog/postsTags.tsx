import { createClient } from '@/prismicio';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { Link } from '@/components/ui/link';
import React from 'react';
import { PostTagLink } from '@/components/features/blog/postTagLink';

export async function Tags({ selected, url = 'blog' }: { selected?: string; url?: string }) {
  const client = createClient();
  const tags = await client
    .getByType('post_tags', {
      pageSize: 100,
      orderings: [
        {
          field: 'my.post_tags.name',
          direction: 'asc',
        },
      ],
    })
    .then(response => response.results)
    .catch(() => []);

  if (tags.length === 0) {
    return;
  }

  //can i check current url and if category is query string is present then add it to the url

  //if not then just add the tags query string
  //if no query string then just add the tags query string

  return (
    <Menu>
      <MenuButton className="flex items-center justify-between gap-2 font-medium capitalize">
        {tags.find(item => item?.uid === selected)?.data.name ?? 'All Tags'}
        <ChevronUpDownIcon className="size-4 fill-slate-900" />
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="max-h-[150px] min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]">
        <MenuItem>
          <Link
            href={`/${url}`}
            data-selected={selected === undefined ? true : undefined}
            className="group grid grid-cols-[1rem,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5">
            <CheckIcon className="hidden size-4 group-data-[selected]:block" />
            <p className="col-start-2 text-sm/6">All Tags</p>
          </Link>
        </MenuItem>
        {tags.map(tag => (
          <MenuItem key={tag.uid}>
            <PostTagLink tag={tag} selected={selected} url={url} />
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
