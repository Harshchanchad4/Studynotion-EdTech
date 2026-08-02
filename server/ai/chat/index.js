const { HfInference } = require("@huggingface/inference");
const config = require("../config");
const { retrieve } = require("../retrieval");
const { buildPrompt } = require("../prompts");

const hf = new HfInference(config.huggingface.apiKey);

/**
 * Handle a user chat query using RAG.
 * 1. Retrieve relevant docs from Qdrant
 * 2. Build prompt with context
 * 3. Generate response via HF LLM
 * @param {string} question
 * @returns {{ answer: string, sources: Array }}
 */
async function chat(question) {
  // Step 1: Retrieve relevant documents
  const docs = await retrieve(question);

  if (docs.length === 0) {
    return {
      answer:
        "I don't have enough information to answer that question. Could you try rephrasing or ask about our courses, categories, or instructors?",
      sources: [],
    };
  }

  // Step 2: Build prompt
  const { system, user } = buildPrompt(question, docs);

  // Step 3: Generate response via HF.
  // Combine instructions + context into a single user message. Some models (e.g. Gemma)
  // reject a separate "system" role, so this keeps us compatible across providers.
  // Cap only the retrieved context, and keep the budget generous so nothing key is cut.
  const MAX_CONTEXT_CHARS = 12000;
  const cappedUser =
    user.length > MAX_CONTEXT_CHARS ? user.slice(0, MAX_CONTEXT_CHARS) : user;
  const combinedPrompt = `${system}\n\n${cappedUser}`;

  const response = await hf.chatCompletion({
    model: config.huggingface.llmModel,
    provider: config.huggingface.llmProvider,
    messages: [{ role: "user", content: combinedPrompt }],
    max_tokens: 800,
    temperature: 0.2,
  });

  const answer =
    response.choices?.[0]?.message?.content?.trim() ||
    "Sorry, I couldn't generate a response. Please try again.";

  // Step 4: Return source metadata — drop "Unknown"/"N/A" and dedupe by type+name,
  // keeping the highest-scoring occurrence of each.
  const seen = new Map();
  for (const d of docs) {
    const name = d.payload.name || d.payload.courseName || "N/A";
    if (name === "N/A" || /unknown/i.test(name)) continue;
    const key = name.trim().toLowerCase();
    if (!seen.has(key) || d.score > seen.get(key).score) {
      seen.set(key, {
        type: d.payload.type,
        name,
        score: parseFloat(d.score.toFixed(3)),
      });
    }
  }
  const sources = Array.from(seen.values()).sort((a, b) => b.score - a.score);

  return { answer, sources };
}

module.exports = { chat };
