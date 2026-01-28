import { Minus, Square, X, Film } from 'lucide-react'

function TitleBar({ projectName }) {
  return (
    <div className="h-10 bg-sf-dark-900 border-b border-sf-dark-700 flex items-center justify-between px-4 drag-region">
      {/* Left - Logo & Project Name */}
      <div className="flex items-center gap-3 no-drag">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-sf-accent" />
          <span className="font-semibold text-sf-text-primary">StoryFlow</span>
        </div>
        <span className="text-sf-text-muted">|</span>
        <span className="text-sf-text-secondary text-sm">{projectName}</span>
      </div>
      
      {/* Center - Could add transport controls here later */}
      <div className="flex-1" />
      
      {/* Right - Window Controls (Windows style) */}
      <div className="flex items-center no-drag">
        <button className="w-10 h-10 flex items-center justify-center hover:bg-sf-dark-700 transition-colors">
          <Minus className="w-4 h-4 text-sf-text-secondary" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-sf-dark-700 transition-colors">
          <Square className="w-3 h-3 text-sf-text-secondary" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors">
          <X className="w-4 h-4 text-sf-text-secondary" />
        </button>
      </div>
    </div>
  )
}

export default TitleBar
