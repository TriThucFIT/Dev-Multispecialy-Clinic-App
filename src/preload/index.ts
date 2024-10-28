import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

interface API {
  onMessage: (callback: (message: JSON) => void) => void
  onEmergency: (callback: (message: JSON) => void) => void
  send: (channel: string, data: { queue_name: string; doctor_id: string }) => void

  subscribeEmergency: (data: { queue_name: string; doctor_id: string }) => void
  unSubscribeEmergency: () => void
}

const api: API = {
  onMessage: (callback) => ipcRenderer.on('received-patient', (_, message) => callback(message)),
  onEmergency: (callback) =>
    ipcRenderer.on('received-emergency', (_, message) => callback(message)),
  send: (channel, data) => {
    ipcRenderer.send(channel, data)
  },
  unSubscribeEmergency: () => ipcRenderer.send('stop-emergency'),
  subscribeEmergency: (data) => ipcRenderer.send('subscribe-emergency', data)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
