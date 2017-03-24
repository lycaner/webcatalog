const{app,BrowserWindow,ipcMain}=require('electron'),argv=require('yargs-parser')(process.argv.slice(1)),path=require('path'),url=require('url'),settings=require('electron-settings'),camelCase=require('lodash.camelcase'),createMenu=require('./libs/createMenu'),windowStateKeeper=require('./libs/windowStateKeeper'),checkForUpdate=require('./libs/checkForUpdate'),sendMessageToWindow=require('./libs/sendMessageToWindow'),setProtocols=require('./libs/setProtocols'),registerFiltering=require('./libs/adblock/registerFiltering'),isWebView='string'==typeof argv.url&&'string'==typeof argv.id,isDevelopment='true'===argv.development,isTesting='true'===argv.testing;if(setProtocols(),isWebView){const a=require('electron-widevinecdm');a.load(app)}let mainWindow;function createWindow(){if(isWebView){const f={behaviors:{}};f.behaviors[camelCase(argv.id)]={swipeToNavigate:!0,rememberLastPage:!1,quitOnLastWindow:!1,blockAds:!1,customHome:null},settings.defaults(f),settings.applyDefaultsSync()}const a=windowStateKeeper({id:isWebView?argv.id:'webcatalog',defaultWidth:isWebView?1280:800,defaultHeight:isWebView?800:600}),b={x:a.x,y:a.y,width:a.width,height:a.height,minWidth:500,minHeight:400,title:argv.name||'WebCatalog',titleBarStyle:'darwin'===process.platform?'hidden':'default',frame:!0};mainWindow=new BrowserWindow(b),a.manage(mainWindow);const c=url.format({pathname:path.join(__dirname,'www',isWebView?'app.html':'store.html'),protocol:'file:',slashes:!0});if(isWebView){mainWindow.appInfo={id:argv.id,name:argv.name,url:argv.url,userAgent:mainWindow.webContents.getUserAgent().replace(`Electron/${process.versions.electron}`,`WebCatalog/${app.getVersion()}`),isTesting,isDevelopment},settings.get(`behaviors.${camelCase(argv.id)}.blockAds`).then((g)=>{g&&registerFiltering(argv.id)});const f='darwin'===process.platform?app.dock.setBadge:()=>{};ipcMain.on('badge',(g,h)=>{f(h)}),mainWindow.on('focus',()=>{f('')})}mainWindow.loadURL(c);const d=(f)=>{sendMessageToWindow('log',f)};isDevelopment&&!isWebView||createMenu({isDevelopment,isWebView,appName:argv.name||'WebCatalog',appId:argv.id,log:d}),checkForUpdate({mainWindow,log:d,isWebView,isDevelopment,isTesting}),isWebView&&settings.get(`behaviors.${camelCase(argv.id)}.swipeToNavigate`).then((f)=>{f&&mainWindow.on('swipe',(g,h)=>{'left'===h?mainWindow.webContents.send('go-back'):'right'===h&&mainWindow.webContents.send('go-forward')})}).catch((f)=>{sendMessageToWindow('log',f)}),mainWindow.on('close',(f)=>{return'darwin'===process.platform&&isWebView?mainWindow.forceClose?void 0:(f.preventDefault(),void settings.get(`behaviors.${camelCase(argv.id)}.quitOnLastWindow`).then((g)=>{g?app.quit():mainWindow.hide()}).catch((g)=>{sendMessageToWindow('log',g)})):void(mainWindow=null)})}app.on('ready',createWindow),app.on('before-quit',()=>{null!==mainWindow&&(mainWindow.forceClose=!0)}),app.on('window-all-closed',()=>{'darwin'!==process.platform&&app.quit()}),app.on('activate',()=>{null===mainWindow?createWindow():mainWindow.show()});