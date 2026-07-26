const ChatHeader = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between border-b border-richblack-600 bg-richblack-700 px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-50">
          <span className="text-sm font-bold text-richblack-900">AI</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-richblack-5">StudyNotion AI</h3>
          <p className="text-[10px] text-richblack-300">Ask me anything</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="rounded-lg p-1.5 text-richblack-300 transition-colors hover:bg-richblack-600 hover:text-richblack-5"
        aria-label="Close chat"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default ChatHeader
