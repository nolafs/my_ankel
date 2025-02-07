'use client';
import style from './navigation-sub.module.css';
import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {
  type NavigationBarDocumentData,
  type NavigationBarDocumentDataNavigationItemsItem,
  type NavigationElementDocument,
} from '../../../../prismicio-types';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicImage, PrismicRichText } from '@prismicio/react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { NavigationMobileMenu } from '@/components/layouts/navigation/navigation-mobile-menu';
import cn from 'clsx';
import { SearchButton } from '@/components/features/search/search-button';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface NavigationSubProps {
  navigation: NavigationBarDocumentData;
  logo: string | StaticImport;
}

export default function NavigationMenuSub({ navigation, logo }: NavigationSubProps) {
  const [scroll, setScroll] = React.useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const elementId = document.getElementById('navbar');

    document.addEventListener('scroll', () => {
      if (window.scrollY > 5) {
        elementId?.classList.add(style.sticky!);
        setScroll(true);
      } else {
        elementId?.classList.remove(style.sticky!);
        setScroll(false);
      }
    });

    return () => {
      document.removeEventListener('scroll', () => {
        if (window.scrollY > 5) {
          elementId?.classList.add(style.sticky!);
          setScroll(true);
        } else {
          elementId?.classList.remove(style.sticky!);
          setScroll(false);
        }
      });
    };
  }, []);

  return (
    <header id={'navbar'} className="fixed top-0 z-40 w-screen bg-transparent transition-all delay-150 duration-300">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 pt-6 transition-all delay-150 duration-300 sm:px-2 md:pt-16 lg:max-w-7xl lg:px-0">
        <div className="flex lg:flex-1">
          <div className="relative z-40">
            <Link href="/">
              <span className="sr-only">My Ankle</span>
              <Image
                src={logo}
                className={cn(
                  'inline origin-left scale-100 transition-all delay-150 duration-300',
                  scroll ? 'md:scale-100' : 'md:scale-[1.50]',
                )}
                alt="logo"
                width={110}
                height={32}
              />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:hidden">
          <NavigationMobileMenu navigation={navigation} logo={logo} />
        </div>
        <NavigationMenu className={'hidden lg:block'}>
          <NavigationMenuList>
            {navigation?.navigation_items.map((item: NavigationBarDocumentDataNavigationItemsItem, idx) => {
              const navigationItem = item.navigation_item as unknown as NavigationElementDocument;

              return navigationItem.data?.subs[0]?.label !== null ? (
                <NavigationMenuItem key={`main-nav-${idx}`}>
                  <NavigationMenuTrigger className={'text-lg'}>{navigationItem.data.label}</NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div id={'nav-content'} className={cn('relative block w-screen', scroll ? 'pt-14' : 'pt-24')}>
                      <div
                        className={cn(
                          'mx-auto grid max-w-7xl gap-x-6 px-6 py-8 lg:px-8 xl:gap-x-10',
                          `grid-cols-${navigationItem.data.subs.length}`,
                        )}>
                        {navigationItem.data.subs.map((item, idx) => (
                          <div
                            key={`main-nav-item-${idx}`}
                            className="group relative rounded-lg p-6 text-sm/6 transition-all duration-500 ease-in-out hover:bg-accent/20">
                            <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-accent transition-all duration-300 ease-in-out group-hover:bg-white">
                              <PrismicImage
                                field={item.icon}
                                className="size-6 invert transition-all duration-300 ease-in-out group-hover:invert-0"
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
                      <div className="bg-accent">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                          <div className="grid grid-cols-2 divide-x divide-gray-900/5 border-x border-gray-900/5">
                            {navigationItem.data.cta.map((item, idx) => (
                              <PrismicNextLink
                                key={`cta-${idx}`}
                                field={item.url}
                                className="flex items-center justify-center gap-x-2.5 p-3 text-lg font-semibold text-white transition-all duration-500 hover:bg-gray-900/30">
                                <PrismicImage field={item.icon} className="size-5 flex-none text-gray-400 invert" />
                                {item.text}
                              </PrismicNextLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={`main-nav-${idx}`}>
                  <PrismicNextLink field={navigationItem.data.link} passHref legacyBehavior>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), '!text-lg font-bold')}>
                      {navigationItem.data.label}
                    </NavigationMenuLink>
                  </PrismicNextLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="relative z-40 hidden lg:flex lg:flex-1 lg:justify-end">
          <SearchButton />
        </div>
      </div>
    </header>
  );
}
