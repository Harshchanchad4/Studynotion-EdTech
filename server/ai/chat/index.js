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

  // Step 3: Generate response via HF
  // Combine system + user into a single message for broader provider compatibility.
  // Truncate context to stay within token limits of free-tier models.
  const combinedPrompt = `${system}\n\n${user}`.slice(0, 3500);

  const response = await hf.chatCompletion({
    model: config.huggingface.llmModel,
    provider: config.huggingface.llmProvider,
    messages: [{ role: "user", content: combinedPrompt }],
    max_tokens: 512,
    temperature: 0.3,
  });

  const answer =
    response.choices?.[0]?.message?.content?.trim() ||
    "Sorry, I couldn't generate a response. Please try again.";

  // Step 4: Return answer with source metadata
  const sources = docs.map((d) => ({
    type: d.payload.type,
    name: d.payload.name || d.payload.courseName || "N/A",
    score: parseFloat(d.score.toFixed(3)),
  }));

  return { answer, sources };
}

module.exports = { chat };
