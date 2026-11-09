import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  for (const w of [320, 360, 375, 390]) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    const metrics = await page.evaluate(() => {
      const taskSpan = document.querySelector('span.text-text-secondary.truncate');
      const taskContainer = taskSpan ? taskSpan.parentElement : null;
      const spanRect = taskSpan ? taskSpan.getBoundingClientRect() : null;
      const containerRect = taskContainer ? taskContainer.getBoundingClientRect() : null;
      return {
        containerRight: containerRect ? containerRect.right : 0,
        containerWidth: containerRect ? containerRect.width : 0,
        spanRight: spanRect ? spanRect.right : 0,
        spanWidth: spanRect ? spanRect.width : 0,
        overflow: spanRect && containerRect ? spanRect.right - containerRect.right : 0
      };
    });

    console.log(`Viewport ${w}px: Container width=${metrics.containerWidth.toFixed(1)}px, right=${metrics.containerRight.toFixed(1)}px | Span width=${metrics.spanWidth.toFixed(1)}px, right=${metrics.spanRight.toFixed(1)}px | Overflow=${metrics.overflow.toFixed(1)}px`);
  }

  await browser.close();
})();
