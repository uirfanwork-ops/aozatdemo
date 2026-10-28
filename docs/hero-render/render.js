const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + __dirname + '/scene.html');
  fs.mkdirSync('frames', { recursive: true });
  const fps = 30, secs = 14, n = fps * secs;
  for (let i = 0; i < n; i++) {
    const data = await p.evaluate((t) => window.renderFrame(t), i / fps);
    fs.writeFileSync(`frames/f${String(i).padStart(4, '0')}.jpg`, Buffer.from(data.split(',')[1], 'base64'));
  }
  await b.close();
  console.log('frames', n);
})();
