import { type LinkToMediaField } from '@prismicio/client';

export type LinkPrismicType = {
  link_type: string;
  url: string | undefined | null;
  target: string;
};

export type CustomLinkToMediaField = LinkToMediaField & {
  url: string;
};
