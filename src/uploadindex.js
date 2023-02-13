const algoliasearch = require("algoliasearch");
const dotenv = require("dotenv");
const data = require("./_site/search/index.json");

dotenv.config();

(async () => {
  try {

    console.log("Reading Settings...");
    const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
    const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
    const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

    console.log("Connecting to Angolia...");
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    console.log("Starting the Update...");

    const {objectIDs} = await index.replaceAllObjects(data, {
      autoGenerateObjectIDIfNotExist: true
    });

    console.log(`Update Complete: #/updated: ${objectIDs.length}`);
  } catch (e) {
    console.log(`Failed to update index: ${e.message}`)
  }
})();
