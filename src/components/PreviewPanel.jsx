import { Play, Pause, SkipBack, SkipForward, Maximize2, Volume2 } from 'lucide-react'
import { useState } from 'react'

function PreviewPanel() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime] = useState('00:12')
  const [totalTime] = useState('00:45')

  return (
    <div className="flex-1 bg-sf-dark-950 flex flex-col">
      {/* Preview Header */}
      <div className="h-8 bg-sf-dark-900 border-b border-sf-dark-700 flex items-center justify-between px-3">
        <span className="text-xs text-sf-text-secondary">Preview - Shot 2.1</span>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-sf-dark-700 rounded transition-colors">
            <Maximize2 className="w-4 h-4 text-sf-text-muted" />
          </button>
        </div>
      </div>
      
      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl aspect-video bg-sf-dark-800 rounded-lg border border-sf-dark-600 overflow-hidden">
          {/* Placeholder Image/Frame */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-sf-text-muted">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-sm">Shot 2.1 - Hero Moment</p>
            <p className="text-xs mt-1 text-sf-text-muted">
              "Wide shot, runner on mountain trail, sunrise, epic"
            </p>
            <button className="mt-4 px-4 py-2 bg-sf-accent hover:bg-sf-accent-hover rounded-lg text-sm font-medium text-white transition-colors">
              Generate Frame
            </button>
          </div>
          
          {/* Aspect Ratio Indicator */}
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-sf-dark-900/80 rounded text-xs text-sf-text-muted">
            16:9
          </div>
        </div>
      </div>
      
      {/* Transport Controls */}
      <div className="h-12 bg-sf-dark-900 border-t border-sf-dark-700 flex items-center justify-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-sf-dark-700 rounded transition-colors">
            <SkipBack className="w-4 h-4 text-sf-text-secondary" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-sf-accent hover:bg-sf-accent-hover rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
          </button>
          <button className="p-2 hover:bg-sf-dark-700 rounded transition-colors">
            <SkipForward className="w-4 h-4 text-sf-text-secondary" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-sf-text-secondary">
          <span className="font-mono">{currentTime}</span>
          <span className="text-sf-text-muted">/</span>
          <span className="font-mono text-sf-text-muted">{totalTime}</span>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <Volume2 className="w-4 h-4 text-sf-text-muted" />
          <div className="w-20 h-1 bg-sf-dark-600 rounded-full">
            <div className="w-3/4 h-full bg-sf-text-muted rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewPanel
