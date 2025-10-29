import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processAndroidIcons() {
  const androidResPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');
  const sourceIconPath = path.join(androidResPath, 'mipmap-hdpi', 'ico-attendance.png');

  if (!fs.existsSync(sourceIconPath)) {
    console.error(`❌ Error: Icon file not found at ${sourceIconPath}`);
    process.exit(1);
  }

  console.log(`✅ Found source icon: ico-attendance.png`);

  const iconSizes = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192
  };

  // Read the source icon
  const iconBuffer = fs.readFileSync(sourceIconPath);
  const image = sharp(iconBuffer);
  const metadata = await image.metadata();

  console.log(`📐 Source icon dimensions: ${metadata.width}x${metadata.height}`);

  // Generate icons for all sizes
  for (const [folder, size] of Object.entries(iconSizes)) {
    const folderPath = path.join(androidResPath, folder);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Generate ic_launcher.png (square icon)
    await sharp(iconBuffer)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 100 })
      .toFile(path.join(folderPath, 'ic_launcher.png'));

    // Generate ic_launcher_round.png (circular icon)
    const roundPath = path.join(folderPath, 'ic_launcher_round.png');
    const circleBuffer = Buffer.from(`
      <svg><circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/></svg>
    `);

    await sharp(iconBuffer)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .composite([{
        input: await sharp(circleBuffer).resize(size, size).png().toBuffer(),
        blend: 'dest-in'
      }])
      .png({ quality: 100 })
      .toFile(roundPath);

    console.log(`✅ Generated: ${folder} (${size}x${size})`);
  }

  // Generate foreground for adaptive icon
  const foregroundSize = 432;
  await sharp(iconBuffer)
    .resize(foregroundSize, foregroundSize, {
      fit: 'cover',
      position: 'center'
    })
    .png({ quality: 100 })
    .toFile(path.join(androidResPath, 'mipmap-xxxhdpi', 'ic_launcher_foreground.png'));

  console.log(`✅ Generated: ic_launcher_foreground.png (432x432)`);

  // Generate PWA icons
  const publicPath = path.join(__dirname, 'public');
  const pwaIconSizes = [16, 32, 192, 512];

  for (const size of pwaIconSizes) {
    await sharp(iconBuffer)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 100 })
      .toFile(path.join(publicPath, `icon-${size}.png`));

    console.log(`✅ Generated PWA: icon-${size}.png`);
  }

  console.log('\n🎉 All icons generated successfully!');
}

processAndroidIcons().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});