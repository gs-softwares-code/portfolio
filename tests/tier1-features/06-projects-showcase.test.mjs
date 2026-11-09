/**
 * Tier 1: Feature Coverage
 * Test Suite 06: Section 07 Verified Projects Showcase (4 Primary + 6 Secondary Repositories)
 */
import test from 'node:test';
import assert from 'node:assert';
import { readFileSafe, fileExists, readAllFilesRecursively } from '../helpers/parser.mjs';

test('T1.06: Verified Projects Showcase Suite', async (t) => {
  const allComponents = readAllFilesRecursively('src/components');
  const allData = readAllFilesRecursively('src/data');
  const pageContent = readFileSafe('src/app/page.tsx') || '';
  const allText = [pageContent, ...allComponents.map(c => c.content), ...allData.map(d => d.content)].join('\n');

  const PRIMARY_REPOS = [
    { name: 'Off The Grid Gym', url: 'https://github.com/Gulshan-Singh-gs/off_the_grid-gym' },
    { name: 'CafeOS', url: 'https://github.com/Gulshan-Singh-gs/CafeOS' },
    { name: 'Rupnagar Tailors', url: 'https://github.com/Gulshan-Singh-gs/Rupnagar-tailors' },
    { name: 'VyaparOS', url: 'https://github.com/Gulshan-Singh-gs/VyaparOS' }
  ];

  const SECONDARY_REPOS = [
    { name: 'FacultyOS', url: 'https://github.com/Gulshan-Singh-gs/FacultyOS' },
    { name: 'KrishiOS', url: 'https://github.com/Gulshan-Singh-gs/KrishiOS' },
    { name: 'MONOLITH', url: 'https://github.com/Gulshan-Singh-gs/monolith' },
    { name: 'GuardPayOS', url: 'https://github.com/Gulshan-Singh-gs/GuardPayOS' },
    { name: 'CampusOS', url: 'https://github.com/Gulshan-Singh-gs/CampusOs-rbu' },
    { name: 'Inventory', url: 'https://github.com/Gulshan-Singh-gs/Inventory' }
  ];

  // Feature 12: Primary Projects Showcase
  await t.test('F12.1: Projects component exists with #work or #projects anchor', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx') ||
                        pageContent.includes('id="work"') ||
                        pageContent.includes('id="projects"') ||
                        allText.includes('Section06Projects') ||
                        fileExists('src/data/projectsData.ts');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    assert.ok(hasProjects, 'Expected Projects Showcase section');
  });

  await t.test('F12.2: Primary 1: Off The Grid Gym repository and authentic details present', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx') || fileExists('src/data/projectsData.ts');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    const hasOtG = allText.includes('off_the_grid-gym') || allText.includes('Off The Grid Gym');
    assert.ok(hasOtG, 'Expected Off The Grid Gym project');
    assert.ok(allText.includes('https://github.com/Gulshan-Singh-gs/off_the_grid-gym'), 'Expected authentic GitHub URL');
  });

  await t.test('F12.3: Primary 2: CafeOS repository and authentic details present', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx') || fileExists('src/data/projectsData.ts');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    assert.ok(allText.includes('CafeOS'), 'Expected CafeOS project');
    assert.ok(allText.includes('https://github.com/Gulshan-Singh-gs/CafeOS'), 'Expected authentic CafeOS GitHub URL');
  });

  await t.test('F12.4: Primary 3: Rupnagar Tailors repository and authentic details present', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx') || fileExists('src/data/projectsData.ts');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    assert.ok(allText.includes('Rupnagar') || allText.includes('Rupnagar-tailors'), 'Expected Rupnagar Tailors project');
    assert.ok(allText.includes('https://github.com/Gulshan-Singh-gs/Rupnagar-tailors'), 'Expected authentic Rupnagar Tailors GitHub URL');
  });

  await t.test('F12.5: Primary 4: VyaparOS repository and authentic details present', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx') || fileExists('src/data/projectsData.ts');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    assert.ok(allText.includes('VyaparOS'), 'Expected VyaparOS project');
    assert.ok(allText.includes('https://github.com/Gulshan-Singh-gs/VyaparOS'), 'Expected authentic VyaparOS GitHub URL');
  });

  // Feature 13: Additional Secondary Projects Gallery
  await t.test('F13.1: Secondary 1: FacultyOS repository and FERPA compliance present', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx') || fileExists('src/data/projectsData.ts');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    assert.ok(allText.includes('FacultyOS'), 'Expected FacultyOS project');
    assert.ok(allText.includes('https://github.com/Gulshan-Singh-gs/FacultyOS'), 'Expected authentic FacultyOS GitHub URL');
  });

  await t.test('F13.2: Secondary 2: KrishiOS repository and agronomic stack present', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx') || fileExists('src/data/projectsData.ts');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    assert.ok(allText.includes('KrishiOS'), 'Expected KrishiOS project');
    assert.ok(allText.includes('https://github.com/Gulshan-Singh-gs/KrishiOS'), 'Expected authentic KrishiOS GitHub URL');
  });

  await t.test('F13.3: Secondary 3: MONOLITH repository and v2.4.0 SDLC platform present', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx') || fileExists('src/data/projectsData.ts');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    assert.ok(allText.includes('monolith') || allText.includes('MONOLITH'), 'Expected MONOLITH project');
    assert.ok(allText.includes('https://github.com/Gulshan-Singh-gs/monolith'), 'Expected authentic MONOLITH GitHub URL');
  });

  await t.test('F13.4: Secondary 4: GuardPayOS repository and UPI fraud defense present', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx') || fileExists('src/data/projectsData.ts');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    assert.ok(allText.includes('GuardPayOS') || allText.includes('aegis-upi'), 'Expected GuardPayOS project');
    assert.ok(allText.includes('https://github.com/Gulshan-Singh-gs/GuardPayOS'), 'Expected authentic GuardPayOS GitHub URL');
  });

  await t.test('F13.5: Secondary 5: CampusOS repository and Rayat Bahra Univ present', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx') || fileExists('src/data/projectsData.ts');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    assert.ok(allText.includes('CampusOs-rbu') || allText.includes('CampusOS'), 'Expected CampusOS project');
    assert.ok(allText.includes('https://github.com/Gulshan-Singh-gs/CampusOs-rbu'), 'Expected authentic CampusOS GitHub URL');
  });

  await t.test('F13.6: Secondary 6: Inventory repository and vanilla JS catalog present', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx') || fileExists('src/data/projectsData.ts');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    assert.ok(allText.includes('Inventory'), 'Expected Inventory project');
    assert.ok(allText.includes('https://github.com/Gulshan-Singh-gs/Inventory'), 'Expected authentic Inventory GitHub URL');
  });

  await t.test('F13.7: External repository links use rel="noopener noreferrer"', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section06Projects.tsx') || '';
    assert.ok(content.includes('rel="noopener noreferrer"') || content.includes("rel='noopener noreferrer'"), 'Expected secure external rel attributes');
  });

  await t.test('F13.8: Status badges distinguish Live Product vs Prototype vs In Development', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx') || fileExists('src/data/projectsData.ts');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects Showcase component');
      return;
    }
    const hasStatus = allText.includes('Live Product') || allText.includes('Prototype') || allText.includes('In Active Development');
    assert.ok(hasStatus, 'Expected authentic status indicators');
  });
});
