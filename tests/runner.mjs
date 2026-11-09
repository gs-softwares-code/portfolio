#!/usr/bin/env node
/**
 * GS-Softwares: Unified E2E Test Suite Runner
 * Executes all 4 tiers of opaque-box, requirement-driven tests with detailed reporting.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { cleanTestArtifacts } from './helpers/mock-server.mjs';

// Register process exit sweeps
process.on('exit', () => cleanTestArtifacts());
process.on('SIGINT', () => { cleanTestArtifacts(); process.exit(130); });

const ROOT_DIR = process.cwd();
const TESTS_DIR = path.resolve(ROOT_DIR, 'tests');

// ANSI Color Helpers
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

const TIERS = [
  {
    name: 'Tier 1: Feature Coverage',
    dir: 'tier1-features',
    desc: 'Verifies all 18 core features (≥5 tests per feature)'
  },
  {
    name: 'Tier 2: Boundary & Corner Cases',
    dir: 'tier2-boundaries',
    desc: 'Exercises extreme inputs, phone/email bounds, overflow & security'
  },
  {
    name: 'Tier 3: Cross-Feature Combinations',
    dir: 'tier3-combinations',
    desc: 'Tests pairwise feature interactions & concurrent operations'
  },
  {
    name: 'Tier 4: Real-World Scenarios',
    dir: 'tier4-scenarios',
    desc: 'Simulates complete realistic user journeys & audits'
  }
];

function getTestFilesForTier(tierDir) {
  const fullDir = path.resolve(TESTS_DIR, tierDir);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir)
    .filter(f => f.endsWith('.test.mjs'))
    .sort()
    .map(f => path.join('tests', tierDir, f));
}

function runCommand(command, args) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const proc = spawn(command, args, { stdio: ['inherit', 'pipe', 'pipe'], shell: false });
    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => { stderr += d.toString(); });

    proc.on('close', (code) => {
      const duration = Date.now() - startTime;
      resolve({ code, stdout, stderr, duration });
    });
  });
}

async function main() {
  console.log(`\n${colors.bold}${colors.cyan}================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}      GS-Softwares E2E Opaque-Box Test Suite Runner              ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}================================================================${colors.reset}\n`);

  // Clean any stale artifacts from prior runs
  cleanTestArtifacts();

  let totalPassed = 0;
  let totalFailed = 0;
  let totalSkipped = 0;
  let totalTests = 0;
  let hasFailure = false;
  const overallStart = Date.now();

  for (const tier of TIERS) {
    console.log(`${colors.bold}${colors.blue}▶ [RUNNING] ${tier.name}${colors.reset}`);
    console.log(`${colors.dim}  ${tier.desc}${colors.reset}`);

    const files = getTestFilesForTier(tier.dir);
    if (files.length === 0) {
      console.log(`  ${colors.yellow}No test files found in ${tier.dir}${colors.reset}\n`);
      continue;
    }

    for (const file of files) {
      process.stdout.write(`  • ${file} ... `);
      const res = await runCommand(process.execPath, ['--test', file]);

      // Parse counts from output
      const passMatch = res.stdout.match(/ℹ pass (\d+)/);
      const failMatch = res.stdout.match(/ℹ fail (\d+)/);
      const skipMatch = res.stdout.match(/ℹ skipped (\d+)/);
      const testsMatch = res.stdout.match(/ℹ tests (\d+)/);

      const passCount = passMatch ? parseInt(passMatch[1], 10) : 0;
      const failCount = failMatch ? parseInt(failMatch[1], 10) : 0;
      const skipCount = skipMatch ? parseInt(skipMatch[1], 10) : 0;
      const testCount = testsMatch ? parseInt(testsMatch[1], 10) : (passCount + failCount + skipCount);

      totalPassed += passCount;
      totalFailed += failCount;
      totalSkipped += skipCount;
      totalTests += testCount;

      if (res.code === 0 && failCount === 0) {
        console.log(`${colors.green}✔ PASS${colors.reset} ${colors.dim}(${passCount} passed, ${skipCount} skipped/pending, ${res.duration}ms)${colors.reset}`);
      } else {
        hasFailure = true;
        console.log(`${colors.red}✖ FAIL${colors.reset} ${colors.dim}(${failCount} failed)${colors.reset}`);
        console.error(`\n${colors.red}${res.stderr || res.stdout}${colors.reset}\n`);
      }
    }
    console.log('');
  }

  const overallDuration = ((Date.now() - overallStart) / 1000).toFixed(2);

  console.log(`${colors.bold}${colors.cyan}================================================================${colors.reset}`);
  console.log(`${colors.bold}Test Suite Execution Summary:${colors.reset}`);
  console.log(`  Total Assertions / Tests : ${colors.bold}${totalTests}${colors.reset}`);
  console.log(`  Active Tests Passed      : ${colors.green}${colors.bold}${totalPassed}${colors.reset}`);
  console.log(`  Pending Milestone Skipped: ${colors.yellow}${totalSkipped}${colors.reset}`);
  console.log(`  Failed Assertions        : ${totalFailed > 0 ? colors.red : colors.green}${colors.bold}${totalFailed}${colors.reset}`);
  console.log(`  Total Duration           : ${overallDuration}s`);
  console.log(`${colors.bold}${colors.cyan}================================================================${colors.reset}`);

  cleanTestArtifacts();

  if (hasFailure) {
    console.log(`\n${colors.red}${colors.bold}RESULT: FAIL — Some test assertions did not pass.${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}${colors.bold}RESULT: SUCCESS — All active test assertions passed cleanly!${colors.reset}\n`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Test runner fatal error:', err);
  process.exit(1);
});
