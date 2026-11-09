import { chromium } from 'playwright';

async function testAnchoring() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const vps = [320, 360, 375, 390, 412, 480, 640, 768, 1024, 1280, 1440, 1920];

  console.log('=== TEST: PROPOSED DECOUPLED + DIRECTIONAL ANCHORING + MOBILE COMPACT ===\n');

  for (const w of vps) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    // small settle
    await page.waitForTimeout(100);

    const r = await page.evaluate((width) => {
      const isMobile = width < 640;
      const c = document.querySelector('div.select-none.overflow-hidden');
      if (!c) return { error: 'canvas not found', bodyLen: document.body.innerHTML.length };
      const cRect = c.getBoundingClientRect();
      const nodeContainers = Array.from(document.querySelectorAll('div.absolute.z-20'));

      nodeContainers.forEach(container => {
        const leftPct = parseFloat(container.style.left);
        const button = container.querySelector('[role="button"]');
        if (!button) return;
        const circle = button.querySelector('div:first-child');
        const label = button.querySelector('.pointer-events-none');
        if (!label) return;
        const role = label.querySelector('p:last-child');

        // 1. Mobile role hiding
        if (role) {
          if (isMobile) {
            role.style.display = 'none';
          } else {
            role.style.display = 'block';
          }
        }

        // 2. Decouple circle center from label (Defect 1 fix)
        button.style.position = 'relative';
        label.style.position = 'absolute';
        label.style.top = '100%';
        label.style.marginTop = '6px';
        label.style.zIndex = '30';

        // 3. Directional anchoring (Defect 2 fix)
        if (leftPct < 35) {
          // Left-side nodes (Ingestion: 18%, Sentinel: 20%)
          label.style.left = '0';
          label.style.right = 'auto';
          label.style.transform = 'none';
        } else if (leftPct > 65) {
          // Right-side nodes (Reasoning: 82%, Execution: 80%)
          label.style.right = '0';
          label.style.left = 'auto';
          label.style.transform = 'none';
        } else {
          // Center node (Nexus Core: 50%)
          label.style.left = '50%';
          label.style.right = 'auto';
          label.style.transform = 'translateX(-50%)';
        }
      });

      const svg = document.querySelector('svg[viewBox="0 0 100 100"]');
      const svgRect = svg ? svg.getBoundingClientRect() : null;
      let maxCenterDeltaY = 0;
      let maxClip = 0;
      let clippedCount = 0;
      const details = [];

      nodeContainers.forEach(container => {
        const leftPct = parseFloat(container.style.left);
        const topPct = parseFloat(container.style.top);
        const button = container.querySelector('[role="button"]');
        if (!button) return;
        const circle = button.querySelector('div:first-child');
        if (!circle) return;
        const circRect = circle.getBoundingClientRect();
        const label = button.querySelector('.pointer-events-none');
        if (!label) return;
        const lRect = label.getBoundingClientRect();

        if (svgRect) {
          const expX = svgRect.left + (leftPct / 100) * svgRect.width;
          const expY = svgRect.top + (topPct / 100) * svgRect.height;
          const actCenterX = circRect.left + circRect.width / 2;
          const actCenterY = circRect.top + circRect.height / 2;
          const deltaY = Math.abs(expY - actCenterY);
          maxCenterDeltaY = Math.max(maxCenterDeltaY, deltaY);
        }

        const cLeft = Math.max(0, cRect.left - lRect.left);
        const cRight = Math.max(0, lRect.right - cRect.right);
        if (cLeft > 0.5 || cRight > 0.5) {
          clippedCount++;
          details.push({
            name: button.getAttribute('aria-label').split('(')[0].trim(),
            cLeft: Math.round(cLeft * 10) / 10,
            cRight: Math.round(cRight * 10) / 10
          });
        }
        maxClip = Math.max(maxClip, cLeft, cRight);
      });

      return {
        canvasW: Math.round(cRect.width),
        maxCenterDeltaY: Math.round(maxCenterDeltaY * 10) / 10,
        clippedCount,
        maxClip: Math.round(maxClip * 10) / 10,
        details
      };
    }, w);

    if (r.error) {
      console.log(`VP ${w}px: ERROR ${r.error} (bodyLen=${r.bodyLen})`);
    } else {
      console.log(`VP ${w.toString().padStart(4)}px: canvas=${r.canvasW}px | circleDeltaY=${r.maxCenterDeltaY}px | clipped=${r.clippedCount}/5 | maxClip=${r.maxClip}px ${r.details && r.details.length > 0 ? JSON.stringify(r.details) : 'PERFECT (0px clip)'}`);
    }
  }

  await browser.close();
}

testAnchoring().catch(console.error);
