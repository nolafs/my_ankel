import axios from 'axios';
import https from 'https';
import * as fs from 'node:fs';

const fetchPosts = async () => {
  try {
    const response = await axios.get('https://myankle.co.uk/wp-json/wp/v2/posts?per_page=100', {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

const posts = await fetchPosts();

posts.forEach(async (post: any) => {
  const { slug } = post;

  const redirect = `/${slug}/ /blog/${slug} 301!\n`;

  // Append redirect to file
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  fs.appendFileSync('./migration/_redirects', redirect, (err: any) => {
    if (err) {
      console.error('Error writing to file:', err);
    }
  });
});
