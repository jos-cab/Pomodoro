const { rcedit } = require('rcedit');
const path = require('path');

async function updateIcon() {
	const exePath = path.join(
		__dirname,
		'../release/win-unpacked/Pomodoro Timer.exe'
	);
	const iconPath = path.join(__dirname, '../build/icons/icon.ico');

	try {
		console.log('Updating executable icon...');
		console.log('Executable:', exePath);
		console.log('Icon:', iconPath);

		await rcedit(exePath, {
			icon: iconPath,
			'version-string': {
				ProductName: 'Pomodoro Timer',
				FileDescription: 'A productivity-focused Pomodoro timer',
				CompanyName: 'Pomodoro Timer',
				LegalCopyright: 'Copyright © 2024',
				OriginalFilename: 'Pomodoro Timer.exe',
			},
		});

		console.log('✅ Executable icon updated successfully!');
	} catch (error) {
		console.error('❌ Error updating executable icon:', error);
		process.exit(1);
	}
}

updateIcon();
