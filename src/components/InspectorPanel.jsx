import { useState } from 'react'
import { 
  Move, RotateCw, Maximize2, Clock, Layers, Volume2, 
  ChevronDown, ChevronRight, Sparkles, Image, Film,
  ArrowRightLeft, Zap, Eye, EyeOff, Lock, Unlock,
  RefreshCw, Trash2, Copy, Scissors
} from 'lucide-react'

function InspectorPanel({ selectedItem = { type: 'shot', id: '2.1' } }) {
  const [expandedSections, setExpandedSections] = useState(['transform', 'timing', 'effects'])
  
  // Mock data for selected shot
  const [shotData, setShotData] = useState({
    id: '2.1',
    name: 'Hero Moment - Wide Shot',
    scene: 'Hero Moment',
    prompt: 'Wide shot, runner on mountain trail, sunrise, epic, cinematic lighting',
    duration: 3.5,
    position: { x: 0, y: 0 },
    scale: 100,
    rotation: 0,
    opacity: 100,
    hasImage: true,
    transition: {
      in: 'cut',
      out: 'cut',
      duration: 0.5
    }
  })

  const [audioData, setAudioData] = useState({
    id: 'vo1',
    name: 'VO: "Every step..."',
    type: 'voiceover',
    duration: 12,
    volume: 85,
    fadeIn: 0.2,
    fadeOut: 0.5,
    pan: 0
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const transitions = ['Cut', 'Fade', 'Dissolve', 'Wipe Left', 'Wipe Right', 'Zoom', 'Slide']

  const renderSectionHeader = (id, title, icon) => {
    const Icon = icon
    const isExpanded = expandedSections.includes(id)
    return (
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center gap-2 px-3 py-2 bg-sf-dark-800 hover:bg-sf-dark-700 transition-colors"
      >
        {isExpanded ? (
          <ChevronDown className="w-3 h-3 text-sf-text-muted" />
        ) : (
          <ChevronRight className="w-3 h-3 text-sf-text-muted" />
        )}
        <Icon className="w-4 h-4 text-sf-text-muted" />
        <span className="text-xs font-medium text-sf-text-primary uppercase tracking-wider">{title}</span>
      </button>
    )
  }

  // Render Shot Inspector
  const renderShotInspector = () => (
    <>
      {/* Shot Info Header */}
      <div className="p-3 border-b border-sf-dark-700">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
            <Film className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={shotData.name}
              onChange={(e) => setShotData({ ...shotData, name: e.target.value })}
              className="w-full bg-transparent text-sm font-medium text-sf-text-primary focus:outline-none"
            />
            <p className="text-[10px] text-sf-text-muted">Scene: {shotData.scene}</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-sf-dark-700 rounded" title="Duplicate">
            <Copy className="w-3.5 h-3.5 text-sf-text-muted" />
          </button>
          <button className="p-1.5 hover:bg-sf-dark-700 rounded" title="Split">
            <Scissors className="w-3.5 h-3.5 text-sf-text-muted" />
          </button>
          <button className="p-1.5 hover:bg-sf-dark-700 rounded" title="Regenerate">
            <RefreshCw className="w-3.5 h-3.5 text-sf-text-muted" />
          </button>
          <div className="flex-1" />
          <button className="p-1.5 hover:bg-sf-dark-700 rounded text-sf-error" title="Delete">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Transform Section */}
      {renderSectionHeader('transform', 'Transform', Move)}
      {expandedSections.includes('transform') && (
        <div className="p-3 space-y-3 border-b border-sf-dark-700">
          {/* Position */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-sf-text-muted block mb-1">Position X</label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={shotData.position.x}
                  onChange={(e) => setShotData({ 
                    ...shotData, 
                    position: { ...shotData.position, x: parseFloat(e.target.value) } 
                  })}
                  className="w-full bg-sf-dark-700 border border-sf-dark-600 rounded px-2 py-1 text-xs text-sf-text-primary focus:outline-none focus:border-sf-accent"
                />
                <span className="ml-1 text-[10px] text-sf-text-muted">px</span>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-sf-text-muted block mb-1">Position Y</label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={shotData.position.y}
                  onChange={(e) => setShotData({ 
                    ...shotData, 
                    position: { ...shotData.position, y: parseFloat(e.target.value) } 
                  })}
                  className="w-full bg-sf-dark-700 border border-sf-dark-600 rounded px-2 py-1 text-xs text-sf-text-primary focus:outline-none focus:border-sf-accent"
                />
                <span className="ml-1 text-[10px] text-sf-text-muted">px</span>
              </div>
            </div>
          </div>

          {/* Scale */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-[10px] text-sf-text-muted flex items-center gap-1">
                <Maximize2 className="w-3 h-3" /> Scale
              </label>
              <span className="text-[10px] text-sf-text-secondary">{shotData.scale}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              value={shotData.scale}
              onChange={(e) => setShotData({ ...shotData, scale: parseInt(e.target.value) })}
              className="w-full h-1 bg-sf-dark-600 rounded-lg appearance-none cursor-pointer accent-sf-accent"
            />
          </div>

          {/* Rotation */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-[10px] text-sf-text-muted flex items-center gap-1">
                <RotateCw className="w-3 h-3" /> Rotation
              </label>
              <span className="text-[10px] text-sf-text-secondary">{shotData.rotation}°</span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              value={shotData.rotation}
              onChange={(e) => setShotData({ ...shotData, rotation: parseInt(e.target.value) })}
              className="w-full h-1 bg-sf-dark-600 rounded-lg appearance-none cursor-pointer accent-sf-accent"
            />
          </div>

          {/* Opacity */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-[10px] text-sf-text-muted flex items-center gap-1">
                <Eye className="w-3 h-3" /> Opacity
              </label>
              <span className="text-[10px] text-sf-text-secondary">{shotData.opacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={shotData.opacity}
              onChange={(e) => setShotData({ ...shotData, opacity: parseInt(e.target.value) })}
              className="w-full h-1 bg-sf-dark-600 rounded-lg appearance-none cursor-pointer accent-sf-accent"
            />
          </div>

          <button className="w-full text-[10px] text-sf-accent hover:text-sf-accent-hover transition-colors">
            Reset Transform
          </button>
        </div>
      )}

      {/* Timing Section */}
      {renderSectionHeader('timing', 'Timing', Clock)}
      {expandedSections.includes('timing') && (
        <div className="p-3 space-y-3 border-b border-sf-dark-700">
          <div>
            <label className="text-[10px] text-sf-text-muted block mb-1">Duration</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={shotData.duration}
                onChange={(e) => setShotData({ ...shotData, duration: parseFloat(e.target.value) })}
                className="flex-1 bg-sf-dark-700 border border-sf-dark-600 rounded px-2 py-1.5 text-sm text-sf-text-primary focus:outline-none focus:border-sf-accent"
              />
              <span className="text-xs text-sf-text-muted">seconds</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 5].map(d => (
              <button
                key={d}
                onClick={() => setShotData({ ...shotData, duration: d })}
                className={`py-1 rounded text-xs transition-colors ${
                  shotData.duration === d 
                    ? 'bg-sf-accent text-white' 
                    : 'bg-sf-dark-700 text-sf-text-secondary hover:bg-sf-dark-600'
                }`}
              >
                {d}s
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Transitions Section */}
      {renderSectionHeader('transitions', 'Transitions', ArrowRightLeft)}
      {expandedSections.includes('transitions') && (
        <div className="p-3 space-y-3 border-b border-sf-dark-700">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-sf-text-muted block mb-1">Transition In</label>
              <select
                value={shotData.transition.in}
                onChange={(e) => setShotData({ 
                  ...shotData, 
                  transition: { ...shotData.transition, in: e.target.value } 
                })}
                className="w-full bg-sf-dark-700 border border-sf-dark-600 rounded px-2 py-1.5 text-xs text-sf-text-primary focus:outline-none focus:border-sf-accent"
              >
                {transitions.map(t => (
                  <option key={t} value={t.toLowerCase()}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-sf-text-muted block mb-1">Transition Out</label>
              <select
                value={shotData.transition.out}
                onChange={(e) => setShotData({ 
                  ...shotData, 
                  transition: { ...shotData.transition, out: e.target.value } 
                })}
                className="w-full bg-sf-dark-700 border border-sf-dark-600 rounded px-2 py-1.5 text-xs text-sf-text-primary focus:outline-none focus:border-sf-accent"
              >
                {transitions.map(t => (
                  <option key={t} value={t.toLowerCase()}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-[10px] text-sf-text-muted">Transition Duration</label>
              <span className="text-[10px] text-sf-text-secondary">{shotData.transition.duration}s</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={shotData.transition.duration}
              onChange={(e) => setShotData({ 
                ...shotData, 
                transition: { ...shotData.transition, duration: parseFloat(e.target.value) } 
              })}
              className="w-full h-1 bg-sf-dark-600 rounded-lg appearance-none cursor-pointer accent-sf-accent"
            />
          </div>
        </div>
      )}

      {/* Effects Section */}
      {renderSectionHeader('effects', 'Effects', Zap)}
      {expandedSections.includes('effects') && (
        <div className="p-3 space-y-2 border-b border-sf-dark-700">
          <button className="w-full flex items-center justify-between px-3 py-2 bg-sf-dark-700 hover:bg-sf-dark-600 rounded text-xs text-sf-text-secondary transition-colors">
            <span>Ken Burns (Slow Zoom)</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <button className="w-full flex items-center justify-between px-3 py-2 bg-sf-dark-700 hover:bg-sf-dark-600 rounded text-xs text-sf-text-secondary transition-colors">
            <span>Camera Shake</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <button className="w-full flex items-center justify-between px-3 py-2 bg-sf-dark-700 hover:bg-sf-dark-600 rounded text-xs text-sf-text-secondary transition-colors">
            <span>Color Grade</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <button className="w-full py-2 border border-dashed border-sf-dark-600 rounded text-xs text-sf-text-muted hover:border-sf-dark-500 transition-colors">
            + Add Effect
          </button>
        </div>
      )}

      {/* AI Generation Section */}
      {renderSectionHeader('generation', 'AI Generation', Sparkles)}
      {expandedSections.includes('generation') && (
        <div className="p-3 space-y-3">
          <div>
            <label className="text-[10px] text-sf-text-muted block mb-1">Prompt</label>
            <textarea
              value={shotData.prompt}
              onChange={(e) => setShotData({ ...shotData, prompt: e.target.value })}
              className="w-full h-20 bg-sf-dark-700 border border-sf-dark-600 rounded p-2 text-xs text-sf-text-primary resize-none focus:outline-none focus:border-sf-accent"
            />
          </div>
          
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-sf-accent hover:bg-sf-accent-hover rounded text-xs text-white font-medium transition-colors flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              Regenerate
            </button>
            <button className="py-2 px-3 bg-sf-dark-700 hover:bg-sf-dark-600 rounded text-xs text-sf-text-secondary transition-colors">
              Variations
            </button>
          </div>
        </div>
      )}
    </>
  )

  // Render Audio Inspector
  const renderAudioInspector = () => (
    <>
      {/* Audio Info Header */}
      <div className="p-3 border-b border-sf-dark-700">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-cyan-600 rounded flex items-center justify-center">
            <Volume2 className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={audioData.name}
              onChange={(e) => setAudioData({ ...audioData, name: e.target.value })}
              className="w-full bg-transparent text-sm font-medium text-sf-text-primary focus:outline-none"
            />
            <p className="text-[10px] text-sf-text-muted capitalize">{audioData.type}</p>
          </div>
        </div>
      </div>

      {/* Volume & Pan */}
      <div className="p-3 space-y-3 border-b border-sf-dark-700">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-[10px] text-sf-text-muted">Volume</label>
            <span className="text-[10px] text-sf-text-secondary">{audioData.volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={audioData.volume}
            onChange={(e) => setAudioData({ ...audioData, volume: parseInt(e.target.value) })}
            className="w-full h-1 bg-sf-dark-600 rounded-lg appearance-none cursor-pointer accent-sf-accent"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-[10px] text-sf-text-muted">Pan</label>
            <span className="text-[10px] text-sf-text-secondary">
              {audioData.pan === 0 ? 'Center' : audioData.pan < 0 ? `L${Math.abs(audioData.pan)}` : `R${audioData.pan}`}
            </span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            value={audioData.pan}
            onChange={(e) => setAudioData({ ...audioData, pan: parseInt(e.target.value) })}
            className="w-full h-1 bg-sf-dark-600 rounded-lg appearance-none cursor-pointer accent-sf-accent"
          />
        </div>
      </div>

      {/* Fades */}
      <div className="p-3 space-y-3 border-b border-sf-dark-700">
        <h4 className="text-[10px] text-sf-text-muted uppercase tracking-wider">Fades</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-sf-text-muted block mb-1">Fade In</label>
            <div className="flex items-center">
              <input
                type="number"
                step="0.1"
                min="0"
                value={audioData.fadeIn}
                onChange={(e) => setAudioData({ ...audioData, fadeIn: parseFloat(e.target.value) })}
                className="w-full bg-sf-dark-700 border border-sf-dark-600 rounded px-2 py-1 text-xs text-sf-text-primary focus:outline-none focus:border-sf-accent"
              />
              <span className="ml-1 text-[10px] text-sf-text-muted">s</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-sf-text-muted block mb-1">Fade Out</label>
            <div className="flex items-center">
              <input
                type="number"
                step="0.1"
                min="0"
                value={audioData.fadeOut}
                onChange={(e) => setAudioData({ ...audioData, fadeOut: parseFloat(e.target.value) })}
                className="w-full bg-sf-dark-700 border border-sf-dark-600 rounded px-2 py-1 text-xs text-sf-text-primary focus:outline-none focus:border-sf-accent"
              />
              <span className="ml-1 text-[10px] text-sf-text-muted">s</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  // Empty state
  const renderEmptyState = () => (
    <div className="h-full flex flex-col items-center justify-center text-center p-4">
      <Layers className="w-10 h-10 text-sf-dark-600 mb-3" />
      <h3 className="text-sm font-medium text-sf-text-primary mb-1">No Selection</h3>
      <p className="text-xs text-sf-text-muted">
        Select a shot or audio clip to view and edit its properties
      </p>
    </div>
  )

  return (
    <div className="h-full bg-sf-dark-900 border-l border-sf-dark-700 flex flex-col">
      {/* Header */}
      <div className="h-8 bg-sf-dark-800 border-b border-sf-dark-700 flex items-center px-3">
        <span className="text-xs font-medium text-sf-text-secondary">Inspector</span>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedItem?.type === 'shot' && renderShotInspector()}
        {selectedItem?.type === 'audio' && renderAudioInspector()}
        {!selectedItem && renderEmptyState()}
      </div>
    </div>
  )
}

export default InspectorPanel
