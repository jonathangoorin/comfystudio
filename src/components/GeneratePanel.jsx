import { Sparkles, RefreshCw, Upload, Wand2, Settings, Video, Music, Mic, Volume2, Clock } from 'lucide-react'
import { useState } from 'react'

function GeneratePanel() {
  // Sub-tab state
  const [activeSubTab, setActiveSubTab] = useState('video') // 'video' or 'audio'
  
  // Video generation state
  const [prompt, setPrompt] = useState('Wide shot, runner on mountain trail, sunrise, epic, cinematic lighting')
  const [selectedWorkflow, setSelectedWorkflow] = useState('txt2img-sd15')
  const [isGenerating, setIsGenerating] = useState(false)
  const [queueCount] = useState(0)

  // Audio generation state
  const [audioType, setAudioType] = useState('music') // 'music', 'voiceover', 'sfx'
  const [audioPrompt, setAudioPrompt] = useState('')
  const [audioDuration, setAudioDuration] = useState(30)
  const [voiceSettings, setVoiceSettings] = useState({
    voice: 'narrator-male',
    speed: 1.0,
    script: ''
  })
  const [musicSettings, setMusicSettings] = useState({
    genre: 'cinematic',
    mood: 'epic',
    tempo: 'medium'
  })

  const workflows = [
    { id: 'txt2img-sd15', name: 'Text to Image (SD 1.5)', description: 'Fast concept generation' },
    { id: 'txt2img-sdxl', name: 'Text to Image (SDXL)', description: 'Higher quality, slower' },
    { id: 'img2img', name: 'Image to Image', description: 'Refine existing images' },
    { id: 'txt2vid', name: 'Text to Video', description: 'Generate video clips' },
  ]

  const voices = [
    { id: 'narrator-male', name: 'Narrator (Male)', desc: 'Deep, authoritative' },
    { id: 'narrator-female', name: 'Narrator (Female)', desc: 'Warm, professional' },
    { id: 'commercial-male', name: 'Commercial (Male)', desc: 'Energetic, friendly' },
    { id: 'commercial-female', name: 'Commercial (Female)', desc: 'Bright, engaging' },
    { id: 'documentary', name: 'Documentary', desc: 'Calm, informative' },
  ]

  const genres = ['cinematic', 'electronic', 'orchestral', 'ambient', 'rock', 'jazz', 'corporate']
  const moods = ['epic', 'tense', 'uplifting', 'melancholic', 'energetic', 'calm', 'mysterious']
  const tempos = ['slow', 'medium', 'fast']

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  const audioTypes = [
    { id: 'music', label: 'Music', icon: Music },
    { id: 'voiceover', label: 'Voiceover', icon: Mic },
    { id: 'sfx', label: 'SFX', icon: Volume2 },
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Sub-tabs */}
      <div className="flex border-b border-sf-dark-700 px-4">
        <button
          onClick={() => setActiveSubTab('video')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeSubTab === 'video'
              ? 'border-sf-accent text-sf-text-primary'
              : 'border-transparent text-sf-text-muted hover:text-sf-text-secondary'
          }`}
        >
          <Video className="w-4 h-4" />
          <span className="text-sm font-medium">Image / Video</span>
        </button>
        <button
          onClick={() => setActiveSubTab('audio')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeSubTab === 'audio'
              ? 'border-sf-accent text-sf-text-primary'
              : 'border-transparent text-sf-text-muted hover:text-sf-text-secondary'
          }`}
        >
          <Music className="w-4 h-4" />
          <span className="text-sm font-medium">Audio</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeSubTab === 'video' ? (
          /* VIDEO GENERATION */
          <div className="h-full flex">
            {/* Prompt Section */}
            <div className="flex-1 p-4 border-r border-sf-dark-700">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-sf-text-primary">Prompt</label>
                <button className="text-xs text-sf-accent hover:text-sf-accent-hover transition-colors">
                  Load from shot
                </button>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-24 bg-sf-dark-800 border border-sf-dark-600 rounded-lg p-3 text-sm text-sf-text-primary placeholder-sf-text-muted resize-none focus:outline-none focus:border-sf-accent transition-colors"
                placeholder="Describe your shot..."
              />
              
              {/* Quick Style Tags */}
              <div className="mt-2 flex flex-wrap gap-1">
                {['cinematic', 'epic', 'moody', 'bright', 'minimal'].map(tag => (
                  <button
                    key={tag}
                    className="px-2 py-0.5 bg-sf-dark-700 hover:bg-sf-dark-600 rounded text-xs text-sf-text-secondary transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>

              {/* Reference Image */}
              <div className="mt-4">
                <label className="text-sm font-medium text-sf-text-primary mb-2 block">Reference Image (optional)</label>
                <div className="h-20 border-2 border-dashed border-sf-dark-600 rounded-lg flex items-center justify-center hover:border-sf-dark-500 transition-colors cursor-pointer">
                  <div className="text-center">
                    <Upload className="w-5 h-5 text-sf-text-muted mx-auto mb-1" />
                    <span className="text-xs text-sf-text-muted">Drop image or click</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow & Settings */}
            <div className="w-64 p-4 border-r border-sf-dark-700">
              <label className="text-sm font-medium text-sf-text-primary mb-2 block">Workflow</label>
              <select
                value={selectedWorkflow}
                onChange={(e) => setSelectedWorkflow(e.target.value)}
                className="w-full bg-sf-dark-800 border border-sf-dark-600 rounded-lg px-3 py-2 text-sm text-sf-text-primary focus:outline-none focus:border-sf-accent transition-colors"
              >
                {workflows.map(wf => (
                  <option key={wf.id} value={wf.id}>{wf.name}</option>
                ))}
              </select>
              <p className="text-xs text-sf-text-muted mt-1">
                {workflows.find(w => w.id === selectedWorkflow)?.description}
              </p>

              {/* Quick Settings */}
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-sf-text-secondary">Steps</span>
                    <span className="text-sf-text-muted">20</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    defaultValue="20"
                    className="w-full h-1 bg-sf-dark-600 rounded-lg appearance-none cursor-pointer accent-sf-accent"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-sf-text-secondary">CFG Scale</span>
                    <span className="text-sf-text-muted">7.0</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    defaultValue="7"
                    step="0.5"
                    className="w-full h-1 bg-sf-dark-600 rounded-lg appearance-none cursor-pointer accent-sf-accent"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-sf-text-secondary">Resolution</span>
                  </div>
                  <select className="w-full bg-sf-dark-800 border border-sf-dark-600 rounded px-2 py-1 text-xs text-sf-text-primary focus:outline-none focus:border-sf-accent">
                    <option>1920 x 1080 (16:9)</option>
                    <option>1280 x 720 (16:9)</option>
                    <option>1024 x 576 (16:9)</option>
                    <option>2048 x 858 (2.39:1 Scope)</option>
                  </select>
                </div>
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 text-xs text-sf-text-muted hover:text-sf-text-secondary transition-colors">
                <Settings className="w-3 h-3" />
                Advanced Settings
              </button>
            </div>

            {/* Generate Actions */}
            <div className="w-48 p-4 flex flex-col justify-center gap-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 bg-sf-accent hover:bg-sf-accent-hover disabled:bg-sf-dark-600 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-colors"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate
                  </>
                )}
              </button>
              
              <button className="w-full py-2 bg-sf-dark-700 hover:bg-sf-dark-600 rounded-lg text-sm text-sf-text-secondary flex items-center justify-center gap-2 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Variations (4)
              </button>
              
              <button className="w-full py-2 bg-sf-dark-700 hover:bg-sf-dark-600 rounded-lg text-sm text-sf-text-secondary flex items-center justify-center gap-2 transition-colors">
                <Wand2 className="w-4 h-4" />
                Enhance Prompt
              </button>

              {queueCount > 0 && (
                <div className="text-center text-xs text-sf-text-muted">
                  Queue: {queueCount} pending
                </div>
              )}

              {/* ComfyUI Status */}
              <div className="mt-auto pt-4 border-t border-sf-dark-700">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-sf-success rounded-full" />
                  <span className="text-sf-text-muted">ComfyUI Connected</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* AUDIO GENERATION */
          <div className="h-full flex">
            {/* Audio Type Selector */}
            <div className="w-48 border-r border-sf-dark-700 p-3">
              <label className="text-xs text-sf-text-muted uppercase tracking-wider mb-2 block">Type</label>
              <div className="space-y-1">
                {audioTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => setAudioType(type.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        audioType === type.id
                          ? 'bg-sf-accent text-white'
                          : 'bg-sf-dark-800 text-sf-text-secondary hover:bg-sf-dark-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Duration */}
              <div className="mt-6">
                <label className="text-xs text-sf-text-muted uppercase tracking-wider mb-2 block flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Duration
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="300"
                    value={audioDuration}
                    onChange={(e) => setAudioDuration(parseInt(e.target.value) || 1)}
                    className="w-full bg-sf-dark-800 border border-sf-dark-600 rounded px-2 py-1.5 text-sm text-sf-text-primary text-center focus:outline-none focus:border-sf-accent"
                  />
                  <span className="text-xs text-sf-text-muted">sec</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {[15, 30, 60].map(d => (
                    <button
                      key={d}
                      onClick={() => setAudioDuration(d)}
                      className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                        audioDuration === d 
                          ? 'bg-sf-accent text-white' 
                          : 'bg-sf-dark-700 text-sf-text-muted hover:bg-sf-dark-600'
                      }`}
                    >
                      {d}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Track */}
              <div className="mt-6">
                <label className="text-xs text-sf-text-muted uppercase tracking-wider mb-2 block">Target Track</label>
                <select className="w-full bg-sf-dark-800 border border-sf-dark-600 rounded px-2 py-1.5 text-xs text-sf-text-primary focus:outline-none focus:border-sf-accent">
                  <option>Music Track</option>
                  <option>Voiceover Track</option>
                  <option>SFX Track</option>
                  <option>New Audio Track</option>
                </select>
              </div>
            </div>

            {/* Audio-specific Settings */}
            <div className="flex-1 p-4 border-r border-sf-dark-700 overflow-y-auto">
              {audioType === 'music' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-sf-text-primary mb-2 block">Describe the music</label>
                    <textarea
                      value={audioPrompt}
                      onChange={(e) => setAudioPrompt(e.target.value)}
                      placeholder="Epic orchestral music building to a triumphant climax, with dramatic percussion and soaring strings..."
                      className="w-full h-28 bg-sf-dark-800 border border-sf-dark-600 rounded-lg p-3 text-sm text-sf-text-primary placeholder-sf-text-muted resize-none focus:outline-none focus:border-sf-accent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-sf-text-secondary mb-1">Genre</label>
                      <select 
                        value={musicSettings.genre}
                        onChange={(e) => setMusicSettings({ ...musicSettings, genre: e.target.value })}
                        className="w-full bg-sf-dark-800 border border-sf-dark-600 rounded px-3 py-2 text-sm text-sf-text-primary focus:outline-none focus:border-sf-accent capitalize"
                      >
                        {genres.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-sf-text-secondary mb-1">Mood</label>
                      <select 
                        value={musicSettings.mood}
                        onChange={(e) => setMusicSettings({ ...musicSettings, mood: e.target.value })}
                        className="w-full bg-sf-dark-800 border border-sf-dark-600 rounded px-3 py-2 text-sm text-sf-text-primary focus:outline-none focus:border-sf-accent capitalize"
                      >
                        {moods.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-sf-text-secondary mb-1">Tempo</label>
                      <select 
                        value={musicSettings.tempo}
                        onChange={(e) => setMusicSettings({ ...musicSettings, tempo: e.target.value })}
                        className="w-full bg-sf-dark-800 border border-sf-dark-600 rounded px-3 py-2 text-sm text-sf-text-primary focus:outline-none focus:border-sf-accent capitalize"
                      >
                        {tempos.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Quick Presets */}
                  <div>
                    <label className="text-xs text-sf-text-secondary mb-2 block">Quick Presets</label>
                    <div className="flex flex-wrap gap-2">
                      {['Epic Trailer', 'Corporate Upbeat', 'Emotional Piano', 'Tense Suspense', 'Uplifting Indie'].map(preset => (
                        <button
                          key={preset}
                          className="px-3 py-1 bg-sf-dark-700 hover:bg-sf-dark-600 rounded-full text-xs text-sf-text-secondary transition-colors"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {audioType === 'voiceover' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-sf-text-primary mb-2 block">Script</label>
                    <textarea
                      value={voiceSettings.script}
                      onChange={(e) => setVoiceSettings({ ...voiceSettings, script: e.target.value })}
                      placeholder="Enter the text you want spoken. Each paragraph will be a natural pause..."
                      className="w-full h-32 bg-sf-dark-800 border border-sf-dark-600 rounded-lg p-3 text-sm text-sf-text-primary placeholder-sf-text-muted resize-none focus:outline-none focus:border-sf-accent"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-sf-text-muted">
                        {voiceSettings.script.length} characters
                      </span>
                      <span className="text-xs text-sf-text-muted">
                        ~{Math.ceil(voiceSettings.script.split(' ').filter(w => w).length / 150)} min read
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-sf-text-secondary mb-1">Voice</label>
                      <select 
                        value={voiceSettings.voice}
                        onChange={(e) => setVoiceSettings({ ...voiceSettings, voice: e.target.value })}
                        className="w-full bg-sf-dark-800 border border-sf-dark-600 rounded px-3 py-2 text-sm text-sf-text-primary focus:outline-none focus:border-sf-accent"
                      >
                        {voices.map(v => (
                          <option key={v.id} value={v.id}>{v.name}</option>
                        ))}
                      </select>
                      <p className="text-xs text-sf-text-muted mt-1">
                        {voices.find(v => v.id === voiceSettings.voice)?.desc}
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs text-sf-text-secondary mb-1">Speed: {voiceSettings.speed}x</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={voiceSettings.speed}
                        onChange={(e) => setVoiceSettings({ ...voiceSettings, speed: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-sf-dark-600 rounded-lg appearance-none cursor-pointer accent-sf-accent mt-2"
                      />
                      <div className="flex justify-between text-[10px] text-sf-text-muted mt-1">
                        <span>Slower</span>
                        <span>Normal</span>
                        <span>Faster</span>
                      </div>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 text-xs text-sf-accent hover:text-sf-accent-hover transition-colors">
                    <Wand2 className="w-3 h-3" />
                    Generate script from shot descriptions
                  </button>
                </div>
              )}

              {audioType === 'sfx' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-sf-text-primary mb-2 block">Describe the sound effect</label>
                    <textarea
                      value={audioPrompt}
                      onChange={(e) => setAudioPrompt(e.target.value)}
                      placeholder="Dramatic whoosh transition, cinematic impact hit, footsteps on gravel..."
                      className="w-full h-28 bg-sf-dark-800 border border-sf-dark-600 rounded-lg p-3 text-sm text-sf-text-primary placeholder-sf-text-muted resize-none focus:outline-none focus:border-sf-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-sf-text-secondary mb-2 block">Quick Presets</label>
                    <div className="flex flex-wrap gap-2">
                      {['Whoosh', 'Impact', 'Transition', 'Ambient Room', 'Footsteps', 'Door Open/Close', 'UI Click', 'Explosion', 'Wind', 'Rain'].map(preset => (
                        <button
                          key={preset}
                          onClick={() => setAudioPrompt(preset.toLowerCase())}
                          className="px-3 py-1.5 bg-sf-dark-700 hover:bg-sf-dark-600 rounded-full text-xs text-sf-text-secondary transition-colors"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Generate Actions */}
            <div className="w-48 p-4 flex flex-col justify-center gap-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 bg-sf-accent hover:bg-sf-accent-hover disabled:bg-sf-dark-600 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-colors"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate {audioType === 'music' ? 'Music' : audioType === 'voiceover' ? 'Voice' : 'SFX'}
                  </>
                )}
              </button>
              
              <button className="w-full py-2 bg-sf-dark-700 hover:bg-sf-dark-600 rounded-lg text-sm text-sf-text-secondary flex items-center justify-center gap-2 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Variations (3)
              </button>

              {audioType === 'music' && (
                <button className="w-full py-2 bg-sf-dark-700 hover:bg-sf-dark-600 rounded-lg text-sm text-sf-text-secondary flex items-center justify-center gap-2 transition-colors">
                  <Clock className="w-4 h-4" />
                  Match to Timeline
                </button>
              )}

              {/* Audio Workflow Status */}
              <div className="mt-auto pt-4 border-t border-sf-dark-700">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-sf-success rounded-full" />
                  <span className="text-sf-text-muted">Audio Workflow Ready</span>
                </div>
                <p className="text-[10px] text-sf-text-muted mt-1">
                  {audioType === 'music' && 'Using: MusicGen workflow'}
                  {audioType === 'voiceover' && 'Using: TTS workflow'}
                  {audioType === 'sfx' && 'Using: AudioLDM workflow'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GeneratePanel
