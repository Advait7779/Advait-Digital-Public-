import crypto from 'crypto';
import { stdin, stdout, stderr, exit } from 'process';

const passwordFromArg = process.argv[2];

async function readPassword() {
  if (passwordFromArg) return passwordFromArg;

  if (!stdin.isTTY) {
    let input = '';
    for await (const chunk of stdin) input += chunk;
    return input.trim();
  }

  stderr.write('Usage: node scripts/hash-admin-password.js "your-admin-password"\n');
  exit(1);
}

const password = await readPassword();
if (!password || password.length < 12) {
  stderr.write('Admin password must be at least 12 characters.\n');
  exit(1);
}

const salt = crypto.randomBytes(16).toString('base64url');
const key = crypto.scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
stdout.write(`ADMIN_PASSWORD_HASH=scrypt:v1:16384:8:1:${salt}:${key.toString('base64url')}\n`);
