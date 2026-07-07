import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = __dirname;
const frontendDir = path.join(rootDir, 'frontend');
const frontendDist = path.join(frontendDir, 'dist');
const rootDist = path.join(rootDir, 'dist');

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function removeRecursiveWithRetry(target) {
  if (!fs.existsSync(target)) return;

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      fs.rmSync(target, { recursive: true, force: true, maxRetries: 3, retryDelay: 250 });
      return;
    } catch (err) {
      if (!['EBUSY', 'EPERM', 'ENOTEMPTY'].includes(err.code) || attempt === 5) {
        console.warn(`[WARN] Could not fully remove ${target}: ${err.message}`);
        return;
      }
      sleep(250 * attempt);
    }
  }
}

console.log('[BUILD] Building Frontend App...');
execSync('npm install', { cwd: frontendDir, stdio: 'inherit' });
execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });

console.log('[BUILD] Copying build artifacts to root dist/ for Coolify compatibility...');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    try {
      fs.copyFileSync(src, dest);
    } catch (err) {
      if (['EBUSY', 'EPERM'].includes(err.code) && fs.existsSync(dest)) {
        console.warn(`[WARN] Skipped locked file during local copy: ${dest}`);
        return;
      }
      throw err;
    }
  }
}

removeRecursiveWithRetry(rootDist);

copyRecursiveSync(frontendDist, rootDist);

console.log('[OK] Build completed successfully. Generated dist/ at both root and frontend/dist.');
