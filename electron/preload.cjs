const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
	// Notification API
	showNotification: (title, body) =>
		ipcRenderer.invoke('show-notification', title, body),

	// Window management API
	setAlwaysOnTop: (flag) => ipcRenderer.invoke('set-always-on-top', flag),
	setTitle: (title) => ipcRenderer.invoke('set-title', title),

	// App info API
	getAppVersion: () => ipcRenderer.invoke('get-app-version'),

	// Platform detection
	platform: process.platform,

	// Check if running in Electron
	isElectron: true,
});
