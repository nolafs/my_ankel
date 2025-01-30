import { MetadataRoute } from 'next';
import { createClient } from '@/prismicio';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  const posts = await client
    .getByType('posts', {
      pageSize: 100,
      page: 0,
      fetchLinks: ['author.name', 'author.profile_image', 'post_category.name', 'post_category.uid'],
      orderings: [
        {
          field: 'my.posts.published_date',
          direction: 'desc',
        },
      ],
    })
    .then(response => {
      return response.results;
    })
    .catch(() => []);

  const blogPosts = posts.map(post => {
    return {
      url: `https://${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.uid}`,
      lastModified: post.data.publishing_date?.toString() ?? new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  const main = [
    {
      url: `https://${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_BASE_URL}/about-us`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_BASE_URL}/resources`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  return [...main, ...blogPosts] as MetadataRoute.Sitemap;
}
