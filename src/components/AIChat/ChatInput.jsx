import { useRef, useEffect } from "react"

const ChatInput = ({ value, onChange, onSend, disabled }) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + "px"
    }
  }, [value])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="border-t border-richblack-600 bg-richblack-700 p-3">
      <div className="flex items-end gap-2 rounded-xl bg-richblack-800 px-3 py-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about StudyNotion..."
          disabled={disabled}
          rows={1}
          className="max-h-[100px] flex-1 resize-none bg-transparent text-sm text-richblack-5 placeholder-richblack-400 outline-none disabled:opacity-50"
        />
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-richblack-900 transition-all duration-200 hover:bg-yellow-100 disabled:opacity-40 disabled:hover:bg-yellow-50"
          aria-label="Send message"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ChatInput
