import { BentoCard } from '@/components/features/resources/bentoCard';
import { Container } from '@/components/ui/container';
import { Heading, Subheading } from '@/components/ui/text';
import { PostsDocument } from '../../../../prismicio-types';
import { asText } from '@prismicio/client';

interface BentoSectionProps {
  dark?: boolean;
  heading: string;
  subheading: string;
  listings: PostsDocument<string>[];
}

export function BentoSection({ dark, heading, subheading, listings }: BentoSectionProps) {
  if (listings.length < 4) {
    return null;
  }

  const getCategoryName = (listing: PostsDocument<string> | undefined) => {
    if (listing === undefined) {
      return null;
    }

    const category = listing?.data?.category;
    if (category && 'data' in category) {
      return (category.data as { name?: string })?.name;
    }
    return undefined;
  };

  const getDescription = (listing: PostsDocument<string> | undefined) => {
    if (listing === undefined) {
      return null;
    }

    const excerpt = asText(listing?.data?.excerpt ?? '');
    return excerpt.slice(0, 150) + (excerpt.length > 150 ? '...' : '');
  };

  if (dark) {
    return (
      <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32">
        <Container>
          <Subheading dark>{subheading}</Subheading>
          <Heading as="h3" dark className="mt-2 max-w-3xl">
            {heading}
          </Heading>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <BentoCard
              dark
              eyebrow={getCategoryName(listings[0])}
              title={listings[0]?.data.title}
              description={getDescription(listings[0])}
              graphic={
                <div
                  style={{ backgroundImage: `url(${listings[0]?.data.feature_image.url})` }}
                  className={`h-80 bg-[size:851px_344px] bg-no-repeat`}
                />
              }
              fade={['top']}
              className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
            />
            <BentoCard
              dark
              eyebrow={getCategoryName(listings[1])}
              title={listings[1]?.data.title}
              description={getDescription(listings[1])}
              graphic={
                <div
                  style={{ backgroundImage: `url(${listings[1]?.data.feature_image.url})` }}
                  className="h-80 bg-[size:851px_344px] bg-no-repeat"
                />
              }
              // `!overflow-visible` is needed to work around a Chrome bug that disables the mask on the graphic.
              className="z-10 !overflow-visible lg:col-span-2 lg:rounded-tr-4xl"
            />
            <BentoCard
              dark
              eyebrow={getCategoryName(listings[2])}
              title={listings[2]?.data.title}
              description={getDescription(listings[2])}
              graphic={
                <div
                  style={{ backgroundImage: `url(${listings[2]?.data.feature_image.url})` }}
                  className="h-80 bg-[size:851px_344px] bg-no-repeat"
                />
              }
              className="lg:col-span-2 lg:rounded-bl-4xl"
            />
            <BentoCard
              dark
              eyebrow={getCategoryName(listings[3])}
              title={listings[3]?.data.title}
              description={getDescription(listings[3])}
              graphic={
                <div
                  style={{ backgroundImage: `url(${listings[1]?.data.feature_image.url})` }}
                  className="h-80 bg-[size:851px_344px] bg-no-repeat"
                />
              }
              fade={['top']}
              className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
            />
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <Container className={'pt-32'}>
        <Subheading>{subheading}</Subheading>
        <Heading as="h3" className="mt-2 max-w-3xl">
          {heading}
        </Heading>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            eyebrow={getCategoryName(listings[0])}
            title={listings[0]?.data.title}
            description={getDescription(listings[0])}
            graphic={
              <div
                style={{ backgroundImage: `url(${listings[1]?.data.feature_image.url})` }}
                className="h-80 bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat"
              />
            }
            fade={['bottom']}
            className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
          />
          <BentoCard
            eyebrow={getCategoryName(listings[1])}
            title={listings[1]?.data.title}
            description={getDescription(listings[1])}
            graphic={
              <div
                style={{ backgroundImage: `url(${listings[1]?.data.feature_image.url})` }}
                className="absolute inset-0 bg-[size:1100px_650px] bg-[left_-38px_top_-73px] bg-no-repeat"
              />
            }
            fade={['bottom']}
            className="lg:col-span-3 lg:rounded-tr-4xl"
          />
          <BentoCard
            eyebrow={getCategoryName(listings[2])}
            title={listings[2]?.data.title}
            description={getDescription(listings[2])}
            graphic={
              <div
                style={{ backgroundImage: `url(${listings[2]?.data.feature_image.url})` }}
                className="h-80 bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat"
              />
            }
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            eyebrow={getCategoryName(listings[3])}
            title={listings[3]?.data.title}
            description={getDescription(listings[3])}
            graphic={
              <div
                style={{ backgroundImage: `url(${listings[3]?.data.feature_image.url})` }}
                className="h-80 bg-[size:1100px_650px] bg-[left_-38px_top_-73px] bg-no-repeat"
              />
            }
            className="lg:col-span-2"
          />
          <BentoCard
            eyebrow={getCategoryName(listings[4])}
            title={listings[4]?.data.title}
            description={getDescription(listings[4])}
            graphic={
              <div
                style={{ backgroundImage: `url(${listings[4]?.data.feature_image.url})` }}
                className="h-80 bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat"
              />
            }
            className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
          />
        </div>
      </Container>
    );
  }
}
