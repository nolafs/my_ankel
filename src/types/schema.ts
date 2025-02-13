import {
  WithContext,
  MedicalWebPage,
  ContactPage,
  Blog,
  BlogPosting,
  VideoObject,
  CollectionPage,
  MedicalScholarlyArticle,
} from 'schema-dts';
import { DownloadDocument, PostsDocument, VideoDocument } from '../../prismicio-types';

const JSONLD: WithContext<MedicalWebPage> = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://myankle.co.uk',
  },
  name: 'MyAnkle.co.uk – Trusted Resource for Ankle Health',
  url: 'https://myankle.co.uk',
  description:
    'MyAnkle.co.uk is a trusted, expert-led medical resource providing accurate information on ankle conditions, treatments, and research advancements. Created by leading orthopaedic specialists, it helps individuals make informed decisions about their ankle health.',
  about: {
    '@type': 'MedicalCondition',
    name: 'Ankle Health & Orthopaedics',
  },
  mainEntity: {
    '@type': 'MedicalSpecialty',
    name: 'Orthopedics',
  },
  publisher: {
    '@type': 'Organization',
    name: 'MyAnkle.co.uk',
    logo: {
      '@type': 'ImageObject',
      url: 'https://myankle.co.uk/share-img.png',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44 20 1234 5678',
      contactType: 'Clinical Support',
      areaServed: 'GB',
      availableLanguage: ['English'],
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://myankle.co.uk/search?q={search_term_string}',
    //queryInput: 'required name=search_term_string',
  },
};

export const CONTACTJSONLD: WithContext<ContactPage> = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://myankle.co.uk',
  },
  name: 'MyAnkle.co.uk – Trusted Resource for Ankle Health',
  url: 'https://myankle.co.uk',
  description:
    'MyAnkle.co.uk is a trusted, expert-led medical resource providing accurate information on ankle conditions, treatments, and research advancements. Created by leading orthopaedic specialists, it helps individuals make informed decisions about their ankle health.',
  about: {
    '@type': 'MedicalCondition',
    name: 'Ankle Health & Orthopaedics',
  },
  mainEntity: {
    '@type': 'Person',
    name: 'Mr. Andrew Goldberg OBE',
    jobTitle: 'Orthopaedic Surgeon',
    affiliation: {
      '@type': 'Organization',
      name: 'MyAnkle.co.uk',
    },
    url: 'https://myankle.co.uk/about-us',
    image: 'https://myankle.co.uk/share-img.png',
  },
  publisher: {
    '@type': 'Organization',
    name: 'MyAnkle.co.uk',
    logo: {
      '@type': 'ImageObject',
      url: 'https://myankle.co.uk/share-img.png',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://myankle.co.uk/search?q={search_term_string}',
    //queryInput: 'required name=search_term_string',
  },
};

export const BLOGJSONLD = (featurePosts: PostsDocument[]): WithContext<Blog> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://myankle.co.uk/blog',
    },
    name: 'MyAnkle.co.uk – Ankle Health Blog',
    url: 'https://myankle.co.uk/blog',
    description: 'Stay informed with expert insights, latest research, and treatment advancements on ankle health.',
    publisher: {
      '@type': 'Organization',
      name: 'MyAnkle.co.uk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://myankle.co.uk/share-img.png',
      },
    },
    blogPost: featurePosts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.data.title ?? '',
      url: `https://myankle.co.uk/blog/${post.uid}`,
      datePublished: post.data.publishing_date ?? '',
      dateModified: post.data.publishing_date ?? '',
      author: {
        '@type': 'Person',
        name: 'Mr. Andrew Goldberg OBE',
      },
      image: post.data.feature_image?.url ? [post.data.feature_image.url] : [],
      description: post.data.excerpt || '',
    })) as BlogPosting[],
  };
};

export const VIDEO_BLOG_JSONLD = (videoPosts: VideoDocument[]): WithContext<Blog> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://myankle.co.uk/videos',
    },
    name: 'MyAnkle.co.uk – Video Library',
    url: 'https://myankle.co.uk/videos',
    description:
      'Explore expert-led videos on ankle conditions, treatments, and recovery advice from leading orthopaedic specialists.',
    publisher: {
      '@type': 'Organization',
      name: 'MyAnkle.co.uk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://myankle.co.uk/share-img.png',
      },
    },
    hasPart: videoPosts.map(video => ({
      '@type': 'VideoObject',
      name: video.data.name ?? '',
      description: video.data.description || '',
      uploadDate: video.data.publishing_date ?? '',
      thumbnailUrl: video.data.poster?.url ?? '',
      contentUrl: video.data.video_url || '', // Ensure this is an actual video file or page URL
      embedUrl: video.data.video_url.url || '', // If it's an embedded video (YouTube/Vimeo)
      author: {
        '@type': 'Person',
        name: 'Mr. Andrew Goldberg OBE',
      },
      publisher: {
        '@type': 'Organization',
        name: 'MyAnkle.co.uk',
        logo: {
          '@type': 'ImageObject',
          url: 'https://myankle.co.uk/logo.png',
        },
      },
    })) as unknown as VideoObject[],
  };
};

export const DOWNLOADS_JSONLD = (downloads: DownloadDocument[]): WithContext<CollectionPage> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://myankle.co.uk/downloads',
    },
    name: 'MyAnkle.co.uk – Downloadable Guides & Resources',
    url: 'https://myankle.co.uk/downloads',
    description:
      'Access free, expert-written guides and brochures on ankle conditions, treatments, and recovery advice.',
    publisher: {
      '@type': 'Organization',
      name: 'MyAnkle.co.uk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://myankle.co.uk/logo.png',
      },
    },
    hasPart: downloads.map(doc => ({
      '@type': 'MedicalScholarlyArticle',
      name: doc.data.name ?? '',
      description: doc.data.description || '',
      url: doc.data.file || '', // The direct link to the PDF/Resource file
      datePublished: doc.data.publishing_date ?? '',
      author: {
        '@type': 'Person',
        name: 'Mr. Andrew Goldberg OBE',
      },
      publisher: {
        '@type': 'Organization',
        name: 'MyAnkle.co.uk',
        logo: {
          '@type': 'ImageObject',
          url: 'https://myankle.co.uk/logo.png',
        },
      },
    })) as unknown as MedicalScholarlyArticle[],
  };
};

export default JSONLD;
