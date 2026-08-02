require("dotenv").config();

module.exports = {
  huggingface: {
    apiKey: process.env.HF_API_KEY,
    llmModel: process.env.HF_LLM_MODEL || "Qwen/Qwen2.5-7B-Instruct",
    llmProvider: process.env.HF_LLM_PROVIDER || "featherless-ai",
    embeddingModel: process.env.HF_EMBEDDING_MODEL || "BAAI/bge-m3",
  },
  qdrant: {
    url: process.env.QDRANT_URL || "http://localhost:6333",
    apiKey: process.env.QDRANT_API_KEY, // required for Qdrant Cloud; undefined for local
    collectionName: process.env.QDRANT_COLLECTION || "studynotion",
    vectorSize: 1024, // bge-m3 outputs 1024-dim vectors
  },
  retrieval: {
    topK: 8,
    scoreThreshold: 0.3,
  },
};
