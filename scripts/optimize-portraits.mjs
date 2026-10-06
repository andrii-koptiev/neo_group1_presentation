import { readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const directory = new URL('../public/photos/', import.meta.url);
const portraits = (await readdir(directory)).filter((name) => name.endsWith('-portrait.png'));
let originalBytes = 0;
let optimizedBytes = 0;

for (const name of portraits) {
  const source = fileURLToPath(new URL(name, directory));
  const output = fileURLToPath(new URL(name.replace(/\.png$/, '.webp'), directory));
  const result = await sharp(source)
    .resize({ width: 900, height: 1200, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(output);
  originalBytes += (await stat(source)).size;
  optimizedBytes += result.size;
  console.log(`${name}: ${Math.round(result.size / 1024)} KiB WebP`);
}

console.log(
  `Portraits: ${(originalBytes / 1024 / 1024).toFixed(2)} MiB → ${(optimizedBytes / 1024 / 1024).toFixed(2)} MiB (${Math.round((1 - optimizedBytes / originalBytes) * 100)}% smaller)`,
);
