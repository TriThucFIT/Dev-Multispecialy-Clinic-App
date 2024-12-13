import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { Client } from '@stomp/stompjs'
import WebSocket from 'ws'
import NodeCache from 'node-cache'
import { log } from 'console'
import * as dotenv from 'dotenv'

dotenv.config()

let mainWindow: BrowserWindow
const cache = new NodeCache({ stdTTL: 60 * 60 * 24 })

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    },
    fullscreenable: false
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('Dev Multispecialy Clinic Management System')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

let stompClient: Client | null = null
let emergencySubscriptionId: string | null = null
let specialityId: string | null = null
let queue_id: string | null = null

interface cacheData {
  queue_name: string
  doctor_id: string | null
  data: Array<any>
}

ipcMain.on('start-listening', (_, { queue_name, doctor_id }) => {
  try {
    if (!stompClient) {
      stompClient = new Client({
        brokerURL: process.env.VITE_SOCKET_URL ?? 'ws://localhost:61614/stomp',
        webSocketFactory: () => {
          return new WebSocket(process.env.VITE_SOCKET_URL ?? 'ws://localhost:61614/stomp', 'stomp')
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000
      })
      stompClient.activate()
    }
    if (!stompClient.active) {
      stompClient.activate()
    }
    stompClient.onConnect = (_frame) => {
      if (doctor_id) {
        const selector = `processor = 'general' OR processor = '${doctor_id}'`
        specialityId =
          stompClient?.subscribe(
            `/queue/${queue_name}`,
            (message) => {
              if (mainWindow && !mainWindow.isDestroyed()) {
                const patients: cacheData = (cache.get('patients') || {
                  queue_name: queue_name,
                  doctor_id: doctor_id,
                  data: []
                }) as cacheData
                if (patients.queue_name !== queue_name || patients.doctor_id !== doctor_id) {
                  patients.queue_name = queue_name
                  patients.doctor_id = doctor_id
                  patients.data = []
                }
                console.log('Received patient', JSON.parse(message.body))
                console.log('Patients', patients)
                patients.data.push(JSON.parse(message.body))
                mainWindow.webContents.send('received-patient', JSON.parse(message.body))
                cache.set('patients', patients)
              }
            },
            {
              selector
            }
          ).id ?? null

        queue_id = specialityId

        console.log('Assigning to queue', queue_id)

        emergencySubscriptionId =
          stompClient?.subscribe('/topic/emergency', (message) => {
            if (mainWindow && !mainWindow.isDestroyed()) {
              mainWindow.webContents.send('received-emergency', JSON.parse(message.body))
            }
          }).id ?? null
      } else {
        queue_id =
          stompClient?.subscribe(`/queue/${queue_name}`, (message) => {
            if (mainWindow && !mainWindow.isDestroyed()) {
              if (queue_name.includes('casher')) {
                const invoices: cacheData = (cache.get('invoices') || {
                  queue_name: queue_name,
                  doctor_id: null,
                  data: []
                }) as cacheData

                if (invoices.queue_name !== queue_name) {
                  invoices.queue_name = queue_name
                  invoices.doctor_id = null
                  invoices.data = []
                }
                invoices.data.push(JSON.parse(message.body))
                mainWindow.webContents.send('received-invoice', JSON.parse(message.body))
                cache.set('invoices', invoices)
              } else {
                const prescriptions: cacheData = (cache.get('prescriptions') || {
                  queue_name: queue_name,
                  doctor_id: null,
                  data: []
                }) as cacheData
                if (prescriptions.queue_name !== queue_name) {
                  prescriptions.queue_name = queue_name
                  prescriptions.doctor_id = null
                  prescriptions.data = []
                }
                prescriptions.data.push(JSON.parse(message.body))
                mainWindow.webContents.send('received-prescription', JSON.parse(message.body))
                cache.set('prescriptions', prescriptions)
              }
            }
          }).id ?? null
      }
    }
  } catch (e) {
    console.log('Error in start-listening', e)
  }
})

ipcMain.on('subscribe-emergency', (_, { queue_name, doctor_id }) => {
  console.log('subscribe-emergency', stompClient?.activate)
  try {
    if (stompClient && stompClient.connected && !emergencySubscriptionId && !specialityId) {
      console.log('resubscribe-emergency')
      emergencySubscriptionId = stompClient.subscribe('/topic/emergency', (message) => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          console.log('resubscribe to emergency')
          mainWindow.webContents.send('received-emergency', JSON.parse(message.body))
        }
      }).id

      console.log('subscribing to speciality')
      const selector = `processor = 'general' OR processor = '${doctor_id}'`
      specialityId =
        stompClient?.subscribe(
          `/queue/${queue_name}`,
          (message) => {
            if (mainWindow && !mainWindow.isDestroyed()) {
              mainWindow.webContents.send('received-patient', JSON.parse(message.body))
            }
          },
          {
            selector
          }
        ).id ?? null

      console.log('subscribed to speciality', specialityId)
    }
  } catch (e) {
    console.log('Error in subscribe-emergency', e)
  }
})

