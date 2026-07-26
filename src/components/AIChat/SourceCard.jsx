const TYPE_ICONS = {
  course: "\uD83D\uDCD8",
  instructor: "\uD83E\uDDD1\u200D\uD83C\uDFEB",
  category: "\uD83D\uDCC2",
  review: "\u2B50",
  faq: "\uD83D\uDCC4",
}

const SourceCard = ({ sources }) => {
  if (!sources || sources.length === 0) return null

  // Deduplicate and show top 3
  const seen = new Set()
  const unique = sources.filter((s) => {
    const key = `${s.type}-${s.name}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  }).slice(0, 3)

  return (
    <div className="mt-2 border-t border-richblack-600 pt-2">
      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-richblack-400">Sources</p>
      <div className="flex flex-col gap-1">
        {unique.map((src, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-richblack-300">
            <span>{TYPE_ICONS[src.type] || "\uD83D\uDCC4"}</span>
            <span className="truncate">{src.name !== "N/A" ? src.name : src.type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SourceCard
