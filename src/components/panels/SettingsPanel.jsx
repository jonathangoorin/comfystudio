import { Server, FolderOpen, Palette, Monitor, Save } from 'lucide-react'
import { useState } from 'react'

function SettingsPanel() {
  const [comfyUrl, setComfyUrl] = useState('http://127.0.0.1:8188')
  const [outputPath, setOutputPath] = useState('C:\\Users\\papa\\Documents\\StoryFlow\\outputs')
  const [workflowPath, setWorkflowPath] = useState('C:\\Users\\papa\\Documents\\ComfyUI_windows_portable\\workflow_API')
  const [theme, setTheme] = useState('dark')
  const [autoSave, setAutoSave] = useState(true)

  return (
    <div className="h-full p-4 overflow-y-auto">
      <div className="max-w-2xl">
        <h3 className="text-lg font-medium text-sf-text-primary mb-6">Settings</h3>
        
        {/* ComfyUI Connection */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Server className="w-4 h-4 text-sf-text-muted" />
            <h4 className="text-sm font-medium text-sf-text-primary">ComfyUI Connection</h4>
          </div>
          <div className="bg-sf-dark-800 border border-sf-dark-600 rounded-lg p-4">
            <label className="block text-xs text-sf-text-secondary mb-1">Server URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={comfyUrl}
                onChange={(e) => setComfyUrl(e.target.value)}
                className="flex-1 bg-sf-dark-700 border border-sf-dark-600 rounded px-3 py-2 text-sm text-sf-text-primary focus:outline-none focus:border-sf-accent"
              />
              <button className="px-4 py-2 bg-sf-dark-700 hover:bg-sf-dark-600 rounded text-sm text-sf-text-secondary transition-colors">
                Test
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-sf-success rounded-full" />
              <span className="text-xs text-sf-text-muted">Connected</span>
            </div>
          </div>
        </div>
        
        {/* File Paths */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FolderOpen className="w-4 h-4 text-sf-text-muted" />
            <h4 className="text-sm font-medium text-sf-text-primary">File Paths</h4>
          </div>
          <div className="bg-sf-dark-800 border border-sf-dark-600 rounded-lg p-4 space-y-4">
            <div>
              <label className="block text-xs text-sf-text-secondary mb-1">Output Directory</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={outputPath}
                  onChange={(e) => setOutputPath(e.target.value)}
                  className="flex-1 bg-sf-dark-700 border border-sf-dark-600 rounded px-3 py-2 text-sm text-sf-text-primary focus:outline-none focus:border-sf-accent"
                />
                <button className="px-4 py-2 bg-sf-dark-700 hover:bg-sf-dark-600 rounded text-sm text-sf-text-secondary transition-colors">
                  Browse
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-sf-text-secondary mb-1">Workflows Directory</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={workflowPath}
                  onChange={(e) => setWorkflowPath(e.target.value)}
                  className="flex-1 bg-sf-dark-700 border border-sf-dark-600 rounded px-3 py-2 text-sm text-sf-text-primary focus:outline-none focus:border-sf-accent"
                />
                <button className="px-4 py-2 bg-sf-dark-700 hover:bg-sf-dark-600 rounded text-sm text-sf-text-secondary transition-colors">
                  Browse
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Appearance */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-sf-text-muted" />
            <h4 className="text-sm font-medium text-sf-text-primary">Appearance</h4>
          </div>
          <div className="bg-sf-dark-800 border border-sf-dark-600 rounded-lg p-4">
            <label className="block text-xs text-sf-text-secondary mb-1">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-48 bg-sf-dark-700 border border-sf-dark-600 rounded px-3 py-2 text-sm text-sf-text-primary focus:outline-none focus:border-sf-accent"
            >
              <option value="dark">Dark (Default)</option>
              <option value="darker">Darker</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
        
        {/* Project Settings */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Monitor className="w-4 h-4 text-sf-text-muted" />
            <h4 className="text-sm font-medium text-sf-text-primary">Project Defaults</h4>
          </div>
          <div className="bg-sf-dark-800 border border-sf-dark-600 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm text-sf-text-primary">Auto-save Projects</label>
                <p className="text-xs text-sf-text-muted">Automatically save every 5 minutes</p>
              </div>
              <button
                onClick={() => setAutoSave(!autoSave)}
                className={`w-10 h-5 rounded-full transition-colors ${autoSave ? 'bg-sf-accent' : 'bg-sf-dark-600'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${autoSave ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div>
              <label className="block text-xs text-sf-text-secondary mb-1">Default Resolution</label>
              <select className="w-48 bg-sf-dark-700 border border-sf-dark-600 rounded px-3 py-2 text-sm text-sf-text-primary focus:outline-none focus:border-sf-accent">
                <option>1920 x 1080 (16:9)</option>
                <option>1280 x 720 (16:9)</option>
                <option>2048 x 858 (2.39:1)</option>
                <option>1080 x 1920 (9:16 Vertical)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-sf-text-secondary mb-1">Default Frame Rate</label>
              <select className="w-48 bg-sf-dark-700 border border-sf-dark-600 rounded px-3 py-2 text-sm text-sf-text-primary focus:outline-none focus:border-sf-accent">
                <option>24 fps (Film)</option>
                <option>25 fps (PAL)</option>
                <option>30 fps (NTSC)</option>
                <option>60 fps</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <button className="flex items-center gap-2 px-6 py-2 bg-sf-accent hover:bg-sf-accent-hover rounded-lg text-sm text-white transition-colors">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  )
}

export default SettingsPanel
