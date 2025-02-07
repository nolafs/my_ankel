import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon } from '@heroicons/react/24/outline';
import {
  type NavigationBarDocumentData,
  type NavigationBarDocumentDataNavigationItemsItem,
  type NavigationElementDocument,
} from '../../../../prismicio-types';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { PrismicNextLink } from '@prismicio/next';
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SearchButton } from '@/components/features/search/search-button';

interface NavigationSubProps {
  navigation: NavigationBarDocumentData;
  logo: React.ComponentProps<typeof Image>['src'];
}

export const NavigationMobileMenu = ({ logo, navigation }: NavigationSubProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <SearchButton />

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-8/12 overflow-y-auto bg-sky-200/30 px-6 py-6 shadow-none">
          <SheetTitle>
            <div className="flex items-center justify-between">
              <Link href="/public">
                <span className="sr-only">My Ankle</span>
                <Image src={logo} className="inline" alt="logo" width={110} height={32} />
              </Link>
            </div>
          </SheetTitle>
          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 divide-y divide-gray-500/20 py-6">
                {navigation?.navigation_items.map((item: NavigationBarDocumentDataNavigationItemsItem, idx) => {
                  const navigationItem = item.navigation_item as unknown as NavigationElementDocument;

                  return navigationItem.data?.subs[0]?.label !== null ? (
                    <Collapsible key={`main-mobile-nav-${idx}`} className="-mx-3">
                      <CollapsibleTrigger asChild>
                        <div
                          className={
                            'hover:bg-gray-50" flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-xl font-semibold text-gray-900'
                          }>
                          {navigationItem.data.label}
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="size-5 flex-none group-data-[open]:rotate-180"
                          />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 flex flex-col space-y-2">
                        {navigationItem.data.subs.map(item => (
                          <PrismicNextLink
                            key={`main-mobile-nav-${item.label}}`}
                            field={item.link}
                            className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                            {item.label}
                          </PrismicNextLink>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <PrismicNextLink
                      key={`main-mobile-nav-${idx}`}
                      field={navigationItem.data.link}
                      className="-mx-3 block rounded-lg px-3 py-2 text-xl font-semibold text-gray-900 hover:bg-gray-50">
                      {navigationItem.data.label}
                    </PrismicNextLink>
                  );
                })}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
