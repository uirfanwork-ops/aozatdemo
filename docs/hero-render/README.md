# Hero fallback render

`scene.html` draws a slow orbit over a steel structural frame at dusk on a 1920x1080 canvas. `render.js` captures 420 frames (30 fps, 14 s) with Playwright. Encode with:

```bash
node render.js
ffmpeg -framerate 30 -i frames/f%04d.jpg -c:v libx264 -pix_fmt yuv420p -crf 23 -preset slow -movflags +faststart -an ../../public/hero.mp4
ffmpeg -framerate 30 -i frames/f%04d.jpg -c:v libvpx-vp9 -b:v 0 -crf 34 -an ../../public/hero.webm
ffmpeg -i ../../public/hero.mp4 -ss 6 -frames:v 1 ../../public/hero-poster.jpg
```
