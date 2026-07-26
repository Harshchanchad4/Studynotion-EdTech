import { useState } from "react"
import ChatWindow from "./ChatWindow"

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-yellow-50 shadow-lg shadow-yellow-50/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-yellow-50/30"
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
      >
        {isOpen ? (
          <svg className="h-6 w-6 text-richblack-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6 text-richblack-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default ChatWidget