ipcMain.on('stop-emergency', () => {
  if (stompClient && stompClient.active && emergencySubscriptionId && specialityId) {
    console.log('stop-emergency')
    stompClient.unsubscribe(emergencySubscriptionId)
    stompClient.unsubscribe(specialityId)
    emergencySubscriptionId = null
    specialityId = null
  }
})

ipcMain.on('stop-listening', () => {
  if (stompClient && stompClient.active) {
    console.log('stop-listening')
    stompClient.deactivate()
    stompClient = null
  }
})

ipcMain.on('maximize-window', () => {
  if (mainWindow) {
    mainWindow.fullScreenable = true
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  }
})

ipcMain.on(
  'sync-unprocessed-data',
  (
    _,
    { message_id, queue_name, type }: { message_id: number; queue_name: string; type: string }
  ) => {
    if (mainWindow && cache) {
      const data: cacheData | undefined = cache.get(type)
      console.log('Syncing unprocessed data in cache :', data)
      if (data && data.queue_name === queue_name) {
        const mess_in_cache = data.data.find((m) => {
          const mess = JSON.parse(m)
          console.log('Message ID recive :', message_id)

          console.log('Message in cache data', mess)
          return type === 'prescriptions'
            ? mess.medicalRecordEntryId === message_id
            : mess.id === message_id
        })
        console.log('Message in cache', mess_in_cache)
        if (mess_in_cache) {
          console.log('Syncing unprocessed data in cache :', mess_in_cache)
          data.data = data.data.filter((m) => {
            const mess = JSON.parse(m)
            return type === 'prescriptions'
              ? mess.medicalRecordEntryId !== message_id
              : mess.id !== message_id
          })
          cache.set(type, data)
        }
        console.log('Syncing unprocessed data in new cache :', cache.get(type))
      }
    }
  }
)

ipcMain.on('onLogout', async () => {
  try {
    console.log('Logout received', queue_id)
    if (mainWindow && cache && stompClient && stompClient.active && queue_id) {
      console.log('Logout and deactivate')

      await resendDataToQueue()
      stompClient.unsubscribe(queue_id)
      stompClient.deactivate()
    }
  } catch (e) {
    console.log('Error in logout', e)
    if (queue_id) {
      stompClient?.unsubscribe(queue_id)
    }
    stompClient?.deactivate()
  }
})

app.on('before-quit', async (e) => {
  try {
    e.preventDefault()
    log('before-quit')
    if (mainWindow && cache && stompClient && stompClient.active) {
      await resendDataToQueue()

      if (queue_id) {
        stompClient?.unsubscribe(queue_id)
      }

      if (specialityId) {
        stompClient.unsubscribe(specialityId)
      }
      if (emergencySubscriptionId) {
        stompClient.unsubscribe(emergencySubscriptionId)
      }
      stompClient?.deactivate()
      log('deactivate')
      app.exit()
    } else {
      app.exit()
    }
  } catch (e) {
    console.log('Error in before-quit', e)
    app.exit()
  }
})

const resendDataToQueue = async () => {
  try {
    if (mainWindow && cache && stompClient && stompClient.active) {
      const unprocesseds = cache.keys()
      log('queues quit', unprocesseds)
      for (const unprocessed of unprocesseds) {
        const data: cacheData | undefined = cache.get(unprocessed)
        if (data) {
          for (const message of data.data) {
            log('publishing', unprocessed, message, data.queue_name)
            stompClient.publish({
              destination: `/queue/${data.queue_name}`,
              body: JSON.stringify(message),
              headers: { processor: 'general' }
            })
            log('published', unprocessed, message, data.queue_name)
          }
        }
      }
      cache.flushAll()
    }
  } catch (e) {
    console.log('Error in resendDataToQueue', e)
  }
}
