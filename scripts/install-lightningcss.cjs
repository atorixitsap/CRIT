// scripts/install-lightningcss.cjs
const { execSync } = require('child_process');

try {
  if (process.platform === 'linux') {
    console.log('Detected Linux — installing lightningcss linux binding...');
    // install as non-saved dev dependency so it ends up in node_modules
    execSync('npm install --no-save lightningcss-linux-x64-gnu@latest', { stdio: 'inherit' });
  } else {
    console.log('Non-Linux platform detected (' + process.platform + '), skipping lightningcss linux binding.');
  }
} catch (err) {
  console.error('Failed to install lightningcss linux binding:', err);
  // Do not throw — keep install from failing on CI if something goes wrong
}
