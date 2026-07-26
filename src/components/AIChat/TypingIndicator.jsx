const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-richblack-700 px-4 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-richblack-300 [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-richblack-300 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-richblack-300 [animation-delay:300ms]" />
      </div>
    </div>
  )
}

export default TypingIndicator
