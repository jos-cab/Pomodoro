// Initialize Electron integration
export const initElectron = async () => {
	if (typeof window !== 'undefined' && window.electronAPI) {
		console.log('Electron integration initialized successfully');
		return true;
	}
	return false;
};

// Check if running in Electron environment
export const isElectron = () => {
	return (
		typeof window !== 'undefined' &&
		window.electronAPI &&
		window.electronAPI.isElectron
	);
};

// Show desktop notification
export const showNotification = async (title, message) => {
	if (isElectron()) {
		try {
			await window.electronAPI.showNotification(title, message);
			return true;
		} catch (error) {
			console.warn('Failed to show Electron notification:', error);
		}
	}

	// Fallback to browser notification
	if ('Notification' in window) {
		if (Notification.permission === 'granted') {
			new Notification(title, { body: message });
			return true;
		} else if (Notification.permission !== 'denied') {
			const permission = await Notification.requestPermission();
			if (permission === 'granted') {
				new Notification(title, { body: message });
				return true;
			}
		}
	}

	return false;
};

// Set window title
export const setWindowTitle = async (title) => {
	if (isElectron()) {
		try {
			await window.electronAPI.setTitle(title);
		} catch (error) {
			console.warn('Failed to set window title:', error);
		}
	}
	// Always update document title as fallback
	document.title = title;
};

// Keep window always on top during focus sessions
export const setAlwaysOnTop = async (enabled) => {
	if (isElectron()) {
		try {
			await window.electronAPI.setAlwaysOnTop(enabled);
			return true;
		} catch (error) {
			console.warn('Failed to set always on top:', error);
		}
	}
	return false;
};

// Get app version
export const getAppVersion = async () => {
	if (isElectron()) {
		try {
			return await window.electronAPI.getAppVersion();
		} catch (error) {
			console.warn('Failed to get app version:', error);
		}
	}
	return null;
};

// Get platform information
export const getPlatform = () => {
	if (isElectron()) {
		return window.electronAPI.platform;
	}
	return navigator.platform;
};

// Check if notifications are supported
export const areNotificationsSupported = () => {
	return isElectron() || 'Notification' in window;
};
