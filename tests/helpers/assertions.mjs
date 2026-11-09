/**
 * Custom assertions and diagnostic utilities
 */
import assert from 'node:assert';

export function assertDefined(val, msg) {
  assert.ok(val !== undefined && val !== null, msg || 'Expected value to be defined and not null');
}

export function assertIncludes(haystack, needle, msg) {
  assert.ok(
    typeof haystack === 'string' && haystack.includes(needle),
    msg || `Expected string to include "${needle}"`
  );
}

export function assertMatches(val, regex, msg) {
  assert.ok(
    regex.test(val),
    msg || `Expected value "${val}" to match pattern ${regex}`
  );
}

export function assertRange(val, min, max, msg) {
  assert.ok(
    val >= min && val <= max,
    msg || `Expected ${val} to be in range [${min}, ${max}]`
  );
}

export function assertGte(actual, expected, msg) {
  assert.ok(
    actual >= expected,
    msg || `Expected ${actual} to be >= ${expected}`
  );
}

export function assertLte(actual, expected, msg) {
  assert.ok(
    actual <= expected,
    msg || `Expected ${actual} to be <= ${expected}`
  );
}
