'use client';
import { PostsDocumentData } from '../../../../prismicio-types';
import { Author } from '@/types';
import cn from 'clsx';
import { Link } from '@/components/ui/link';
import AuthorLink from '@/components/features/author/author-link';
import SharePage from '@/components/features/share-page/share-page';
import React from 'react';

type PostAsideProps = {
  as?: keyof JSX.IntrinsicElements;
  uid: string;
  post: PostsDocumentData;
  author?: Author;
  classNames?: string;
  [key: string]: any; // To accept additional props
};

export const PostAside = ({ as: Component = 'div', uid, post, author, classNames, ...props }: PostAsideProps) => {
  return (
    <Component className={cn('flex flex-wrap items-center gap-8 max-lg:justify-between', classNames)}>
      {post.category && (
        <div className="flex flex-col flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-500">Category:</span>
          <Link
            key="test"
            href={`/blog?category=${
              post.category &&
              'data' in post.category &&
              (
                post.category.data as {
                  uid: string;
                }
              ).uid
            }`}
            className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500">
            {post.category && 'data' in post.category && (post.category.data as { name: string }).name}
          </Link>
        </div>
      )}
      {author && (
        <div className="flex flex-col flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-500">Author:</span>
          <span className={'text-gray-700'}>
            <AuthorLink author={author} />
          </span>
        </div>
      )}

      {post.tags && (
        <div className="flex flex-wrap gap-2 md:flex-col">
          <span className="text-sm font-medium text-gray-500">Tags:</span>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((item, idx) => (
              <Link
                href={'/blog?tags=' + (item && 'tag' in item && (item.tag as { uid: string }).uid)}
                key={'tags-' + idx}
                className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium capitalize text-gray-500">
                {item && 'tag' in item && (item.tag as { data: { name: string } }).data.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div>
        <div className="mb-2 text-sm font-medium text-gray-500">Share:</div>
        <SharePage slug={uid} title={post.title} />
      </div>
    </Component>
  );
};

export default PostAside;
