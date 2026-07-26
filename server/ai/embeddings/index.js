const { HfInference } = require("@huggingface/inference");
const config = require("../config");

const hf = new HfInference(config.huggingface.apiKey);

/**
 * Generate embedding for a single text string.
 * Uses BAAI/bge-m3 via Hugging Face Inference API.
 */
async function embedText(text) {
  const result = await hf.featureExtraction({
    model: config.huggingface.embeddingModel,
    provider: "hf-inference",
    inputs: text,
  });
  // HF returns nested arrays for some models; flatten to 1D
  const vector = Array.isArray(result[0]) ? result[0] : result;
  return Array.from(vector);
}

/**
 * Generate embeddings for multiple texts.
 */
async function embedTexts(texts) {
  const embeddings = [];
  for (const text of texts) {
    embeddings.push(await embedText(text));
  }
  return embeddings;
}

module.exports = { embedText, embedTexts };
