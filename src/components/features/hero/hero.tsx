import { Container } from '@/components/ui/container';
import { Gradient } from '@/components/ui/gradient';
import { ImageField, KeyTextField, LinkField } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

export interface HeroProps {
  heading: KeyTextField | string;
  subheading: KeyTextField | string;
  links?: LinkField[];
  image?: ImageField;
}

export function Hero({ heading, subheading, links, image }: HeroProps) {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      {image && (
        <div className="absolute inset-2 bottom-0 z-0 overflow-hidden rounded-4xl">
          <div
            className={'flex w-full flex-col items-center justify-start sm:items-center md:items-center lg:items-end'}>
            <PrismicNextImage field={image} className="block h-auto w-full object-contain sm:w-full lg:w-1/2" />
          </div>
        </div>
      )}
      <Container className="z-2 relative">
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-52">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            {heading}
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">{subheading}</p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            {links?.map((link, index) => (
              <PrismicNextLink
                field={link}
                key={index}
                className="hover:bg-primary-dark inline-block rounded-lg bg-primary px-6 py-3 text-lg font-medium text-white">
                {link.text}
              </PrismicNextLink>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
