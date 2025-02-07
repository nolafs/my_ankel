import { type RichTextField, type KeyTextField, type ImageField } from '@prismicio/client';

export type TestimonialType = {
  body?: RichTextField;
  name: KeyTextField | string;
  image?: ImageField;
  position: KeyTextField | string;
  stars?: number;
};
