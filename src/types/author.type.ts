import { type ImageFieldImage, type LinkField, type RichTextField } from '@prismicio/client';

export type Author = {
  name?: string;
  description?: RichTextField;
  link?: LinkField;
  profile_image?: ImageFieldImage;
};
