import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// eslint-disable-next-line no-undef
	const isElectronBuild = process.env.BUILD_TARGET === 'electron';

	return {
		plugins: [react()],
		base: mode === 'production' && !isElectronBuild ? '/Pomodoro/' : './',
		build: {
			outDir: 'dist',
			assetsDir: 'assets',
			emptyOutDir: true,
		},
		server: {
			port: 5173,
			strictPort: true,
		},
	};
});
