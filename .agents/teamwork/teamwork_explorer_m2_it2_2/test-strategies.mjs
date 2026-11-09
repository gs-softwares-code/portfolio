import { chromium } from 'playwright';

async function testStrategies() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const vps = [320, 360, 375, 390, 412, 480, 640, 768, 1024, 1280, 1440, 1920];

  console.log('Testing Strategies across all viewports...\n');

  // Strategy A: Only hide node.role on < sm
  console.log('=== STRATEGY A: Hide node.role on < sm only (keep center translate) ===');
  for (const w of vps) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    const r = await page.evaluate((width) => {
      // Simulate hiding role on < 640px
      const isMobile = width < 640;
      const roleEls = document.querySelectorAll('[role="button"][aria-label*="Status:"] .pointer-events-none p:last-child');
      roleEls.forEach(el => {
        if (isMobile) el.style.display = 'none';
      });

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
    }, w);

    console.log(`VP ${w.toString().padStart(4)}px: canvas=${r.canvasW}px | clipped=${r.clippedCount}/5 | maxClip=${r.maxClip}px ${r.details.length > 0 ? JSON.stringify(r.details) : 'NONE'}`);
  }

  // Strategy B: Directional Alignment (left-aligned for left nodes, right-aligned for right nodes, center for orch)
  // PLUS hide node.role on < sm
  console.log('\n=== STRATEGY B: Directional Alignment + Hide role on < sm ===');
  for (const w of vps) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    const r = await page.evaluate((width) => {
      const isMobile = width < 640;
      const c = document.querySelector('div.select-none.overflow-hidden');
      const cRect = c.getBoundingClientRect();
      const nodeContainers = Array.from(document.querySelectorAll('div.absolute.z-20'));

      nodeContainers.forEach(container => {
        const leftStyle = container.style.left;
        const leftPct = parseFloat(leftStyle);
        const button = container.querySelector('[role="button"]');
        const label = button.querySelector('.pointer-events-none');
        const role = label.querySelector('p:last-child');

        if (isMobile) {
          role.style.display = 'none';
        }

        // Apply directional positioning to label
        // The container is centered at node.x, node.y.
        // If leftPct < 35 (Ingestion, Sentinel): shift label rightwards (e.g. left: 0 instead of centered)
        // If leftPct > 65 (Reasoning, Execution): shift label leftwards (e.g. right: 0 instead of centered)
        // Center node (leftPct ~ 50): keep centered
        if (leftPct < 35) {
          label.style.marginLeft = '0px';
          // Align label's left with the button/circle or shift right
          // If button is items-center, let's set alignment
          button.style.alignItems = 'flex-start';
        } else if (leftPct > 65) {
          button.style.alignItems = 'flex-end';
        } else {
          button.style.alignItems = 'center';
        }
      });

      let maxClip = 0;
      let clippedCount = 0;
      const details = [];

      const nodeEls = Array.from(document.querySelectorAll('[role="button"][aria-label*="Status:"]'));
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
    }, w);

    console.log(`VP ${w.toString().padStart(4)}px: canvas=${r.canvasW}px | clipped=${r.clippedCount}/5 | maxClip=${r.maxClip}px ${r.details.length > 0 ? JSON.stringify(r.details) : 'NONE'}`);
  }

  await browser.close();
}

testStrategies().catch(console.error);
