import type {KeyTextField, RichTextField} from '@prismicio/client';

export type FAQ = {
  id: string;
  data: {
    heading: KeyTextField | null | undefined;
    body: RichTextField | null | undefined;
  };
}
