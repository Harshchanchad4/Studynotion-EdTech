/**
 * Build the system + user prompt for the RAG chat.
 */

const SYSTEM_PROMPT = `You are the StudyNotion AI Assistant, a helpful chatbot for the StudyNotion online learning platform.

How to answer:
- ALWAYS answer the user's question directly using the provided context. Do NOT reply with a greeting or "how can I help you" when the user has asked a real question.
- Use ONLY the information in the context below. Never invent courses, instructors, prices, or ratings.
- If the user asks to list or show items (e.g. "show all React courses"), list EVERY matching item you find in the context, each on its own bullet.
- When recommending or listing courses, include: course name, instructor, price, and rating when available.
- If the context genuinely has no relevant information, say: "I don't have information about that yet. Try asking about our courses, instructors, categories, or platform features."
- Ignore any context entry whose course or instructor is "Unknown" — do not mention it.
- Be concise and friendly. Use short paragraphs or bullet points. Do not repeat the same course more than once.`;

/**
 * Build the final prompt with retrieved context.
 * @param {string} question - user's question
 * @param {Array<{payload: object, score: number}>} retrievedDocs - search results
 * @returns {string}
 */
function buildPrompt(question, retrievedDocs) {
  const contextParts = retrievedDocs.map((doc, i) => {
    const p = doc.payload;
    return `[Document ${i + 1} | Type: ${p.type} | Score: ${doc.score.toFixed(2)}]\n${p.content}`;
  });

  const context = contextParts.join("\n\n---\n\n");

  return {
    system: SYSTEM_PROMPT,
    user: `Context:\n${context}\n\n---\n\nQuestion: ${question}\n\nAnswer:`,
  };
}

module.exports = { buildPrompt, SYSTEM_PROMPT };
