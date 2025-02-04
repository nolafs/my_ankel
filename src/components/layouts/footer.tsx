import { Cta, NavigationProps, SocialLinkItemType } from '@/types';
import { PrismicNextLink } from '@prismicio/next';
import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import SocialList from '../features/social-list/social-list';
import { Container } from '@/components/ui/container';
import { NavigationBarDocumentData, NavigationElementDocument } from '../../../prismicio-types';

import { StaticImageData } from 'next/image';
import { CallToAction } from '@/components/features/cta/callToAction';
import { BorderRow } from '@/components/ui/border-row';

export interface FooterProps {
  navigation: NavigationBarDocumentData;
  secondaryNavigation?: NavigationProps;
  social?: SocialLinkItemType[] | undefined;
  logo: StaticImageData | string;
  copyright: string | undefined | null;
  footerCta?: Cta | undefined;
}

export function Footer({ navigation, logo, footerCta, secondaryNavigation, social, copyright }: FooterProps) {
  const copyRightDate = new Date().getFullYear();
  return (
    <footer>
      <div className="relative bg-[#8fde5d] bg-gradient-to-b from-[#cef57a] to-[#8fde5d]">
        <div className="absolute inset-2 z-0 rounded-4xl bg-white/50" />

        <Container className={'relative z-10 block pb-10'}>
          {footerCta && <CallToAction {...footerCta} />}

          <div className={'border-t border-gray-200 border-opacity-30'}>
            <BorderRow>
              <div className="mt-10 grid grid-cols-2 gap-y-10 pb-10 lg:grid-cols-6 lg:gap-8">
                <div className="col-span-2 flex flex-col justify-between">
                  <Link href="/" className={'grow'}>
                    <h2 id="footer-heading" className="sr-only">
                      My Ankle
                    </h2>
                    <Image src={logo} className="inline" alt="logo" />
                  </Link>
                  <div className={'mt-12 shrink'}>
                    {social && <SocialList items={social} icons={true} variantList={1} variantButton={2} />}
                  </div>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-4 lg:grid-cols-subgrid">
                  {navigation?.navigation_items.map((item, idx) => {
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
                </div>
              </div>
            </BorderRow>
            <BorderRow>
              <div className="py-2 text-sm md:flex md:items-center md:justify-between">
                <div className="flex space-x-6 md:order-2">
                  <ul role="list" className="flex gap-8">
                    {secondaryNavigation?.items?.map(item => (
                      <li key={item.label}>
                        <PrismicNextLink
                          field={item.link}
                          className="font-medium text-gray-500 transition-all hover:text-primary">
                          {item.label}
                        </PrismicNextLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-8 leading-5 text-gray-400 md:order-1 md:mt-0">
                  &copy; {copyRightDate} {copyright}
                </p>
              </div>
            </BorderRow>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
