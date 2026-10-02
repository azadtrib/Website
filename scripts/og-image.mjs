import sharp from "sharp";

// Builds public/og.png, the 1200x630 preview shown when the site is shared on
// WhatsApp, iMessage, X, etc. Re-run with `node scripts/og-image.mjs` after
// changing the hero photo or tagline.
// Keep the size in the caption below in step with BOTTLE_SIZE in src/lib/products.js.
const W = 1200;
const H = 630;

const hero = await sharp("public/hero.png").resize({ height: H }).toBuffer();
const logo = await sharp("public/brand/logo.png").resize({ height: 56 }).toBuffer();
const heroMeta = await sharp(hero).metadata();

const text = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <g font-family="Helvetica, Arial, sans-serif" fill="#e8e6e3">
    <text x="64" y="200" font-size="20" letter-spacing="6" fill="#c98a5c" font-weight="700">PRE-ORDERS OPEN</text>
    <text x="64" y="275" font-size="52" font-weight="700">Grooming</text>
    <text x="64" y="340" font-size="52" font-weight="700">shouldn't feel like</text>
    <text x="64" y="405" font-size="52" font-weight="700" fill-opacity="0.45">another job.</text>
    <text x="64" y="475" font-size="26" fill-opacity="0.7">Starting with beard oil.</text>
  </g>
</svg>`);

await sharp({
  create: { width: W, height: H, channels: 4, background: "#0b0b0c" },
})
  .composite([
    { input: hero, left: W - heroMeta.width, top: 0 },
    { input: text, left: 0, top: 0 },
    { input: logo, left: 64, top: 80 },
  ])
  .png()
  .toFile("public/og.png");

console.log("wrote public/og.png");
