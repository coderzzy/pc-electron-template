# pc-electron-template
pc客户端应用，使用electron开发，模版项目

## demo功能
- 用 electron 获取磁盘信息，并用 react 展示
![Image text](https://github.com/coderzzy/pc-electron-template/blob/main/promotional_assets/screenshot.jpg)

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

## 项目构建
- 会出现 build 和 dist-electron 目录
```
npm install
npm run build
```

## 项目启动
```
npm run start
```

## MacOS 打包
### MacOS 项目打包成 .app
- 会出现 dist 目录
- 如果你在 macOS 上运行打包命令，你只能构建 mac 安装包，想打包 Windows 的 .exe，请使用 Windows 实机
```
npm run dist
```

### MacOS .dmg 文件的签名和公证流程
1. 注册并激活Apple Developer 账号
2. 创建并下载签名所需证书
- 登录 Apple Developer 网站 -> Certificates, IDs & Profiles
- 创建 Developer ID Application 类型证书（适用于 macOS 分发）
- Create a certificate signing request
- 下载 .cer 证书文件
3. 在本地安装证书
- 双击 .cer 证书导入 钥匙串访问（Keychain Access）-> 登录钥匙串（login）
- 导出为 .pem 和 .p12，备份证书和私钥（可选）
4. 应用本地签名，先用第一个命令找证书名，第二个命令签名
- security find-identity -v -p codesigning
- codesign --deep --force --verify --verbose --sign "Developer ID Application: <证书名字>" <YOUR_DMG_PATH>
5. 提交公证，先存密钥，再提交
- xcrun notarytool store-credentials AC_PASSWORD --apple-id <YOUR_APPLE_ID> --password <应用专用密码> --team-id <YOUR_TEAM_ID>
- xcrun notarytool submit <YOUR_DMG_PATH> --keychain-profile AC_PASSWORD --wait
- 密码是应用专用密码：在 Apple ID 账户页面，登录 → 开启双重认证 -> 安全 → 生成应用专用密码
- team_id就是账号后面那10位字符串，或者是之前步骤里的证书名
- 如果报错，查日志：xcrun notarytool log <LOG_ID> --keychain-profile AC_PASSWORD
6. 钉住公证票据（Staple）
- xcrun stapler staple <YOUR_DMG_PATH>
7. 验证签名
- spctl --assess --verbose=4 <YOUR_APP_PATH>
accepted表示通过

## TODO
1. 压缩打包的体积
2. Windows 的打包流程