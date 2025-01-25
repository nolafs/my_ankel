import * as prismic from "@prismicio/client";
import {algoliasearch} from 'algoliasearch';
import config from '../../../../slicemachine.config.json';
import {asText} from '@prismicio/richtext';

const repositoryName =
    process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT ?? config.repositoryName;

export async function POST() {
  // Check if Algolia credentials exist, return error if not
  if (
      !process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID ||
      !process.env.ALGOLIA_ADMIN_KEY
  ) {
    return new Response("Algolia credentials are not set", {
      status: 500,
    });
  }

  try {
    // Instantiate Prismic and Algolia clients
    const client = prismic.createClient(repositoryName);
    const algoliaClient = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
        process.env.ALGOLIA_ADMIN_KEY
    );

    // Get all articles from Prismic
    const articles = await client.getAllByType("posts", {
      fetchLinks: ["category.title", 'tags.tag'],
    });



    // Map articles to Algolia records
    const articleRecords = articles.map((post) => ({
      objectID: post.id, // Unique identifier in algolia
      title: post.data.title, // Post title
      slug: post.uid, // Post URL slug
      image: post.data.feature_image, // Post featured image
      //category: post.data.category.data, // Post category
      //tags: post.tags.data.map((v: { tag: { name: string } }) => v.tag.name), // Post tags
      text: asText(post.data.content).slice(0, 5000), // Post content transformed to search text
    }));

    console.log(articleRecords);

    // Index records to Algolia
    await algoliaClient.saveObjects({indexName: 'blog', objects: articleRecords});

    // Return success response if the process completes without any issue
    return new Response(
        "Content successfully synchronized with Algolia search",
        {
          status: 200,
        }
    );
  } catch (error) {
    // Log the error and return error response if any error occurs
    console.error(error);
    return new Response("An error occurred while synchronizing content", {
      status: 500,
    });
  }
}
