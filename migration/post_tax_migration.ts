process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import "dotenv/config";
import axios from "axios";
import * as prismic from "@prismicio/client";
import https from "https";
import {htmlAsRichText} from "@prismicio/migrate";

import {repositoryName} from "./../slicemachine.config.json";


// Prismic setup
const writeClient = prismic.createWriteClient(
    repositoryName,
    {
      writeToken: process.env.PRISMIC_WRITE_TOKEN!
    },
);

const migration = prismic.createMigration();

// fetch all documents from word-press API



const fetchPostsCategories = async () => {
  try {
    const response = await axios.get("https://myankle.co.uk/wp-json/wp/v2/categories", {
      httpsAgent: new https.Agent({rejectUnauthorized: false})
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

const fetchAllTags = async () => {
  let page = 1;
  const perPage = 100;
  let allTags: any[] = [];
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await axios.get(`https://myankle.co.uk/wp-json/wp/v2/tags?page=${page}&per_page=${perPage}`, {
        httpsAgent: new https.Agent({rejectUnauthorized: false})
      });
      const tags = response.data;
      allTags = allTags.concat(tags);
      hasMore = tags.length === perPage;
      page++;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  }
  return allTags;
};
const formatDate = (date?: string): string | undefined  => {
  return new Date(date ?? Date.now()).toISOString().split('T')[0];
};

console.log("Fetching posts from WordPress API...");


const categories = await fetchPostsCategories();
const tags = await fetchAllTags();
const categoriesList: any[] = [];
const tagsList: any[] = [];

//check for duplicate tags
const uniqueTags = tags.reduce((acc: any[], tag: any) => {
  if (!acc.some((t) => t.slug === tag.slug)) {
    acc.push(tag);
  }
  return acc;
}, []);
console.log("UNIQUE TAGS", uniqueTags.length)

categories.forEach(async (category: any) => {
  const {id, name, slug} = category;

  const doc = migration.createDocument({
    type: "post_category",
    lang: "en-gb",
    uid: slug,
    data: {
      name: name,
    },
  }, name);

  categoriesList.push({
    uid: slug,
    doc
  });
});

tags.forEach( (tag: any) => {
  const {name, slug} = tag;
  const doc = migration.createDocument({
    type: "post_tags",
    lang: "en-gb",
    uid: slug,
    data: {
      name: name,
    },
  }, name);

  tagsList.push({
    uid: slug,
    doc
  });
});


console.log("Migrating write documents...");


await writeClient.migrate(migration, {
  reporter: (event) => console.log(event),
});
