import { BentoCard } from '@/components/features/resources/bentoCard';
import { Container } from '@/components/ui/container';
import { Heading, Subheading } from '@/components/ui/text';
import { PostsDocument } from '../../../../prismicio-types';
import { asText, KeyTextField, Repeatable, RichTextField, LinkField } from '@prismicio/client';

interface BentoSectionProps {
  dark?: boolean;
  heading: KeyTextField | string;
  body: RichTextField | string;
  links: Repeatable<LinkField>;
  subheading: KeyTextField | string;
  listings: PostsDocument<string>[];
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

function BentoItemWhite({ listing, idx }: { listing: PostsDocument<string>; idx: number }) {
  const graphicClass = [
    'h-80 bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat',
    'absolute inset-0 bg-[size:1100px_650px] bg-[left_-38px_top_-73px] bg-no-repeat',
    'flex size-full pl-10 pt-10',
    'flex size-full pl-10 pt-10',
    'flex size-full pl-10 pt-10',
  ];

  const cardClass = [
    'max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl',
    'lg:col-span-3 lg:rounded-tr-4xl',
    'lg:col-span-2 lg:rounded-bl-4xl',
    'lg:col-span-2',
    'max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl',
  ];

  return (
    <BentoCard
      eyebrow={getCategoryName(listing)}
      title={listing?.data.title}
      description={getDescription(listing)}
      graphic={
        <div style={{ backgroundImage: `url(${listing?.data.feature_image.url})` }} className={graphicClass[idx]} />
      }
      fade={['bottom']}
      className={cardClass[idx]}
    />
  );
}

function BentoItemDark({ listing, idx }: { listing: PostsDocument<string>; idx: number }) {
  const graphicClass = [
    'h-80 bg-[size:851px_344px] bg-no-repeat',
    'h-80 bg-[size:851px_344px] bg-no-repeat',
    'h-80 bg-[size:851px_344px] bg-no-repeat',
    'h-80 bg-[size:851px_344px] bg-no-repeat',
  ];

  const cardClass = [
    'max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl',
    'z-10 !overflow-visible lg:col-span-2 lg:rounded-tr-4xl',
    'lg:col-span-2 lg:rounded-bl-4xl',
    'max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"',
  ];

  return (
    <BentoCard
      dark
      eyebrow={getCategoryName(listing)}
      title={listing?.data.title}
      description={getDescription(listing)}
      graphic={
        <div style={{ backgroundImage: `url(${listing?.data.feature_image.url})` }} className={graphicClass[idx]} />
      }
      fade={['top']}
      className={cardClass[idx]}
    />
  );
}

export function BentoSection({ dark, heading, subheading, listings }: BentoSectionProps) {
  if (listings.length < 4) {
    return null;
  }

  if (dark) {
    return (
      <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32">
        <Container>
          <Subheading dark>{subheading}</Subheading>
          <Heading as="h3" dark className="mt-2 max-w-3xl">
            {heading}
          </Heading>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            {listings.length > 1 &&
              listings.map((listing, idx) => <BentoItemDark key={`bento-${listing.id}`} listing={listing} idx={idx} />)}
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
          {listings.length > 1 &&
            listings.map((listing, idx) => <BentoItemWhite key={`bento-${listing.id}`} listing={listing} idx={idx} />)}
        </div>
      </Container>
    );
  }
}
