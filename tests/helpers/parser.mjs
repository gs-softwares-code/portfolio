/**
 * File Parser and Source Code Inspection Helper
 */
import fs from 'node:fs';
import path from 'node:path';

export const ROOT_DIR = path.resolve(process.cwd());

export function fileExists(relPath) {
  const fullPath = path.resolve(ROOT_DIR, relPath);
  return fs.existsSync(fullPath);
}

export function readFileSafe(relPath) {
  const fullPath = path.resolve(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return fs.readFileSync(fullPath, 'utf8');
}

export function readAllFilesRecursively(dirRelPath, extensionFilter = ['.tsx', '.ts', '.css', '.mjs', '.json']) {
  const fullDir = path.resolve(ROOT_DIR, dirRelPath);
  if (!fs.existsSync(fullDir)) {
    return [];
  }
  const results = [];
  function scan(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== '.next') {
          scan(entryPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (!extensionFilter || extensionFilter.includes(ext)) {
          results.push({
            fullPath: entryPath,
            relPath: path.relative(ROOT_DIR, entryPath),
            content: fs.readFileSync(entryPath, 'utf8')
          });
        }
      }
    }
  }
  scan(fullDir);
  return results;
}

export function extractCssVariables(cssContent) {
  const vars = {};
  if (!cssContent) return vars;
  const regex = /--([a-zA-Z0-9\-_]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = regex.exec(cssContent)) !== null) {
    vars[`--${match[1]}`] = match[2].trim();
  }
  return vars;
}

export function findFilesContaining(dirRelPath, searchString) {
  const allFiles = readAllFilesRecursively(dirRelPath);
  return allFiles.filter(f => f.content.includes(searchString));
}

export function findFilesMatching(dirRelPath, regex) {
  const allFiles = readAllFilesRecursively(dirRelPath);
  return allFiles.filter(f => regex.test(f.content));
}
