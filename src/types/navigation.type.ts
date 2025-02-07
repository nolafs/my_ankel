import { type KeyTextField, type LinkField } from '@prismicio/client';

export type Link = {
  label: KeyTextField | string;
  link: LinkField;
};

export interface NavigationProps {
  items: Link[];
}

export default NavigationProps;
