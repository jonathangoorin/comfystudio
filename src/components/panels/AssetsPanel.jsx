import { Upload, FolderOpen, Image, Video, Music, Search, Grid, List } from 'lucide-react'
import { useState } from 'react'

function AssetsPanel() {
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock assets
  const assets = [
    { id: 1, name: 'hero_runner_v1.png', type: 'image', size: '2.4 MB', generated: true },
    { id: 2, name: 'hero_runner_v2.png', type: 'image', size: '2.1 MB', generated: true },
    { id: 3, name: 'mountain_bg.png', type: 'image', size: '3.8 MB', generated: true },
    { id: 4, name: 'product_shot.png', type: 'image', size: '1.9 MB', generated: true },
    { id: 5, name: 'scratch_audio.mp3', type: 'audio', size: '4.2 MB', generated: false },
    { id: 6, name: 'reference_mood.jpg', type: 'image', size: '892 KB', generated: false },
  ]

  const getIcon = (type) => {
    switch (type) {
      case 'image': return Image
      case 'video': return Video
      case 'audio': return Music
      default: return FolderOpen
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-sf-dark-700 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sf-text-muted" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-sf-dark-800 border border-sf-dark-600 rounded-lg pl-9 pr-3 py-1.5 text-sm text-sf-text-primary placeholder-sf-text-muted focus:outline-none focus:border-sf-accent"
          />
        </div>
        
        <div className="flex items-center gap-1 bg-sf-dark-800 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-sf-dark-600' : ''}`}
          >
            <Grid className="w-4 h-4 text-sf-text-secondary" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-sf-dark-600' : ''}`}
          >
            <List className="w-4 h-4 text-sf-text-secondary" />
          </button>
        </div>
        
        <button className="flex items-center gap-2 px-3 py-1.5 bg-sf-dark-700 hover:bg-sf-dark-600 rounded-lg text-xs text-sf-text-secondary transition-colors">
          <Upload className="w-3 h-3" />
          Import
        </button>
      </div>
      
      {/* Assets Grid */}
      <div className="flex-1 p-3 overflow-auto">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-6 gap-3">
            {assets.map((asset) => {
              const Icon = getIcon(asset.type)
              return (
                <div
                  key={asset.id}
                  className="bg-sf-dark-800 border border-sf-dark-600 rounded-lg overflow-hidden hover:border-sf-dark-500 cursor-pointer transition-colors group"
                >
                  <div className="aspect-square bg-sf-dark-700 flex items-center justify-center relative">
                    {asset.type === 'image' ? (
                      <span className="text-2xl">🖼️</span>
                    ) : asset.type === 'audio' ? (
                      <span className="text-2xl">🎵</span>
                    ) : (
                      <Icon className="w-8 h-8 text-sf-text-muted" />
                    )}
                    {asset.generated && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-sf-accent rounded-full flex items-center justify-center">
                        <span className="text-[8px]">AI</span>
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-sf-text-primary truncate">{asset.name}</p>
                    <p className="text-[10px] text-sf-text-muted">{asset.size}</p>
                  </div>
                </div>
              )
            })}
            
            {/* Upload placeholder */}
            <div className="aspect-square border-2 border-dashed border-sf-dark-600 rounded-lg flex items-center justify-center hover:border-sf-dark-500 cursor-pointer transition-colors">
              <div className="text-center">
                <Upload className="w-5 h-5 text-sf-text-muted mx-auto mb-1" />
                <span className="text-[10px] text-sf-text-muted">Import</span>
              </div>
            </div>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-xs text-sf-text-muted border-b border-sf-dark-700">
                <th className="text-left py-2 px-3">Name</th>
                <th className="text-left py-2 px-3">Type</th>
                <th className="text-left py-2 px-3">Size</th>
                <th className="text-left py-2 px-3">Source</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => {
                const Icon = getIcon(asset.type)
                return (
                  <tr key={asset.id} className="border-b border-sf-dark-700 hover:bg-sf-dark-800 cursor-pointer">
                    <td className="py-2 px-3 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-sf-text-muted" />
                      <span className="text-sm text-sf-text-primary">{asset.name}</span>
                    </td>
                    <td className="py-2 px-3 text-xs text-sf-text-secondary capitalize">{asset.type}</td>
                    <td className="py-2 px-3 text-xs text-sf-text-muted">{asset.size}</td>
                    <td className="py-2 px-3">
                      {asset.generated ? (
                        <span className="px-1.5 py-0.5 bg-sf-accent/20 text-sf-accent text-[10px] rounded">AI Generated</span>
                      ) : (
                        <span className="text-xs text-sf-text-muted">Imported</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AssetsPanel
