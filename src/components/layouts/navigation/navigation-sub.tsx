'use client';
import style from './navigation-sub.module.css';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from '@/components/features/search/search';
import {
  type NavigationBarDocumentData,
  type NavigationBarDocumentDataNavigationItemsItem,
  type NavigationElementDocument,
} from '../../../../prismicio-types';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicImage, PrismicRichText } from '@prismicio/react';

interface NavigationSubProps {
  navigation: NavigationBarDocumentData;
  logo: React.ComponentProps<typeof Image>['src'];
}

export default function NavigationSub({ navigation, logo }: NavigationSubProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const elementId = document.getElementById('navbar');

    document.addEventListener('scroll', () => {
      if (window.scrollY > 5) {
        elementId?.classList.add(style.sticky!);
      } else {
        elementId?.classList.remove(style.sticky!);
      }
    });

    return () => {
      document.removeEventListener('scroll', () => {
        if (window.scrollY > 5) {
          elementId?.classList.add(style.sticky!);
        } else {
          elementId?.classList.remove(style.sticky!);
        }
      });
    };
  }, []);

  return (
    <header
      id={'navbar'}
      className="fixed isolate z-10 w-screen bg-transparent px-6 transition-all delay-150 duration-300 lg:px-8">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-2xl items-center justify-between py-6 transition-all delay-150 duration-300 md:py-16 lg:max-w-7xl">
        <div className="flex lg:flex-1">
          <div className="-m-1.5 p-1.5">
            <Link href="/">
              <span className="sr-only">My Ankle</span>
              <Image src={logo} className="inline" alt="logo" width={110} height={32} />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:hidden">
          <Search />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {navigation?.navigation_items.map((item: NavigationBarDocumentDataNavigationItemsItem, idx) => {
            const navigationItem = item.navigation_item as unknown as NavigationElementDocument;

            return navigationItem.data?.subs[0]?.label !== null ? (
              <Popover key={`main-nav-${idx}`}>
                <PopoverButton
                  onMouseEnter={() => setOpenPopover(`main-nav-${idx}`)}
                  onMouseLeave={() => setTimeout(() => setOpenPopover(null), 200)}
                  className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                  {navigationItem.data.label}
                  <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                </PopoverButton>

                <PopoverPanel className="absolute inset-x-0 top-0 -z-10 w-full bg-white pt-14 shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
                  <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
                    {navigationItem.data.subs.map((item, idx) => (
                      <div
                        key={`main-nav-item-${idx}`}
                        className="group relative rounded-lg p-6 text-sm/6 hover:bg-gray-50">
                        <div className="flex size-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <PrismicImage
                            field={item.icon}
                            className="size-6 fill-gray-600 text-gray-600 group-hover:text-indigo-600"
                          />
                        </div>
                        <PrismicNextLink
                          field={item.link}
                          className="text-base font-medium text-gray-400 transition-all hover:text-primary">
                          {item.label}
                          <span className="absolute inset-0" />
                        </PrismicNextLink>
                        <div className="mt-1 text-gray-600">
                          <PrismicRichText field={item.description} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                      <div className="grid grid-cols-2 divide-x divide-gray-900/5 border-x border-gray-900/5">
                        {navigationItem.data.cta.map((item, idx) => (
                          <PrismicNextLink
                            key={`cta-${idx}`}
                            field={item.url}
                            className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100">
                            <PrismicImage field={item.icon} className="size-5 flex-none text-gray-400" />
                            {item.text}
                          </PrismicNextLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
            ) : (
              <PrismicNextLink
                key={`main-nav-${idx}`}
                field={navigationItem.data.link}
                className="text-sm/6 font-semibold text-gray-400 transition-all hover:text-primary">
                {navigationItem.data.label}
              </PrismicNextLink>
            );
          })}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Search />
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/public">
              <span className="sr-only">My Ankle</span>
              <Image src={logo} className="inline" alt="logo" width={110} height={32} />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation?.navigation_items.map((item: NavigationBarDocumentDataNavigationItemsItem, idx) => {
                  const navigationItem = item.navigation_item as unknown as NavigationElementDocument;

                  return navigationItem.data?.subs[0]?.label !== null ? (
                    <Disclosure key={`main-mobile-nav-${idx}`} as="div" className="-mx-3">
                      <DisclosureButton
                        as="div"
                        className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                        {navigationItem.data.label}
                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {navigationItem.data.subs.map(item => (
                          <DisclosureButton key={item.label} as="div">
                            <PrismicNextLink
                              field={item.link}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">
                              {item.label}
                              <span className="absolute inset-0" />
                            </PrismicNextLink>
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  ) : (
                    <PrismicNextLink
                      key={`main-mobile-nav-${idx}`}
                      field={navigationItem.data.link}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      {navigationItem.data.label}
                    </PrismicNextLink>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
