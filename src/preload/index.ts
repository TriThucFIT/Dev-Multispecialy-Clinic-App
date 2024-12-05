import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

interface API {
  onMessage: (callback: (message: JSON) => void) => void
  onEmergency: (callback: (message: JSON) => void) => void
  onInvoice: (callback: (message: JSON) => void) => void
  onPrescription: (callback: (message: JSON) => void) => void
  send: (channel: string, data: { queue_name: string; doctor_id: string }) => void
  maximizeWindow: () => void
  subscribeEmergency: (data: { queue_name: string; doctor_id: string }) => void
  unSubscribeEmergency: () => void
  syncUnprocessedData: (data: { messages: Array<any>; queue_name: string }) => void
}

const api: API = {
  /**
   * Đăng ký callback để nhận thông điệp bệnh nhân.
   */
  onMessage: (callback) => ipcRenderer.on('received-patient', (_, message) => callback(message)),

  /**
   * Đăng ký callback để nhận thông điệp khẩn cấp.
   */
  onEmergency: (callback) =>
    ipcRenderer.on('received-emergency', (_, message) => callback(message)),

  /**
   * Đăng ký callback để nhận thông tin hóa đơn.
   */
  onInvoice: (callback) => ipcRenderer.on('received-invoice', (_, message) => callback(message)),

  /**
   * Đăng ký callback để nhận thông tin đơn thuốc.
   */
  onPrescription: (callback) =>
    ipcRenderer.on('received-prescription', (_, message) => callback(message)),

  /**
   * Gửi thông điệp qua kênh IPC đến main process.
   */
  send: (channel, data) => {
    if (typeof channel === 'string' && data) {
      ipcRenderer.send(channel, data)
    } else {
      console.error('Invalid channel or data')
    }
  },

  /**
   * Gửi yêu cầu để phóng to cửa sổ.
   */
  maximizeWindow: () => ipcRenderer.send('maximize-window'),

  /**
   * Dừng đăng ký thông điệp khẩn cấp.
   */
  unSubscribeEmergency: () => ipcRenderer.send('stop-emergency'),

  /**
   * Đăng ký nhận thông điệp khẩn cấp với dữ liệu cụ thể.
   */
  subscribeEmergency: (data) => {
    if (data && data.queue_name && data.doctor_id) {
      ipcRenderer.send('subscribe-emergency', data)
    } else {
      console.error('Invalid data for subscribeEmergency')
    }
  },

  /**
   * Đồng bộ dữ liệu chưa xử lý.
   */
  syncUnprocessedData: (data) => {
    if (data && data.messages && data.queue_name) {
      ipcRenderer.send('sync-unprocessed-data', data)
    } else {
      console.error('Invalid data for syncUnprocessedData')
    }
  }
}

// Đảm bảo chỉ expose API nếu context isolation được bật
if (process.contextIsolated) {
  try {
    // Expose Electron API (nếu cần)
    contextBridge.exposeInMainWorld('electron', electronAPI)

    // Expose custom API
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error('Error exposing APIs to renderer:', error)
  }
} else {
  // Fallback khi context isolation bị tắt (không khuyến khích sử dụng)
  // @ts-ignore
  window.electron = electronAPI
  // @ts-ignore
  window.api = api
}
