const { chat } = require("../ai/chat");
const { ingestAll } = require("../ai/ingestion");
const { ensureCollection, resetCollection, healthCheck } = require("../ai/vector");
const { sanitizeInput } = require("../ai/utils");

// POST /api/ai/chat
exports.chatHandler = async (req, res) => {
  try {
    const question = sanitizeInput(req.body.question);
    if (!question) {
      return res.status(400).json({ success: false, message: "Question is required" });
    }

    const result = await chat(question);
    return res.status(200).json({
      success: true,
      answer: result.answer,
      sources: result.sources,
    });
  } catch (error) {
    console.error("[AI Chat Error]", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to generate response",
      error: error.message,
    });
  }
};

// POST /api/ai/index
exports.indexHandler = async (req, res) => {
  try {
    await ensureCollection();
    const result = await ingestAll();
    return res.status(200).json({
      success: true,
      message: "Data indexed successfully",
      ...result,
    });
  } catch (error) {
    console.error("[AI Index Error]", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to index data",
      error: error.message,
    });
  }
};

// POST /api/ai/reindex
exports.reindexHandler = async (req, res) => {
  try {
    await resetCollection();
    const result = await ingestAll();
    return res.status(200).json({
      success: true,
      message: "Data re-indexed successfully",
      ...result,
    });
  } catch (error) {
    console.error("[AI Reindex Error]", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to re-index data",
      error: error.message,
    });
  }
};

// GET /api/ai/health
exports.healthHandler = async (req, res) => {
  try {
    const qdrantHealth = await healthCheck();
    return res.status(200).json({
      success: true,
      services: {
        server: "ok",
        qdrant: qdrantHealth.status,
        huggingface: process.env.HF_API_KEY ? "configured" : "missing API key",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Health check failed",
      error: error.message,
    });
  }
};
