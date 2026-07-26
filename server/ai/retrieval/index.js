const { embedText } = require("../embeddings");
const { search } = require("../vector");
const config = require("../config");

/**
 * Retrieve the most relevant documents for a given query.
 * @param {string} query - user's question
 * @returns {Array<{id, score, payload}>} - top matching documents
 */
async function retrieve(query) {
  const vector = await embedText(query);
  const results = await search(
    vector,
    config.retrieval.topK,
    config.retrieval.scoreThreshold
  );
  return results;
}

module.exports = { retrieve };
