# Implementation Guide: Proposed Test Fixes for Windows File Resilience

This document specifies the precise code modifications for test files and the runner to ensure total test isolation and eliminate assertion drift.

---

## 1. `tests/tier4-scenarios/15-user-journeys.test.mjs`

### Import update (line 11)
```javascript
// Before:
import { validateContactPayload, testPersistInquiry } from '../helpers/mock-server.mjs';

// After:
import { validateContactPayload, testPersistInquiry, safeUnlinkSync } from '../helpers/mock-server.mjs';
```

### J15.1 Fix (lines 41–50)
```javascript
// Before:
    // Step 4: Submission is persisted and returns unique inquiry id
    const testFile = 'data/test_journey_inquiry.json';
    const record = testPersistInquiry(inquiry, testFile);
    assert.ok(record.id.startsWith('inq_'), 'Step 4 Failed: Expected inq_ prefix on generated ID');
    assert.ok(Date.parse(record.receivedAt) > 0, 'Step 4 Failed: Expected valid ISO timestamp');

    // Clean up
    const diskPath = path.resolve(ROOT_DIR, testFile);
    if (fs.existsSync(diskPath)) fs.unlinkSync(diskPath);

// After:
    // Step 4: Submission is persisted and returns unique inquiry id
    const testFile = 'data/test_journey_inquiry.json';
    const diskPath = path.resolve(ROOT_DIR, testFile);
    safeUnlinkSync(diskPath); // Pre-test cleanup

    try {
      const record = testPersistInquiry(inquiry, testFile);
      assert.ok(record.id.startsWith('inq_'), 'Step 4 Failed: Expected inq_ prefix on generated ID');
      assert.ok(Date.parse(record.receivedAt) > 0, 'Step 4 Failed: Expected valid ISO timestamp');
    } finally {
      safeUnlinkSync(diskPath); // Guaranteed post-test cleanup
    }
```

### J15.5 Fix (lines 106–133)
```javascript
// Before:
  // Journey 5: Storage Resiliency & Rapid Form Burst Flow
  await t.test('J15.5: Journey 5: Storage Resiliency Under Rapid Inquiries', () => {
    const burstFile = 'data/test_burst_contacts.json';
    const burstCount = 10;

    for (let i = 1; i <= burstCount; i++) {
      testPersistInquiry({
        fullName: `Burst User ${i}`,
        businessName: `Company ${i}`,
        email: `user${i}@company.com`,
        industry: 'hospitality',
        service: 'ai-agents',
        description: `Rapid test inquiry #${i} testing atomic persistence safety.`
      }, burstFile);
    }

    const diskPath = path.resolve(ROOT_DIR, burstFile);
    assert.ok(fs.existsSync(diskPath));
    const records = JSON.parse(fs.readFileSync(diskPath, 'utf8'));
    assert.strictEqual(records.length, burstCount, `Expected exactly ${burstCount} records in store`);

    // Verify all records have valid unique IDs
    const ids = new Set(records.map(r => r.id));
    assert.strictEqual(ids.size, burstCount, 'All inquiry IDs must be unique');

    // Clean up
    fs.unlinkSync(diskPath);
  });

// After:
  // Journey 5: Storage Resiliency & Rapid Form Burst Flow
  await t.test('J15.5: Journey 5: Storage Resiliency Under Rapid Inquiries', () => {
    const burstFile = 'data/test_burst_contacts.json';
    const burstCount = 10;
    const diskPath = path.resolve(ROOT_DIR, burstFile);

    // Unconditional pre-test cleanup to avoid accumulating records from prior runs
    safeUnlinkSync(diskPath);

    try {
      for (let i = 1; i <= burstCount; i++) {
        testPersistInquiry({
          fullName: `Burst User ${i}`,
          businessName: `Company ${i}`,
          email: `user${i}@company.com`,
          industry: 'hospitality',
          service: 'ai-agents',
          description: `Rapid test inquiry #${i} testing atomic persistence safety.`
        }, burstFile);
      }

      assert.ok(fs.existsSync(diskPath));
      const records = JSON.parse(fs.readFileSync(diskPath, 'utf8'));
      assert.strictEqual(records.length, burstCount, `Expected exactly ${burstCount} records in store`);

      // Verify all records have valid unique IDs
      const ids = new Set(records.map(r => r.id));
      assert.strictEqual(ids.size, burstCount, 'All inquiry IDs must be unique');
    } finally {
      // Guaranteed teardown even if an assertion throws
      safeUnlinkSync(diskPath);
    }
  });
