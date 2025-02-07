'use client';
import SocialIcons from './social-icons';
import cn from 'clsx';

import { type LinkPrismicType, type SocialLinkItemType } from '@/types';
import ButtonSimple from '@/components/ui/button-simple';

interface SocialLinkProps {
  item: SocialLinkItemType;
  className?: string;
  iconsClass?: string;
  icons?: boolean;
}

export const SocialLink = ({ item, className, icons, iconsClass }: SocialLinkProps) => {
  const openSocialMediaLink = (link: LinkPrismicType) => {
    if (!link?.url) {
      return;
    }

    const userAgent = navigator.userAgent || navigator.vendor;
    let appUrl: string = link.url; // Default to the provided URL as a fallback.

    if (/iPad|iPhone|iPod|android/i.test(userAgent)) {
      // Detect the platform based on the URL
      if (link.url.includes('twitter.com')) {
        const match = /twitter\.com\/([^/]+)/.exec(link.url);
        if (match?.[1]) {
          const username = match[1];
          if (/iPad|iPhone|iPod/.test(userAgent)) {
            appUrl = `twitter://user?screen_name=${username}`;
          } else if (/android/i.test(userAgent)) {
            appUrl = `twitter://user?screen_name=${username}`;
          }
        }
      } else if (link.url.includes('facebook.com')) {
        // Assuming URL has the format 'https://www.facebook.com/page_id' or similar
        if (/iPad|iPhone|iPod/.test(userAgent)) {
          appUrl = `fb://facewebmodal/f?href=${link.url}`;
        } else if (/android/i.test(userAgent)) {
          appUrl = `fb://facewebmodal/f?href=${link.url}`;
        }
      } else if (link.url.includes('tiktok.com')) {
        // Example: extract the username from 'https://www.tiktok.com/@username'
        const match = /tiktok\.com\/@([^/]+)/.exec(link.url);
        if (match?.[1]) {
          const username = match[1];
          if (/iPad|iPhone|iPod/.test(userAgent)) {
            appUrl = `snssdk1233://user?username=${username}`;
          } else if (/android/i.test(userAgent)) {
            appUrl = `snssdk1233://user?username=${username}`;
          }
        }
      } else if (link.url.includes('instagram.com')) {
        const match = /instagram\.com\/([^/]+)/.exec(link.url);
        if (match?.[1]) {
          const username = match[1];
          if (/iPad|iPhone|iPod/.test(userAgent)) {
            appUrl = `instagram://user?username=${username}`;
          } else if (/android/i.test(userAgent)) {
            appUrl = `instagram://user?username=${username}`;
          }
        }
      }
    }

    if (typeof window !== 'undefined') {
      // Attempt to open the app-specific URL in a new window
      window.open(appUrl, '_blank');
    }
  };

  if (icons) {
    return (
      <button
        className={cn('h-5 w-5 text-gray-400 hover:text-accent', className)}
        onClick={() => {
          if (item?.url) {
            openSocialMediaLink(item.url);
          }
        }}
        rel="noopener noreferrer">
        {item?.url && <SocialIcons type={item?.type} props={iconsClass} />}
      </button>
    );
  } else {
    return (
      <ButtonSimple
        className={cn('h-5 w-5 text-gray-400 hover:text-accent', className)}
        onClick={() => {
          if (item?.url) {
            openSocialMediaLink(item.url);
          }
        }}
        hasIcon={false}
        size={'lg'}
        label={item?.name}
        classNames={className}
      />
    );
  }
};

export default SocialLink;
