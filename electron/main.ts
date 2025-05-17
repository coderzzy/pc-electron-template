// electron/main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as os from 'os';

// 添加获取磁盘信息的处理函数
ipcMain.handle('get-disk-info', async () => {
    const diskusage = require('diskusage');
    const isWindows = process.platform === 'win32';
    const isMac = process.platform === 'darwin';

    let diskPath;
    if (isWindows) {
        diskPath = 'C:';
    } else if (isMac) {
        diskPath = '/';
    } else {
        diskPath = os.userInfo().homedir;
    }

    try {
        const info = diskusage.checkSync(diskPath);
        return {
            total: info.total,
            free: info.free
        };
    } catch (err) {
        console.error('获取磁盘信息失败:', err);
        return {
            total: 0,
            free: 0
        };
    }
});
ipcMain.handle('log-to-main', (event, ...args) => {
    console.log('来自渲染进程的日志:', ...args);
});

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')  // 添加预加载脚本
        },
    });

    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:3000');
    } else {
        win.loadFile(path.join(__dirname, '../build/index.html'));
    }
    console.log('Node版本:', process.versions.node);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
