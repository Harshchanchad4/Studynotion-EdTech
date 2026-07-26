import SourceCard from "./SourceCard"

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-md bg-yellow-50 text-richblack-900"
            : "rounded-bl-md bg-richblack-700 text-richblack-25"
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>

        {!isUser && message.sources && message.sources.length > 0 && (
          <SourceCard sources={message.sources} />
        )}
      </div>
    </div>
  )
}

export default MessageBubble
