const {
	app,
	BrowserWindow,
	Menu,
	Notification,
	ipcMain,
	shell,
} = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
	// Create the browser window with optimized settings for faster startup
	mainWindow = new BrowserWindow({
		width: 400,
		height: 650,
		minWidth: 350,
		minHeight: 500,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: false,
			preload: path.join(__dirname, 'preload.cjs'),
			webSecurity: true,
			allowRunningInsecureContent: false,
			experimentalFeatures: false,
		},
		icon: path.join(__dirname, '../icon.svg'), // Use root icon for faster access
		titleBarStyle: 'default',
		show: true, // Show immediately for faster perceived startup
		center: true,
		resizable: true,
		maximizable: false,
		fullscreenable: false,
		backgroundColor: '#e14d4d', // Match app background color
		skipTaskbar: false,
	});

	// Load the app
	if (isDev) {
		mainWindow.loadURL('http://localhost:5173');
		// Open DevTools in development
		mainWindow.webContents.openDevTools();
	} else {
		mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
	}

	// Optimize window loading
	mainWindow.webContents.once('dom-ready', () => {
		// Window is already shown, just ensure it's focused
		mainWindow.focus();
	});

	// Handle window closed
	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	// Handle external links
	mainWindow.webContents.setWindowOpenHandler(({ url }) => {
		shell.openExternal(url);
		return { action: 'deny' };
	});
}

// App event handlers
app.whenReady().then(() => {
	createWindow();

	// Remove menu bar for cleaner interface
	Menu.setApplicationMenu(null);

	app.on('activate', () => {
		// On macOS, re-create window when dock icon is clicked
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	// On macOS, keep app running even when all windows are closed
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// IPC handlers for desktop features
ipcMain.handle('show-notification', async (event, title, body) => {
	if (Notification.isSupported()) {
		const notification = new Notification({
			title,
			body,
			silent: false,
		});
		notification.show();
		return true;
	}
	return false;
});

ipcMain.handle('set-always-on-top', async (event, flag) => {
	if (mainWindow) {
		mainWindow.setAlwaysOnTop(flag);
		return true;
	}
	return false;
});

ipcMain.handle('set-title', async (event, title) => {
	if (mainWindow) {
		mainWindow.setTitle(title);
		return true;
	}
	return false;
});

ipcMain.handle('get-app-version', async () => {
	return app.getVersion();
});

// Menu removed for cleaner interface - users can still use Cmd+Q/Alt+F4 to quit
