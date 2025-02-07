import type { Cta, NavigationProps, SocialLinkItemType } from '@/types';
import { PrismicNextLink } from '@prismicio/next';
import React from 'react';

import Link from 'next/link';

import SocialList from '../features/social-list/social-list';
import { Container } from '@/components/ui/container';
import type { NavigationBarDocumentData, NavigationElementDocument } from '../../../prismicio-types';
import { CallToAction } from '@/components/features/cta/callToAction';
import { BorderRow } from '@/components/ui/border-row';

export interface FooterProps {
  navigation: NavigationBarDocumentData;
  secondaryNavigation?: NavigationProps;
  social?: SocialLinkItemType[] | undefined;
  copyright: string | undefined | null;
  footerCta?: Cta | undefined;
}

export function Footer({ navigation, footerCta, secondaryNavigation, social, copyright }: FooterProps) {
  const copyRightDate = new Date().getFullYear();
  return (
    <footer>
      <div className="relative bg-[#2E5F9A] bg-gradient-to-b from-[#3f7bc6] from-10% via-[#2E5F9A] via-[60%] to-[#2E5F9A]">
        <div className="absolute inset-2 z-0 rounded-4xl border-transparent bg-white/5 shadow-md ring-1 ring-[#8fde5d]/15 after:absolute after:inset-0 after:rounded-4xl after:shadow-[inset_0_0_2px_1px_#ffffff4d]" />

        <Container className={'relative z-10 block pb-10'}>
          {footerCta && <CallToAction {...footerCta} dark={true} />}

          <div>
            <BorderRow>
              <div className="mt-10 grid grid-cols-2 gap-y-10 pb-10 lg:grid-cols-6 lg:gap-8">
                <div className="col-span-2 flex flex-col justify-between">
                  <Link href="/" className={'grow'}>
                    <h2 id="footer-heading" className="sr-only">
                      My Ankle
                    </h2>
                    <svg width="220" height="48" viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M160.5 0.0690259C160.5 0.0690259 161.989 5.58211 162 8.56903C162.006 10.3372 161.988 11.3695 161.5 13.069C160.873 15.2544 158.956 16.2689 157.1 17.2506C155.011 18.3564 153 19.4205 153 22.069C153 25.1056 155.499 26.8053 158.295 28.7078C160.104 29.938 162.037 31.253 163.5 33.069C164.665 34.5146 165.343 36.0165 165.986 37.4418C166.995 39.6765 167.919 41.7229 170.5 43.069C172.641 44.1861 176.5 44.569 176.5 44.569C176.5 44.569 182 48.0001 183.5 48C185 47.9999 186.5 47.5689 187 45.569C187.295 44.3901 185.201 43.0376 182.997 41.6138C181.461 40.6219 179.872 39.5955 179 38.569C177.589 36.909 176.13 22.5087 175.121 12.5496L175.121 12.5493L175.121 12.5475C174.611 7.50931 174.216 3.60818 174 3.06903C173.358 1.46418 169.5 0.224436 167 0.0690637C164.5 -0.0863076 160.5 0.0690259 160.5 0.0690259ZM220 0H190.5V48H220V41H197.5V28H218.5V21H197.5V7H220V0ZM126.5 0V48H119.5V0H126.5ZM136.431 23.9255L154.9 4.91142e-05L146.3 0L129.2 21.9L129.272 26.1929L147.965 48H157.421L136.431 23.9255ZM78.5 0H85.3608L108 34.4181V0H115V48H108.463L85.5 12.5819V48H78.5V0ZM60.8369 27.5H48.1634L54.5001 10.8433L60.8369 27.5ZM68.9734 48L63.5 34.5H45.5003L40.0269 48H32.4844L51.2289 0H57.7714L76.5159 48H68.9734ZM0.895508 23H30.0002V25H7.10491L21.7136 35.5L7.10491 46H30.0002V48H0.895508L18.2868 35.5L0.895508 23ZM1.53223 2.88379L16.8628 11L1.53223 19.1162L2.468 20.8838L19.2485 12H30.5001V10H19.2485L2.468 1.11621L1.53223 2.88379Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </Link>
                  <div className={'mt-12 shrink'}>
                    {social && <SocialList items={social} icons={true} variantList={1} variantButton={3} />}
                  </div>
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
                                className="text-base font-medium text-white transition-all hover:text-white/80">
                                {navigationItem.data.label}
                              </PrismicNextLink>
                            </div>
                            <ul role="list" className="flex flex-col gap-2">
                              {navigationItem.data.subs.map(subItem => (
                                <li key={subItem.label}>
                                  <PrismicNextLink
                                    field={subItem.link}
                                    className="text-sm font-medium text-white/60 transition-all hover:text-white">
                                    {subItem.label}
                                  </PrismicNextLink>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <PrismicNextLink
                            field={navigationItem.data.link}
                            className="text-base font-medium text-white transition-all hover:text-white/80">
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
                          className="font-medium text-white/50 transition-all hover:text-primary">
                          {item.label}
                        </PrismicNextLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-8 leading-5 text-white/60 md:order-1 md:mt-0">
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
