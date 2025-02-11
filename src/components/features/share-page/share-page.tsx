'use client';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';
import cn from 'clsx';

interface SharePageProps {
  title: string | null | undefined;
  slug: string | null | undefined;
  align?: 'center' | 'left' | 'right';
}

export function SharePage({ title, slug, align = 'right' }: SharePageProps) {
  const titleToShare = `Check out this amazing post: ${title}`;
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`;

  return (
    <ul className={cn('m-0 flex space-x-2 p-0', align === 'right' && 'items-end justify-end')}>
      <li>
        <FacebookShareButton url={shareUrl} quote={titleToShare} hashtag={'#myankle'}>
          <FacebookIcon size={32} borderRadius={100} />
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton url={shareUrl} title={titleToShare} hashtags={['#myankle']}>
          <TwitterIcon size={32} borderRadius={100} />
        </TwitterShareButton>
      </li>
      <li>
        <LinkedinShareButton url={shareUrl} title={titleToShare}>
          <LinkedinIcon size={32} borderRadius={100} />
        </LinkedinShareButton>
      </li>
    </ul>
  );
}

export default SharePage;
