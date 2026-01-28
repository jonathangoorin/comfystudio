import { Download, Check, RefreshCw, HardDrive, Cloud, ExternalLink, ChevronRight, AlertCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'

function WorkflowsPanel() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)
  const [downloading, setDownloading] = useState(null)
  const [filter, setFilter] = useState('all') // 'all', 'installed', 'available'

  // Mock workflow data - in reality this would come from GitHub + local check
  const workflows = [
    {
      id: 'cinematic-txt2img',
      name: 'Cinematic Text to Image',
      description: 'Film-like storyboard frames with dramatic lighting. Perfect for narrative pre-viz.',
      category: 'Text to Image',
      version: '1.2.0',
      installed: true,
      installedVersion: '1.2.0',
      totalSize: '4.2 GB',
      requirements: {
        models: [
          { name: 'DreamShaper V8', size: '3.97 GB' }
        ],
        nodes: [
          { name: 'Impact Pack', size: '12 MB' }
        ]
      },
      examplePrompt: 'Wide shot, runner on mountain trail at sunrise, cinematic lighting, film grain'
    },
    {
      id: 'commercial-product',
      name: 'Commercial Product Shot',
      description: 'Clean, bright product visualization perfect for advertising animatics.',
      category: 'Text to Image',
      version: '1.0.0',
      installed: true,
      installedVersion: '1.0.0',
      totalSize: '4.1 GB',
      requirements: {
        models: [
          { name: 'Realistic Vision V5', size: '3.97 GB' }
        ],
        nodes: []
      },
      examplePrompt: 'Product photography, sneaker on white background, studio lighting, commercial'
    },
    {
      id: 'anime-style',
      name: 'Anime Style Frames',
      description: 'Japanese animation aesthetic for anime/cartoon pre-production.',
      category: 'Text to Image',
      version: '1.1.0',
      installed: false,
      totalSize: '5.8 GB',
      requirements: {
        models: [
          { name: 'AnythingV5', size: '3.97 GB' },
          { name: 'VAE-ft-mse', size: '320 MB' }
        ],
        nodes: [
          { name: 'ControlNet Aux', size: '45 MB' }
        ]
      },
      examplePrompt: 'Anime girl running through city street, dynamic pose, studio ghibli style'
    },
    {
      id: 'sketch-to-render',
      name: 'Sketch to Render',
      description: 'Transform rough sketches and thumbnails into polished storyboard frames.',
      category: 'Image to Image',
      version: '2.0.0',
      installed: false,
      totalSize: '6.2 GB',
      requirements: {
        models: [
          { name: 'DreamShaper V8', size: '3.97 GB' },
          { name: 'ControlNet Scribble', size: '1.45 GB' }
        ],
        nodes: [
          { name: 'ControlNet Aux', size: '45 MB' },
          { name: 'Impact Pack', size: '12 MB' }
        ]
      },
      examplePrompt: 'Upload a rough sketch → Get a rendered frame'
    },
    {
      id: 'motion-test',
      name: 'Basic Motion Test',
      description: 'Generate short 3-4 second motion tests from your storyboard frames.',
      category: 'Image to Video',
      version: '1.0.0',
      installed: false,
      totalSize: '9.8 GB',
      requirements: {
        models: [
          { name: 'Stable Video Diffusion', size: '9.2 GB' }
        ],
        nodes: [
          { name: 'Video Helper Suite', size: '8 MB' }
        ]
      },
      examplePrompt: 'Animate a storyboard frame with subtle camera motion'
    },
    {
      id: 'upscale-enhance',
      name: '4x Upscale & Enhance',
      description: 'Upscale your frames for final presentation or client review.',
      category: 'Enhancement',
      version: '1.0.0',
      installed: true,
      installedVersion: '1.0.0',
      totalSize: '780 MB',
      requirements: {
        models: [
          { name: 'RealESRGAN x4', size: '64 MB' },
          { name: 'UltraSharp 4x', size: '67 MB' }
        ],
        nodes: []
      },
      examplePrompt: 'Upscale any generated frame to 4K resolution'
    }
  ]

  const filteredWorkflows = workflows.filter(w => {
    if (filter === 'installed') return w.installed
    if (filter === 'available') return !w.installed
    return true
  })

  const installedCount = workflows.filter(w => w.installed).length
  const availableCount = workflows.filter(w => !w.installed).length

  const handleDownload = (workflowId) => {
    setDownloading(workflowId)
    // Simulate download - in reality this would download from GitHub
    setTimeout(() => {
      setDownloading(null)
      // Would update the workflow's installed status
    }, 3000)
  }

  const categories = [...new Set(workflows.map(w => w.category))]

  return (
    <div className="h-full flex">
      {/* Left Panel - Workflow List */}
      <div className="w-80 border-r border-sf-dark-700 flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-sf-dark-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-sf-text-primary">Workflow Library</span>
            <button className="flex items-center gap-1.5 px-2 py-1 bg-sf-dark-700 hover:bg-sf-dark-600 rounded text-xs text-sf-text-secondary transition-colors">
              <RefreshCw className="w-3 h-3" />
              Check for Updates
            </button>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-1 bg-sf-dark-800 rounded-lg p-1">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'all' ? 'bg-sf-dark-600 text-sf-text-primary' : 'text-sf-text-muted hover:text-sf-text-secondary'
              }`}
            >
              All ({workflows.length})
            </button>
            <button
              onClick={() => setFilter('installed')}
              className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'installed' ? 'bg-sf-dark-600 text-sf-text-primary' : 'text-sf-text-muted hover:text-sf-text-secondary'
              }`}
            >
              Installed ({installedCount})
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'available' ? 'bg-sf-dark-600 text-sf-text-primary' : 'text-sf-text-muted hover:text-sf-text-secondary'
              }`}
            >
              Available ({availableCount})
            </button>
          </div>
        </div>
        
        {/* Workflow List */}
        <div className="flex-1 overflow-y-auto p-2">
          {categories.map(category => {
            const categoryWorkflows = filteredWorkflows.filter(w => w.category === category)
            if (categoryWorkflows.length === 0) return null
            
            return (
              <div key={category} className="mb-4">
                <h4 className="text-[10px] text-sf-text-muted uppercase tracking-wider px-2 mb-2">{category}</h4>
                {categoryWorkflows.map(workflow => (
                  <button
                    key={workflow.id}
                    onClick={() => setSelectedWorkflow(workflow)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                      selectedWorkflow?.id === workflow.id
                        ? 'bg-sf-dark-600 border border-sf-dark-500'
                        : 'hover:bg-sf-dark-700 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-sf-text-primary">{workflow.name}</span>
                      {workflow.installed ? (
                        <div className="flex items-center gap-1 text-sf-success">
                          <Check className="w-3 h-3" />
                          <span className="text-[10px]">Installed</span>
                        </div>
                      ) : (
                        <Download className="w-3.5 h-3.5 text-sf-text-muted" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-sf-text-muted">
                      <span className="flex items-center gap-1">
                        <HardDrive className="w-3 h-3" />
                        {workflow.totalSize}
                      </span>
                      <span>•</span>
                      <span>v{workflow.version}</span>
                    </div>
                  </button>
                ))}
              </div>
            )
          })}
        </div>
        
        {/* Storage Info */}
        <div className="p-3 border-t border-sf-dark-700 bg-sf-dark-800">
          <div className="flex items-center justify-between text-xs text-sf-text-muted mb-1">
            <span>Workflow Storage</span>
            <span>9.1 GB used</span>
          </div>
          <div className="h-1.5 bg-sf-dark-600 rounded-full overflow-hidden">
            <div className="h-full bg-sf-accent rounded-full" style={{ width: '35%' }} />
          </div>
        </div>
      </div>
      
      {/* Right Panel - Workflow Details */}
      <div className="flex-1 p-4 overflow-y-auto">
        {selectedWorkflow ? (
          <div>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-medium text-sf-text-primary">{selectedWorkflow.name}</h3>
                  {selectedWorkflow.installed && (
                    <span className="px-1.5 py-0.5 bg-sf-success/20 text-sf-success text-[10px] rounded">
                      Installed
                    </span>
                  )}
                </div>
                <p className="text-sm text-sf-text-secondary">{selectedWorkflow.description}</p>
              </div>
              
              {selectedWorkflow.installed ? (
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-sf-dark-700 hover:bg-sf-dark-600 rounded text-xs text-sf-text-secondary transition-colors">
                    Uninstall
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleDownload(selectedWorkflow.id)}
                  disabled={downloading === selectedWorkflow.id}
                  className="flex items-center gap-2 px-4 py-2 bg-sf-accent hover:bg-sf-accent-hover disabled:bg-sf-dark-600 rounded-lg text-sm text-white transition-colors"
                >
                  {downloading === selectedWorkflow.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download ({selectedWorkflow.totalSize})
                    </>
                  )}
                </button>
              )}
            </div>
            
            {/* Preview Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-sf-dark-800 border border-sf-dark-600 rounded-lg p-4">
                <h4 className="text-xs text-sf-text-muted uppercase tracking-wider mb-3">Example Output</h4>
                <div className="aspect-video bg-sf-dark-700 rounded flex items-center justify-center">
                  <span className="text-3xl">🖼️</span>
                </div>
              </div>
              <div className="bg-sf-dark-800 border border-sf-dark-600 rounded-lg p-4">
                <h4 className="text-xs text-sf-text-muted uppercase tracking-wider mb-3">Example Prompt</h4>
                <p className="text-sm text-sf-text-secondary italic">"{selectedWorkflow.examplePrompt}"</p>
              </div>
            </div>
            
            {/* Requirements */}
            <div className="bg-sf-dark-800 border border-sf-dark-600 rounded-lg p-4 mb-4">
              <h4 className="text-xs text-sf-text-muted uppercase tracking-wider mb-3">What's Included</h4>
              
              <div className="space-y-3">
                {/* Models */}
                {selectedWorkflow.requirements.models.length > 0 && (
                  <div>
                    <h5 className="text-xs font-medium text-sf-text-secondary mb-2">Models</h5>
                    <div className="space-y-1">
                      {selectedWorkflow.requirements.models.map((model, idx) => (
                        <div key={idx} className="flex items-center justify-between py-1.5 px-2 bg-sf-dark-700 rounded">
                          <span className="text-sm text-sf-text-primary">{model.name}</span>
                          <span className="text-xs text-sf-text-muted">{model.size}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Custom Nodes */}
                {selectedWorkflow.requirements.nodes.length > 0 && (
                  <div>
                    <h5 className="text-xs font-medium text-sf-text-secondary mb-2">Custom Nodes</h5>
                    <div className="space-y-1">
                      {selectedWorkflow.requirements.nodes.map((node, idx) => (
                        <div key={idx} className="flex items-center justify-between py-1.5 px-2 bg-sf-dark-700 rounded">
                          <span className="text-sm text-sf-text-primary">{node.name}</span>
                          <span className="text-xs text-sf-text-muted">{node.size}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Workflow JSON */}
                <div>
                  <h5 className="text-xs font-medium text-sf-text-secondary mb-2">Workflow</h5>
                  <div className="flex items-center justify-between py-1.5 px-2 bg-sf-dark-700 rounded">
                    <span className="text-sm text-sf-text-primary">workflow.json</span>
                    <span className="text-xs text-sf-text-muted">&lt; 1 MB</span>
                  </div>
                </div>
              </div>
              
              {/* Total */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-sf-dark-600">
                <span className="text-sm font-medium text-sf-text-primary">Total Download Size</span>
                <span className="text-sm font-medium text-sf-accent">{selectedWorkflow.totalSize}</span>
              </div>
            </div>
            
            {/* Version Info */}
            <div className="flex items-center gap-4 text-xs text-sf-text-muted">
              <span>Version {selectedWorkflow.version}</span>
              {selectedWorkflow.installed && selectedWorkflow.installedVersion !== selectedWorkflow.version && (
                <span className="flex items-center gap-1 text-sf-warning">
                  <AlertCircle className="w-3 h-3" />
                  Update available
                </span>
              )}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="h-full flex flex-col items-center justify-center text-center">
            <Cloud className="w-12 h-12 text-sf-dark-600 mb-4" />
            <h3 className="text-lg font-medium text-sf-text-primary mb-2">Workflow Library</h3>
            <p className="text-sm text-sf-text-muted max-w-sm">
              Select a workflow to see details, or browse available workflows to expand your creative toolkit.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkflowsPanel
