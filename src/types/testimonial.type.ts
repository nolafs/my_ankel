import { RichTextField, KeyTextField, ImageField } from '@prismicio/client';

export type TestimonialType = {
  body?: RichTextField;
  name: KeyTextField | string;
  image?: ImageField;
  position: KeyTextField | string;
  stars?: number;
};
