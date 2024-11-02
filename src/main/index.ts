import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { Client } from '@stomp/stompjs'
import WebSocket from 'ws'

let mainWindow: BrowserWindow

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
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

ipcMain.on('start-listening', (_, { queue_name, doctor_id }) => {
  if (!stompClient) {
    stompClient = new Client({
      brokerURL: 'ws://192.168.56.1:61614/stomp',
      webSocketFactory: () => {
        return new WebSocket('ws://192.168.56.1:61614/stomp', 'stomp')
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000
    })

    stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame)
      const selector = `processor = 'general' OR processor = '${doctor_id}'`

      specialityId =
        stompClient?.subscribe(
          `/queue/${queue_name}`,
          (message) => {
            if (mainWindow) {
              mainWindow.webContents.send('received-patient', JSON.parse(message.body))
            }
          },
          {
            selector
          }
        ).id ?? null

      emergencySubscriptionId =
        stompClient?.subscribe('/topic/emergency', (message) => {
          if (mainWindow) {
            console.log('subscribe-emergency')
            mainWindow.webContents.send('received-emergency', JSON.parse(message.body))
          }
        }).id ?? null
    }

    stompClient.activate()
  }
})

ipcMain.on('subscribe-emergency', (_, { queue_name, doctor_id }) => {
  if (stompClient && stompClient.active && !emergencySubscriptionId && !specialityId) {
    console.log('resubscribe-emergency')
    emergencySubscriptionId = stompClient.subscribe('/topic/emergency', (message) => {
      if (mainWindow) {
        console.log('resubscribe to emergency')
        mainWindow.webContents.send('received-emergency', JSON.parse(message.body))
      }
    }).id

    const selector = `processor = 'general' OR processor = '${doctor_id}'`

    specialityId =
      stompClient?.subscribe(
        `/queue/${queue_name}`,
        (message) => {
          if (mainWindow) {
            mainWindow.webContents.send('received-patient', JSON.parse(message.body))
          }
        },
        {
          selector
        }
      ).id ?? null
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
