import { useState } from 'react'
import { 
  Volume2, VolumeX, Lock, Unlock, Eye, EyeOff, 
  Plus, Trash2, Music, Mic, Video, Image,
  ChevronDown, Sparkles, GripVertical
} from 'lucide-react'

function Timeline({ onOpenAudioGenerate }) {
  const [currentPosition] = useState(25) // percentage
  const [selectedTrack, setSelectedTrack] = useState('V1')
  const [zoom, setZoom] = useState(100)
  
  // Track state
  const [tracks, setTracks] = useState([
    { 
      id: 'V1', 
      type: 'video', 
      name: 'Video 1', 
      muted: false, 
      locked: false, 
      visible: true,
      clips: [
        { id: '1.1', start: 0, duration: 8, color: 'bg-blue-600', label: '1.1', hasContent: true },
        { id: '1.2', start: 8, duration: 6, color: 'bg-blue-600', label: '1.2', hasContent: true },
        { id: '1.3', start: 14, duration: 5, color: 'bg-blue-600', label: '1.3', hasContent: false },
        { id: '2.1', start: 19, duration: 10, color: 'bg-green-600', label: '2.1', hasContent: true },
        { id: '2.2', start: 29, duration: 8, color: 'bg-green-600', label: '2.2', hasContent: true },
        { id: '2.3', start: 37, duration: 7, color: 'bg-green-600', label: '2.3', hasContent: false },
        { id: '3.1', start: 44, duration: 12, color: 'bg-purple-600', label: '3.1', hasContent: true },
        { id: '4.1', start: 56, duration: 10, color: 'bg-orange-600', label: '4.1', hasContent: false },
      ]
    },
    { 
      id: 'V2', 
      type: 'video', 
      name: 'Video 2', 
      muted: false, 
      locked: false, 
      visible: true,
      clips: []
    },
    { 
      id: 'A1', 
      type: 'audio', 
      subtype: 'music',
      name: 'Music', 
      muted: false, 
      locked: false, 
      visible: true,
      clips: [
        { id: 'music1', start: 0, duration: 66, color: 'bg-pink-600', label: 'epic_soundtrack.mp3', hasContent: true }
      ]
    },
    { 
      id: 'A2', 
      type: 'audio', 
      subtype: 'voiceover',
      name: 'Voiceover', 
      muted: false, 
      locked: false, 
      visible: true,
      clips: [
        { id: 'vo1', start: 5, duration: 12, color: 'bg-cyan-600', label: 'VO: "Every step..."', hasContent: true },
        { id: 'vo2', start: 30, duration: 15, color: 'bg-cyan-600', label: 'VO: "Push beyond..."', hasContent: true },
      ]
    },
    { 
      id: 'A3', 
      type: 'audio', 
      subtype: 'sfx',
      name: 'SFX', 
      muted: true, 
      locked: false, 
      visible: true,
      clips: [
        { id: 'sfx1', start: 19, duration: 3, color: 'bg-yellow-600', label: 'whoosh.wav', hasContent: true },
        { id: 'sfx2', start: 44, duration: 2, color: 'bg-yellow-600', label: 'impact.wav', hasContent: true },
      ]
    },
  ])

  const totalDuration = 66 // seconds
  
  const toggleTrackMute = (trackId) => {
    setTracks(tracks.map(t => 
      t.id === trackId ? { ...t, muted: !t.muted } : t
    ))
  }
  
  const toggleTrackLock = (trackId) => {
    setTracks(tracks.map(t => 
      t.id === trackId ? { ...t, locked: !t.locked } : t
    ))
  }
  
  const toggleTrackVisibility = (trackId) => {
    setTracks(tracks.map(t => 
      t.id === trackId ? { ...t, visible: !t.visible } : t
    ))
  }

  const addTrack = (type) => {
    const existingOfType = tracks.filter(t => t.type === type).length
    const newId = type === 'video' ? `V${existingOfType + 1}` : `A${tracks.filter(t => t.type === 'audio').length + 1}`
    const newTrack = {
      id: newId,
      type,
      subtype: type === 'audio' ? 'music' : undefined,
      name: type === 'video' ? `Video ${existingOfType + 1}` : `Audio ${tracks.filter(t => t.type === 'audio').length + 1}`,
      muted: false,
      locked: false,
      visible: true,
      clips: []
    }
    
    // Insert in correct position
    if (type === 'video') {
      const lastVideoIndex = tracks.findLastIndex(t => t.type === 'video')
      const newTracks = [...tracks]
      newTracks.splice(lastVideoIndex + 1, 0, newTrack)
      setTracks(newTracks)
    } else {
      setTracks([...tracks, newTrack])
    }
  }

  const getTrackIcon = (track) => {
    if (track.type === 'video') return <Video className="w-3 h-3" />
    if (track.subtype === 'music') return <Music className="w-3 h-3" />
    if (track.subtype === 'voiceover') return <Mic className="w-3 h-3" />
    return <Volume2 className="w-3 h-3" />
  }

  const videoTracks = tracks.filter(t => t.type === 'video')
  const audioTracks = tracks.filter(t => t.type === 'audio')

  return (
    <div className="h-full bg-sf-dark-900 border-t border-sf-dark-700 flex flex-col">
      {/* Timeline Header */}
      <div className="h-7 bg-sf-dark-800 border-b border-sf-dark-700 flex items-center px-3 gap-4">
        <span className="text-xs text-sf-text-secondary font-medium">Timeline</span>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => addTrack('video')}
            className="flex items-center gap-1 px-2 py-0.5 bg-sf-dark-700 hover:bg-sf-dark-600 rounded text-[10px] text-sf-text-secondary transition-colors"
          >
            <Plus className="w-3 h-3" />
            Video
          </button>
          <button 
            onClick={() => addTrack('audio')}
            className="flex items-center gap-1 px-2 py-0.5 bg-sf-dark-700 hover:bg-sf-dark-600 rounded text-[10px] text-sf-text-secondary transition-colors"
          >
            <Plus className="w-3 h-3" />
            Audio
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-sf-text-muted">
          <span>Duration: {totalDuration}s</span>
        </div>
        
        <div className="ml-auto flex items-center gap-2 text-xs">
          <span className="text-sf-text-muted">Zoom:</span>
          <input
            type="range"
            min="50"
            max="200"
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-20 h-1 bg-sf-dark-600 rounded-lg appearance-none cursor-pointer accent-sf-accent"
          />
          <span className="text-sf-text-muted w-8">{zoom}%</span>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Track Headers */}
        <div className="w-36 flex-shrink-0 border-r border-sf-dark-700 flex flex-col">
          {/* Time ruler header spacer */}
          <div className="h-5 border-b border-sf-dark-700 bg-sf-dark-800" />
          
          {/* Video Tracks */}
          {videoTracks.map((track) => (
            <div 
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`h-10 flex items-center px-2 gap-1 border-b border-sf-dark-700 cursor-pointer transition-colors ${
                selectedTrack === track.id ? 'bg-sf-dark-700' : 'hover:bg-sf-dark-800'
              }`}
            >
              <GripVertical className="w-3 h-3 text-sf-dark-500 cursor-grab" />
              <div className={`w-5 h-5 rounded flex items-center justify-center ${
                track.type === 'video' ? 'bg-blue-600/30 text-blue-400' : 'bg-pink-600/30 text-pink-400'
              }`}>
                {getTrackIcon(track)}
              </div>
              <span className="text-[11px] text-sf-text-primary flex-1 truncate">{track.name}</span>
              <div className="flex items-center gap-0.5">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleTrackVisibility(track.id) }}
                  className="p-0.5 hover:bg-sf-dark-600 rounded"
                >
                  {track.visible ? (
                    <Eye className="w-3 h-3 text-sf-text-muted" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-sf-text-muted opacity-50" />
                  )}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleTrackLock(track.id) }}
                  className="p-0.5 hover:bg-sf-dark-600 rounded"
                >
                  {track.locked ? (
                    <Lock className="w-3 h-3 text-sf-warning" />
                  ) : (
                    <Unlock className="w-3 h-3 text-sf-text-muted" />
                  )}
                </button>
              </div>
            </div>
          ))}
          
          {/* Audio Section Divider */}
          <div className="h-5 bg-sf-dark-800 border-b border-sf-dark-700 flex items-center px-2">
            <span className="text-[9px] text-sf-text-muted uppercase tracking-wider">Audio</span>
            <button 
              onClick={() => onOpenAudioGenerate && onOpenAudioGenerate('music')}
              className="ml-auto p-0.5 hover:bg-sf-dark-700 rounded" 
              title="Generate AI Audio"
            >
              <Sparkles className="w-3 h-3 text-sf-accent" />
            </button>
          </div>
          
          {/* Audio Tracks */}
          {audioTracks.map((track) => (
            <div 
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`h-8 flex items-center px-2 gap-1 border-b border-sf-dark-700 cursor-pointer transition-colors ${
                selectedTrack === track.id ? 'bg-sf-dark-700' : 'hover:bg-sf-dark-800'
              }`}
            >
              <GripVertical className="w-3 h-3 text-sf-dark-500 cursor-grab" />
              <div className={`w-5 h-5 rounded flex items-center justify-center ${
                track.subtype === 'music' ? 'bg-pink-600/30 text-pink-400' : 
                track.subtype === 'voiceover' ? 'bg-cyan-600/30 text-cyan-400' : 
                'bg-yellow-600/30 text-yellow-400'
              }`}>
                {getTrackIcon(track)}
              </div>
              <span className="text-[11px] text-sf-text-primary flex-1 truncate">{track.name}</span>
              <div className="flex items-center gap-0.5">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleTrackMute(track.id) }}
                  className="p-0.5 hover:bg-sf-dark-600 rounded"
                >
                  {track.muted ? (
                    <VolumeX className="w-3 h-3 text-sf-error" />
                  ) : (
                    <Volume2 className="w-3 h-3 text-sf-text-muted" />
                  )}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleTrackLock(track.id) }}
                  className="p-0.5 hover:bg-sf-dark-600 rounded"
                >
                  {track.locked ? (
                    <Lock className="w-3 h-3 text-sf-warning" />
                  ) : (
                    <Unlock className="w-3 h-3 text-sf-text-muted" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Track Content Area */}
        <div className="flex-1 flex flex-col overflow-x-auto relative">
          {/* Time Ruler */}
          <div className="h-5 bg-sf-dark-800 border-b border-sf-dark-700 flex items-end px-2 flex-shrink-0" style={{ minWidth: `${zoom * 8}px` }}>
            {Array.from({ length: Math.ceil(totalDuration / 5) + 1 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 text-[10px] text-sf-text-muted relative"
                style={{ width: `${(5 / totalDuration) * 100}%` }}
              >
                <span className="absolute bottom-0.5">{i * 5}s</span>
              </div>
            ))}
          </div>

          {/* Video Tracks Content */}
          {videoTracks.map((track) => (
            <div 
              key={track.id}
              className={`h-10 flex items-center border-b border-sf-dark-700 relative ${
                !track.visible ? 'opacity-40' : ''
              } ${track.locked ? 'pointer-events-none' : ''}`}
              style={{ minWidth: `${zoom * 8}px` }}
            >
              {track.clips.map((clip) => (
                <div
                  key={clip.id}
                  className={`absolute h-8 ${clip.color} rounded flex items-center justify-center cursor-pointer hover:brightness-110 transition-all group ${
                    !clip.hasContent ? 'opacity-60 border-2 border-dashed border-white/30' : ''
                  }`}
                  style={{ 
                    left: `${(clip.start / totalDuration) * 100}%`, 
                    width: `${(clip.duration / totalDuration) * 100}%`,
                    minWidth: '30px'
                  }}
                >
                  <span className="text-[10px] text-white font-medium drop-shadow truncate px-1">
                    {clip.label}
                  </span>
                  {!clip.hasContent && (
                    <Sparkles className="w-3 h-3 text-white/60 absolute right-1" />
                  )}
                  {/* Resize handles */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/30 opacity-0 group-hover:opacity-100 cursor-ew-resize rounded-l" />
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/30 opacity-0 group-hover:opacity-100 cursor-ew-resize rounded-r" />
                </div>
              ))}
              
              {/* Empty track hint */}
              {track.clips.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] text-sf-text-muted">Drag clips here or generate new frames</span>
                </div>
              )}
            </div>
          ))}
          
          {/* Audio Section Spacer */}
          <div className="h-5 bg-sf-dark-800 border-b border-sf-dark-700 flex-shrink-0" style={{ minWidth: `${zoom * 8}px` }} />
          
          {/* Audio Tracks Content */}
          {audioTracks.map((track) => (
            <div 
              key={track.id}
              className={`h-8 flex items-center border-b border-sf-dark-700 relative ${
                track.muted ? 'opacity-40' : ''
              } ${track.locked ? 'pointer-events-none' : ''}`}
              style={{ minWidth: `${zoom * 8}px` }}
            >
              {track.clips.map((clip) => (
                <div
                  key={clip.id}
                  className={`absolute h-6 ${clip.color} rounded flex items-center cursor-pointer hover:brightness-110 transition-all group overflow-hidden`}
                  style={{ 
                    left: `${(clip.start / totalDuration) * 100}%`, 
                    width: `${(clip.duration / totalDuration) * 100}%`,
                    minWidth: '20px'
                  }}
                >
                  {/* Fake waveform */}
                  <div className="absolute inset-0 flex items-center justify-around opacity-30">
                    {Array.from({ length: Math.max(Math.floor(clip.duration * 2), 4) }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-0.5 bg-white rounded-full"
                        style={{ height: `${Math.random() * 60 + 20}%` }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-white font-medium drop-shadow truncate px-1.5 relative z-10">
                    {clip.label}
                  </span>
                </div>
              ))}
              
              {/* Empty track hint */}
              {track.clips.length === 0 && (
                <button 
                  onClick={() => onOpenAudioGenerate && onOpenAudioGenerate(track.subtype || 'music')}
                  className="absolute inset-0 flex items-center justify-center hover:bg-sf-dark-800/50 transition-colors group"
                >
                  <span className="text-[10px] text-sf-text-muted group-hover:text-sf-accent transition-colors flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {track.subtype === 'voiceover' ? 'Generate voiceover with AI' : 'Drop audio or generate with AI'}
                  </span>
                </button>
              )}
            </div>
          ))}

          {/* Playhead - contained within track area */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 pointer-events-none"
            style={{ left: `${currentPosition}%` }}
          >
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-3 h-2 bg-red-500" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline
