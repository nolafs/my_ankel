import "@/styles/globals.scss";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import {PrismicPreview} from '@prismicio/next';
import {repositoryName} from "@/prismicio";
import CookieConsent from "@/components/features/cookie-consent/cookie-consent";
import {GoogleAnalytics} from '@next/third-parties/google';
import Footer from "@/components/layouts/footer";
import {createClient} from '@/prismicio';
import logo from '@/assets/logo.png';
import Navigation from "@/components/layouts/navigation";
import {GradientBackground} from '@/components/ui/gradient';
import { SocialLinkItemType } from "@/types/socialLinkItem.type";
import {LinkPrismicType} from '@/types';

export const metadata: Metadata = {
  title: "My Ankel",
  description: "foot",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function  RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const client = createClient();
  const navigation = await client.getSingle('navigation');
  const settings = await client.getSingle('settings');

  const social: SocialLinkItemType[] | undefined = settings.data?.social_media?.map(item => ({
    type: item.type,
    name: item.name,
    url: item.url as LinkPrismicType,
  }));

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
      <Navigation navigation={{items: navigation.data.links}} logo={logo}/>
      <GradientBackground/>
      <main className={'min-h-svh pt-16 overflow-hidden'}>
      {children}
      </main>
      {/* Footer consent */}
      <Footer
          navigation={{items: navigation.data.links}}
          logo={logo}
          secondaryNavigation={{items: settings.data.secondary_navigation}}
          social={social}
          copyright={settings.data.copyright_line}
      />
      {/* Cookie consent */}
      <CookieConsent/>
      <PrismicPreview repositoryName={repositoryName}/>
      </body>

      {/* Analytics */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''}/>


    </html>
  );
}
