import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const styleInfo = await page.evaluate(() => {
    const span = document.querySelector('span.text-text-secondary.truncate');
    const childSpan = span ? span.querySelector('span') : null;
    const computed = span ? window.getComputedStyle(span) : null;
    const childComputed = childSpan ? window.getComputedStyle(childSpan) : null;
    return {
      spanTag: span ? span.tagName : null,
      display: computed ? computed.display : null,
      textOverflow: computed ? computed.textOverflow : null,
      overflow: computed ? computed.overflow : null,
      whiteSpace: computed ? computed.whiteSpace : null,
      scrollWidth: span ? span.scrollWidth : 0,
      clientWidth: span ? span.clientWidth : 0,
      hasEllipsisTriggered: span ? span.scrollWidth > span.clientWidth : false
    };
  });

  console.log('--- TASK SPAN TRUNCATION STYLING ---');
  console.log(JSON.stringify(styleInfo, null, 2));

  await browser.close();
})();
