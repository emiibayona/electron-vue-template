import { app, BrowserWindow, ipcMain, session } from "electron";
import { join } from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"));
  }
}

function startBackendServer() {
  const { exec } = require("child_process");
  exec("cd backend && npm start", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting backend server: ${stderr}`);
    } else {
      console.log(`Backend server started: ${stdout}`);
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  startBackendServer();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["script-src 'self'"],
      },
    });
  });

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
  const { exec } = require("child_process");
  exec("npx kill-port 8081", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error closing backend server: ${stderr}`);
    } else {
      console.log(`Backend closed started: ${stdout}`);
    }
  });
});

ipcMain.on("message", (event, message) => {
  console.log(message);
});
