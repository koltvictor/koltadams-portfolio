import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(__dirname, '../public/fonts');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  @font-face { font-family: 'Canela'; src: url('file://${fontsDir}/Canela-Regular-Web.woff2') format('woff2'); font-weight: 400; }
  @font-face { font-family: 'Canela'; src: url('file://${fontsDir}/Canela-Medium-Web.woff2') format('woff2'); font-weight: 500; }
  @font-face { font-family: 'Sohne'; src: url('file://${fontsDir}/soehne-buch.woff2') format('woff2'); font-weight: 400; }
  @font-face { font-family: 'Sohne'; src: url('file://${fontsDir}/soehne-kraftig.woff2') format('woff2'); font-weight: 500; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #faf9f7; display: flex; align-items: center; padding: 80px 100px; position: relative; overflow: hidden; }
  .content { display: flex; flex-direction: column; gap: 24px; max-width: 700px; }
  .eyebrow { font-family: 'Sohne', sans-serif; font-weight: 500; font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; color: #9e7d52; }
  .name { font-family: 'Canela', serif; font-weight: 400; font-size: 72px; line-height: 1.05; letter-spacing: -0.02em; color: #181613; }
  .title { font-family: 'Sohne', sans-serif; font-weight: 400; font-size: 20px; color: #78726a; line-height: 1.6; max-width: 520px; }
  .url { font-family: 'Sohne', sans-serif; font-weight: 400; font-size: 13px; letter-spacing: 0.06em; color: #a09890; margin-top: 8px; }
  .rule { position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: #9e7d52; }
</style>
</head>
<body>
  <div class="content">
    <span class="eyebrow">Fractional CTO & Product Engineer</span>
    <h1 class="name">Kolt Adams</h1>
    <p class="title">I build AI-native products end-to-end — architecture, design, and engineering.</p>
    <span class="url">koltadams.com</span>
  </div>
  <div class="rule"></div>
</body>
</html>`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 800));
const outputPath = join(__dirname, '../public/images/og-image.jpg');
await page.screenshot({ path: outputPath, type: 'jpeg', quality: 95 });
await browser.close();
console.log('OG image generated:', outputPath);
