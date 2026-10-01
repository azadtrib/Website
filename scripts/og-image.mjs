import sharp from "sharp";

// Builds public/og.png, the 1200x630 preview shown when the site is shared on
// WhatsApp, iMessage, X, etc. Re-run with `node scripts/og-image.mjs` after
// changing the hero photo or tagline.
// Keep the size in the caption below in step with BOTTLE_SIZE in src/lib/products.js.
const W = 1200;
const H = 630;

const hero = await sharp("public/hero.png").resize({ height: H }).toBuffer();
const heroMeta = await sharp(hero).metadata();

const text = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <g font-family="Helvetica, Arial, sans-serif" fill="#efe8e0">
    <text x="72" y="200" font-size="26" letter-spacing="8" fill="#e2a582" font-weight="700">BEARD OIL · 30ML</text>
    <text x="72" y="290" font-size="66" font-weight="700">AZAD BLACK</text>
    <text x="72" y="360" font-size="34" fill-opacity="0.75">Your daily essential.</text>
    <text x="72" y="410" font-size="34" fill-opacity="0.75">Look good. Feel good.</text>
  </g>
</svg>`);

await sharp({
  create: { width: W, height: H, channels: 4, background: "#16130f" },
})
  .composite([
    { input: hero, left: W - heroMeta.width, top: 0 },
    { input: text, left: 0, top: 0 },
  ])
  .png()
  .toFile("public/og.png");

console.log("wrote public/og.png");
