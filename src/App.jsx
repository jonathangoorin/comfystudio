import { useState, useCallback } from 'react'
import TitleBar from './components/TitleBar'
import Sidebar from './components/Sidebar'
import PreviewPanel from './components/PreviewPanel'
import GeneratePanel from './components/GeneratePanel'
import Timeline from './components/Timeline'
import BottomTabs from './components/BottomTabs'
import InspectorPanel from './components/InspectorPanel'
import ResizeHandle from './components/ResizeHandle'
import ScenesPanel from './components/panels/ScenesPanel'
import AssetsPanel from './components/panels/AssetsPanel'
import WorkflowsPanel from './components/panels/WorkflowsPanel'
import SettingsPanel from './components/panels/SettingsPanel'
import AudioGenerateModal from './components/AudioGenerateModal'

function App() {
  const [activeTab, setActiveTab] = useState('generate')
  const [audioModalOpen, setAudioModalOpen] = useState(false)
  const [audioModalType, setAudioModalType] = useState('music')
  const [selectedItem, setSelectedItem] = useState({ type: 'shot', id: '2.1' })
  
  // Panel sizes (in pixels)
  const [sidebarWidth, setSidebarWidth] = useState(224) // 14rem = 224px
  const [inspectorWidth, setInspectorWidth] = useState(256) // 16rem = 256px
  const [timelineHeight, setTimelineHeight] = useState(176) // 11rem = 176px
  const [bottomPanelHeight, setBottomPanelHeight] = useState(256) // 16rem = 256px

  // Min/max constraints
  const MIN_SIDEBAR = 180
  const MAX_SIDEBAR = 400
  const MIN_INSPECTOR = 200
  const MAX_INSPECTOR = 450
  const MIN_TIMELINE = 120
  const MAX_TIMELINE = 300
  const MIN_BOTTOM_PANEL = 150
  const MAX_BOTTOM_PANEL = 400
  
  const [currentProject] = useState({
    name: 'Nike Commercial v2',
    scenes: [
      { id: 1, name: 'Opening', shots: 3 },
      { id: 2, name: 'Hero Moment', shots: 5 },
      { id: 3, name: 'Product', shots: 2 },
      { id: 4, name: 'CTA', shots: 1 },
    ]
  })

  // Resize handlers
  const handleSidebarResize = useCallback((clientX) => {
    const newWidth = Math.min(MAX_SIDEBAR, Math.max(MIN_SIDEBAR, clientX))
    setSidebarWidth(newWidth)
  }, [])

  const handleInspectorResize = useCallback((clientX) => {
    const newWidth = Math.min(MAX_INSPECTOR, Math.max(MIN_INSPECTOR, window.innerWidth - clientX))
    setInspectorWidth(newWidth)
  }, [])

  const handleTimelineResize = useCallback((clientY) => {
    // Calculate from the bottom of the preview area
    const titleBarHeight = 40
    const bottomTabsHeight = 40
    const availableHeight = window.innerHeight - titleBarHeight - bottomTabsHeight - bottomPanelHeight
    const previewBottom = titleBarHeight + (availableHeight * 0.6) // Approximate preview position
    const newHeight = Math.min(MAX_TIMELINE, Math.max(MIN_TIMELINE, clientY - previewBottom))
    setTimelineHeight(newHeight)
  }, [bottomPanelHeight])

  const handleBottomPanelResize = useCallback((clientY) => {
    const bottomTabsHeight = 40
    const newHeight = Math.min(MAX_BOTTOM_PANEL, Math.max(MIN_BOTTOM_PANEL, window.innerHeight - clientY - bottomTabsHeight))
    setBottomPanelHeight(newHeight)
  }, [])

  const openAudioModal = (type = 'music') => {
    setAudioModalType(type)
    setAudioModalOpen(true)
  }

  const renderBottomPanel = () => {
    switch (activeTab) {
      case 'scenes':
        return <ScenesPanel scenes={currentProject.scenes} />
      case 'generate':
        return <GeneratePanel />
      case 'assets':
        return <AssetsPanel />
      case 'workflows':
        return <WorkflowsPanel />
      case 'settings':
        return <SettingsPanel />
      default:
        return <GeneratePanel />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-sf-dark-950 no-select">
      {/* Title Bar */}
      <TitleBar projectName={currentProject.name} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Scenes */}
        <div style={{ width: sidebarWidth }} className="flex-shrink-0">
          <Sidebar scenes={currentProject.scenes} />
        </div>
        
        {/* Resize Handle - Sidebar */}
        <ResizeHandle 
          direction="horizontal" 
          onResize={handleSidebarResize}
        />
        
        {/* Center - Preview + Timeline + Bottom Panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Preview Area */}
          <div className="flex-1 min-h-0">
            <PreviewPanel />
          </div>
          
          {/* Resize Handle - Timeline */}
          <ResizeHandle 
            direction="vertical" 
            onResize={handleTimelineResize}
          />
          
          {/* Timeline */}
          <div style={{ height: timelineHeight }} className="flex-shrink-0">
            <Timeline onOpenAudioGenerate={openAudioModal} />
          </div>
          
          {/* Resize Handle - Bottom Panel */}
          <ResizeHandle 
            direction="vertical" 
            onResize={handleBottomPanelResize}
          />
          
          {/* Bottom Tab Content */}
          <div 
            style={{ height: bottomPanelHeight }} 
            className="flex-shrink-0 bg-sf-dark-900 border-t border-sf-dark-700"
          >
            {renderBottomPanel()}
          </div>
        </div>
        
        {/* Resize Handle - Inspector */}
        <ResizeHandle 
          direction="horizontal" 
          onResize={handleInspectorResize}
        />
        
        {/* Right Sidebar - Inspector */}
        <div style={{ width: inspectorWidth }} className="flex-shrink-0">
          <InspectorPanel selectedItem={selectedItem} />
        </div>
      </div>
      
      {/* Bottom Tab Bar */}
      <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Audio Generate Modal */}
      <AudioGenerateModal 
        isOpen={audioModalOpen}
        onClose={() => setAudioModalOpen(false)}
        initialType={audioModalType}
      />
    </div>
  )
}

export default App
