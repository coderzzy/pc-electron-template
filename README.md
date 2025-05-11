# pc-electron-template
pc客户端应用，使用electron开发，模版项目

## 项目结构
- electron + react + cra + typescript

```
/
├── public/
├── src/
│   ├── App.tsx           <-- React 主界面
│   ├── index.tsx         <-- React 入口
├── electron/
│   └── main.ts           <-- Electron 主进程
├── package.json
├── tsconfig.json
└── ...
```

## 项目启动
```
npm run start
```

## 项目构建
- 会出现 build 和 dist-electron 目录
```
npm run build
```

## 项目打包
- 会出现 dist 目录
- 如果你在 macOS 上运行打包命令，你只能构建 mac 安装包，想打包 Windows 的 .exe，请使用 Windows 实机
```
npm run dist
```

## TODO
1. 调用系统接口能力（比如获取系统信息）
2. 压缩打包的体积