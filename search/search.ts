import {algoliasearch} from 'algoliasearch';

const client = algoliasearch('B19RFJNWLQ', '8c82a4e00f89a2a109188126ea19acc4');

// Fetch and index objects in Algolia
const processRecords = async () => {
  const datasetRequest = await fetch('https://dashboard.algolia.com/api/1/sample_datasets?type=movie');
  const movies = await datasetRequest.json();
  return await client.saveObjects({indexName: 'movies_index', objects: movies});
};

processRecords()
    .then(() => console.log('Successfully indexed objects!'))
    .catch((err) => console.error(err));
