/**
 * Generate PWA icons from public/logos/logo.png (accordion mark on cream).
 * Run: node scripts/generate-pwa-icons.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "public/logos/logo.png");
const outDir = path.join(root, "public/icons");

/** Matches --color-surface in globals.css (splash / manifest background). */
const SURFACE = "#f4e8d8";

/** Maskable safe zone: graphic within central 80% (40% inset each side). */
const MASKABLE_SCALE = 0.8;

async function iconAny(size) {
  return sharp(source)
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function iconMaskable(size) {
  const graphicSize = Math.round(size * MASKABLE_SCALE);
  const inset = Math.round((size - graphicSize) / 2);
  const graphic = await sharp(source)
    .resize(graphicSize, graphicSize, { fit: "cover" })
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: SURFACE,
    },
  })
    .composite([{ input: graphic, left: inset, top: inset }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const outputs = [
    ["icon-192.png", await iconAny(192)],
    ["icon-512.png", await iconAny(512)],
    ["icon-maskable-512.png", await iconMaskable(512)],
    ["apple-touch-icon.png", await iconAny(180)],
  ];

  for (const [name, buffer] of outputs) {
    const dest = path.join(outDir, name);
    await writeFile(dest, buffer);
    console.log(`wrote ${path.relative(root, dest)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
