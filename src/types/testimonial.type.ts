import { RichTextField, KeyTextField, ImageField } from '@prismicio/client';

export type Testimonial = {
  body?: RichTextField;
  name: KeyTextField | string;
  image?: ImageField;
  position: KeyTextField | string;
};
