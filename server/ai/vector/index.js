const { QdrantClient } = require("@qdrant/js-client-rest");
const config = require("../config");

const client = new QdrantClient({ url: config.qdrant.url });
const COLLECTION = config.qdrant.collectionName;

/**
 * Ensure the Qdrant collection exists with the correct vector config.
 */
async function ensureCollection() {
  const collections = await client.getCollections();
  const exists = collections.collections.some((c) => c.name === COLLECTION);

  if (!exists) {
    await client.createCollection(COLLECTION, {
      vectors: {
        size: config.qdrant.vectorSize,
        distance: "Cosine",
      },
    });
    console.log(`[Qdrant] Created collection: ${COLLECTION}`);
  }
  return true;
}

/**
 * Delete and recreate the collection (for reindex).
 */
async function resetCollection() {
  const collections = await client.getCollections();
  const exists = collections.collections.some((c) => c.name === COLLECTION);

  if (exists) {
    await client.deleteCollection(COLLECTION);
    console.log(`[Qdrant] Deleted collection: ${COLLECTION}`);
  }
  await ensureCollection();
}

/**
 * Upsert points into the collection.
 * @param {Array<{id: string, vector: number[], payload: object}>} points
 */
async function upsertPoints(points) {
  const BATCH_SIZE = 100;
  for (let i = 0; i < points.length; i += BATCH_SIZE) {
    const batch = points.slice(i, i + BATCH_SIZE);
    await client.upsert(COLLECTION, {
      wait: true,
      points: batch,
    });
  }
  return points.length;
}

/**
 * Search for similar vectors.
 * @param {number[]} vector - query vector
 * @param {number} limit - number of results
 * @param {number} scoreThreshold - minimum score
 * @returns {Array<{id, score, payload}>}
 */
async function search(vector, limit, scoreThreshold = 0.3) {
  const results = await client.search(COLLECTION, {
    vector,
    limit,
    score_threshold: scoreThreshold,
    with_payload: true,
  });
  return results;
}

/**
 * Check if Qdrant is reachable.
 */
async function healthCheck() {
  try {
    await client.getCollections();
    return { status: "ok" };
  } catch (err) {
    return { status: "error", message: err.message };
  }
}

module.exports = { ensureCollection, resetCollection, upsertPoints, search, healthCheck };
