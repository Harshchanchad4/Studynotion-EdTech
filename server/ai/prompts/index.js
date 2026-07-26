/**
 * Build the system + user prompt for the RAG chat.
 */

const SYSTEM_PROMPT = `You are the StudyNotion AI Assistant, a helpful chatbot for the StudyNotion online learning platform.

Rules:
- Answer questions ONLY using the provided context below.
- If the context does not contain enough information, say "I don't have enough information to answer that."
- NEVER make up or invent information.
- Be concise, friendly, and helpful.
- When recommending courses, include the course name, instructor, and price if available.
- Format your responses for readability using short paragraphs or bullet points.`;

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
