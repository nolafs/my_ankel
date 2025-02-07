import { Container } from '@/components/ui/container';
import { type Cta } from '@/types';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

export function CallToActionImage({ body, links, image }: Cta) {
  return (
    <div className="mx-2 my-24 rounded-4xl bg-gray-900 bg-[url(/dot-texture.svg)] pb-24 pt-72 lg:pt-36">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[384px_1fr_1fr]">
          <div className="-mt-96 lg:-mt-52">
            <div className="-m-2 rounded-4xl bg-white/15 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:max-w-xs">
              <div className="rounded-4xl p-2 shadow-md shadow-black/5">
                <div className="overflow-hidden rounded-3xl shadow-2xl outline outline-1 -outline-offset-1 outline-black/10">
                  <PrismicNextImage field={image} className="aspect-[3/4] w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex max-lg:mt-16 lg:col-span-2 lg:px-16">
            <div className="mx-auto flex max-w-xl flex-col gap-16 max-lg:text-center">
              <div className="relative text-3xl tracking-tight text-white before:-translate-x-full lg:text-4xl">
                <PrismicRichText field={body} />
              </div>

              <div className="mt-auto">
                {links && (
                  <div className="mx-auto mt-6 flex flex-col items-center justify-start space-x-2 md:flex-row">
                    {links?.map((link, index) => (
                      <PrismicNextLink
                        field={link}
                        key={index}
                        className="hover:bg-primary-dark inline-block rounded-lg bg-primary px-6 py-3 text-lg font-medium text-white">
                        {link.text}
                      </PrismicNextLink>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
