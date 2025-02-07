import { type Hit as AlgoliaHit } from 'instantsearch.js/es/types/results';
import { type BaseItem } from '@algolia/autocomplete-core';
export type HitProps = {
  hit: AlgoliaHit<{
    author: string;
    category: string;
    image: Record<string, unknown>;
    objectID: string;
    slug: string;
    tags: string[];
    text: string;
    title: string;
    type: string;
    __position: number;
    _highlightResult: {
      title: Record<string, unknown>;
      text: Record<string, unknown>;
    };
  }>;
};

export type HitBaseItem = BaseItem & {
  author: string;
  category: string;
  image: Record<string, unknown>;
  objectID: string;
  slug: string;
  tags: string[];
  text: string;
  title: string;
  type: string;
};
