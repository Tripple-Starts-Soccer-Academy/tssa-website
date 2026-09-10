/**
 * Scans public/images for image files and writes public/gallery-manifest.json.
 * Runs automatically before `npm start` and `npm run build`.
 * To add photos to the gallery, just drop image files into public/images/.
 */
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const outputFile = path.join(__dirname, '..', 'public', 'gallery-manifest.json');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

// Files to exclude from the gallery (placeholder/non-photo files)
const EXCLUDE = new Set(['hero-image.jpg', 'hero-uploaded.jpg']);

const files = fs
  .readdirSync(imagesDir)
  .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
  .filter((file) => !EXCLUDE.has(file))
  .sort();

const manifest = files.map((file) => ({
  url: `/images/${encodeURIComponent(file)}`,
  filename: file,
}));

fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
console.log(`Gallery manifest written: ${manifest.length} images`);
