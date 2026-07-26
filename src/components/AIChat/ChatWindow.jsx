import { useState, useRef, useEffect } from "react"
import ChatHeader from "./ChatHeader"
import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"
import SuggestedQuestions from "./SuggestedQuestions"

const BASE = import.meta.env.VITE_BASE_URL?.replace("/api/v1", "") || "http://localhost:4000"
const AI_CHAT_URL = `${BASE}/api/ai/chat`

const WELCOME_MESSAGE = {
  role: "ai",
  content: "Hello! I'm your StudyNotion AI Assistant. I can help you with courses, instructors, payments, and platform questions. Ask me anything!",
  sources: [],
}

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const sendMessage = async (text) => {
    const question = text.trim()
    if (!question || loading) return

    setShowSuggestions(false)
    const userMsg = { role: "user", content: question }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch(AI_CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      })
      const data = await res.json()

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: data.answer, sources: data.sources || [] },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: "Sorry, something went wrong. Please try again.", sources: [] },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Unable to reach the AI service. Please check if the server is running.", sources: [] },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionClick = (question) => {
    sendMessage(question)
  }

  return (
    <div className="flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-richblack-600 bg-richblack-800 shadow-2xl transition-all duration-300 sm:w-[400px]">
      <ChatHeader onClose={onClose} />

      <div className="flex flex-1 flex-col overflow-y-auto p-4 scrollbar-thin scrollbar-track-richblack-800 scrollbar-thumb-richblack-600">
        <ChatMessages messages={messages} loading={loading} />

        {showSuggestions && messages.length <= 1 && (
          <SuggestedQuestions onSelect={handleSuggestionClick} />
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={() => sendMessage(input)}
        disabled={loading}
      />
    </div>
  )
}

export default ChatWindow
