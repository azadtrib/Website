import sharp from "sharp";

// Screen-printed wordmark, not a pasted white label — printed ink on amber
// glass is what these bottles actually look like, and it survives being
// scaled down to a thumbnail far better than fine label detail.
function wordmark({ w, h, opacity = 0.92 }) {
  const cream = "#efe8e0";
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <g opacity="${opacity}" fill="${cream}" font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">
    <text x="${w / 2}" y="${h * 0.42}" font-size="${w * 0.148}" letter-spacing="${w * 0.028}"
          font-weight="600">AZAD</text>
    <text x="${w / 2}" y="${h * 0.70}" font-size="${w * 0.148}" letter-spacing="${w * 0.028}"
          font-weight="600">BLACK</text>
  </g>
  <g opacity="${opacity * 0.8}" fill="${cream}" text-anchor="middle">
    <rect x="${w * 0.30}" y="${h * 0.80}" width="${w * 0.40}" height="${Math.max(1, h * 0.012)}"/>
    <text x="${w / 2}" y="${h * 0.97}" font-size="${w * 0.072}" letter-spacing="${w * 0.022}"
          font-family="Helvetica, Arial, sans-serif">BEARD OIL</text>
  </g>
</svg>`);
}

// One entry per bottle face that should carry the wordmark.
const jobs = [
  {
    file: "qty-1",
    marks: [{ left: 196, top: 330, w: 92, h: 86 }],
  },
  {
    file: "qty-2",
    marks: [
      { left: 243, top: 372, w: 92, h: 86 },
      { left: 140, top: 360, w: 66, h: 62, opacity: 0.7 },
    ],
  },
  {
    file: "qty-3",
    marks: [
      { left: 178, top: 420, w: 92, h: 86 },
      { left: 62, top: 372, w: 62, h: 58, opacity: 0.62 },
      { left: 300, top: 370, w: 62, h: 58, opacity: 0.62 },
    ],
  },
];

for (const job of jobs) {
  const src = `public/products/${job.file}.png`;
  const out = `${process.env.OUT_DIR || "/tmp/brandtest"}/${job.file}.png`;
  await sharp(src)
    .composite(
      job.marks.map((m) => ({
        input: wordmark({ w: m.w, h: m.h, opacity: m.opacity ?? 0.92 }),
        left: m.left,
        top: m.top,
        blend: "over",
      }))
    )
    .png()
    .toFile(out);
  console.log("wrote", out);
}
