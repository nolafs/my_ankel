import type { LinkPrismicType } from '@/types/link.prismic.type';

export type SocialLinkItemType = {
  type?: 'facebook' | 'instagram' | 'twitter' | 'gitHub' | 'youtube' | 'tiktok' | 'linkedin' | undefined | null;
  name?: string | undefined | null;
  url?: LinkPrismicType | undefined | null;
};
