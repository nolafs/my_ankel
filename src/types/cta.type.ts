import { RichTextField, LinkField, KeyTextField, ImageField } from '@prismicio/client';

export type Cta = {
  label?: KeyTextField | string;
  heading: KeyTextField | string;
  body?: RichTextField;
  links: LinkField[];
  image?: ImageField;
};
