import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
  const iconSizes = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192
  };

  const androidResPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

  // Create a more visible and clear attendance icon
  const svgBuffer = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="512" height="512" rx="64" fill="#1e40af"/>
      <!-- Calendar body -->
      <rect x="106" y="106" width="300" height="300" rx="32" fill="white"/>
      <!-- Calendar header -->
      <rect x="106" y="106" width="300" height="80" rx="32" fill="#3b82f6"/>
      <!-- Month/Year text placeholder -->
      <rect x="160" y="130" width="80" height="12" rx="6" fill="white" opacity="0.8"/>
      <rect x="260" y="130" width="60" height="12" rx="6" fill="white" opacity="0.8"/>
      <!-- Days of week -->
      <text x="145" y="180" font-family="Arial" font-size="14" fill="#666">ش</text>
      <text x="185" y="180" font-family="Arial" font-size="14" fill="#666">ی</text>
      <text x="225" y="180" font-family="Arial" font-size="14" fill="#666">د</text>
      <text x="265" y="180" font-family="Arial" font-size="14" fill="#666">س</text>
      <text x="305" y="180" font-family="Arial" font-size="14" fill="#666">چ</text>
      <text x="345" y="180" font-family="Arial" font-size="14" fill="#666">پ</text>
      <!-- Attendance marks - green checks and red crosses -->
      <circle cx="145" cy="210" r="8" fill="#10b981"/>
      <circle cx="185" cy="210" r="8" fill="#10b981"/>
      <circle cx="225" cy="210" r="8" fill="#ef4444"/>
      <circle cx="265" cy="210" r="8" fill="#10b981"/>
      <circle cx="305" cy="210" r="8" fill="#10b981"/>
      <circle cx="345" cy="210" r="8" fill="#ef4444"/>
      <circle cx="145" cy="250" r="8" fill="#10b981"/>
      <circle cx="185" cy="250" r="8" fill="#10b981"/>
      <circle cx="225" cy="250" r="8" fill="#ef4444"/>
      <circle cx="265" cy="250" r="8" fill="#10b981"/>
      <circle cx="305" cy="250" r="8" fill="#10b981"/>
      <circle cx="345" cy="250" r="8" fill="#10b981"/>
      <circle cx="145" cy="290" r="8" fill="#10b981"/>
      <circle cx="185" cy="290" r="8" fill="#ef4444"/>
      <circle cx="225" cy="290" r="8" fill="#10b981"/>
      <circle cx="265" cy="290" r="8" fill="#10b981"/>
      <circle cx="305" cy="290" r="8" fill="#ef4444"/>
      <circle cx="345" cy="290" r="8" fill="#10b981"/>
      <circle cx="145" cy="330" r="8" fill="#10b981"/>
      <circle cx="185" cy="330" r="8" fill="#10b981"/>
      <circle cx="225" cy="330" r="8" fill="#10b981"/>
      <circle cx="265" cy="330" r="8" fill="#ef4444"/>
      <circle cx="305" cy="330" r="8" fill="#10b981"/>
      <circle cx="345" cy="330" r="8" fill="#10b981"/>
    </svg>
  `);

  for (const [folder, size] of Object.entries(iconSizes)) {
    const folderPath = path.join(androidResPath, folder);

    // Ensure directory exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Generate ic_launcher.png
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(folderPath, 'ic_launcher.png'));

    // Generate ic_launcher_round.png (rounded version)
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(folderPath, 'ic_launcher_round.png'));

    console.log(`Generated icons for ${folder} (${size}x${size})`);
  }

  // Generate adaptive icon foreground
  const foregroundSize = 432; // 432px for xxxhdpi (192 * 2.25)
  await sharp(svgBuffer)
    .resize(foregroundSize, foregroundSize)
    .png()
    .toFile(path.join(androidResPath, 'mipmap-xxxhdpi', 'ic_launcher_foreground.png'));

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);