// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const {google} = require('googleapis');
// const {OAuth2Client} = require('google-auth-library');
const http = require('http');
const dayjs = require('dayjs');
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
    // when you  should delete the corresponding element.
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
  let child = new BrowserWindow({
    parent: mainWindow,
    show: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    },
  });
  const getNewToken = (authUrl, callback) => {
    child.loadURL(authUrl);
    const server = http
      .createServer(async (req, res) => {
        try {
          var q = url.parse(req.url, true).query;
          const code = q.code;
          if (!code) return;

          oAuth2Client.getToken(code, (err, token) => {
            if (err)
              return console.error(
                'Error while trying to retrieve access token',
                err,
              );
            console.log(token);
            oAuth2Client.setCredentials(token);
            if (child) child.close();
            server.close(err => {
              if (err) return console.log(err);
              console.log('Server closed');
            });
            callback(oAuth2Client);
          });
        } catch (e) {
          console.log(e);
        }
      })
      .listen(3000);
  };

  const listEvents = auth => {
    console.log('callback');
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    console.log(`${year}-${month}-${day}`);
    const timeMin = dayjs(
      `${year}-${month}-${day}` + 'T00:00:00.000Z',
    ).toISOString();
    const timeMax = dayjs(
      `${year}-${month}-${day}` + 'T23:59:59.999Z',
    ).toISOString();

    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list(
      {
        calendarId: 'primary',
        timeMin: timeMin,
        timeMax: timeMax,
      },
      (err, res) => {
        console.log(res);
        event.reply('reply', res.data);
      },
    );
  };

  getNewToken(authorizeUrl, listEvents);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
