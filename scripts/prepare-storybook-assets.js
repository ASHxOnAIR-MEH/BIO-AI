const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const pagesDir = path.join(process.cwd(), 'public', 'storybook', 'pages');
  const storybookDir = path.join(process.cwd(), 'public', 'storybook');

  const mapping = {
    1: 'page no 1.png',
    2: 'page no 2.png',
    3: 'page no 3.png',
    4: 'page no 4.png',
    5: 'page no 5.png',
    6: 'page no 6.png',
    7: 'page no 7.png',
    8: null, // missing!
    9: 'page 9.png',
    10: 'page 10.png',
    11: 'page 11.png',
    12: 'page no 12.png',
    13: 'page no 13.png',
    14: 'page no 14.png',
    15: 'page no 15.png',
    16: 'page no 16.png',
    17: 'page no 17.png',
    18: 'page no 18.png',
    19: 'page no 19.png',
    20: 'page no 20.png',
    21: 'page no 21.png',
    22: 'page no 22.png',
    23: 'page no 23.png',
    24: 'page no 24.png',
    25: 'page no 25.png',
    26: null, // missing!
    27: 'page no 27.png',
    28: 'page no 28.png',
    29: 'page no 29.png',
    30: 'page no 30.png'
  };

  // Convert cover
  const coverPath = path.join(storybookDir, 'cover.png');
  if (fs.existsSync(coverPath)) {
    const meta = await sharp(coverPath).metadata();
    console.log('Cover PNG:', meta.width, 'x', meta.height, 'Aspect Ratio:', (meta.height / meta.width).toFixed(2));
    await sharp(coverPath).webp({ quality: 85 }).toFile(path.join(storybookDir, 'cover.webp'));
    console.log('Cover WebP generated.');
  }

  const results = [];

  for (let i = 1; i <= 30; i++) {
    const numStr = String(i).padStart(2, '0');
    const targetPng = path.join(pagesDir, `page-${numStr}.png`);
    const targetWebp = path.join(pagesDir, `page-${numStr}.webp`);
    const srcName = mapping[i];

    if (!srcName) {
      console.log(`Page ${i}: MISSING! (page-${numStr}.png)`);
      results.push({ pageNumber: i, status: 'missing', filename: `page-${numStr}.png` });
      continue;
    }

    const srcPath = path.join(pagesDir, srcName);
    if (!fs.existsSync(srcPath)) {
      console.log(`Page ${i}: Source file ${srcName} not found!`);
      results.push({ pageNumber: i, status: 'missing', filename: `page-${numStr}.png` });
      continue;
    }

    if (srcPath !== targetPng) {
      fs.copyFileSync(srcPath, targetPng);
    }

    const meta = await sharp(targetPng).metadata();
    await sharp(targetPng).webp({ quality: 85 }).toFile(targetWebp);
    console.log(`Page ${numStr}: ${meta.width}x${meta.height} (ratio: ${(meta.height / meta.width).toFixed(2)}) - OK`);
    results.push({
      pageNumber: i,
      status: 'present',
      filename: `page-${numStr}.png`,
      webp: `page-${numStr}.webp`,
      dimensions: `${meta.width}x${meta.height}`,
      aspectRatio: (meta.height / meta.width).toFixed(2)
    });
  }

  fs.writeFileSync(path.join(process.cwd(), 'scripts', 'assets-report.json'), JSON.stringify(results, null, 2));
  console.log('Asset preparation complete. Report saved to scripts/assets-report.json');
}

run().catch(console.error);

