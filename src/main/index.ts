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
    }
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

ipcMain.on('start-listening', (_, queue_name) => {
  if (!stompClient) {
    stompClient = new Client({
      brokerURL: 'ws://127.0.0.1:61614/stomp',
      webSocketFactory: () => {
        return new WebSocket('ws://127.0.0.1:61614/stomp', 'stomp')
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000
    })

    stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame)

      stompClient?.subscribe(`/queue/${queue_name}`, (message) => {
        if (mainWindow) {
          mainWindow.webContents.send('received-patient', JSON.parse(message.body))
        }
      })
    }

    stompClient.activate()
  }
})

ipcMain.on('stop-listening', () => {
  if (stompClient && stompClient.active) {
    stompClient.deactivate()
    stompClient = null
  }
})
