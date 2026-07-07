import { execSync } from 'child_process';
import { prismaEnv } from './prisma-env.js';

const command = process.argv.slice(2).join(' ');

if (!command) {
  console.error('Usage: node scripts/with-prisma-env.js <prisma command>');
  process.exit(1);
}

execSync(command, {
  stdio: 'inherit',
  env: prismaEnv(),
});
