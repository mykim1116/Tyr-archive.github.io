import { execSync } from 'child_process';

try {
  const diff = execSync('git status', { encoding: 'utf8' });
  console.log('Git status before reset:\n', diff);
  execSync('git checkout -- src/components/BookletDetailWindow.tsx');
  console.log('Prisedly restored BookletDetailWindow.tsx from git repository.');
} catch (e) {
  console.error("Git error:", e);
}
