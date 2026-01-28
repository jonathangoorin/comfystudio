const { contextBridge } = require('electron')

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  // Future: Add ComfyUI API bridge here
})
