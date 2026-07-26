const SUGGESTIONS = [
  { emoji: "\uD83D\uDCDA", text: "Which course should I start with?" },
  { emoji: "\uD83D\uDCBB", text: "Show all React courses" },
  { emoji: "\uD83C\uDF93", text: "How do I become an instructor?" },
  { emoji: "\uD83D\uDD10", text: "How do I reset my password?" },
  { emoji: "\uD83E\uDDD1\u200D\uD83D\uDCBB", text: "Recommend backend courses" },
  { emoji: "\uD83D\uDCB0", text: "What is the refund policy?" },
]

const SuggestedQuestions = ({ onSelect }) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <p className="text-xs font-medium text-richblack-300">Try asking:</p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(s.text)}
            className="rounded-xl border border-richblack-600 bg-richblack-700 px-3 py-2 text-xs text-richblack-100 transition-all duration-200 hover:border-yellow-50 hover:bg-richblack-600 hover:text-yellow-50"
          >
            {s.emoji} {s.text}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SuggestedQuestions
