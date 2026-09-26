import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

// Rasterize the Open Graph source SVG into a PNG served from /images/.
//
// Runs before `vite build` (prebuild), writing into `public/images/` so Vite
// copies the PNG into `dist/`. Container builds bind-mount `public/`
// read-only and copy it into the writable layer first (see Dockerfile).
//
// The self-hosted fonts are passed explicitly: resvg does not fetch fonts
// over the network, so without them the SVG's font-family declarations
// silently fall back to a default family and the PNG no longer matches the
// browser rendering.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "public/images/og-image.svg");
const output = resolve(root, "public/images/og-image.png");
const fontDir = resolve(root, "public/assets/fonts");

const svg = readFileSync(source, "utf8");
const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: {
    fontDirs: [fontDir],
    loadSystemFonts: false,
    defaultFontFamily: "Space Grotesk",
  },
})
  .render()
  .asPng();

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, png);
console.log(`built ${output} (${png.length} bytes)`);
