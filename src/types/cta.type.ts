import { RichTextField, LinkField, KeyTextField } from '@prismicio/client';

export type Cta = {
  label: KeyTextField | string;
  heading: string;
  body?: RichTextField;
  links: LinkField[];
};