```

---

## 2. `tests/tier1-features/08-contact-form-api.test.mjs`

### Import update (line 10)
```javascript
// Before:
import { validateContactPayload, testPersistInquiry } from '../helpers/mock-server.mjs';

// After:
import { validateContactPayload, testPersistInquiry, safeUnlinkSync } from '../helpers/mock-server.mjs';
```

### F18.6 Fix (lines 148–174)
```javascript
// Before:
  await t.test('F18.6: Data persistence writes inquiry record atomically to disk', () => {
    const testFile = 'data/test_contact_submission.json';
    const payload = {
      fullName: 'Dr. Anita Roy',
      businessName: 'Apex Health Systems',
      email: 'anita@apexhealth.org',
      phone: '+1 555 234 5678',
      industry: 'beauty-wellness',
      service: 'ai-agents',
      description: 'Deploying autonomous triage agents for clinical staff scheduling.'
    };

    const record = testPersistInquiry(payload, testFile);
    assert.ok(record.id.startsWith('inq_'), 'Expected generated submission id starting with inq_');
    assert.ok(record.receivedAt, 'Expected ISO timestamp on received record');
    assert.strictEqual(record.status, 'received');

    // Verify on disk
    const diskPath = path.resolve(ROOT_DIR, testFile);
    assert.ok(fs.existsSync(diskPath), 'Expected file on disk');
    const diskData = JSON.parse(fs.readFileSync(diskPath, 'utf8'));
    assert.ok(Array.isArray(diskData), 'Expected array of records');
    assert.strictEqual(diskData[diskData.length - 1].payload.fullName, 'Dr. Anita Roy');

    // Clean up test file
    fs.unlinkSync(diskPath);
  });

// After:
  await t.test('F18.6: Data persistence writes inquiry record atomically to disk', () => {
    const testFile = 'data/test_contact_submission.json';
    const diskPath = path.resolve(ROOT_DIR, testFile);
    safeUnlinkSync(diskPath); // Pre-test cleanup

    const payload = {
      fullName: 'Dr. Anita Roy',
      businessName: 'Apex Health Systems',
      email: 'anita@apexhealth.org',
      phone: '+1 555 234 5678',
      industry: 'beauty-wellness',
      service: 'ai-agents',
      description: 'Deploying autonomous triage agents for clinical staff scheduling.'
    };

    try {
      const record = testPersistInquiry(payload, testFile);
      assert.ok(record.id.startsWith('inq_'), 'Expected generated submission id starting with inq_');
      assert.ok(record.receivedAt, 'Expected ISO timestamp on received record');
      assert.strictEqual(record.status, 'received');

      // Verify on disk
      assert.ok(fs.existsSync(diskPath), 'Expected file on disk');
      const diskData = JSON.parse(fs.readFileSync(diskPath, 'utf8'));
      assert.ok(Array.isArray(diskData), 'Expected array of records');
      assert.strictEqual(diskData[diskData.length - 1].payload.fullName, 'Dr. Anita Roy');
    } finally {
      safeUnlinkSync(diskPath); // Guaranteed cleanup
    }
  });
```

---

## 3. `tests/tier2-boundaries/12-security-sanitization-boundaries.test.mjs`

### Import update (line 7)
```javascript
// Before:
import { validateContactPayload, testPersistInquiry } from '../helpers/mock-server.mjs';

// After:
import { validateContactPayload, testPersistInquiry, safeUnlinkSync } from '../helpers/mock-server.mjs';
```

### B12.1 Fix (lines 19–30)
```javascript
// Before:
  await t.test('B12.1: XSS script tag injection in full name', () => {
    const malicious = {
      ...baseValidPayload,
      fullName: '<script>alert("xss")</script>'
    };
    // Validating and recording must handle script tags safely without crashing
    const record = testPersistInquiry(malicious, 'data/test_xss_inquiry.json');
    assert.ok(record.id);
    assert.strictEqual(typeof record.payload.fullName, 'string');
    // Ensure the payload doesn't mutate object prototype
    assert.strictEqual(Object.prototype.hasOwnProperty('xss'), false);
  });

// After:
  await t.test('B12.1: XSS script tag injection in full name', () => {
    const testFile = 'data/test_xss_inquiry.json';
    const diskPath = path.resolve(ROOT_DIR, testFile);
    safeUnlinkSync(diskPath);

    const malicious = {
      ...baseValidPayload,
      fullName: '<script>alert("xss")</script>'
    };
    try {
      const record = testPersistInquiry(malicious, testFile);
      assert.ok(record.id);
      assert.strictEqual(typeof record.payload.fullName, 'string');
      assert.strictEqual(Object.prototype.hasOwnProperty('xss'), false);
    } finally {
      safeUnlinkSync(diskPath);
    }
  });
