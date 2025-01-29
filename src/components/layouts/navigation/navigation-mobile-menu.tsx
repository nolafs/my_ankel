import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  NavigationBarDocumentData,
  NavigationBarDocumentDataNavigationItemsItem,
  NavigationElementDocument,
} from '../../../../prismicio-types';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { PrismicNextLink } from '@prismicio/next';
import React, { useState } from 'react';
import { Search } from '@/components/features/search/search';

interface NavigationSubProps {
  navigation: NavigationBarDocumentData;
  logo: React.ComponentProps<typeof Image>['src'];
}

export const NavigationMobileMenu = ({ logo, navigation }: NavigationSubProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Search />
      <button
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span className="sr-only">Open main menu</span>
        <Bars3Icon aria-hidden="true" className="size-6" />
      </button>

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
    </>
  );
};
