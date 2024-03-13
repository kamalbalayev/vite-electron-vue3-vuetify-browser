import {app, BrowserWindow, ipcMain, nativeTheme, nativeImage, Tray, Menu} from 'electron';
import path from 'path';

if (require('electron-squirrel-startup')) {
    app.quit();
}

let tray: Tray = null,
    mainWindow: BrowserWindow = null

const createWindow = () => {

    const iconPath = path.join(__dirname,  '../../src/assets/tray.png')

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        minWidth: 600,
        minHeight: 300,
        frame: false,
        center: true,
        focusable: true,
        icon: iconPath,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true,
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)

    const icon = nativeImage.createFromPath(iconPath)
    tray = new Tray(icon)
    tray.setToolTip('My Browser')
    tray.setTitle('My Browser')

    const contextMenu: Menu = Menu.buildFromTemplate([
        { label: 'About', role: 'about' },
        { label: 'Quit', role: 'quit' }
    ])

    tray.setContextMenu(contextMenu)

    // mainWindow.webContents.openDevTools();

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('quit-app', () => {
    app.quit();
});

app.on('before-quit', () => {
    tray.destroy()
});

ipcMain.handle('maximize-app', () => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
    mainWindow.webContents.send('isMaximized', mainWindow.isMaximized())
});

ipcMain.handle('minimize-app', () => {
    mainWindow.minimize();
});

ipcMain.handle('theme', (event, theme): void => {
    nativeTheme.themeSouce = theme
})