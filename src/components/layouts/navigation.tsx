'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { PrismicNextLink } from '@prismicio/next';
import { NavigationProps } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import cn from 'clsx';
import {Search} from '@/components/features/search/search';

interface HeaderProps {
  navigation: NavigationProps;
  logo: React.ComponentProps<typeof Image>['src']
}

export function Navigation({ navigation, logo}: HeaderProps) {
  const currentRoute = usePathname();
  const [open, setOpen] = useState(false);

  // Sticky Navbar
  useEffect(() => {
    const elementId = document.getElementById('navbar');

    document.addEventListener('scroll', () => {
      if (window.scrollY > 5) {
        elementId?.classList.add('isSticky');
      } else {
        elementId?.classList.remove('isSticky');
      }
    });

    return () => {
      document.removeEventListener('scroll', () => {
        if (window.scrollY > 5) {
          elementId?.classList.add('isSticky');
        } else {
          elementId?.classList.remove('isSticky');
        }
      });
    };
  }, []);

  return (
    <div id="navbar" className="navbar-area fixed z-10 bg-transparent px-5 py-[20px] lg:py-[25px] xl:py-0">
      <div className="container mx-auto max-w-[1266px]">
        <nav className={`navbar relative flex flex-wrap items-center`}>
          <div className="grow self-center">
            <Link href="/">
              <Image src={logo} className="inline" alt="logo" />
            </Link>
          </div>

          <div className="navbar-collapse hidden grow basis-auto self-center md:flex">
            <ul className="navbar-nav mx-auto flex flex-row self-center">
              {
                navigation?.items.map(item => (
                  <li
                    key={item.label}
                    className="group relative mx-[5px] py-[10px] first:ml-0 last:mr-0 lg:py-[5px] xl:mx-[10px] xl:py-[35px] 2xl:mx-[18px] 2xl:py-[30px]">
                    <PrismicNextLink
                      field={item.link}
                      className={cn(
                        'hover:text-primary text-base font-medium text-gray-500 underline-offset-4 transition-all hover:underline',
                        item.link.url === currentRoute && 'text-primary',
                      )}>
                     {item.label}
                    </PrismicNextLink>
                  </li>
                ))}
                <li className="group relative mx-[5px] py-[10px] first:ml-0 last:mr-0 lg:py-[5px] xl:mx-[10px] xl:py-[35px] 2xl:mx-[18px] 2xl:py-[30px]">
                  <Search />
                </li>
            </ul>
          </div>

          <div className={'grid grow-0 grid-cols-2 items-center justify-center md:hidden'}>

            {/* Toggle button */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className={'absolute right-0 top-1/2 z-50 block -translate-y-1/2 items-center md:hidden'}>
                <i className="bx bx-menu">
                  <Menu />
                </i>
              </SheetTrigger>
              <SheetContent side={'right'} className={'z[999] w-[80vw] px-0 pb-0'}>
                <SheetHeader>
                  <SheetTitle className={'sr-only'}>Menu</SheetTitle>
                </SheetHeader>
                <div className={'flex h-full flex-col items-stretch'}>
                  <div className={'grow'}>
                    <Link href="/">
                      <Image src={logo} className="inline pl-5" alt="logo" />
                    </Link>
                    <ul className={'b mt-10 flex flex-col divide-y divide-gray-500/10'}>
                      {
                        navigation?.items.map(item => (
                          <li key={item.label} className="group relative px-5 py-5">
                            <PrismicNextLink
                              field={item.link}
                              onClick={() => setOpen(false)}
                              className="hover:text-primary text-base font-medium text-gray-500 transition-all">
                              {item.label}
                            </PrismicNextLink>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
