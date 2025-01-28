import '@/styles/globals.scss';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import CookieConsent from '@/components/features/cookie-consent/cookie-consent';
import { GoogleAnalytics } from '@next/third-parties/google';
import Footer from '@/components/layouts/footer';
import { createClient } from '@/prismicio';
import logo from '@/assets/myankle-logo.svg';
import { GradientBackground } from '@/components/ui/gradient';
import { SocialLinkItemType } from '@/types/socialLinkItem.type';
import { Cta, LinkPrismicType } from '@/types';
import NavigationSub from '@/components/layouts/navigation/navigation-sub';

export const metadata: Metadata = {
  title: 'My Ankel',
  description: 'foot',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

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
      <body className={'text-gray-950 antialiased'}>
        <NavigationSub navigation={navigation.data} logo={logo} />
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
        <CookieConsent />
        <PrismicPreview repositoryName={repositoryName} />
      </body>

      {/* Analytics */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''} />
    </html>
  );
}