```

### B12.4 Fix (lines 52–61)
```javascript
// Before:
  await t.test('B12.4: SQL injection payload safely stored as inert string', () => {
    const sqlInjection = {
      ...baseValidPayload,
      description: "SELECT * FROM users WHERE '1'='1'; DROP TABLE users; --"
    };
    const res = validateContactPayload(sqlInjection);
    assert.strictEqual(res.valid, true, 'SQL string is accepted as textual description');
    const record = testPersistInquiry(sqlInjection, 'data/test_sql_inquiry.json');
    assert.ok(record.payload.description.includes('DROP TABLE'));
  });

// After:
  await t.test('B12.4: SQL injection payload safely stored as inert string', () => {
    const testFile = 'data/test_sql_inquiry.json';
    const diskPath = path.resolve(ROOT_DIR, testFile);
    safeUnlinkSync(diskPath);

    const sqlInjection = {
      ...baseValidPayload,
      description: "SELECT * FROM users WHERE '1'='1'; DROP TABLE users; --"
    };
    const res = validateContactPayload(sqlInjection);
    assert.strictEqual(res.valid, true, 'SQL string is accepted as textual description');
    try {
      const record = testPersistInquiry(sqlInjection, testFile);
      assert.ok(record.payload.description.includes('DROP TABLE'));
    } finally {
      safeUnlinkSync(diskPath);
    }
  });
```

---

## 4. `tests/tier3-combinations/14-cross-feature-combinations.test.mjs`

### Import update (line 11)
```javascript
// Before:
import { validateContactPayload, testPersistInquiry } from '../helpers/mock-server.mjs';

// After:
import { validateContactPayload, testPersistInquiry, safeUnlinkSync } from '../helpers/mock-server.mjs';
```

### C14.4 Fix (lines 43–67)
```javascript
// Before:
  // Pair 3: Concurrent Form Inquiries + File Storage Atomic Integrity
  await t.test('C14.4: 5 Concurrent inquiries submitted concurrently write cleanly to disk without corruption', async () => {
    const testFile = 'data/test_concurrent_contacts.json';
    const payloads = [ ... ];

    // Execute sequential / rapid atomic writes simulating concurrent burst
    for (const p of payloads) {
      testPersistInquiry(p, testFile);
    }

    const diskPath = path.resolve(ROOT_DIR, testFile);
    assert.ok(fs.existsSync(diskPath));
    const content = JSON.parse(fs.readFileSync(diskPath, 'utf8'));
    assert.strictEqual(content.length, 5, 'All 5 submissions must exist in store');
    assert.strictEqual(content[0].payload.fullName, 'Client One');
    assert.strictEqual(content[4].payload.fullName, 'Client Five');

    // Clean up
    fs.unlinkSync(diskPath);
  });

// After:
  // Pair 3: Concurrent Form Inquiries + File Storage Atomic Integrity
  await t.test('C14.4: 5 Concurrent inquiries submitted concurrently write cleanly to disk without corruption', async () => {
    const testFile = 'data/test_concurrent_contacts.json';
    const diskPath = path.resolve(ROOT_DIR, testFile);
    safeUnlinkSync(diskPath); // Pre-test cleanup

    const payloads = [ ... ];

    try {
      for (const p of payloads) {
        testPersistInquiry(p, testFile);
      }

      assert.ok(fs.existsSync(diskPath));
      const content = JSON.parse(fs.readFileSync(diskPath, 'utf8'));
      assert.strictEqual(content.length, 5, 'All 5 submissions must exist in store');
      assert.strictEqual(content[0].payload.fullName, 'Client One');
      assert.strictEqual(content[4].payload.fullName, 'Client Five');
    } finally {
      safeUnlinkSync(diskPath); // Guaranteed post-test cleanup
    }
  });
```

---

## 5. `tests/runner.mjs`

### Import update & Global Cleanup Addition
Add at top of `tests/runner.mjs`:
```javascript
import { cleanTestArtifacts } from './helpers/mock-server.mjs';

// Register process exit sweeps
process.on('exit', () => cleanTestArtifacts());
process.on('SIGINT', () => { cleanTestArtifacts(); process.exit(130); });
```

And in `main()` right after the header output (before line 87):
```javascript
  // Clean any stale artifacts from prior runs
  cleanTestArtifacts();
```

And at the end of `main()` right before `process.exit`:
```javascript
  cleanTestArtifacts();
```
