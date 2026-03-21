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
  body {
    width: 3168px;
    height: 792px;
    background: #faf9f7;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 200px 0 560px;
    position: relative;
    overflow: hidden;
  }
  body::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: 
      radial-gradient(ellipse at 20% 50%, rgba(200, 178, 155, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 50%, rgba(188, 164, 138, 0.06) 0%, transparent 50%);
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    z-index: 1;
  }
  .accent-line {
    width: 100px;
    height: 4px;
    background: #9e7d52;
    margin-bottom: 44px;
    opacity: 0.7;
  }
  .tagline {
    font-family: 'Canela', serif;
    font-weight: 400;
    font-size: 110px;
    color: #181613;
    letter-spacing: -0.01em;
    line-height: 1.15;
    margin-bottom: 32px;
  }
  .tagline em {
    font-style: italic;
  }
  .subtitle {
    font-family: 'Sohne', sans-serif;
    font-weight: 500;
    font-size: 38px;
    color: #78726a;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="content">
    <div class="accent-line"></div>
    <div class="tagline">I design and build <em>software.</em></div>
    <div class="subtitle">Architecture · Design · Engineering</div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 3168, height: 792, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 800));
const outputPath = join(__dirname, '../linkedin-banner.png');
await page.screenshot({ path: outputPath, type: 'png' });
await browser.close();
console.log('LinkedIn banner generated:', outputPath);
