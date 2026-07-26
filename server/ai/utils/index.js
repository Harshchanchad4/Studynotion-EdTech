/**
 * Utility helpers for the AI module.
 */

/**
 * Truncate text to a max length to stay within token limits.
 */
function truncate(text, maxLength = 1000) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

/**
 * Sanitize user input — strip dangerous characters.
 */
function sanitizeInput(text) {
  if (!text || typeof text !== "string") return "";
  return text.trim().slice(0, 500);
}

module.exports = { truncate, sanitizeInput };
