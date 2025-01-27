import { NavigationProps, SocialLinkItemType } from '@/types';
import { PrismicNextLink } from '@prismicio/next';
import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import SocialList from '../features/social-list/social-list';
import { Gradient } from '@/components/ui/gradient';
import { Container } from '@/components/ui/container';
import { NavigationBarDocumentData, NavigationElementDocument } from '../../../prismicio-types';

export interface FooterProps {
  navigation: NavigationBarDocumentData;
  secondaryNavigation?: NavigationProps;
  social?: SocialLinkItemType[] | undefined;
  logo: any;
  copyright: string | undefined | null;
}

export function Footer({ navigation, logo, secondaryNavigation, social, copyright }: FooterProps) {
  const copyRightDate = new Date().getFullYear();
  return (
    <footer>
      <Gradient className="relative">
        <div className="absolute inset-2 z-0 rounded-4xl bg-white/80" />
        <Container className={'relative z-10'}>
          <div className={'py-10'}>
            <div className="mt-10 grid grid-cols-2 gap-y-10 pb-6 lg:grid-cols-6 lg:gap-8">
              <div className="col-span-2 flex">
                <Link href="/">
                  <h2 id="footer-heading" className="sr-only">
                    My Ankle
                  </h2>
                  <Image src={logo} className="inline" alt="logo" />
                </Link>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-4 lg:grid-cols-subgrid">
                {navigation?.navigation_items.map(item => {
                  const navigationItem = item.navigation_item as unknown as NavigationElementDocument;
                  return (
                    <div key={navigationItem.data.label}>
                      {navigationItem.data.subs[0]?.label ? (
                        <>
                          <div className={'mb-10'}>
                            <PrismicNextLink
                              field={navigationItem.data.link}
                              className="text-base font-medium text-gray-400 transition-all hover:text-primary">
                              {navigationItem.data.label}
                            </PrismicNextLink>
                          </div>
                          <ul role="list" className="flex flex-col gap-2">
                            {navigationItem.data.subs.map(subItem => (
                              <li key={subItem.label}>
                                <PrismicNextLink
                                  field={subItem.link}
                                  className="text-sm font-medium text-gray-700 transition-all hover:text-primary">
                                  {subItem.label}
                                </PrismicNextLink>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <PrismicNextLink
                          field={navigationItem.data.link}
                          className="text-base font-medium text-gray-400 transition-all hover:text-primary">
                          {navigationItem.data.label}
                        </PrismicNextLink>
                      )}
                    </div>
                  );
                })}
                {social && <SocialList items={social} icons={true} variantList={0} variantButton={2} />}
              </div>
            </div>
            <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
              <div className="flex space-x-6 md:order-2">
                <ul role="list" className="flex gap-8">
                  {secondaryNavigation?.items?.map(item => (
                    <li key={item.label}>
                      <PrismicNextLink
                        field={item.link}
                        className="text-base font-medium text-gray-500 transition-all hover:text-primary">
                        {item.label}
                      </PrismicNextLink>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-8 text-base leading-5 text-gray-400 md:order-1 md:mt-0">
                &copy; {copyRightDate} {copyright}
              </p>
            </div>
          </div>
        </Container>
      </Gradient>
    </footer>
  );
}

export default Footer;
