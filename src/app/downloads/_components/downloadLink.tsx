'use client';
import { Download } from '@/lib/download';
import React from 'react';

interface DownloadLinkProps {
  href: string | undefined;
  children: React.ReactNode;
  className?: string;
}

export const DownloadLink = ({ href, className, children }: DownloadLinkProps): JSX.Element => {
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!href) return;
    Download(href);
  };

  return (
    <a href={href} download onClick={handleDownload} className={className}>
      {children}
    </a>
  );
};
