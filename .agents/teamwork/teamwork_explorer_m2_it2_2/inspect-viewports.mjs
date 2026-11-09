import { chromium } from 'playwright';

async function inspectAll() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const vps = [320, 360, 375, 390, 412, 480, 640, 768, 1024, 1280, 1440, 1920];
  console.log('=== FULL VIEWPORT SWEEP (BASELINE) ===');

  for (const w of vps) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    const r = await page.evaluate(() => {
      const c = document.querySelector('div.select-none.overflow-hidden');
      const cRect = c.getBoundingClientRect();
      const nodeEls = Array.from(document.querySelectorAll('[role="button"][aria-label*="Status:"]'));
      let maxClip = 0;
      let clippedCount = 0;
      const details = [];

      nodeEls.forEach(el => {
        const l = el.querySelector('.pointer-events-none');
        const rect = l ? l.getBoundingClientRect() : null;
        if (!rect) return;
        const cLeft = Math.max(0, cRect.left - rect.left);
        const cRight = Math.max(0, rect.right - cRect.right);
        if (cLeft > 0.5 || cRight > 0.5) {
          clippedCount++;
          details.push({
            name: el.getAttribute('aria-label').split('(')[0].trim(),
            cLeft: Math.round(cLeft * 10) / 10,
            cRight: Math.round(cRight * 10) / 10
          });
        }
        maxClip = Math.max(maxClip, cLeft, cRight);
      });

      return { canvasW: Math.round(cRect.width), clippedCount, maxClip: Math.round(maxClip * 10) / 10, details };
    });

    console.log(`VP ${w.toString().padStart(4)}px: canvas=${r.canvasW}px | clipped=${r.clippedCount}/5 | maxClip=${r.maxClip}px ${r.details.length > 0 ? JSON.stringify(r.details) : 'NONE'}`);
  }

  await browser.close();
}

inspectAll().catch(console.error);
