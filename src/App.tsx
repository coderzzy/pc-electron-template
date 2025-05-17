import React, { useEffect, useState } from 'react';
import log from 'electron-log';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke(channel: string, ...args: any[]): Promise<any>;
      };
    };
  }
}

function App() {
  const [diskInfo, setDiskInfo] = useState({ total: 0, free: 0 });

  useEffect(() => {
    const getDiskInfo = async () => {
      if (window.electron) {
        await window.electron.ipcRenderer.invoke('log-to-main', '正在获取磁盘信息...');
        const info = await window.electron.ipcRenderer.invoke('get-disk-info');
        await window.electron.ipcRenderer.invoke('log-to-main', '磁盘信息获取成功', info);
        setDiskInfo(info);
      }
    };
    getDiskInfo();
  }, []);

  const formatSize = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>系统磁盘信息</h1>
      <p>总空间: {formatSize(diskInfo.total)}</p>
      <p>可用空间: {formatSize(diskInfo.free)}</p>
    </div>
  );
}

export default App;
