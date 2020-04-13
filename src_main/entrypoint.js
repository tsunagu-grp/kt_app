// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const {google} = require('googleapis');
// const {OAuth2Client} = require('google-auth-library');
const http = require('http');
const open = require('open');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  const startUrl = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    : 'http://localhost:3000';
  mainWindow.loadURL(startUrl);
  // mainWindow.loadURL("http://localhost:3000");
  // mainWindow.loadFile("http://localhost:3000");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// listEvents();
/**
 * Renderプロセスからの通知を受信
 */
// function requestOAuthCode(reject, resolve) {
//   return new Promise((resolve, reject) => {
//     let url = this.oAuth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: this.scopes,
//     });
//     // chrominumからHTTPアクセスをしてGoogle認証確認画面を表示させる
//     this.browser.loadURL(url);
//     // Google API 認証情報で設定したリダイレクト先が表示されたときのイベント
//     this.browser.webContents.on(
//       'did-get-redirect-request',
//       (event, oldUrl, newUrl) => {
//         let query = queryString.parse(Url.parse(newUrl).query);
//         if (query.error || !query.code) return reject(query.error, null);
//         this.browser.loadURL(
//           Url.format({
//             pathname: this.callbackUrl,
//             protocol: 'file:',
//             slashes: true,
//           }),
//         );
//         return resolve(query.code);
//       },
//     );
//   });
// }
ipcMain.on('notifyText', (event, args) => {
  const oAuth2Client = new google.auth.OAuth2(
    '334809568162-vl9nn803jdobffhv35lg80r3b7or2mqf.apps.googleusercontent.com',
    'es83IG--E_drxF_oQ_QP1T3H',
    'http://localhost:3000',
  );

  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
  });
  console.log(authorizeUrl);
  let child = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    },
  });
  const server = http
    .createServer(async (req, res) => {
      try {
        const code = req.url.split('=')[1].split('&')[0];
        console.log(code);
        const {tokens} = await oAuth2Client.getToken(code);
        console.log(tokens);
        child.close();
      } catch (e) {
        console.log(e);
        // reject(e);
      }
    })
    .listen(3000, () => {
      child.loadURL(authorizeUrl);
      child.webContents.on('will-navigate', function (event, newUrl) {
        // console.log('file:/' + path.join(__dirname, '/../build/index.html'));
      });
    });
});
// function listEvents(auth) {
//   const calendar = google.calendar({version: 'v3', auth});
//   calendar.events.list(
//     {
//       calendarId: 'primary',
//       timeMin: new Date().toISOString(),
//       maxResults: 10,
//       singleEvents: true,
//       orderBy: 'startTime',
//     },
//     (err, res) => {
//       console.log(err, res);
//     },
//   );
// }
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
