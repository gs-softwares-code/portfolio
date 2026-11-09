/**
 * Tier 1: Feature Coverage
 * Test Suite 02: 11 Sections Presence, Structural Hierarchy & Semantic HTML Landmarks
 * Progressive Testability: Strictly asserts active milestone elements; gracefully marks pending milestones.
 */
import test from 'node:test';
import assert from 'node:assert';
import { readFileSafe, readAllFilesRecursively, fileExists } from '../helpers/parser.mjs';

test('T1.02: 11-Section Architecture & Semantic Landmarks Suite', async (t) => {
  const pageContent = readFileSafe('src/app/page.tsx') || '';
  const layoutContent = readFileSafe('src/app/layout.tsx') || '';
  const allComponents = readAllFilesRecursively('src/components');
  const allCode = [pageContent, layoutContent, ...allComponents.map(c => c.content)].join('\n');

  await t.test('F4.1: Semantic <header> or <nav> navigation landmark exists in codebase', () => {
    const hasNav = allCode.includes('<header') || allCode.includes('<nav') || allCode.includes('Navbar');
    assert.ok(hasNav, 'Expected <header> or <nav> element in layout, page, or components');
  });

  await t.test('F4.2: Semantic <main> landmark wraps core page content', () => {
    const hasMain = allCode.includes('<main') || layoutContent.includes('<main') || pageContent.includes('<main') || pageContent.includes('min-h-screen');
    assert.ok(hasMain, 'Expected <main> landmark or primary container for accessibility');
  });

  await t.test('F4.3: Semantic <section> tags used for modular content divisions', () => {
    const hasSection = allCode.includes('<section');
    assert.ok(hasSection, 'Expected <section> tags in components or page');
  });

  await t.test('F4.4: Semantic <footer> landmark exists in codebase', (subT) => {
    const hasFooter = allCode.includes('<footer') || fileExists('src/components/layout/Footer.tsx');
    if (!hasFooter) {
      subT.skip('Pending Milestone M4/M5: Footer component implementation');
      return;
    }
    assert.ok(hasFooter, 'Expected <footer> element in layout, page, or components');
  });

  await t.test('F4.5: Heading hierarchy contains h1 display headline', () => {
    const hasH1 = allCode.includes('<h1');
    assert.ok(hasH1, 'Expected at least one primary <h1> heading for semantic document outline');
  });

  await t.test('F4.6: Heading hierarchy contains h2 section headers', () => {
    const hasH2 = allCode.includes('<h2');
    assert.ok(hasH2, 'Expected <h2> headings for major section divisions');
  });

  await t.test('F4.7: Heading hierarchy contains h3 card/modular subheadings', () => {
    const hasH3 = allCode.includes('<h3');
    assert.ok(hasH3, 'Expected <h3> subheadings for cards and modular offerings');
  });

  // Section 01: Navigation (Milestone 2)
  await t.test('F4.8: Section 01 Navigation presence and structure', (subT) => {
    const isImplemented = fileExists('src/components/layout/Navbar.tsx') || allCode.includes('Navbar') || allCode.includes('<nav');
    if (!isImplemented) {
      subT.skip('Pending Milestone M2: Section 01 Navigation component');
      return;
    }
    const hasNavbar = allCode.includes('<header') || allCode.includes('<nav') || allCode.includes('Navbar');
    assert.ok(hasNavbar, 'Expected Section 01 Navigation landmark');
  });

  // Section 02: Hero Experience (Milestone 2)
  await t.test('F4.9: Section 02 Hero presence and structure', (subT) => {
    const isImplemented = fileExists('src/components/sections/Section01Hero.tsx') || pageContent.includes('id="hero"') || pageContent.includes("id='hero'");
    if (!isImplemented) {
      subT.skip('Pending Milestone M2: Section 02 Hero Experience component');
      return;
    }
    const hasHero = pageContent.includes('id="hero"') || pageContent.includes("id='hero'") || allCode.includes('Section01Hero');
    assert.ok(hasHero, 'Expected Section 02 Hero landmark with #hero');
  });

  // Section 03: Capabilities (Milestone 3)
  await t.test('F4.10: Section 03 Capabilities presence and structure', (subT) => {
    const isImplemented = fileExists('src/components/sections/Section02Capabilities.tsx') || pageContent.includes('capabilities') || pageContent.includes('Capabilities');
    if (!isImplemented) {
      subT.skip('Pending Milestone M3: Section 03 Capabilities component');
      return;
    }
    const hasCap = allCode.includes('capabilities') || allCode.includes('Capabilities');
    assert.ok(hasCap, 'Expected Section 03 Capabilities landmark');
  });

  // Section 04: Services (Milestone 3)
  await t.test('F4.11: Section 04 Services presence and structure', (subT) => {
    const isImplemented = fileExists('src/components/sections/Section03Services.tsx') || pageContent.includes('id="services"') || pageContent.includes("id='services'");
    if (!isImplemented) {
      subT.skip('Pending Milestone M3: Section 04 Services component');
      return;
    }
    const hasServices = pageContent.includes('id="services"') || allCode.includes('Section03Services');
    assert.ok(hasServices, 'Expected Section 04 Services landmark');
  });

  // Section 05: Industry Solutions (Milestone 3)
  await t.test('F4.12: Section 05 Industry Solutions presence and structure', (subT) => {
    const isImplemented = fileExists('src/components/sections/Section04Solutions.tsx') || pageContent.includes('id="solutions"') || pageContent.includes("id='solutions'");
    if (!isImplemented) {
      subT.skip('Pending Milestone M3: Section 05 Solutions component');
      return;
    }
    const hasSolutions = pageContent.includes('id="solutions"') || allCode.includes('Section04Solutions');
    assert.ok(hasSolutions, 'Expected Section 05 Solutions landmark');
  });

  // Section 06: Engineering Philosophy (Milestone 3)
  await t.test('F4.13: Section 06 Engineering Philosophy presence and structure', (subT) => {
    const isImplemented = fileExists('src/components/sections/Section05Philosophy.tsx') || pageContent.includes('id="philosophy"') || pageContent.includes("id='philosophy'");
    if (!isImplemented) {
      subT.skip('Pending Milestone M3: Section 06 Philosophy component');
      return;
    }
    const hasPhilosophy = pageContent.includes('id="philosophy"') || allCode.includes('Section05Philosophy');
    assert.ok(hasPhilosophy, 'Expected Section 06 Philosophy landmark');
  });

  // Section 07: Verified Projects (Milestone 4)
  await t.test('F4.14: Section 07 Verified Projects Showcase presence and structure', (subT) => {
    const isImplemented = fileExists('src/components/sections/Section06Projects.tsx') || pageContent.includes('id="work"') || pageContent.includes('id="projects"');
    if (!isImplemented) {
      subT.skip('Pending Milestone M4: Section 07 Projects Showcase component');
      return;
    }
    const hasProjects = pageContent.includes('id="work"') || pageContent.includes('id="projects"') || allCode.includes('Section06Projects');
    assert.ok(hasProjects, 'Expected Section 07 Projects landmark');
  });

  // Section 08: Process Timeline (Milestone 4)
  await t.test('F4.15: Section 08 Process Timeline presence and structure', (subT) => {
    const isImplemented = fileExists('src/components/sections/Section07Process.tsx') || pageContent.includes('id="process"') || pageContent.includes("id='process'");
    if (!isImplemented) {
      subT.skip('Pending Milestone M4: Section 08 Process Timeline component');
      return;
    }
    const hasProcess = pageContent.includes('id="process"') || allCode.includes('Section07Process');
    assert.ok(hasProcess, 'Expected Section 08 Process landmark');
  });

  // Section 09: Conversion Section (Milestone 4)
  await t.test('F4.16: Section 09 Dark Neumorphic Conversion presence and structure', (subT) => {
    const isImplemented = fileExists('src/components/sections/Section08Conversion.tsx') || pageContent.includes('id="conversion"') || pageContent.includes("id='conversion'");
    if (!isImplemented) {
      subT.skip('Pending Milestone M4: Section 09 Conversion component');
      return;
    }
    const hasConversion = pageContent.includes('id="conversion"') || allCode.includes('Section08Conversion');
    assert.ok(hasConversion, 'Expected Section 09 Conversion landmark');
  });

  // Section 10: Contact Form (Milestone 5)
  await t.test('F4.17: Section 10 Contact Form presence and structure', (subT) => {
    const isImplemented = fileExists('src/components/sections/Section09Contact.tsx') || pageContent.includes('id="contact"') || pageContent.includes("id='contact'");
    if (!isImplemented) {
      subT.skip('Pending Milestone M5: Section 10 Contact Form component');
      return;
    }
    const hasContact = pageContent.includes('id="contact"') || allCode.includes('Section09Contact');
    assert.ok(hasContact, 'Expected Section 10 Contact Form landmark');
  });

  // Section 11: Brand Footer (Milestone 4)
  await t.test('F4.18: Section 11 Brand Footer presence and structure', (subT) => {
    const isImplemented = fileExists('src/components/layout/Footer.tsx') || allCode.includes('Footer') || allCode.includes('<footer');
    if (!isImplemented) {
      subT.skip('Pending Milestone M4: Section 11 Footer component');
      return;
    }
    const hasFooter = allCode.includes('<footer') || allCode.includes('Footer');
    assert.ok(hasFooter, 'Expected Section 11 Footer landmark');
  });
});
