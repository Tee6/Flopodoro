import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const CLIENT_ID = '4570aec779ae4c7592bf16d5af30c3ad'
const REDIRECT_URI = 'http://localhost:5173/callback'
const SCOPES = 'user-read-currently-playing user-read-playback-state'

const express = require('express')
const path = require('path')

let serverInstance: any // Referenz, um den Server später ggf. zu schließen

function createWindow(): void {
  // Express-Server erstellen
  const expressApp = express()

  // Gebaute statische Dateien (z. B. aus dem dist-Ordner) bereitstellen
  expressApp.use(express.static(path.join(__dirname, '../../dist')))

  // Für Single-Page-Apps: Bei allen Routen index.html zurückgeben
  expressApp.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'))
  })

  // Server auf Port 5173 starten
  serverInstance = expressApp.listen(5173, () => {
    console.log('Express-Server läuft auf http://localhost:5173')
  })

  // Erstelle das Browser-Fenster
  const mainWindow = new BrowserWindow({
    icon: icon,
    width: 800,
    height: 540,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true
    }
  })

  // Laden der Seite vom lokalen Server (http://localhost:5173)
  mainWindow.loadURL('http://localhost:5173')

  mainWindow.on('ready-to-show', () => {
    mainWindow.webContents.setZoomFactor(0.63)
    mainWindow.show()
  })

  ipcMain.on('minimize', () => {
    mainWindow.minimize()
  })

  ipcMain.on('maximize', () => {
    mainWindow.kiosk = !mainWindow.kiosk
  })

  ipcMain.on('login-spotify', () => {
    console.log('In the Backend')
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
      CLIENT_ID
    )}&scope=${encodeURIComponent(SCOPES)}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&show_dialog=true`
    mainWindow.loadURL(authUrl)
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (
      input.control &&
      (input.key === '+' || input.key === '-' || (input.shift && input.key === '+'))
    ) {
      event.preventDefault()
    }
  })
}

// Diese Funktion wird aufgerufen, wenn Electron bereit ist
app.whenReady().then(() => {
  // Setze die App-UserModelId für Windows
  electronApp.setAppUserModelId('com.electron')

  // Standardmäßig F12 für die Entwicklertools öffnen oder CommandOrControl + R ignorieren
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // Auf macOS ist es üblich, ein Fenster neu zu erstellen, wenn das Dock-Symbol angeklickt wird und keine Fenster offen sind
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Beende die App, wenn alle Fenster geschlossen sind, außer auf macOS
app.on('window-all-closed', () => {
  if (serverInstance) {
    serverInstance.close()
  }
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
