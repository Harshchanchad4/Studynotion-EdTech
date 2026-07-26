import MessageBubble from "./MessageBubble"
import TypingIndicator from "./TypingIndicator"

const ChatMessages = ({ messages, loading }) => {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} />
      ))}
      {loading && <TypingIndicator />}
    </div>
  )
}

export default ChatMessages
