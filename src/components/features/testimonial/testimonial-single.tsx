import { Container } from '@/components/ui/container';
import { type TestimonialType } from '@/types';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

export function TestimonialSingle({ body, name, position, image }: TestimonialType) {
  return (
    <section>
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
              <figure className="mx-auto flex max-w-xl flex-col gap-16 max-lg:text-center">
                <div className="relative text-3xl tracking-tight text-white before:-translate-x-full lg:text-4xl">
                  <PrismicRichText field={body} />
                </div>

                <figcaption className="mt-auto">
                  <p className="text-sm/6 font-medium text-white">{name}</p>
                  <p className="text-sm/6 font-medium">
                    <span className="bg-gradient-to-r from-[#5686cd] from-[28%] via-[#56bfcd] via-[70%] to-[#76cbd6] bg-clip-text text-transparent">
                      {position}
                    </span>
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
