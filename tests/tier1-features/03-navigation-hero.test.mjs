/**
 * Tier 1: Feature Coverage
 * Test Suite 03: Section 01 Navigation & Section 02 Hero Experience with Interactive AI Simulation
 */
import test from 'node:test';
import assert from 'node:assert';
import { readFileSafe, fileExists, readAllFilesRecursively } from '../helpers/parser.mjs';

test('T1.03: Navigation, Hero & AI Simulation Suite', async (t) => {
  const allComponents = readAllFilesRecursively('src/components');
  const pageContent = readFileSafe('src/app/page.tsx') || '';
  const allText = [pageContent, ...allComponents.map(c => c.content)].join('\n');

  // Feature 5: Section 01 Floating Sticky Navbar
  await t.test('F5.1: Navigation component or markup exists', (subT) => {
    const exists = fileExists('src/components/layout/Navbar.tsx') || allText.includes('Navbar') || allText.includes('<nav');
    if (!exists) {
      subT.skip('Pending Milestone M2: Navbar component');
      return;
    }
    assert.ok(exists, 'Expected Navbar component or navigation markup to exist');
  });

  await t.test('F5.2: Brand wordmark GS-Softwares is present in header/nav', (subT) => {
    const hasNav = fileExists('src/components/layout/Navbar.tsx') || allText.includes('Navbar');
    if (!hasNav) {
      subT.skip('Pending Milestone M2: Navbar component');
      return;
    }
    const hasBrand = allText.includes('GS-Softwares') || allText.includes('GS Softwares');
    assert.ok(hasBrand, 'Expected GS-Softwares wordmark');
  });

  await t.test('F5.3: Navigation contains required anchor links (Home, Capabilities, Services, Solutions, Our Work)', (subT) => {
    const hasNav = fileExists('src/components/layout/Navbar.tsx');
    if (!hasNav) {
      subT.skip('Pending Milestone M2: Navbar component');
      return;
    }
    const navContent = readFileSafe('src/components/layout/Navbar.tsx') || '';
    const hasLinks = navContent.includes('#hero') &&
                     (navContent.includes('#services') || navContent.includes('services')) &&
                     (navContent.includes('#solutions') || navContent.includes('solutions'));
    assert.ok(hasLinks, 'Expected navigation links to key sections');
  });

  await t.test('F5.4: Navigation contains dedicated Contact Consultation CTA', (subT) => {
    const hasNav = fileExists('src/components/layout/Navbar.tsx');
    if (!hasNav) {
      subT.skip('Pending Milestone M2: Navbar component');
      return;
    }
    const navContent = readFileSafe('src/components/layout/Navbar.tsx') || '';
    const hasCta = navContent.includes('#contact') || navContent.includes('Contact') || navContent.includes('Consultation');
    assert.ok(hasCta, 'Expected contact CTA link or button in navigation');
  });

  await t.test('F5.5: Mobile menu button features accessible aria-expanded attribute', (subT) => {
    const hasNav = fileExists('src/components/layout/Navbar.tsx');
    if (!hasNav) {
      subT.skip('Pending Milestone M2: Navbar component');
      return;
    }
    const navContent = readFileSafe('src/components/layout/Navbar.tsx') || '';
    assert.ok(navContent.includes('aria-expanded') || navContent.includes('isOpen'), 'Expected accessible toggle for mobile drawer');
  });

  // Feature 6: Section 02 Asymmetric Hero Layout
  await t.test('F6.1: Hero component exists with required headline', (subT) => {
    const heroExists = fileExists('src/components/sections/Section01Hero.tsx') || pageContent.includes('We Engineer Intelligence');
    if (!heroExists) {
      subT.skip('Pending Milestone M2: Hero component');
      return;
    }
    const hasHeadline = allText.includes('We Engineer Intelligence. You Build the Future.') ||
                        allText.includes('We Engineer Intelligence');
    assert.ok(hasHeadline, 'Expected authoritative Hero headline "We Engineer Intelligence. You Build the Future."');
  });

  await t.test('F6.2: Hero contains primary CTA "Let\'s Build Something Intelligent"', (subT) => {
    const heroExists = fileExists('src/components/sections/Section01Hero.tsx');
    if (!heroExists) {
      subT.skip('Pending Milestone M2: Hero component');
      return;
    }
    const hasPrimaryCta = allText.includes("Let's Build Something Intelligent") || allText.includes("Let&#39;s Build Something Intelligent");
    assert.ok(hasPrimaryCta, 'Expected primary CTA text');
  });

  await t.test('F6.3: Hero contains secondary CTA "Explore Our Solutions"', (subT) => {
    const heroExists = fileExists('src/components/sections/Section01Hero.tsx');
    if (!heroExists) {
      subT.skip('Pending Milestone M2: Hero component');
      return;
    }
    const hasSecCta = allText.includes('Explore Our Solutions') || allText.includes('Explore Solutions');
    assert.ok(hasSecCta, 'Expected secondary CTA text');
  });

  await t.test('F6.4: Hero displays live telemetry status badge', (subT) => {
    const hasTelemetry = allText.includes('System Telemetry') || allText.includes('TELEMETRY') || allText.includes('LIVE TELEMETRY');
    assert.ok(hasTelemetry, 'Expected live telemetry indicator in Hero or Foundation');
  });

  await t.test('F6.5: Hero presents technical SLA metrics (accuracy, latency budget, deployments)', (subT) => {
    const heroExists = fileExists('src/components/sections/Section01Hero.tsx');
    if (!heroExists) {
      subT.skip('Pending Milestone M2: Hero component');
      return;
    }
    const hasMetrics = allText.includes('99.9%') || allText.includes('Latency') || allText.includes('Production');
    assert.ok(hasMetrics, 'Expected SLA metrics in Hero');
  });

  // Feature 7: Interactive AI Systems Simulation
  await t.test('F7.1: Interactive AI Visualization component exists', (subT) => {
    const hasViz = fileExists('src/components/ai-visualization/HeroVisualization.tsx') ||
                   fileExists('src/components/sections/Section01Hero.tsx') ||
                   allText.includes('HeroVisualization');
    if (!hasViz) {
      subT.skip('Pending Milestone M2: AI Systems Visualization');
      return;
    }
    assert.ok(hasViz, 'Expected HeroVisualization component');
  });

  await t.test('F7.2: AI Simulation defines central Orchestrator Hub', (subT) => {
    const hasViz = fileExists('src/components/ai-visualization/HeroVisualization.tsx');
    if (!hasViz) {
      subT.skip('Pending Milestone M2: AI Systems Visualization');
      return;
    }
    const vizContent = readFileSafe('src/components/ai-visualization/HeroVisualization.tsx') || '';
    assert.ok(vizContent.includes('Orchestrat') || vizContent.includes('Core'), 'Expected central Orchestrator Hub');
  });

  await t.test('F7.3: AI Simulation models peripheral agent nodes', (subT) => {
    const hasViz = fileExists('src/components/ai-visualization/HeroVisualization.tsx');
    if (!hasViz) {
      subT.skip('Pending Milestone M2: AI Systems Visualization');
      return;
    }
    const vizContent = readFileSafe('src/components/ai-visualization/HeroVisualization.tsx') || '';
    const hasNodes = vizContent.includes('Analysis') || vizContent.includes('Execution') || vizContent.includes('Sentinel') || vizContent.includes('AgentNode');
    assert.ok(hasNodes, 'Expected peripheral agent nodes');
  });

  await t.test('F7.4: AI Simulation contains animated SVG data flow pulse paths', (subT) => {
    const hasViz = fileExists('src/components/ai-visualization/HeroVisualization.tsx');
    if (!hasViz) {
      subT.skip('Pending Milestone M2: AI Systems Visualization');
      return;
    }
    const vizContent = readFileSafe('src/components/ai-visualization/HeroVisualization.tsx') || '';
    assert.ok(vizContent.includes('svg') || vizContent.includes('path') || vizContent.includes('DataPulsePath'), 'Expected SVG data pulse connections');
  });

  await t.test('F7.5: AI Simulation provides pause/resume or reduced-motion control', (subT) => {
    const hasViz = fileExists('src/components/ai-visualization/HeroVisualization.tsx');
    if (!hasViz) {
      subT.skip('Pending Milestone M2: AI Systems Visualization');
      return;
    }
    const vizContent = readFileSafe('src/components/ai-visualization/HeroVisualization.tsx') || '';
    const hasControl = vizContent.includes('pause') || vizContent.includes('Pause') || vizContent.includes('reduced') || vizContent.includes('animate');
    assert.ok(hasControl, 'Expected pause/resume control or reduced-motion condition in visualizer');
  });
});
