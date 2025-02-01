import '@/styles/globals.scss';

import { GeistSans } from 'geist/font/sans';
import { type Metadata, ResolvingMetadata } from 'next';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import CookieConsent from '@/components/features/cookie-consent/cookie-consent';
import { GoogleAnalytics } from '@next/third-parties/google';
import Footer from '@/components/layouts/footer';
import { createClient } from '@/prismicio';
import logo from '@/assets/myankle-logo.svg';

import { SocialLinkItemType } from '@/types/socialLinkItem.type';
import { Cta, LinkPrismicType } from '@/types';
import NavigationMenuSub from '@/components/layouts/navigation/navigation-menu-sub';
import BackToTop from '@/components/ui/BackToTop';
import { Suspense } from 'react';
import { SearchProvider } from '@/components/features/search/search-context';

type Props = {
  params: Promise<{ uid: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function isURL(string: string | null | undefined): boolean {
  if (!string) return false;

  const pattern = new RegExp('^(https?|ftp):\\/\\/[^s/$.?#].[^s]*$', 'i');
  return pattern.test(string);
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle('settings');
  const defaultImages = ['/placeholder.jpg'];

  if (settings?.data.share_image?.url) {
    defaultImages[0] = settings?.data.share_image?.url;
  }

  return {
    metadataBase: new URL(
      isURL(settings.data?.canonical_url ?? '')
        ? settings.data.canonical_url!
        : (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.myankle.co.uk'),
    ),
    alternates: {
      canonical: settings.data?.canonical_url ?? process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.myankle.co.uk',
      types: {
        'application/rss+xml': `${process.env.NEXT_PUBLIC_BASE_URL}feed.xml`,
      },
    },
    title: settings?.data.meta_title ?? (await parent).title ?? '-= My Ankle =-',
    description: settings?.data.meta_description ?? (await parent).description,
    keywords: settings?.data.meta_keywords ?? (await parent).keywords ?? '',
    openGraph: {
      images: [...defaultImages],
    },
    icons: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '48x48',
        url: '/favicon-48x48.png',
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/favicon.svg',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/apple-touch-icon.png',
      },
    ],
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const client = createClient();
  const navigation = await client.getSingle('navigation_bar', {
    fetchLinks: [
      'navigation_element.label',
      'navigation_element.link',
      'navigation_element.subs',
      'navigation_element.cta',
    ],
  });
  const settings = await client.getSingle('settings');

  const social: SocialLinkItemType[] | undefined = settings.data?.social_media?.map(item => ({
    type: item.type,
    name: item.name,
    url: item.url as LinkPrismicType,
  }));

  const footerCta: Cta = {
    label: settings.data?.footer_cta_lable ?? '',
    heading: settings.data?.footer_cta_heading ?? '',
    body: settings.data?.footer_cta_body ?? '',
    links: settings.data?.footer_cta_links ?? [],
  };

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className={'min-h-screen text-gray-950 antialiased'}>
        <SearchProvider>
          <NavigationMenuSub navigation={navigation.data} logo={logo} />

          {/* Content */}

          {children}

          {/* Footer consent */}
          <Footer
            navigation={navigation.data}
            logo={logo}
            secondaryNavigation={{ items: settings.data.secondary_navigation }}
            social={social}
            copyright={settings.data.copyright_line}
            footerCta={footerCta}
          />

          {/* Cookie consent */}
          <Suspense>
            <CookieConsent />
            <BackToTop />
          </Suspense>

          <PrismicPreview repositoryName={repositoryName} />
        </SearchProvider>
      </body>

      {/* Analytics */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''} />
    </html>
  );
}
