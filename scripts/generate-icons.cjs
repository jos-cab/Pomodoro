const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create build/icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../build/icons');
if (!fs.existsSync(iconsDir)) {
	fs.mkdirSync(iconsDir, { recursive: true });
}

// Read the SVG file
const svgPath = path.join(__dirname, '../icon.svg');
const svgBuffer = fs.readFileSync(svgPath);

// Icon sizes needed for Linux
const sizes = [16, 32, 48, 64, 128, 256, 512];

async function generateIcons() {
	console.log('Generating PNG icons from SVG...');

	try {
		// Generate PNG icons for each size
		for (const size of sizes) {
			const outputPath = path.join(iconsDir, `${size}x${size}.png`);

			await sharp(svgBuffer).resize(size, size).png().toFile(outputPath);

			console.log(`Generated ${size}x${size}.png`);
		}

		// Create the main icon.png (256x256 is commonly used as the main icon)
		const mainIconPath = path.join(iconsDir, 'icon.png');
		await sharp(svgBuffer).resize(256, 256).png().toFile(mainIconPath);

		console.log('Generated icon.png (256x256)');

		// Create a larger icon for AppImage (512x512)
		const appImageIconPath = path.join(iconsDir, 'appimage-icon.png');
		await sharp(svgBuffer).resize(512, 512).png().toFile(appImageIconPath);

		console.log('Generated appimage-icon.png (512x512)');
		console.log('✅ All icons generated successfully!');
	} catch (error) {
		console.error('❌ Error generating icons:', error);
		process.exit(1);
	}
}

generateIcons();
