import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  minimizeWindow: () => ipcRenderer.send('minimize'),
  maximizeWindow: () => ipcRenderer.send('maximize')
}

// Function to safely expose properties in the main world
const exposeAPI = (key, apiObject) => {
  if (!window[key]) {
    try {
      contextBridge.exposeInMainWorld(key, apiObject)
    } catch (error) {
      console.error(`Failed to expose API '${key}':`, error)
    }
  } else {
    console.error(`Cannot bind API. Property '${key}' already exists on the window object.`)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  exposeAPI('electron', electronAPI)
  exposeAPI('api', api)
  exposeAPI('customElectronAPI', {
    closeApp: () => {
      console.log('closeApp function called')
      ipcRenderer.send('close-app')
    }
  })
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.customElectronAPI = {
    closeApp: () => {
      console.log('closeApp function called')
      ipcRenderer.send('close-app')
    }
  }
}
